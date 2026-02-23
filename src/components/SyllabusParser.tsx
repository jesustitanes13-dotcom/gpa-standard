"use client";

import { useState } from "react";
import { isLikelySpanish } from "@/src/lib/languageGuard";

type ParsedRule = {
  label: string;
  weight?: number;
};

const parseRules = (input: string): ParsedRule[] => {
  const lines = input.split("\n").map((line) => line.trim()).filter(Boolean);
  return lines.map((line) => {
    const match = line.match(/(.*?)(\d+)%/);
    if (match) {
      return { label: match[1].trim() || "Assessment", weight: Number(match[2]) };
    }
    return { label: line };
  });
};

export const SyllabusParser = () => {
  const [rawText, setRawText] = useState("");
  const [rules, setRules] = useState<ParsedRule[]>([]);
  const [warning, setWarning] = useState("");

  const handleParse = () => {
    if (!rawText.trim()) return;
    if (isLikelySpanish(rawText)) {
      setWarning("Senior Partner: You must write in English to save.");
      return;
    }
    setRules(parseRules(rawText));
    setWarning("");
  };

  return (
    <div className="card">
      <div className="pill">Parser de Silabo</div>
      <h3 className="title">Extractor de Pesos</h3>
      <p className="subtitle">Pega el plan de evaluacion. El parser extrae pesos para el GPA.</p>
      <textarea
        className="textarea"
        rows={6}
        placeholder="Pega el texto del silabo aqui..."
        value={rawText}
        onChange={(event) => {
          setRawText(event.target.value);
          setWarning("");
        }}
      />
      <div className="button-row" style={{ marginTop: 12 }}>
        <button className="button" type="button" onClick={handleParse}>
          Analizar
        </button>
      </div>
      {rules.length > 0 && (
        <div className="grid" style={{ marginTop: 16 }}>
          {rules.map((rule, index) => (
            <div key={`${rule.label}-${index}`} className="badge">
              {rule.label} {rule.weight ? `· ${rule.weight}%` : ""}
            </div>
          ))}
        </div>
      )}
      {warning ? <p className="subtitle">{warning}</p> : null}
    </div>
  );
};
