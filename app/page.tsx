import { DailyStatus } from "@/src/components/DailyStatus";
import { ExamModeToggle } from "@/src/components/ExamModeToggle";
import { RightNowWidget } from "@/src/components/RightNowWidget";
import { ProctorConsole } from "@/src/components/ProctorConsole";
import { SeniorPartnerDashboard } from "@/src/components/SeniorPartnerDashboard";
import { SeniorPartnerBubble } from "@/src/components/SeniorPartnerBubble";
import { StreakFlame } from "@/src/components/StreakFlame";

export default function HomePage() {
  return (
    <main>
      <DailyStatus />
      <div className="grid">
        <StreakFlame />
        <RightNowWidget />
        <SeniorPartnerDashboard />
        <ExamModeToggle />
        <ProctorConsole />
      </div>
      <SeniorPartnerBubble />
    </main>
  );
}
