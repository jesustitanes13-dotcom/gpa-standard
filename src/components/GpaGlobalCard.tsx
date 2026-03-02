"use client";

import { BarChart3 } from "lucide-react";
import { useDisciplineState } from "@/src/components/StateProvider";

export const GpaGlobalCard = () => {
  const { state, updateState } = useDisciplineState();

  return (
    <div className="card">
      <div className="pill">
        <BarChart3 size={14} /> GPA Global
      </div>
      <h3 className="title">GPA general</h3>
      <p className="subtitle">Ingresa tu GPA global y el semestre actual.</p>
      <div className="grid">
        <label className="subtitle">GPA general</label>
        <input
          className="input"
          type="number"
          min={0}
          max={4}
          step={0.01}
          value={state.overallGpa}
          onChange={(event) => updateState({ overallGpa: Number(event.target.value) })}
        />
        <label className="subtitle">Semestre y año</label>
        <div className="grid grid-2">
          <input
            className="input"
            placeholder="Semestre (Ej: Spring)"
            value={state.overallTerm}
            onChange={(event) => updateState({ overallTerm: event.target.value })}
          />
          <input
            className="input"
            placeholder="Año (Ej: 2026)"
            value={state.overallYear}
            onChange={(event) => updateState({ overallYear: event.target.value })}
          />
        </div>
      </div>
    </div>
  );
};
