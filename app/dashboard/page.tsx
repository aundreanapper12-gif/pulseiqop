import type { Metadata } from "next";
import DashboardClient from "./dashboard-client";

export const metadata: Metadata = {
  title: "Executive Dashboard",
  description: "Review your PulseIQ Score, top operational priorities, recovery progress, and what-if scenarios from one executive dashboard.",
  alternates: { canonical: "/dashboard" },
};

export default function DashboardPage() {
  return <DashboardClient />;
}
