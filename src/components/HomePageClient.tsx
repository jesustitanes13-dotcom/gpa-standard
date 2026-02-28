"use client";

import { useEffect, useState } from "react";
import { HomeBento } from "@/src/components/HomeBento";
import { SeniorPartnerBubble } from "@/src/components/SeniorPartnerBubble";
import { SkeletonCard } from "@/src/components/SkeletonCard";

export const HomePageClient = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bento-grid">
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
      </div>
    );
  }

  return (
    <>
      <HomeBento />
      <SeniorPartnerBubble />
    </>
  );
};
