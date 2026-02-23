import { ExamManager } from "@/src/components/ExamManager";
import { ExamPrepRoadmap } from "@/src/components/ExamPrepRoadmap";
import { GpaSimulator } from "@/src/components/GpaSimulator";
import { SemesterManager } from "@/src/components/SemesterManager";
import { SyllabusParser } from "@/src/components/SyllabusParser";

export default function WorksPage() {
  return (
    <main>
      <div className="card">
        <div className="pill">Motor GPA</div>
        <h1 className="title">Trabajo</h1>
        <p className="subtitle">
          Controla el semestre, parsea reglas y simula el GPA en tiempo real.
        </p>
      </div>
      <div className="grid">
        <SemesterManager />
        <SyllabusParser />
        <GpaSimulator />
        <ExamManager />
        <ExamPrepRoadmap />
      </div>
    </main>
  );
}
