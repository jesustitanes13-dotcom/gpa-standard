"use client";

import { useState } from "react";

export const SeniorPartnerBubble = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="senior-partner">
      {open ? (
        <div className="senior-partner-panel card">
          <div className="pill">Senior Partner</div>
          <h3 className="title">IA Estrategica</h3>
          <p className="subtitle">Estoy activo para monitorear tus fechas limite y tu enfoque.</p>
          <button className="button secondary" type="button" onClick={() => setOpen(false)}>
            Cerrar
          </button>
        </div>
      ) : null}
      <button className="senior-partner-bubble" type="button" onClick={() => setOpen((prev) => !prev)}>
        <span className="ai-core" />
        <span className="ai-eye" />
      </button>
    </div>
  );
};
