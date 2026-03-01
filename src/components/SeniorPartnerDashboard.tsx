"use client";

import { useEffect, useMemo } from "react";
import { useDisciplineState } from "@/src/components/StateProvider";

const daysUntil = (date: string) => {
  const diff = new Date(date).getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const SeniorPartnerDashboard = () => {
  const { state, user } = useDisciplineState();

  const urgentExams = useMemo(
    () =>
      state.exams.filter((exam) => {
        const days = daysUntil(exam.date);
        return days >= 0 && days <= 3;
      }),
    [state.exams]
  );

  const warning = urgentExams.length > 0;

  useEffect(() => {
    if (!warning) return;
    const key = "senior_partner_last_warning";
    const lastSent = Number(localStorage.getItem(key) ?? 0);
    const now = Date.now();
    if (now - lastSent < 1000 * 60 * 60 * 12) {
      return;
    }

    fetch("/api/proctor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user?.email,
        deadlines: urgentExams.map((exam) => ({
          title: exam.title,
          date: exam.date
        }))
      })
    }).catch(() => null);

    localStorage.setItem(key, String(now));
  }, [urgentExams, warning]);

  return (
    <div className={`card ${warning ? "warning-glow" : ""}`}>
      <div className="pill">Senior Partner</div>
      <h3 className="title">Dashboard</h3>
      <p className="subtitle">
        Mantén el impulso medible. Optimiza bloques de estudio alineando tareas cognitivas con tus picos de energia.
      </p>
      {warning ? <p className="subtitle">Atencion: tienes examenes a menos de 3 dias.</p> : null}
      <div className="grid">
        <div className="badge">Cuantifica resultados: registra minutos enfocados diarios.</div>
        <div className="badge">Apunta a 2 bloques de trabajo profundo antes del mediodia.</div>
        <div className="badge">Revisa a las 24h + 7d despues de cada clase.</div>
      </div>
    </div>
  );
};
