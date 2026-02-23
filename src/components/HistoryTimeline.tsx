"use client";

import { useState } from "react";
import { useDisciplineState } from "@/src/components/StateProvider";

export const HistoryTimeline = () => {
  const { state, setState } = useDisciplineState();
  const [entry, setEntry] = useState("");

  const addEntry = () => {
    if (!entry.trim()) return;
    setState((prev) => ({
      ...prev,
      historyLog: [entry.trim(), ...prev.historyLog]
    }));
    setEntry("");
  };

  return (
    <div className="card">
      <div className="pill">History</div>
      <h3 className="title">Discipline Log</h3>
      <div className="grid">
        <input
          className="input"
          placeholder="Log a win or lesson..."
          value={entry}
          onChange={(event) => setEntry(event.target.value)}
        />
        <button className="button" type="button" onClick={addEntry}>
          Add Entry
        </button>
      </div>
      <div className="grid" style={{ marginTop: 16 }}>
        {state.historyLog.map((log, index) => (
          <div key={`${log}-${index}`} className="badge">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};
