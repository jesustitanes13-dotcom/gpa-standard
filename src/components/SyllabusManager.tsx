"use client";

import { useMemo, useState } from "react";
import { useDisciplineState } from "@/src/components/StateProvider";
import { isLikelySpanish } from "@/src/lib/languageGuard";
import type { SyllabusDeadline, SyllabusWeight } from "@/src/lib/types";

const weightRegex = /([A-Za-z ]+)\s*[:\-–]\s*(\d{1,3})%/g;
const dateRegex = /(\d{4}-\d{2}-\d{2})/;

const parseWeights = (text: string): SyllabusWeight[] => {
  const matches = [...text.matchAll(weightRegex)];
  return matches.map((match) => ({
    label: match[1].trim(),
    weight: Number(match[2])
  }));
};

const parseDeadlines = (text: string): SyllabusDeadline[] => {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const deadlines: SyllabusDeadline[] = [];
  lines.forEach((line) => {
    const dateMatch = line.match(dateRegex);
    if (!dateMatch) return;
    const date = dateMatch[1];
    const lower = line.toLowerCase();
    let kind: SyllabusDeadline["kind"] = "other";
    if (lower.includes("exam") || lower.includes("midterm") || lower.includes("final")) kind = "exam";
    if (lower.includes("project")) kind = "project";
    if (lower.includes("quiz")) kind = "quiz";
    deadlines.push({
      title: line.replace(date, "").replace(/[-–:]/g, "").trim() || "Deadline",
      date,
      kind
    });
  });
  return deadlines;
};

const answerQuestion = (text: string, question: string) => {
  const q = question.toLowerCase();
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  if (!lines.length) return "No tengo datos del syllabus aun.";
  const keyword = q.includes("quiz") ? "quiz" : q.includes("late") ? "late" : q.includes("policy") ? "policy" : "";
  if (!keyword) return "No entiendo la pregunta. Intenta con 'quiz' o 'late policy'.";
  const match = lines.find((line) => line.toLowerCase().includes(keyword));
  return match ? `Syllabus: ${match}` : "No encontre esa informacion en el syllabus.";
};

export const SyllabusManager = () => {
  const { state, updateState } = useDisciplineState();
  const [rawText, setRawText] = useState(state.syllabus.rawText);
  const [question, setQuestion] = useState("");
  const [chatLog, setChatLog] = useState<string[]>([]);

  const blockSave = rawText.trim().length > 0 && isLikelySpanish(rawText);

  const weights = useMemo(() => parseWeights(rawText), [rawText]);
  const deadlines = useMemo(() => parseDeadlines(rawText), [rawText]);

  const handleSave = () => {
    if (blockSave) return;
    updateState({
      syllabus: {
        rawText,
        weights,
        deadlines
      }
    });
  };

  const handleUpload = async (file: File) => {
    const text = await file.text();
    setRawText(text);
  };

  const handleAsk = () => {
    if (!question.trim()) return;
    const answer = answerQuestion(rawText, question);
    setChatLog((prev) => [`Q: ${question}`, `A: ${answer}`, ...prev]);
    setQuestion("");
  };

  return (
    <div className="card">
      <div className="pill">Syllabus Manager</div>
      <h3 className="title">Syllabus Intelligent Vault</h3>
      <p className="subtitle">Pega o sube tu syllabus. Guardamos pesos y deadlines para el GPA y alertas.</p>
      <div className="grid">
        <textarea
          className="textarea"
          rows={8}
          placeholder="Paste syllabus text here..."
          value={rawText}
          onChange={(event) => setRawText(event.target.value)}
        />
        <input
          className="input"
          type="file"
          accept=".txt"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void handleUpload(file);
          }}
        />
        <button className="button" type="button" onClick={handleSave} disabled={blockSave}>
          Guardar Syllabus
        </button>
        {blockSave ? (
          <p className="subtitle">Solo se permite ingles para mantener la disciplina academica.</p>
        ) : null}
      </div>

      <div className="grid" style={{ marginTop: 12 }}>
        <div className="pill">Weights</div>
        <div className="grid">
          {(weights.length ? weights : state.syllabus.weights).map((item) => (
            <div key={item.label} className="badge">
              {item.label} · {item.weight}%
            </div>
          ))}
        </div>
      </div>

      <div className="grid" style={{ marginTop: 12 }}>
        <div className="pill">Chat</div>
        <div className="grid">
          <input
            className="input"
            placeholder="Ask: When is the next quiz?"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />
          <button className="button secondary" type="button" onClick={handleAsk}>
            Preguntar
          </button>
          {chatLog.map((item, index) => (
            <div key={`${item}-${index}`} className="badge">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
