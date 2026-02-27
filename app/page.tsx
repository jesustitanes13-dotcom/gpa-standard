import { HomeBento } from "@/src/components/HomeBento";
import { ClientOnly } from "@/src/components/ClientOnly";
import { SeniorPartnerBubble } from "@/src/components/SeniorPartnerBubble";
import { SkeletonCard } from "@/src/components/SkeletonCard";

export default function HomePage() {
  return (
    <main>
      <ClientOnly
        fallback={
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
        }
      >
        <HomeBento />
        <SeniorPartnerBubble />
      </ClientOnly>
    </main>
  );
}
