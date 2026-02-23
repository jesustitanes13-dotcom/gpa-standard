"use client";

import { useState } from "react";
import { useDisciplineState } from "@/src/components/StateProvider";

export const ExamManager = () => {
  const { state, setState } = useDisciplineState();
  const [subjectId, setSubjectId] = useState(state.subjects[0]?.id ?? "");
  const [title, setTitle] = useState("Midterm");
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState(25);

  const addExam = () => {
    if (!subjectId || !date) return;
    const newExam = {
      id: `exam-${Date.now()}`,
      subjectId,
      title,
      date,
      weight
    };
    setState((prev) => ({
      ...prev,
      exams: [newExam, ...prev.exams]
    }));
  };

  const removeExam = (id: string) => {
    setState((prev) => ({
      ...prev,
      exams: prev.exams.filter((exam) => exam.id !== id)
    }));
  };

  return (
    <div className="card">
      <div className="pill">Exam Mode Intel</div>
      <h3 className="title">Upcoming Deadlines</h3>
      <div className="grid grid-2">
        <select className="select" value={subjectId} onChange={(event) => setSubjectId(event.target.value)}>
          {state.subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.code} · {subject.name}
            </option>
          ))}
        </select>
        <input className="input" value={title} onChange={(event) => setTitle(event.target.value)} />
        <input className="input" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        <input
          className="input"
          type="number"
          min={5}
          max={100}
          value={weight}
          onChange={(event) => setWeight(Number(event.target.value))}
        />
        <button className="button" type="button" onClick={addExam}>
          Add Exam
        </button>
      </div>
      <div className="grid" style={{ marginTop: 16 }}>
        {state.exams.map((exam) => {
          const subject = state.subjects.find((item) => item.id === exam.subjectId);
          return (
            <div key={exam.id} className="badge">
              {subject?.code ?? "SUB"} · {exam.title} · {exam.date} · {exam.weight}%
              <button className="button secondary" type="button" onClick={() => removeExam(exam.id)}>
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
