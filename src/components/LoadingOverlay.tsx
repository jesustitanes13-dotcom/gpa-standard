"use client";

export const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner" />
      <p className="subtitle">Cargando datos...</p>
    </div>
  );
};
