"use client";

import { useState } from "react";
import { useDisciplineState } from "@/src/components/StateProvider";
import { isLikelySpanish } from "@/src/lib/languageGuard";

export const HistoryTimeline = () => {
  const { state, setState } = useDisciplineState();
  const [entry, setEntry] = useState("");
  const [warning, setWarning] = useState("");
  const blockSave = entry.trim().length > 0 && isLikelySpanish(entry);

  const addEntry = () => {
    if (!entry.trim() || blockSave) return;
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
        <button className="button" type="button" onClick={addEntry} disabled={blockSave}>
          Guardar entrada
        </button>
      </div>
      {blockSave ? (
        <p className="subtitle">Solo se permite ingles para mantener la disciplina academica.</p>
      ) : warning ? (
        <p className="subtitle">{warning}</p>
      ) : null}
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
