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
};
