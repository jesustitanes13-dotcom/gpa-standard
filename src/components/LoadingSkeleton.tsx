"use client";

import { SkeletonCard } from "@/src/components/SkeletonCard";

export const LoadingSkeleton = () => {
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
};
