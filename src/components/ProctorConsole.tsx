"use client";

import { useState } from "react";
import { isLikelySpanish } from "@/src/lib/languageGuard";

export const ProctorConsole = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [warning, setWarning] = useState("");

  const sendTest = async () => {
    if (email && isLikelySpanish(email)) {
      setWarning("Senior Partner: You must write in English to save.");
      return;
    }
    setStatus("Enviando...");
    try {
      const response = await fetch("/api/proctor/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        setStatus(payload.error ?? "Error al enviar");
        return;
      }
      setStatus("Email de prueba enviado.");
    } catch {
      setStatus("Error de red");
    }
  };

  return (
    <div className="card">
      <div className="pill">Ajustes</div>
      <h3 className="title">Proctor Bot</h3>
      <p className="subtitle">Prueba los correos de alerta del Senior Partner.</p>
      <div className="grid">
        <input
          className="input"
          placeholder="Email destino (opcional)"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setWarning("");
          }}
        />
        <button className="button" type="button" onClick={sendTest}>
          Enviar email de prueba
        </button>
        {status ? <p className="subtitle">{status}</p> : null}
        {warning ? <p className="subtitle">{warning}</p> : null}
      </div>
    </div>
  );
};
