import { HistoryTimeline } from "@/src/components/HistoryTimeline";

export default function HistoryPage() {
  return (
    <main>
      <div className="card">
        <div className="pill">Linea de Tiempo</div>
        <h1 className="title">Historial</h1>
        <p className="subtitle">Registra avances y lecciones de disciplina.</p>
      </div>
      <div className="grid">
        <HistoryTimeline />
      </div>
    </main>
  );
}
