"use client";

import { useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CalendarDays } from "lucide-react";
import { useDisciplineState } from "@/src/components/StateProvider";

const formatKey = (date: Date) => date.toISOString().slice(0, 10);

export const AcademicCalendar = () => {
  const { state } = useDisciplineState();

  const deadlineMap = useMemo(() => {
    const map = new Map<string, string>();
    state.syllabus.deadlines.forEach((deadline) => {
      map.set(deadline.date, deadline.title);
    });
    return map;
  }, [state.syllabus.deadlines]);

  return (
    <div className="card">
      <div className="pill">
        <CalendarDays size={14} /> Academic Calendar
      </div>
      <h3 className="title">Calendario Academico</h3>
      <p className="subtitle">Visualiza tus deadlines y clases clave en el mes.</p>
      <div className="calendar-shell">
        <Calendar
          locale="es-ES"
          tileClassName={({ date }) => (deadlineMap.has(formatKey(date)) ? "calendar-deadline" : undefined)}
          tileContent={({ date }) =>
            deadlineMap.has(formatKey(date)) ? <span className="calendar-dot" /> : null
          }
        />
      </div>
      {deadlineMap.size === 0 ? <p className="subtitle">No hay eventos agregados aun.</p> : null}
    </div>
  );
};
