"use client";

import { useState } from "react";
import { useDisciplineState } from "@/src/components/StateProvider";
import { isLikelySpanish } from "@/src/lib/languageGuard";

const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

export const SemesterManager = () => {
  const { state, setState } = useDisciplineState();
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [credits, setCredits] = useState(3);
  const [slotLabel, setSlotLabel] = useState("");
  const [slotDay, setSlotDay] = useState(days[0]);
  const [slotStart, setSlotStart] = useState("08:00");
  const [slotEnd, setSlotEnd] = useState("09:00");
  const [subjectWarning, setSubjectWarning] = useState("");
  const [slotWarning, setSlotWarning] = useState("");

  const addSubject = () => {
    if (!subjectName.trim()) return;
    if (isLikelySpanish(subjectName)) {
      setSubjectWarning("Senior Partner: You must write in English to save.");
      return;
    }
    const newSubject = {
      id: `sub-${Date.now()}`,
      name: subjectName.trim(),
      code: subjectCode.trim() || "GEN",
      credits
    };
    setState((prev) => ({
      ...prev,
      subjects: [newSubject, ...prev.subjects]
    }));
    setSubjectName("");
    setSubjectCode("");
    setCredits(3);
    setSubjectWarning("");
  };

  const removeSubject = (id: string) => {
    setState((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((subject) => subject.id !== id),
      exams: prev.exams.filter((exam) => exam.subjectId !== id)
    }));
  };

  const addSlot = () => {
    if (!slotLabel.trim()) return;
    if (isLikelySpanish(slotLabel)) {
      setSlotWarning("Senior Partner: You must write in English to save.");
      return;
    }
    const newSlot = {
      id: `slot-${Date.now()}`,
      day: slotDay,
      start: slotStart,
      end: slotEnd,
      label: slotLabel.trim()
    };
    setState((prev) => ({
      ...prev,
      schedule: [newSlot, ...prev.schedule]
    }));
    setSlotLabel("");
    setSlotWarning("");
  };

  const removeSlot = (id: string) => {
    setState((prev) => ({
      ...prev,
      schedule: prev.schedule.filter((slot) => slot.id !== id)
    }));
  };

  return (
    <div className="card">
      <div className="pill">Gestor del Semestre</div>
      <h3 className="title">Materias y Horario</h3>

      <div className="grid">
        <div className="grid grid-2">
          <input
            className="input"
            placeholder="Nombre de la materia"
            value={subjectName}
            onChange={(event) => {
              setSubjectName(event.target.value);
              setSubjectWarning("");
            }}
          />
          <input
            className="input"
            placeholder="Codigo"
            value={subjectCode}
            onChange={(event) => setSubjectCode(event.target.value)}
          />
          <input
            className="input"
            type="number"
            min={1}
            max={6}
            value={credits}
            onChange={(event) => setCredits(Number(event.target.value))}
          />
          <button className="button" type="button" onClick={addSubject}>
            Agregar materia
          </button>
        </div>
        {subjectWarning ? <p className="subtitle">{subjectWarning}</p> : null}

        <div className="grid grid-2">
          <input
            className="input"
            placeholder="Nombre de la clase"
            value={slotLabel}
            onChange={(event) => {
              setSlotLabel(event.target.value);
              setSlotWarning("");
            }}
          />
          <select className="select" value={slotDay} onChange={(event) => setSlotDay(event.target.value)}>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <input className="input" type="time" value={slotStart} onChange={(event) => setSlotStart(event.target.value)} />
          <input className="input" type="time" value={slotEnd} onChange={(event) => setSlotEnd(event.target.value)} />
          <button className="button secondary" type="button" onClick={addSlot}>
            Agregar horario
          </button>
        </div>
        {slotWarning ? <p className="subtitle">{slotWarning}</p> : null}
      </div>

      <div className="grid grid-2" style={{ marginTop: 16 }}>
        <div>
          <p className="subtitle">Materias</p>
          <div className="grid">
            {state.subjects.map((subject) => (
              <div key={subject.id} className="badge">
                {subject.code} · {subject.name} ({subject.credits})
                <button className="button secondary" type="button" onClick={() => removeSubject(subject.id)}>
                  Quitar
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="subtitle">Horario</p>
          <div className="grid">
            {state.schedule.map((slot) => (
              <div key={slot.id} className="badge">
                {slot.day} · {slot.label} ({slot.start}-{slot.end})
                <button className="button secondary" type="button" onClick={() => removeSlot(slot.id)}>
                  Quitar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
