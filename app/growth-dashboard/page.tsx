import type { Metadata } from "next";
import GrowthDashboardClient from "./growth-dashboard-client";

export const metadata: Metadata = {
  title: "Growth Dashboard",
  description: "Owner-facing PulseIQ growth, funnel, and revenue dashboard.",
  robots: { index: false, follow: false },
};

export default function GrowthDashboardPage() {
  return <GrowthDashboardClient />;
}
