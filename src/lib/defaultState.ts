import { DisciplineState } from "./types";

export const defaultState: DisciplineState = {
  greetingName: "Jesus Bracho",
  graduationDate: "2029-05-01",
  examMode: false,
  streak: {
    gym: 4,
    study: 6
  },
  schedule: [
    {
      id: "slot-1",
      day: "Lunes",
      start: "08:00",
      end: "10:00",
      label: "Algoritmos"
    },
    {
      id: "slot-2",
      day: "Lunes",
      start: "14:00",
      end: "16:00",
      label: "Laboratorio de IA"
    },
    {
      id: "slot-3",
      day: "Miercoles",
      start: "09:00",
      end: "11:00",
      label: "Estructuras de Datos"
    }
  ],
  subjects: [
    {
      id: "sub-1",
      name: "Algoritmos",
      code: "CS401",
      credits: 4,
      instructor: "Dr. Vega"
    },
    {
      id: "sub-2",
      name: "Laboratorio de IA",
      code: "AI330",
      credits: 3,
      instructor: "Prof. Rivera"
    }
  ],
  exams: [
    {
      id: "exam-1",
      subjectId: "sub-1",
      title: "Parcial",
      date: "2026-03-15",
      weight: 30
    },
    {
      id: "exam-2",
      subjectId: "sub-2",
      title: "Revision de Proyecto",
      date: "2026-03-22",
      weight: 25
    }
  ],
  gpaTarget: 3.9,
  syllabus: {
    rawText: "",
    weights: [
      { label: "Exams", weight: 40 },
      { label: "Projects", weight: 30 },
      { label: "Quizzes", weight: 20 },
      { label: "Participation", weight: 10 }
    ],
    deadlines: []
  },
  gpaHistory: [
    { term: "2025 Fall", gpa: 3.6 },
    { term: "2026 Spring", gpa: 3.7 },
    { term: "2026 Fall", gpa: 3.8 },
    { term: "2027 Spring", gpa: 3.85 },
    { term: "2027 Fall", gpa: 3.88 },
    { term: "2028 Spring", gpa: 3.9 },
    { term: "2028 Fall", gpa: 3.92 },
    { term: "2029 Spring", gpa: 3.94 }
  ],
  overallGpa: 3.7,
  overallTerm: "Spring",
  overallYear: "2026",
  historyLog: [
    "Bloque de estudio profundo completado.",
    "Racha de gym: 4 dias seguidos."
  ]
};
