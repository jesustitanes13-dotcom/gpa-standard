"use client";

import { useState } from "react";

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

  const handleParse = () => {
    if (!rawText.trim()) return;
    setRules(parseRules(rawText));
  };

  return (
    <div className="card">
      <div className="pill">AI Syllabus Parser</div>
      <h3 className="title">Weights & Rules Extractor</h3>
      <p className="subtitle">
        Upload text or paste a grading policy. The parser will extract weight cues for GPA modeling.
      </p>
      <textarea
        className="textarea"
        rows={6}
        placeholder="Paste syllabus grading text here..."
        value={rawText}
        onChange={(event) => setRawText(event.target.value)}
      />
      <div className="button-row" style={{ marginTop: 12 }}>
        <button className="button" type="button" onClick={handleParse}>
          Parse Syllabus
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
    </div>
  );
};
