import { HistoryTimeline } from "@/src/components/HistoryTimeline";

export default function HistoryPage() {
  return (
    <main>
      <div className="card">
        <div className="pill">Timeline</div>
        <h1 className="title">History</h1>
        <p className="subtitle">Track discipline wins and lessons learned.</p>
      </div>
      <div className="grid">
        <HistoryTimeline />
      </div>
    </main>
  );
}
