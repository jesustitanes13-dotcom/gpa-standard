"use client";

import { useMemo, useState } from "react";
import { useDisciplineState } from "@/src/components/StateProvider";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const GpaSimulator = () => {
  const { state } = useDisciplineState();
  const [grades, setGrades] = useState<Record<string, number>>({});

  const simulatedGpa = useMemo(() => {
    const totalCredits = state.subjects.reduce((sum, subject) => sum + subject.credits, 0);
    if (!totalCredits) return 0;

    const totalPoints = state.subjects.reduce((sum, subject) => {
      const grade = grades[subject.id] ?? 3.5;
      return sum + grade * subject.credits;
    }, 0);

    return totalPoints / totalCredits;
  }, [grades, state.subjects]);

  return (
    <div className="card">
      <div className="pill">GPA Simulator</div>
      <h3 className="title">Live What-If Engine</h3>
      <p className="subtitle">Adjust expected grades to see the GPA trajectory.</p>
      <div className="grid">
        {state.subjects.map((subject) => (
          <div key={subject.id} className="grid grid-2">
            <div className="badge">
              {subject.code} · {subject.name}
            </div>
            <input
              className="input"
              type="number"
              min={0}
              max={4}
              step={0.1}
              value={grades[subject.id] ?? 3.5}
              onChange={(event) =>
                setGrades((prev) => ({
                  ...prev,
                  [subject.id]: clamp(Number(event.target.value), 0, 4)
                }))
              }
            />
          </div>
        ))}
      </div>
      <div className="badge" style={{ marginTop: 16 }}>
        Simulated GPA: {simulatedGpa.toFixed(2)} · Target {state.gpaTarget.toFixed(2)}
      </div>
    </div>
  );
};
