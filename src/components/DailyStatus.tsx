"use client";

import { useMemo } from "react";
import { useDisciplineState } from "@/src/components/StateProvider";

const daysBetween = (start: Date, end: Date) => {
  const diff = end.getTime() - start.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

export const DailyStatus = () => {
  const { state, examWarning } = useDisciplineState();

  const countdown = useMemo(() => {
    const graduation = new Date(state.graduationDate);
    return daysBetween(new Date(), graduation);
  }, [state.graduationDate]);

  return (
    <div className={`card glow-active ${examWarning ? "warning-glow" : ""}`}>
      <div className="pill">Dashboard</div>
      <h1 className="title">Epa, {state.greetingName}!</h1>
      <p className="subtitle">Cuenta regresiva a graduacion: {countdown} dias</p>
    </div>
  );
};
