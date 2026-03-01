"use client";

import { useState } from "react";
import { getSupabaseBrowser } from "@/src/lib/supabaseBrowser";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = async () => {
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setStatus("Supabase no esta configurado.");
      return;
    }

    setStatus("Enviando magic link...");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined
      }
    });

    if (error) {
      setStatus("Error al enviar el correo.");
      return;
    }

    setStatus("Listo. Revisa tu email para el magic link.");
  };

  return (
    <div className="card">
      <div className="pill">Login</div>
      <h1 className="title">Magic Link</h1>
      <p className="subtitle">Inicia sesion para sincronizar tus datos entre dispositivos.</p>
      <div className="grid">
        <input
          className="input"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button className="button" type="button" onClick={handleLogin} disabled={!email}>
          Enviar magic link
        </button>
        {status ? <p className="subtitle">{status}</p> : null}
      </div>
    </div>
  );
};
