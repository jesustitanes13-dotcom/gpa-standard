import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StateProvider } from "@/src/components/StateProvider";
import { AppShell } from "@/src/components/AppShell";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Academic Discipline OS",
  description: "Centro de control para disciplina academica."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StateProvider>
          <AppShell>{children}</AppShell>
        </StateProvider>
      </body>
    </html>
  );
}
