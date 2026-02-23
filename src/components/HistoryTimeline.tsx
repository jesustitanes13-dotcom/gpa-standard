"use client";

import { useState } from "react";
import { useDisciplineState } from "@/src/components/StateProvider";
import { isLikelySpanish } from "@/src/lib/languageGuard";

export const HistoryTimeline = () => {
  const { state, setState } = useDisciplineState();
  const [entry, setEntry] = useState("");
  const [warning, setWarning] = useState("");

  const addEntry = () => {
    if (!entry.trim()) return;
    if (isLikelySpanish(entry)) {
      setWarning("Senior Partner: You must write in English to save.");
      return;
    }
    setState((prev) => ({
      ...prev,
      historyLog: [entry.trim(), ...prev.historyLog]
    }));
    setEntry("");
    setWarning("");
  };

  return (
    <div className="card">
      <div className="pill">Historial</div>
      <h3 className="title">Registro de Disciplina</h3>
      <div className="grid">
        <input
          className="input"
          placeholder="Registra un logro o aprendizaje (en inglés)..."
          value={entry}
          onChange={(event) => {
            setEntry(event.target.value);
            setWarning("");
          }}
        />
        <button className="button" type="button" onClick={addEntry}>
          Guardar entrada
        </button>
      </div>
      {warning ? <p className="subtitle">{warning}</p> : null}
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
