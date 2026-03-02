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
    <div className="dashboard">
      <AnimatePresence mode="wait" initial={false}>
        {loading ? (
          <motion.div
            key="skeleton"
            className="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="section-grid">
              <SkeletonCard />
              <SkeletonCard />
            </div>
            <div className="section-grid">
              <SkeletonCard />
              <SkeletonCard />
            </div>
            <SkeletonCard />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="section-grid">
              <motion.div {...cardMotion}>
                <WelcomeCard />
              </motion.div>
              <motion.div {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.05 }}>
                <AcademicCalendar />
              </motion.div>
            </div>
            <div className="section-grid">
              <motion.div {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.1 }}>
                <GpaGlobalCard />
              </motion.div>
              <motion.div {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.15 }}>
                <ClassGradePredictor />
              </motion.div>
            </div>
            <motion.div {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.2 }}>
              <SyllabusManager />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
