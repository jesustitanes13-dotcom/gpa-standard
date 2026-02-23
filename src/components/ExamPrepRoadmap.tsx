"use client";

import { useMemo } from "react";
import { useDisciplineState } from "@/src/components/StateProvider";

const formatDate = (date: Date) => date.toLocaleDateString("es-ES", { month: "short", day: "numeric" });

export const ExamPrepRoadmap = () => {
  const { state } = useDisciplineState();

  const roadmap = useMemo(() => {
    const upcoming = [...state.exams]
      .filter((exam) => new Date(exam.date) >= new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

    if (!upcoming) {
      return [];
    }

    const subject = state.subjects.find((item) => item.id === upcoming.subjectId);
    const examDate = new Date(upcoming.date);
    const days = Array.from({ length: 7 }).map((_, index) => {
      const day = new Date();
      day.setDate(day.getDate() + index);
      const focus = index < 3 ? "Conceptos base" : index < 5 ? "Practica guiada" : "Simulacro";
      return {
        date: formatDate(day),
        focus: `${focus} para ${subject?.name ?? "examen"}`
      };
    });

    return days;
  }, [state.exams, state.subjects]);

  return (
    <div className="card">
      <div className="pill">Ruta de Examen</div>
      <h3 className="title">Plan de 7 Dias</h3>
      {roadmap.length === 0 ? (
        <p className="subtitle">No hay examenes proximos. Agrega uno para generar el plan.</p>
      ) : (
        <div className="grid">
          {roadmap.map((day) => (
            <div key={day.date} className="badge">
              {day.date} · {day.focus}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
