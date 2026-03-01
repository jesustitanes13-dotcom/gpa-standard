"use client";

import { useDisciplineState } from "@/src/components/StateProvider";

export const ExamModeToggle = () => {
  const { state, updateState } = useDisciplineState();

  return (
    <div className={`card ${state.examMode ? "exam-glow" : ""}`}>
      <div className="pill">Exam Mode</div>
      <h3 className="title">Protocolo de Enfoque</h3>
      <p className="subtitle">
        Al activar, la interfaz entra en prioridad y filtra lo urgente.
      </p>
      <div className="button-row">
        <button
          className="button"
          onClick={() => updateState({ examMode: !state.examMode })}
          type="button"
        >
          {state.examMode ? "Desactivar Modo Examen" : "Activar Modo Examen"}
        </button>
      </div>
    </div>
  );
};
