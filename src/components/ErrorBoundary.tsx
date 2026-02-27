"use client";

import React from "react";

type ErrorBoundaryState = {
  hasError: boolean;
  message?: string;
};

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error) {
    console.error("ErrorBoundary caught an error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="card">
          <div className="pill">Error</div>
          <h3 className="title">Algo fallo en la interfaz</h3>
          <p className="subtitle">
            Revisa la consola del navegador para mas detalles. {this.state.message ?? ""}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
