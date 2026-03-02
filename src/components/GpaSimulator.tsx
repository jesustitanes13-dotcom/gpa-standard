"use client";

import { useMemo, useState } from "react";
import { useDisciplineState } from "@/src/components/StateProvider";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const Circle = ({ progress }: { progress: number }) => {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <svg width="110" height="110">
      <circle cx="55" cy="55" r={radius} stroke="rgba(255,255,255,0.12)" strokeWidth="10" fill="none" />
      <circle
        cx="55"
        cy="55"
        r={radius}
        stroke="url(#gpaGradient)"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      <defs>
        <linearGradient id="gpaGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e78ff" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const GpaSimulator = () => {
  const { state } = useDisciplineState();
  const [currentGpa, setCurrentGpa] = useState(3.45);
  const [finalScore, setFinalScore] = useState(80);

  const totalCredits = useMemo(
    () => state.subjects.reduce((sum, subject) => sum + subject.credits, 0),
    [state.subjects]
  );

  const nextExam = useMemo(() => {
    const sorted = [...state.exams].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    return sorted[0];
  }, [state.exams]);

  const whatIfGpa = useMemo(() => {
    if (!nextExam || totalCredits === 0) return currentGpa;
    const subject = state.subjects.find((item) => item.id === nextExam.subjectId);
    const credits = subject?.credits ?? 3;
    return clamp((currentGpa * totalCredits + 4.0 * credits) / (totalCredits + credits), 0, 4);
  }, [currentGpa, nextExam, state.subjects, totalCredits]);

  const progress = clamp(currentGpa / state.gpaTarget, 0, 1);
  const finalWeight = state.syllabus.weights.find((item) => item.label.toLowerCase().includes("final"))?.weight ?? 30;
  const finalWeightRatio = clamp(finalWeight / 100, 0, 1);
  const predictedGpa = clamp(
    currentGpa * (1 - finalWeightRatio) + (finalScore / 100) * 4 * finalWeightRatio,
    0,
    4
  );

  return (
    <div className="card">
      <div className="pill">GPA Tracker</div>
      <h3 className="title">GPA Tracker</h3>
      <p className="subtitle">Visualiza tu progreso hacia la meta y simula el proximo examen.</p>

      <div className="grid grid-2" style={{ alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Circle progress={progress} />
          <div>
            <div className="badge">GPA Actual: {currentGpa.toFixed(2)}</div>
            <div className="badge" style={{ marginTop: 6 }}>
              Meta GPA: {state.gpaTarget.toFixed(2)}
            </div>
          </div>
        </div>
        <div className="grid">
          <label className="subtitle">Ajusta tu GPA actual</label>
          <input
            className="input"
            type="number"
            min={0}
            max={4}
            step={0.01}
            value={currentGpa}
            onChange={(event) => setCurrentGpa(clamp(Number(event.target.value), 0, 4))}
          />
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="pill">What-if</div>
        <p className="subtitle">
          Si saco una A en mi proximo examen, mi GPA sube a {whatIfGpa.toFixed(2)}.
        </p>
        <div className="grid grid-2" style={{ marginTop: 8 }}>
          <label className="subtitle">Final exam score</label>
          <input
            className="input"
            type="number"
            min={0}
            max={100}
            value={finalScore}
            onChange={(event) => setFinalScore(Number(event.target.value))}
          />
        </div>
        <div className="badge" style={{ marginTop: 8 }}>
          Prediccion final GPA: {predictedGpa.toFixed(2)} (Final {finalWeight}%)
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="pill">GPA History</div>
        <h4 className="title">2025 - 2029</h4>
        <div className="grid">
          {state.gpaHistory.map((entry) => (
            <div key={entry.term} className="badge">
              {entry.term} · {entry.gpa.toFixed(2)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
