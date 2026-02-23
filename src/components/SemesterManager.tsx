"use client";

import { useState } from "react";
import { useDisciplineState } from "@/src/components/StateProvider";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const SemesterManager = () => {
  const { state, setState } = useDisciplineState();
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [credits, setCredits] = useState(3);
  const [slotLabel, setSlotLabel] = useState("");
  const [slotDay, setSlotDay] = useState(days[0]);
  const [slotStart, setSlotStart] = useState("08:00");
  const [slotEnd, setSlotEnd] = useState("09:00");

  const addSubject = () => {
    if (!subjectName.trim()) return;
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
  };

  const removeSlot = (id: string) => {
    setState((prev) => ({
      ...prev,
      schedule: prev.schedule.filter((slot) => slot.id !== id)
    }));
  };

  return (
    <div className="card">
      <div className="pill">Semester Manager</div>
      <h3 className="title">Subjects & Schedule</h3>

      <div className="grid">
        <div className="grid grid-2">
          <input
            className="input"
            placeholder="Subject name"
            value={subjectName}
            onChange={(event) => setSubjectName(event.target.value)}
          />
          <input
            className="input"
            placeholder="Code"
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
            Add Subject
          </button>
        </div>

        <div className="grid grid-2">
          <input
            className="input"
            placeholder="Class label"
            value={slotLabel}
            onChange={(event) => setSlotLabel(event.target.value)}
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
            Add Schedule Slot
          </button>
        </div>
      </div>

      <div className="grid grid-2" style={{ marginTop: 16 }}>
        <div>
          <p className="subtitle">Subjects</p>
          <div className="grid">
            {state.subjects.map((subject) => (
              <div key={subject.id} className="badge">
                {subject.code} · {subject.name} ({subject.credits})
                <button className="button secondary" type="button" onClick={() => removeSubject(subject.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="subtitle">Schedule</p>
          <div className="grid">
            {state.schedule.map((slot) => (
              <div key={slot.id} className="badge">
                {slot.day} · {slot.label} ({slot.start}-{slot.end})
                <button className="button secondary" type="button" onClick={() => removeSlot(slot.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
