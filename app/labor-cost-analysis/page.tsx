import type { Metadata } from "next";
import SolutionLanding from "../components/SolutionLanding";

export const metadata: Metadata = {
  title: "Labor Cost Analysis For Service Businesses",
  description: "Compare labor cost with revenue, paid hours, staffing levels, and productivity signals to understand where labor efficiency may be slipping.",
  alternates: { canonical: "/labor-cost-analysis" },
};

export default function Page() {
  return <SolutionLanding
    eyebrow="Labor Cost Analysis"
    title="Understand Whether Labor Cost Is Growing For The Right Reasons."
    description="PulseIQ helps service businesses compare labor spending with revenue, paid hours, staffing, and operational output so owners can investigate whether rising labor cost reflects healthy growth, coverage needs, or a deeper efficiency issue."
    problem="Labor is often the largest controllable operating cost, but a higher payroll number does not automatically mean a business is overstaffed. Context matters."
    signals={["Payroll grows faster than revenue across multiple periods","Paid hours increase without a matching change in workload","Labor cost differs sharply across teams, shifts, or locations","Overtime and base labor rise at the same time","Productivity falls while staffing remains stable"]}
    sections={[
      { title: "Measure Labor In Context", body: "Compare payroll, paid hours, revenue, and workload together. Looking at labor cost alone can create the wrong conclusion when the business is growing or absorbing unusual demand." },
      { title: "Find Where The Gap Lives", body: "Segment labor by team, shift, location, role, or operating period to identify whether the change is broad or concentrated in a smaller part of the business." },
      { title: "Choose The Right Response", body: "A labor signal may point to scheduling, staffing mix, process delays, training, demand timing, or rework. The next action should match the pattern rather than default to cutting hours." },
    ]}
    outcomeTitle="Good Labor Analysis Explains The Relationship Between Cost, Capacity, And Output."
    outcomeBody="PulseIQ is designed to help owners distinguish productive labor investment from unexplained cost growth by connecting the financial signal to the operational conditions around it."
  />;
}
