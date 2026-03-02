"use client";

import { useMemo } from "react";
import { BarChart3 } from "lucide-react";
import { useDisciplineState } from "@/src/components/StateProvider";

export const GpaGlobalCard = () => {
  const { state } = useDisciplineState();

  const average = useMemo(() => {
    if (!state.gpaHistory.length) return 0;
    const total = state.gpaHistory.reduce((sum, entry) => sum + entry.gpa, 0);
    return total / state.gpaHistory.length;
  }, [state.gpaHistory]);

  return (
    <div className="card">
      <div className="pill">
        <BarChart3 size={14} /> GPA Global
      </div>
      <h3 className="title">Historial por semestres</h3>
      <p className="subtitle">Resumen 2025-2029 y promedio total.</p>
      <div className="badge">Promedio total: {average.toFixed(2)}</div>
      <div className="grid" style={{ marginTop: 12 }}>
        {state.gpaHistory.map((entry) => (
          <div key={entry.term} className="badge">
            {entry.term} · {entry.gpa.toFixed(2)}
          </div>
        ))}
      </div>
    </div>
  );
};
