"use client";

export const SkeletonCard = () => {
  return (
    <div className="card skeleton-card">
      <div className="skeleton-line w-40" />
      <div className="skeleton-line w-80" />
      <div className="skeleton-line w-60" />
    </div>
  );
};
