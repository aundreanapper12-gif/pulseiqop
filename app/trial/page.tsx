import type { Metadata } from "next";
import TrialClient from "./trial-client";

export const metadata: Metadata = {
  title: "14-Day Premium Trial",
  description: "Start a no-card 14-day PulseIQ trial with guided onboarding, executive insights, scenario planning, and action tracking.",
  alternates: { canonical: "/trial" },
};

export default function TrialPage() {
  return <TrialClient />;
}
