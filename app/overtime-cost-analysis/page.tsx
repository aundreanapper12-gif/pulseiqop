import type { Metadata } from "next";
import SolutionLanding from "../components/SolutionLanding";

export const metadata: Metadata = {
  title: "Overtime Cost Analysis For Service Businesses",
  description: "Analyze overtime patterns by team, shift, workload, or location to understand what may be driving repeated labor overruns.",
  alternates: { canonical: "/overtime-cost-analysis" },
};

export default function Page() {
  return <SolutionLanding
    eyebrow="Overtime Cost Analysis"
    title="Stop Treating Overtime Like One Number. Find The Pattern Behind It."
    description="PulseIQ helps service businesses move beyond the monthly overtime total and investigate when, where, and why overtime keeps appearing so staffing decisions can be based on evidence instead of instinct."
    problem="Repeated overtime may come from scheduling, demand spikes, understaffing, workflow delays, rework, coverage gaps, or a small number of recurring patterns."
    signals={["The same employees or shifts generate overtime repeatedly","Overtime climbs even when revenue or workload stays flat","Certain locations or teams consistently run over plan","Rework or callbacks extend paid hours","Coverage gaps create expensive last-minute scheduling"]}
    sections={[
      { title: "Break Overtime Into Patterns", body: "Review overtime by employee, shift, team, location, or time period instead of judging the business from a single monthly total." },
      { title: "Compare Workload And Cost", body: "Look at whether overtime is moving with demand, revenue, staffing levels, repeat work, or other operating activity to avoid blaming the wrong cause." },
      { title: "Test The Operational Cause", body: "Use the strongest pattern to decide whether the next step is a scheduling change, staffing review, workflow fix, or deeper analysis of rework and service demand." },
    ]}
    outcomeTitle="The Goal Is Not Zero Overtime. The Goal Is Knowing Which Overtime Is Necessary And Which Pattern Deserves Action."
    outcomeBody="PulseIQ frames overtime as an operational signal. A strong analysis connects the cost to the conditions producing it, while keeping normal demand-driven overtime separate from recurring inefficiency."
  />;
}
