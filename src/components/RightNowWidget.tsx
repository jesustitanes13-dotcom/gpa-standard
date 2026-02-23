"use client";

import { useMemo } from "react";
import { useDisciplineState } from "@/src/components/StateProvider";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const toMinutes = (value: string) => {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
};

export const RightNowWidget = () => {
  const { state } = useDisciplineState();

  const now = new Date();
  const todayName = dayNames[now.getDay()];
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const { current, next } = useMemo(() => {
    const todaySlots = state.schedule
      .filter((slot) => slot.day === todayName)
      .sort((a, b) => toMinutes(a.start) - toMinutes(b.start));

    const currentSlot = todaySlots.find(
      (slot) => toMinutes(slot.start) <= nowMinutes && nowMinutes <= toMinutes(slot.end)
    );

    const nextSlot = todaySlots.find((slot) => toMinutes(slot.start) > nowMinutes);

    return { current: currentSlot, next: nextSlot };
  }, [state.schedule, todayName, nowMinutes]);

  return (
    <div className="card">
      <div className="pill">Right Now</div>
      <h3 className="title">{todayName}</h3>
      {current ? (
        <>
          <p className="subtitle">Currently in session</p>
          <div className="badge">
            {current.label} · {current.start} - {current.end}
          </div>
        </>
      ) : next ? (
        <>
          <p className="subtitle">Next up</p>
          <div className="badge">
            {next.label} · {next.start} - {next.end}
          </div>
        </>
      ) : (
        <p className="subtitle">No classes scheduled for today.</p>
      )}
    </div>
  );
};
