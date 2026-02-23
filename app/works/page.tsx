import { ExamManager } from "@/src/components/ExamManager";
import { ExamPrepRoadmap } from "@/src/components/ExamPrepRoadmap";
import { GpaSimulator } from "@/src/components/GpaSimulator";
import { SemesterManager } from "@/src/components/SemesterManager";
import { SyllabusParser } from "@/src/components/SyllabusParser";

export default function WorksPage() {
  return (
    <main>
      <div className="card">
        <div className="pill">GPA Engine</div>
        <h1 className="title">Works</h1>
        <p className="subtitle">
          Control the semester model, parse grading rules, and simulate GPA outcomes in real time.
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
