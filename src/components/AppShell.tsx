"use client";

import { useEffect } from "react";
import { useDisciplineState } from "@/src/components/StateProvider";
import { BottomNav } from "@/src/components/BottomNav";

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const { state } = useDisciplineState();

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
      {children}
      <BottomNav />
    </div>
  );
};
