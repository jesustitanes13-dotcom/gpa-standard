"use client";

import { useDisciplineState } from "@/src/components/StateProvider";

export const ExamModeToggle = () => {
  const { state, updateState } = useDisciplineState();

  return (
    <div className={`card ${state.examMode ? "exam-glow" : ""}`}>
      <div className="pill">Exam Mode</div>
      <h3 className="title">Focus Protocol</h3>
      <p className="subtitle">
        When enabled, the UI shifts to priority mode and filters attention to imminent deadlines.
      </p>
      <div className="button-row">
        <button
          className="button"
          onClick={() => updateState({ examMode: !state.examMode })}
          type="button"
        >
          {state.examMode ? "Disable Exam Mode" : "Activate Exam Mode"}
        </button>
      </div>
    </div>
  );
};
