"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultState } from "@/src/lib/defaultState";
import { DisciplineState } from "@/src/lib/types";

type StateContextValue = {
  state: DisciplineState;
  setState: React.Dispatch<React.SetStateAction<DisciplineState>>;
  updateState: (partial: Partial<DisciplineState>) => void;
};

const StateContext = createContext<StateContextValue | undefined>(undefined);

const LOCAL_KEY = "discipline_os_state";

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<DisciplineState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const cached = typeof window !== "undefined" ? localStorage.getItem(LOCAL_KEY) : null;
    if (cached) {
      try {
        setState(JSON.parse(cached) as DisciplineState);
      } catch {
        // ignore cache parse issues
      }
    }

    fetch("/api/state")
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (payload?.state) {
          setState(payload.state as DisciplineState);
        }
      })
      .catch(() => null)
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
    const timeout = window.setTimeout(() => {
      fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state })
      }).catch(() => null);
    }, 800);

    return () => window.clearTimeout(timeout);
  }, [state, hydrated]);

  const updateState = useCallback((partial: Partial<DisciplineState>) => {
    setState((prev) => ({
      ...prev,
      ...partial
    }));
  }, []);

  const value = useMemo(
    () => ({
      state,
      setState,
      updateState
    }),
    [state, updateState]
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
