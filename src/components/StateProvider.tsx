"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { defaultState } from "@/src/lib/defaultState";
import { DisciplineState } from "@/src/lib/types";
import { getSupabaseBrowser } from "@/src/lib/supabaseBrowser";

type StateContextValue = {
  state: DisciplineState;
  setState: React.Dispatch<React.SetStateAction<DisciplineState>>;
  updateState: (partial: Partial<DisciplineState>) => void;
  loading: boolean;
  user: User | null;
  examWarning: boolean;
};

const StateContext = createContext<StateContextValue | undefined>(undefined);

const LOCAL_KEY = "discipline_os_state";
const FALLBACK_OWNER = process.env.NEXT_PUBLIC_DISCIPLINE_OS_OWNER_ID ?? "default";

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<DisciplineState | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const lastSynced = useRef<string>("");
  const applyingRemote = useRef(false);
  const ownerIdRef = useRef<string>(FALLBACK_OWNER);

  useEffect(() => {
    setState(defaultState);
    try {
      const cached = typeof window !== "undefined" ? localStorage.getItem(LOCAL_KEY) : null;
      if (cached) {
        try {
          setState(JSON.parse(cached) as DisciplineState);
        } catch {
          // ignore cache parse issues
        }
      }
    } catch {
      // ignore storage issues
    }

    const supabase = getSupabaseBrowser();
    let authCleanup: (() => void) | undefined;
    if (supabase) {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session?.user) {
          setUser(data.session.user);
          ownerIdRef.current = data.session.user.id;
        }
      });

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        ownerIdRef.current = session?.user?.id ?? FALLBACK_OWNER;
      });

      authCleanup = () => {
        authListener?.subscription.unsubscribe();
      };
    }

    fetch("/api/state")
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (payload?.state) {
          applyingRemote.current = true;
          setState(payload.state as DisciplineState);
          lastSynced.current = JSON.stringify(payload.state);
        }
      })
      .catch(() => null)
      .finally(() => {
        setHydrated(true);
        setLoading(false);
      });

    return () => {
      authCleanup?.();
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    const supabase = getSupabaseBrowser();
    if (!supabase) return;

    supabase
      .from("discipline_os_state")
      .select("state")
      .eq("owner_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.state) {
          applyingRemote.current = true;
          setState(data.state as DisciplineState);
          lastSynced.current = JSON.stringify(data.state);
        }
      })
      .finally(() => {
        setHydrated(true);
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    if (!hydrated || !state) {
      return;
    }

    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
    } catch {
      // ignore storage issues
    }
    if (applyingRemote.current) {
      applyingRemote.current = false;
      lastSynced.current = JSON.stringify(state);
      return;
    }

    lastSynced.current = JSON.stringify(state);
    const timeout = window.setTimeout(() => {
      const supabase = getSupabaseBrowser();
      if (supabase && user) {
        supabase
          .from("discipline_os_state")
          .upsert(
            { owner_id: user.id, state, updated_at: new Date().toISOString() },
            { onConflict: "owner_id" }
          )
          .catch(() => null);
        return;
      }

      fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state })
      }).catch(() => null);
    }, 800);

    return () => window.clearTimeout(timeout);
  }, [state, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    let supabase: ReturnType<typeof getSupabaseBrowser> | null = null;
    try {
      supabase = getSupabaseBrowser();
    } catch {
      supabase = null;
    }
    if (!supabase) return;

    const channel = supabase
      .channel(`discipline_os_state:${ownerIdRef.current}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "discipline_os_state",
          filter: `owner_id=eq.${ownerIdRef.current}`
        },
        (payload) => {
          const nextState = (payload.new as { state?: DisciplineState } | null)?.state;
          if (!nextState) return;
          const serialized = JSON.stringify(nextState);
          if (serialized === lastSynced.current) return;
          applyingRemote.current = true;
          lastSynced.current = serialized;
          setState(nextState);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [hydrated, user?.id]);

  const setStateSafe = useCallback(
    (value: React.SetStateAction<DisciplineState>) => {
      setState((prev) => {
        const base = prev ?? defaultState;
        return typeof value === "function" ? (value as (p: DisciplineState) => DisciplineState)(base) : value;
      });
    },
    []
  );

  const updateState = useCallback((partial: Partial<DisciplineState>) => {
    setState((prev) => ({
      ...(prev ?? defaultState),
      ...partial
    }));
  }, []);

  const examWarning = useMemo(() => {
    const now = new Date();
    const exams = (state ?? defaultState).exams;
    return exams.some((exam) => {
      const diff = new Date(exam.date).getTime() - now.getTime();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      return days >= 0 && days <= 3;
    });
  }, [state]);

  const value = useMemo(
    () => ({
      state: state ?? defaultState,
      setState: setStateSafe,
      updateState,
      loading,
      user,
      examWarning
    }),
    [state, setStateSafe, updateState, loading, user, examWarning]
  );

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};

export const useDisciplineState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useDisciplineState must be used within StateProvider");
  }
  return context;
};
