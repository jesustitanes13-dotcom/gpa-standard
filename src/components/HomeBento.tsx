"use client";

import { AnimatePresence, motion } from "framer-motion";
import { DailyStatus } from "@/src/components/DailyStatus";
import { ExamModeToggle } from "@/src/components/ExamModeToggle";
import { GpaSimulator } from "@/src/components/GpaSimulator";
import { ProctorConsole } from "@/src/components/ProctorConsole";
import { RightNowWidget } from "@/src/components/RightNowWidget";
import { SeniorPartnerDashboard } from "@/src/components/SeniorPartnerDashboard";
import { StreakFlame } from "@/src/components/StreakFlame";
import { SyllabusManager } from "@/src/components/SyllabusManager";
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
            <div className="bento-gpa bento-cell">
              <SkeletonCard />
            </div>
            <div className="bento-streak bento-cell">
              <SkeletonCard />
            </div>
            <div className="bento-syllabus bento-cell">
              <SkeletonCard />
            </div>
            <div className="bento-now bento-cell">
              <SkeletonCard />
            </div>
            <div className="bento-partner bento-cell">
              <SkeletonCard />
            </div>
            <div className="bento-exam bento-cell">
              <SkeletonCard />
            </div>
            <div className="bento-proctor bento-cell">
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
              <DailyStatus />
            </motion.div>
            <motion.div className="bento-gpa bento-cell" {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.05 }}>
              <GpaSimulator />
            </motion.div>
            <motion.div
              className="bento-streak bento-cell"
              {...cardMotion}
              transition={{ ...cardMotion.transition, delay: 0.1 }}
            >
              <StreakFlame />
            </motion.div>
            <motion.div className="bento-syllabus bento-cell" {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.15 }}>
              <SyllabusManager />
            </motion.div>
            <motion.div className="bento-now bento-cell" {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.2 }}>
              <RightNowWidget />
            </motion.div>
            <motion.div
              className="bento-partner bento-cell"
              {...cardMotion}
              transition={{ ...cardMotion.transition, delay: 0.25 }}
            >
              <SeniorPartnerDashboard />
            </motion.div>
            <motion.div className="bento-exam bento-cell" {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.3 }}>
              <ExamModeToggle />
            </motion.div>
            <motion.div className="bento-proctor bento-cell" {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.35 }}>
              <ProctorConsole />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
