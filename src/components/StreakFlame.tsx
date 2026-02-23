"use client";

import { useDisciplineState } from "@/src/components/StateProvider";

export const StreakFlame = () => {
  const { state } = useDisciplineState();

  return (
    <div className="card">
      <div className="pill">The Streak</div>
      <h3 className="title">Discipline Flame</h3>
      <div className="grid grid-2">
        <div>
          <p className="subtitle">Gym Discipline</p>
          <div className="badge">🔥 {state.streak.gym} days</div>
        </div>
        <div>
          <p className="subtitle">Study Discipline</p>
          <div className="badge">🔥 {state.streak.study} days</div>
        </div>
      </div>
    </div>
  );
};
