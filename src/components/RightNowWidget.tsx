"use client";

import { useMemo } from "react";
import { useDisciplineState } from "@/src/components/StateProvider";

const dayNamesEs = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
const dayNamesEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const toMinutes = (value: string) => {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
};

export const RightNowWidget = () => {
  const { state } = useDisciplineState();

  const now = new Date();
  const todayName = dayNamesEs[now.getDay()];
  const todayNameEn = dayNamesEn[now.getDay()];
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const { current, next } = useMemo(() => {
    const todaySlots = state.schedule
      .filter((slot) => slot.day === todayName || slot.day === todayNameEn)
      .sort((a, b) => toMinutes(a.start) - toMinutes(b.start));

    const currentSlot = todaySlots.find(
      (slot) => toMinutes(slot.start) <= nowMinutes && nowMinutes <= toMinutes(slot.end)
    );

    const nextSlot = todaySlots.find((slot) => toMinutes(slot.start) > nowMinutes);

    return { current: currentSlot, next: nextSlot };
  }, [state.schedule, todayName, todayNameEn, nowMinutes]);

  return (
    <div className="card glow-active">
      <div className="pill">Right Now</div>
      <h3 className="title">{todayName}</h3>
      {current ? (
        <>
          <p className="subtitle">En clase ahora</p>
          <div className="badge">
            {current.label} · {current.start} - {current.end}
          </div>
        </>
      ) : next ? (
        <>
          <p className="subtitle">Siguiente clase</p>
          <div className="badge">
            {next.label} · {next.start} - {next.end}
          </div>
        </>
      ) : (
        <p className="subtitle">No hay clases hoy.</p>
      )}
    </div>
  );
};
