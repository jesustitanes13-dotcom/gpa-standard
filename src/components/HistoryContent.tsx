"use client";

import { motion } from "framer-motion";
import { HistoryTimeline } from "@/src/components/HistoryTimeline";
import { useDisciplineState } from "@/src/components/StateProvider";
import { SkeletonCard } from "@/src/components/SkeletonCard";

const cardMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut" }
};

export const HistoryContent = () => {
  const { loading } = useDisciplineState();

  return (
    <>
      <motion.div {...cardMotion}>
        <div className="card">
          <div className="pill">Linea de Tiempo</div>
          <h1 className="title">Historial</h1>
          <p className="subtitle">Registra avances y lecciones de disciplina.</p>
        </div>
      </motion.div>
      <div className="grid">
        {loading ? <SkeletonCard /> : <HistoryTimeline />}
      </div>
    </>
  );
};
