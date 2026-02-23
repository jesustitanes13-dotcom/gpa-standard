import type { Metadata } from "next";
import "./globals.css";
import { StateProvider } from "@/src/components/StateProvider";
import { AppShell } from "@/src/components/AppShell";

export const metadata: Metadata = {
  title: "Academic Discipline OS",
  description: "Mission control for academic performance."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StateProvider>
          <AppShell>{children}</AppShell>
        </StateProvider>
      </body>
    </html>
  );
}
