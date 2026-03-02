"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { useDisciplineState } from "@/src/components/StateProvider";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const ClassGradePredictor = () => {
  const { state } = useDisciplineState();
  const [currentGpa, setCurrentGpa] = useState(3.45);
  const [finalScore, setFinalScore] = useState(80);

  const finalWeight = useMemo(
    () => state.syllabus.weights.find((item) => item.label.toLowerCase().includes("final"))?.weight ?? 30,
    [state.syllabus.weights]
  );

  const predictedGpa = useMemo(() => {
    const finalWeightRatio = clamp(finalWeight / 100, 0, 1);
    return clamp(currentGpa * (1 - finalWeightRatio) + (finalScore / 100) * 4 * finalWeightRatio, 0, 4);
  }, [currentGpa, finalScore, finalWeight]);

  return (
    <div className="card">
      <div className="pill">
        <Calculator size={14} /> Class Grade Predictor
      </div>
      <h3 className="title">What-if por clase</h3>
      <p className="subtitle">Simula tu nota final sin mezclar el GPA global.</p>
      <div className="grid">
        <label className="subtitle">GPA actual de la clase</label>
        <input
          className="input"
          type="number"
          min={0}
          max={4}
          step={0.01}
          value={currentGpa}
          onChange={(event) => setCurrentGpa(clamp(Number(event.target.value), 0, 4))}
        />
        <label className="subtitle">Final exam score</label>
        <input
          className="input"
          type="number"
          min={0}
          max={100}
          value={finalScore}
          onChange={(event) => setFinalScore(Number(event.target.value))}
        />
        <div className="badge">
          Prediccion final: {predictedGpa.toFixed(2)} (Final {finalWeight}%)
        </div>
      </div>
    </div>
  );
};
