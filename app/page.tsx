"use client";

import { useEffect, useState } from "react";
import { HomeBento } from "@/src/components/HomeBento";
import { LoadingSkeleton } from "@/src/components/LoadingSkeleton";
import { SeniorPartnerBubble } from "@/src/components/SeniorPartnerBubble";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main>
        <LoadingSkeleton />
      </main>
    );
  }

  return (
    <main>
      <HomeBento />
      <SeniorPartnerBubble />
    </main>
  );
}
