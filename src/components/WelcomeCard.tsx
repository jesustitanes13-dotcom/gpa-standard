"use client";

import { Sparkles } from "lucide-react";
import { DailyStatus } from "@/src/components/DailyStatus";

export const WelcomeCard = () => {
  return (
    <div className="card">
      <div className="pill">
        <Sparkles size={14} /> Dashboard
      </div>
      <DailyStatus />
    </div>
  );
};
