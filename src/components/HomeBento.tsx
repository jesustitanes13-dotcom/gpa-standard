"use client";

import { motion } from "framer-motion";
import { DailyStatus } from "@/src/components/DailyStatus";
import { ExamModeToggle } from "@/src/components/ExamModeToggle";
import { RightNowWidget } from "@/src/components/RightNowWidget";
import { ProctorConsole } from "@/src/components/ProctorConsole";
import { SeniorPartnerDashboard } from "@/src/components/SeniorPartnerDashboard";
import { StreakFlame } from "@/src/components/StreakFlame";
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
      {loading ? (
        <>
          <div className="bento-hero">
            <SkeletonCard />
          </div>
          <div className="bento-streak">
            <SkeletonCard />
          </div>
          <div className="bento-now">
            <SkeletonCard />
          </div>
          <div className="bento-partner">
            <SkeletonCard />
          </div>
          <div className="bento-exam">
            <SkeletonCard />
          </div>
          <div className="bento-proctor">
            <SkeletonCard />
          </div>
        </>
      ) : (
        <>
          <motion.div className="bento-hero" {...cardMotion}>
            <DailyStatus />
          </motion.div>
          <motion.div className="bento-streak" {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.05 }}>
            <StreakFlame />
          </motion.div>
          <motion.div className="bento-now" {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.1 }}>
            <RightNowWidget />
          </motion.div>
          <motion.div className="bento-partner" {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.15 }}>
            <SeniorPartnerDashboard />
          </motion.div>
          <motion.div className="bento-exam" {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.2 }}>
            <ExamModeToggle />
          </motion.div>
          <motion.div className="bento-proctor" {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.25 }}>
            <ProctorConsole />
          </motion.div>
        </>
      )}
    </div>
  );
};
