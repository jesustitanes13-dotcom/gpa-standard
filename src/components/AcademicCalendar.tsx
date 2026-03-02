"use client";

import { useMemo } from "react";
import { CalendarDays } from "lucide-react";
import { useDisciplineState } from "@/src/components/StateProvider";

const dayLabels = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];

const startOfWeek = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

const formatKey = (date: Date) => date.toISOString().slice(0, 10);

export const AcademicCalendar = () => {
  const { state } = useDisciplineState();

  const events = useMemo(() => {
    const syllabus = state.syllabus.deadlines.map((item) => ({
      date: item.date,
      title: item.title
    }));
    const exams = state.exams.map((item) => ({
      date: item.date,
      title: item.title
    }));
    return [...syllabus, ...exams];
  }, [state.exams, state.syllabus.deadlines]);

  const weekStart = useMemo(() => startOfWeek(new Date()), []);
  const days = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, index) => {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + index);
        return date;
      }),
    [weekStart]
  );

  const eventsByDay = useMemo(() => {
    const map = new Map<string, string[]>();
    events.forEach((event) => {
      const key = event.date;
      const list = map.get(key) ?? [];
      list.push(event.title);
      map.set(key, list);
    });
    return map;
  }, [events]);

  return (
    <div className="card">
      <div className="pill">
        <CalendarDays size={14} /> Academic Calendar
      </div>
      <h3 className="title">Calendario Academico</h3>
      <p className="subtitle">Vista semanal para mantener todo ordenado.</p>
      <div className="calendar-week">
        {days.map((date, index) => {
          const key = formatKey(date);
          const items = eventsByDay.get(key) ?? [];
          return (
            <div key={key} className="calendar-day">
              <div className="calendar-day-header">
                <span>{dayLabels[index]}</span>
                <span className="calendar-day-date">{date.getDate()}</span>
              </div>
              {items.length === 0 ? (
                <div className="calendar-empty">Sin eventos</div>
              ) : (
                items.map((item, idx) => (
                  <div key={`${key}-${idx}`} className="calendar-event">
                    {item}
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
