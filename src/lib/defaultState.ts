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
      day: "Monday",
      start: "08:00",
      end: "10:00",
      label: "Algorithms"
    },
    {
      id: "slot-2",
      day: "Monday",
      start: "14:00",
      end: "16:00",
      label: "AI Systems Lab"
    },
    {
      id: "slot-3",
      day: "Wednesday",
      start: "09:00",
      end: "11:00",
      label: "Data Structures"
    }
  ],
  subjects: [
    {
      id: "sub-1",
      name: "Algorithms",
      code: "CS401",
      credits: 4,
      instructor: "Dr. Vega"
    },
    {
      id: "sub-2",
      name: "AI Systems Lab",
      code: "AI330",
      credits: 3,
      instructor: "Prof. Rivera"
    }
  ],
  exams: [
    {
      id: "exam-1",
      subjectId: "sub-1",
      title: "Midterm",
      date: "2026-03-15",
      weight: 30
    },
    {
      id: "exam-2",
      subjectId: "sub-2",
      title: "Project Review",
      date: "2026-03-22",
      weight: 25
    }
  ],
  gpaTarget: 3.9,
  historyLog: [
    "Locked 2 study sessions with 90+ minutes.",
    "Gym streak: 4 days in a row."
  ]
};
