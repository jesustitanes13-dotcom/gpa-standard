"use client";

import { useEffect } from "react";
import { useDisciplineState } from "@/src/components/StateProvider";
import { BottomNav } from "@/src/components/BottomNav";
import { LoadingOverlay } from "@/src/components/LoadingOverlay";

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const { state, loading } = useDisciplineState();

  useEffect(() => {
    const className = "exam-mode";
    const root = document.documentElement;
    const body = document.body;

    if (state.examMode) {
      root.classList.add(className);
      body.classList.add(className);
    } else {
      root.classList.remove(className);
      body.classList.remove(className);
    }
  }, [state.examMode]);

  return (
    <div className="app-shell">
      {loading ? <LoadingOverlay /> : null}
      {children}
      <BottomNav />
    </div>
  );
};
