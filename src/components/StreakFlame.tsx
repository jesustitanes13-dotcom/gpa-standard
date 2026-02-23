"use client";

import { useDisciplineState } from "@/src/components/StateProvider";

export const StreakFlame = () => {
  const { state } = useDisciplineState();

  return (
    <div className="card glow-active">
      <div className="pill">Racha</div>
      <h3 className="title">Fuego de Disciplina</h3>
      <div className="grid grid-2">
        <div>
          <p className="subtitle">Disciplina de Gym</p>
          <div className="badge">🔥 {state.streak.gym} dias</div>
        </div>
        <div>
          <p className="subtitle">Disciplina de Estudio</p>
          <div className="badge">🔥 {state.streak.study} dias</div>
        </div>
      </div>
    </div>
  );
};
