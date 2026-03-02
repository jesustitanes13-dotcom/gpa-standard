"use client";

import { AnimatePresence, motion } from "framer-motion";
import { DailyStatus } from "@/src/components/DailyStatus";
import { AcademicCalendar } from "@/src/components/AcademicCalendar";
import { ClassGradePredictor } from "@/src/components/ClassGradePredictor";
import { GpaGlobalCard } from "@/src/components/GpaGlobalCard";
import { SyllabusManager } from "@/src/components/SyllabusManager";
import { WelcomeCard } from "@/src/components/WelcomeCard";
import { useDisciplineState } from "@/src/components/StateProvider";
import { SkeletonCard } from "@/src/components/SkeletonCard";

const cardMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const HomeBento = () => {
  const { loading } = useDisciplineState();

  return (
    <div className="bento-grid">
      <AnimatePresence mode="wait" initial={false}>
        {loading ? (
          <motion.div
            key="skeleton"
            className="bento-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bento-hero bento-cell">
              <SkeletonCard />
            </div>
            <div className="bento-calendar bento-cell">
              <SkeletonCard />
            </div>
            <div className="bento-gpa bento-cell">
              <SkeletonCard />
            </div>
            <div className="bento-predictor bento-cell">
              <SkeletonCard />
            </div>
            <div className="bento-syllabus bento-cell">
              <SkeletonCard />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className="bento-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="bento-hero bento-cell" {...cardMotion}>
              <WelcomeCard />
            </motion.div>
            <motion.div className="bento-calendar bento-cell" {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.05 }}>
              <AcademicCalendar />
            </motion.div>
            <motion.div className="bento-gpa bento-cell" {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.1 }}>
              <GpaGlobalCard />
            </motion.div>
            <motion.div className="bento-predictor bento-cell" {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.15 }}>
              <ClassGradePredictor />
            </motion.div>
            <motion.div className="bento-syllabus bento-cell" {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.2 }}>
              <SyllabusManager />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
