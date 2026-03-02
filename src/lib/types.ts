export type DisciplineStreak = {
  gym: number;
  study: number;
};

export type ScheduleSlot = {
  id: string;
  day: string;
  start: string;
  end: string;
  label: string;
};

export type Subject = {
  id: string;
  name: string;
  code: string;
  credits: number;
  instructor?: string;
  weightRules?: string;
};

export type Exam = {
  id: string;
  subjectId: string;
  title: string;
  date: string;
  weight: number;
};

export type SyllabusWeight = {
  label: string;
  weight: number;
};

export type SyllabusDeadline = {
  title: string;
  date: string;
  kind: "exam" | "project" | "quiz" | "other";
};

export type SyllabusData = {
  rawText: string;
  weights: SyllabusWeight[];
  deadlines: SyllabusDeadline[];
};

export type GpaHistoryEntry = {
  term: string;
  gpa: number;
};

export type DisciplineState = {
  greetingName: string;
  graduationDate: string;
  examMode: boolean;
  streak: DisciplineStreak;
  schedule: ScheduleSlot[];
  subjects: Subject[];
  exams: Exam[];
  gpaTarget: number;
  historyLog: string[];
  syllabus: SyllabusData;
  gpaHistory: GpaHistoryEntry[];
};
