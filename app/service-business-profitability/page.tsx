import type { Metadata } from "next";
import SolutionLanding from "../components/SolutionLanding";

export const metadata: Metadata = {
  title: "Service Business Profitability Analysis",
  description: "Understand why revenue can grow while margin stays tight by reviewing labor, expenses, revenue capture, rework, and other operating signals together.",
  alternates: { canonical: "/service-business-profitability" },
};

export default function Page() {
  return <SolutionLanding
    eyebrow="Service Business Profitability"
    title="When Revenue Is Growing But Profit Still Feels Thin, Look At The Operations Underneath It."
    description="PulseIQ helps service businesses connect revenue, labor, expenses, missed opportunities, and repeat work so owners can understand why growth does not always translate into stronger margin."
    problem="A service business can stay busy and still feel financially squeezed when cost growth, revenue leakage, and operational friction rise together."
    signals={["Revenue increases while operating margin stays flat or falls","Labor and operating expenses grow faster than sales","Missed leads or poor follow-up reduce revenue capture","Callbacks, corrections, or repeat work consume capacity twice","Refunds, credits, or service recovery increase"]}
    sections={[
      { title: "Build The Operating Picture", body: "Review the major drivers together: revenue, labor, expenses, missed opportunities, and rework. Profitability problems are often created by several smaller movements instead of one dramatic failure." },
      { title: "Separate Margin Pressure From Growth", body: "Higher cost can be healthy when it supports profitable growth. PulseIQ focuses on the relationship between what the business spends, what it produces, and what revenue it captures." },
      { title: "Prioritize The Strongest Signal", body: "Once the biggest gap is visible, the business can decide whether the next investigation belongs in labor, expense control, sales follow-up, service quality, or workflow execution." },
    ]}
    outcomeTitle="Profitability Analysis Should Help Explain Why The Business Feels Different From The Revenue Number."
    outcomeBody="PulseIQ brings financial and operational signals into the same decision view so owners can identify what deserves attention first without assuming every cost increase is waste or every modeled opportunity is guaranteed revenue."
  />;
}
