import type { Metadata } from "next";
import SolutionLanding from "../components/SolutionLanding";

export const metadata: Metadata = {
  title: "Business Expense Analysis For Service Businesses",
  description: "Break down business expenses by category, vendor, and trend to see where operating costs are changing and what deserves a closer look.",
  alternates: { canonical: "/business-expense-analysis" },
};

export default function Page() {
  return <SolutionLanding
    eyebrow="Business Expense Analysis"
    title="See Where The Money Is Going — Before The Month Ends With More Questions Than Answers."
    description="PulseIQ helps owners organize operating expenses, compare categories and vendors, spot unusual movement, and connect spending changes to the parts of the business that may need attention."
    problem="Expense growth is rarely one thing. Payroll, software, contractors, materials, refunds, vehicles, advertising, and recurring subscriptions can all move at different speeds."
    signals={["A category suddenly increases month over month","Vendor spending rises without a matching increase in output","Software or subscription costs accumulate across multiple tools","Refunds, credits, or rework create hidden operating cost","Total operating expense grows faster than revenue"]}
    sections={[
      { title: "Organize The Spend", body: "Start by grouping expenses into categories and vendors so the business can see what each area actually costs instead of relying on a single total." },
      { title: "Compare The Movement", body: "Review current spending against prior periods, targets, or budgets. The strongest changes become signals to investigate rather than automatic conclusions." },
      { title: "Prioritize The Review", body: "PulseIQ helps identify which expense changes are financially meaningful enough to deserve a closer look and which may simply reflect normal business activity." },
    ]}
    outcomeTitle="A Better Expense Review Shows What Changed, How Much It Changed, And Where To Investigate First."
    outcomeBody="Instead of a generic expense pie chart, PulseIQ is designed to connect spending movement to operational questions so owners can distinguish routine cost from potentially preventable drift."
  />;
}
