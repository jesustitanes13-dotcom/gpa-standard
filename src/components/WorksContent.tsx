"use client";

import { motion } from "framer-motion";
import { ExamManager } from "@/src/components/ExamManager";
import { ExamPrepRoadmap } from "@/src/components/ExamPrepRoadmap";
import { GpaSimulator } from "@/src/components/GpaSimulator";
import { SemesterManager } from "@/src/components/SemesterManager";
import { SyllabusParser } from "@/src/components/SyllabusParser";
import { useDisciplineState } from "@/src/components/StateProvider";
import { SkeletonCard } from "@/src/components/SkeletonCard";

const cardMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut" }
};

export const WorksContent = () => {
  const { loading } = useDisciplineState();

  return (
    <>
      <motion.div {...cardMotion}>
        <div className="card">
          <div className="pill">Motor GPA</div>
          <h1 className="title">Trabajo</h1>
          <p className="subtitle">Controla el semestre, parsea reglas y simula el GPA en tiempo real.</p>
        </div>
      </motion.div>
      <div className="grid">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <SemesterManager />
            <SyllabusParser />
            <GpaSimulator />
            <ExamManager />
            <ExamPrepRoadmap />
          </>
        )}
      </div>
    </>
  );
};
