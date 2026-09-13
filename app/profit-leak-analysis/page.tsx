import type { Metadata } from "next";
import SolutionLanding from "../components/SolutionLanding";

export const metadata: Metadata = {
  title: "Profit Leak Analysis For Service Businesses",
  description: "Identify where labor, expenses, missed leads, refunds, and rework may be squeezing margin with a structured profit leak analysis from PulseIQ Operations.",
  alternates: { canonical: "/profit-leak-analysis" },
};

export default function Page() {
  return <SolutionLanding
    eyebrow="Profit Leak Analysis"
    title="Find The Operational Gaps Quietly Squeezing Your Margin."
    description="PulseIQ helps service businesses turn messy operating numbers into a ranked view of where profit may be under pressure, what deserves investigation first, and what the financial opportunity could be."
    problem="Revenue can look healthy while payroll, overtime, missed leads, refunds, rework, or expense drift quietly erode the margin underneath it."
    signals={["Payroll rising faster than revenue","Overtime repeating across the same shifts or teams","Refunds, credits, or rework increasing without a clear cause","Missed calls or leads creating possible revenue leakage","Expenses drifting above targets or prior periods"]}
    sections={[
      { title: "Separate Facts From Estimates", body: "PulseIQ distinguishes direct variances, such as actual spending above an entered target, from modeled opportunities that depend on assumptions. That keeps one large number from hiding what is known versus estimated." },
      { title: "Rank What Matters", body: "Instead of treating every issue as equally urgent, PulseIQ organizes the strongest financial signals so an owner can decide where deeper investigation is most likely to be useful." },
      { title: "Connect The Number To A Next Move", body: "The goal is not to call every variance waste. The goal is to turn the signal into a practical question, identify the supporting data, and make the next operating decision easier." },
    ]}
    outcomeTitle="A Profit Leak Analysis Should Tell You Where To Look Next — Not Pretend Every Dollar Is Recoverable."
    outcomeBody="PulseIQ combines actual-vs-target comparisons, operational context, modeled scenarios, and transparent assumptions so a business owner can see the difference between a verified variance and an opportunity that still needs investigation."
  />;
}
