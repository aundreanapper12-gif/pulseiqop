"use client";

import { useMemo, useState } from "react";

type ScannerInput = {
  industry: string;
  monthlyLeads: number;
  missedLeadRate: number;
  avgLeadValue: number;
  responseDelayHours: number;
  teamSize: number;
};

type Results = {
  missedLeads: number;
  estimatedLoss: number;
  annualLoss: number;
  riskScore: number;
  efficiencyScore: number;
  riskLevel: string;
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const [inputs, setInputs] = useState<ScannerInput>({
    industry: "Small Business",
    monthlyLeads: 220,
    missedLeadRate: 12,
    avgLeadValue: 150,
    responseDelayHours: 8,
    teamSize: 4,
  });

  const results = useMemo<Results>(() => {
    const missedLeads = Math.round(
      inputs.monthlyLeads * (inputs.missedLeadRate / 100)
    );

    const estimatedLoss = missedLeads * inputs.avgLeadValue;
    const annualLoss = estimatedLoss * 12;

    const riskScore = Math.min(
      100,
      Math.round(
        inputs.missedLeadRate * 2 +
          inputs.responseDelayHours * 3 +
          Math.max(0, 8 - inputs.teamSize) * 4
      )
    );

    const efficiencyScore = Math.max(0, 100 - riskScore);
    const riskLevel =
      riskScore >= 70 ? "High" : riskScore >= 40 ? "Moderate" : "Low";

    return {
      missedLeads,
      estimatedLoss,
      annualLoss,
      riskScore,
      efficiencyScore,
      riskLevel,
    };
  }, [inputs]);

  const theme = darkMode
    ? "bg-[#14100d] text-[#fff7ed]"
    : "bg-[#f7f2ea] text-[#241c16]";

  function updateInput(key: keyof ScannerInput, value: string) {
    setInputs((prev) => ({
      ...prev,
      [key]: key === "industry" ? value : Math.max(0, Number(value)),
    }));
  }

  function downloadReport() {
    const report = `
PulseIQ Solutions - Operational Risk Summary

Industry: ${inputs.industry}
Monthly Leads: ${inputs.monthlyLeads}
Missed Lead Rate: ${inputs.missedLeadRate}%
Average Lead Value: $${inputs.avgLeadValue}
Average Response Delay: ${inputs.responseDelayHours} hours
Team Size: ${inputs.teamSize}

Estimated Missed Leads: ${results.missedLeads}
Monthly Revenue Leakage: $${results.estimatedLoss.toLocaleString()}
Annualized Revenue Risk: $${results.annualLoss.toLocaleString()}
Operational Risk Score: ${results.riskScore}/100
Business Health Score: ${results.efficiencyScore}/100
Risk Level: ${results.riskLevel}

AI-Style Recommendation:
${getRecommendation(results)}

Priority Action Plan:
1. Track missed inquiries as a measurable KPI.
2. Assign ownership for follow-up timing.
3. Review workload pressure during peak demand.
4. Reduce manual handoffs and unclear routing.
5. Monitor operational health weekly.
`;

    const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "pulseiq-operational-risk-summary.txt";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <main className={`min-h-screen ${theme}`}>
      <a
        href="#contact"
        className="fixed bottom-5 right-5 z-50 rounded-full bg-[#d8b894] px-5 py-3 text-sm font-black text-[#241c16] shadow-2xl hover:bg-[#e8c9a3]"
      >
        Free Audit
      </a>

      <nav className="sticky top-0 z-40 border-b border-[#8b735f]/20 bg-inherit px-6 py-4 backdrop-blur md:px-16">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#" className="text-xl font-black">
            PulseIQ Solutions
          </a>

          <div className="hidden gap-6 text-sm font-semibold md:flex">
            <a href="#scanner">Scanner</a>
            <a href="#analytics">Analytics</a>
            <a href="#how">How It Works</a>
            <a href="#case-study">Case Study</a>
            <a href="#contact">Free Audit</a>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full border border-[#8b735f]/40 px-4 py-2 text-sm font-bold"
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </nav>

      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
          <div className="animate-fadeIn">
            <p className="mb-4 inline-flex rounded-full bg-[#3b2f27] px-4 py-2 text-sm font-medium text-white">
              AI-Powered Operational Intelligence
            </p>

            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Operational intelligence for businesses losing time, revenue, and
              efficiency to hidden workflow leaks.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-[#8b735f]">
              PulseIQ helps identify missed opportunities, customer friction,
              staffing pressure, and operational bottlenecks before they become
              expensive.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#scanner"
                className="rounded-xl bg-[#d8b894] px-6 py-3 font-black text-[#241c16] shadow-lg hover:bg-[#e8c9a3]"
              >
                Run Free Scanner
              </a>

              <button
                onClick={downloadReport}
                className="rounded-xl border border-[#8b735f]/50 px-6 py-3 font-black hover:bg-white/10"
              >
                Download Sample Report
              </button>
            </div>
          </div>

          <CommandCenter results={results} />
        </div>
      </section>

      <section className="px-6 pb-10 md:px-16">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          <MetricCard title="Operational Scans" value="1,240+" />
          <MetricCard title="Workflow Risks Analyzed" value="8,900+" />
          <MetricCard title="Potential Leaks Found" value="$2.4M" />
          <MetricCard title="Improvement Areas" value="4 Core" />
        </div>
      </section>

      <section id="scanner" className="px-6 py-20 md:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 font-semibold uppercase tracking-wide text-[#d8b894]">
              Free Business Scanner
            </p>

            <h2 className="text-3xl font-black md:text-5xl">
              Estimate your operational leak risk.
            </h2>

            <p className="mt-5 text-[#8b735f]">
              Adjust the numbers below to see how missed leads and response
              delays affect revenue, staffing pressure, and customer experience.
            </p>

            <div className="mt-8 rounded-3xl bg-white/10 p-6 shadow-xl ring-1 ring-[#8b735f]/20">
              <ScannerField
                label="Industry"
                value={inputs.industry}
                onChange={(v) => updateInput("industry", v)}
              />
              <ScannerField
                label="Monthly Leads"
                type="number"
                value={inputs.monthlyLeads}
                onChange={(v) => updateInput("monthlyLeads", v)}
              />
              <ScannerField
                label="Missed Lead Rate %"
                type="number"
                value={inputs.missedLeadRate}
                onChange={(v) => updateInput("missedLeadRate", v)}
              />
              <ScannerField
                label="Average Lead Value"
                type="number"
                value={inputs.avgLeadValue}
                onChange={(v) => updateInput("avgLeadValue", v)}
              />
              <ScannerField
                label="Average Response Delay Hours"
                type="number"
                value={inputs.responseDelayHours}
                onChange={(v) => updateInput("responseDelayHours", v)}
              />
              <ScannerField
                label="Team Size"
                type="number"
                value={inputs.teamSize}
                onChange={(v) => updateInput("teamSize", v)}
              />
            </div>
          </div>

          <div className="rounded-3xl bg-[#241c16] p-8 text-white shadow-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#d8b894]">
              Scanner Results
            </p>

            <h3 className="mt-3 text-3xl font-black">
              {inputs.industry} Risk Snapshot
            </h3>

            <CircularGauge score={results.efficiencyScore} />

            <div className="mt-8 grid gap-4">
              <ResultRow label="Estimated Missed Leads" value={results.missedLeads} />
              <ResultRow
                label="Monthly Revenue Leakage"
                value={`$${results.estimatedLoss.toLocaleString()}`}
              />
              <ResultRow
                label="Annualized Revenue Risk"
                value={`$${results.annualLoss.toLocaleString()}`}
              />
              <ResultRow
                label="Operational Risk Score"
                value={`${results.riskScore}/100`}
              />
            </div>

            <AIRecommendation results={results} inputs={inputs} />

            <button
              onClick={downloadReport}
              className="mt-6 w-full rounded-xl bg-[#d8b894] px-6 py-3 font-black text-[#241c16] hover:bg-[#e8c9a3]"
            >
              Download Risk Summary
            </button>
          </div>
        </div>
      </section>

      <section id="analytics" className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold uppercase tracking-wide text-[#d8b894]">
            Visual Analytics
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Turn operational activity into decision-ready insight.
          </h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <LineChartCard />
            <HeatmapCard />
            <BarChartCard
              title="Leak Drivers"
              data={[
                { label: "Missed Leads", value: inputs.missedLeadRate },
                { label: "Response Delay", value: inputs.responseDelayHours * 5 },
                {
                  label: "Team Pressure",
                  value: Math.max(0, 8 - inputs.teamSize) * 12,
                },
                { label: "Workflow Risk", value: results.riskScore },
              ]}
            />
          </div>
        </div>
      </section>

      <section id="how" className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black md:text-4xl">How It Works</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            <StepCard
              number="01"
              title="Scan"
              text="Enter lead volume, missed leads, response delays, and team size."
            />
            <StepCard
              number="02"
              title="Score"
              text="PulseIQ calculates revenue leakage, risk level, and business health."
            />
            <StepCard
              number="03"
              title="Prioritize"
              text="The dashboard shows which bottlenecks need attention first."
            />
            <StepCard
              number="04"
              title="Improve"
              text="Use the recommendations to improve workflows and reduce friction."
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black md:text-4xl">Who We Help</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-5">
            {["Law Firms", "Medical Offices", "Home Services", "Support Teams", "Small Businesses"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-3xl bg-white/10 p-6 text-center shadow-lg ring-1 ring-[#8b735f]/20"
                >
                  <p className="text-lg font-black">{item}</p>
                  <p className="mt-3 text-sm text-[#8b735f]">
                    Reduce missed opportunities and improve visibility.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section id="case-study" className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl rounded-3xl bg-white/10 p-8 shadow-xl ring-1 ring-[#8b735f]/20 md:p-12">
          <p className="font-semibold uppercase tracking-wide text-[#d8b894]">
            Portfolio Case Study
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Simulated Small Business Revenue Leak Analysis
          </h2>

          <p className="mt-5 max-w-3xl text-[#8b735f]">
            A service business with steady inquiries was losing revenue because
            missed leads, delayed follow-up, and unclear workflow ownership were
            not tracked together.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <MetricCard title="Problem Found" value="Follow-Up Delay" />
            <MetricCard title="Monthly Risk" value="$3,900" />
            <MetricCard title="Priority Fix" value="Lead Routing" />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <InsightBox
              title="Before"
              points={[
                "Missed leads were tracked separately from staffing pressure.",
                "No one owned follow-up timing as a measurable KPI.",
                "Reporting showed outcomes but not the operational cause.",
              ]}
            />

            <InsightBox
              title="After"
              points={[
                "Missed leads became connected to response speed and workload.",
                "Follow-up delay became the first improvement priority.",
                "The business gained a clear action plan instead of raw numbers.",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:px-16">
        <div className="mx-auto max-w-7xl rounded-3xl border border-[#8b735f]/20 bg-white/10 p-8">
          <p className="font-semibold uppercase tracking-wide text-[#d8b894]">
            Built By
          </p>

          <h2 className="mt-3 text-3xl font-black">Aundrea Napper</h2>

          <p className="mt-4 max-w-3xl text-[#8b735f]">
            Business Administration student concentrating in HR Management and
            Business Analytics. PulseIQ Solutions was built as an operational
            analytics prototype using Next.js, TypeScript, Tailwind CSS, and a
            business intelligence framework focused on customer experience,
            workforce pressure, and revenue leakage.
          </p>
        </div>
      </section>

      <section id="contact" className="px-6 pb-24 md:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-3xl bg-[#241c16] p-8 text-white shadow-2xl md:grid-cols-2 md:p-12">
          <div>
            <p className="font-semibold uppercase tracking-wide text-[#d8b894]">
              Free Mini Audit
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Want a personalized operational leak review?
            </h2>

            <p className="mt-5 text-[#eadccf]">
              Submit your business details and receive a simple operational risk
              review focused on missed opportunities, workflow friction, and
              customer experience gaps.
            </p>
          </div>

          <form
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            className="rounded-3xl bg-white p-6 text-[#241c16]"
          >
            <FormField name="name" label="Name" />
            <FormField name="business" label="Business Name" />
            <FormField name="email" label="Email" type="email" />
            <FormField name="challenge" label="Biggest Operational Challenge" />

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#241c16] px-6 py-3 font-black text-white hover:bg-[#3b2f27]"
            >
              Request Free Audit
            </button>

            <p className="mt-3 text-xs text-[#7a6a5d]">
              Replace YOUR_FORM_ID with your real Formspree endpoint.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

function getRecommendation(results: Results) {
  if (results.riskScore >= 70) {
    return "High risk detected. Prioritize lead follow-up, routing ownership, and missed inquiry tracking immediately.";
  }

  if (results.riskScore >= 40) {
    return "Moderate risk detected. Improve response time, assign follow-up ownership, and monitor workload patterns weekly.";
  }

  return "Low risk detected. Continue monitoring response speed and lead capture to prevent small leaks from growing.";
}

function CommandCenter({ results }: { results: Results }) {
  return (
    <div className="animate-fadeIn rounded-3xl border border-[#8b735f]/20 bg-white/10 p-6 shadow-2xl backdrop-blur">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black">PulseIQ Command Center</h2>
          <p className="text-sm text-[#8b735f]">Live operational preview</p>
        </div>

        <span className="rounded-full bg-[#d8b894] px-3 py-1 text-sm font-black text-[#241c16]">
          Active Scan
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <MetricCard title="Efficiency Score" value={`${results.efficiencyScore}%`} />
        <MetricCard
          title="Revenue Risk"
          value={`$${results.estimatedLoss.toLocaleString()}`}
        />
        <MetricCard title="Missed Leads" value={`${results.missedLeads}`} />
        <MetricCard title="Risk Level" value={results.riskLevel} />
      </div>

      <div className="mt-6 rounded-2xl bg-[#241c16] p-5 text-white">
        <p className="text-sm text-[#d8c6b2]">AI Insight</p>
        <p className="mt-2 text-lg font-semibold">
          Missed leads and delayed follow-up are the strongest indicators of
          revenue leakage in this scan.
        </p>
      </div>
    </div>
  );
}

function CircularGauge({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="mt-8 flex justify-center">
      <div className="relative h-40 w-40">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 140 140">
          <circle
            cx="70"
            cy="70"
            r={radius}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="14"
            fill="none"
          />
          <circle
            cx="70"
            cy="70"
            r={radius}
            stroke="#d8b894"
            strokeWidth="14"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-4xl font-black">{score}</p>
          <p className="text-xs text-[#eadccf]">Health Score</p>
        </div>
      </div>
    </div>
  );
}

function AIRecommendation({
  results,
  inputs,
}: {
  results: Results;
  inputs: ScannerInput;
}) {
  return (
    <div className="mt-8 rounded-2xl bg-white/10 p-5">
      <p className="font-semibold">AI-Style Recommendation</p>
      <p className="mt-2 text-[#eadccf]">{getRecommendation(results)}</p>
      <p className="mt-4 text-sm text-[#d8b894]">
        Based on {inputs.monthlyLeads} monthly leads, {inputs.missedLeadRate}%
        missed lead rate, and {inputs.responseDelayHours} hour response delay.
      </p>
    </div>
  );
}

function MetricCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#8b735f]/20 bg-white/10 p-5 shadow-sm backdrop-blur">
      <p className="text-sm text-[#8b735f]">{title}</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  );
}

function ScannerField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="mb-4 block">
      <span className="mb-2 block text-sm font-semibold text-[#8b735f]">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-[#8b735f]/30 bg-white px-4 py-3 text-[#241c16] outline-none focus:border-[#d8b894]"
      />
    </label>
  );
}

function FormField({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <label className="mb-4 block">
      <span className="mb-2 block text-sm font-semibold text-[#5f5147]">
        {label}
      </span>

      <input
        name={name}
        type={type}
        required
        className="w-full rounded-xl border border-[#dccfbd] bg-[#fbf8f3] px-4 py-3 outline-none focus:border-[#9b6b43]"
      />
    </label>
  );
}

function ResultRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/10 p-4">
      <span className="text-[#eadccf]">{label}</span>
      <span className="text-xl font-black">{value}</span>
    </div>
  );
}

function BarChartCard({
  title,
  data,
}: {
  title: string;
  data: { label: string; value: number }[];
}) {
  return (
    <div className="rounded-3xl bg-white/10 p-8 shadow-xl ring-1 ring-[#8b735f]/20">
      <h3 className="text-2xl font-black">{title}</h3>

      <div className="mt-6 space-y-5">
        {data.map((item) => {
          const width = Math.min(100, Math.max(5, item.value));

          return (
            <div key={item.label}>
              <div className="mb-2 flex justify-between text-sm font-semibold">
                <span>{item.label}</span>
                <span>{Math.round(width)}%</span>
              </div>

              <div className="h-4 overflow-hidden rounded-full bg-[#8b735f]/20">
                <div
                  className="h-full rounded-full bg-[#d8b894] transition-all duration-700"
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LineChartCard() {
  const points = [22, 28, 35, 31, 44, 39, 52, 48, 60, 66, 71, 76];

  return (
    <div className="rounded-3xl bg-white/10 p-8 shadow-xl ring-1 ring-[#8b735f]/20">
      <h3 className="text-2xl font-black">Revenue Risk Trend</h3>
      <p className="mt-2 text-sm text-[#8b735f]">
        Simulated monthly operational leak exposure.
      </p>

      <div className="mt-8 flex h-44 items-end gap-3">
        {points.map((point, index) => (
          <div
            key={index}
            className="flex flex-1 flex-col items-center justify-end gap-2"
          >
            <div
              className="w-full rounded-t-xl bg-[#d8b894] transition-all duration-700"
              style={{ height: `${point}%` }}
            />
            <span className="text-xs text-[#8b735f]">{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeatmapCard() {
  const cells = [
    "Low",
    "Med",
    "High",
    "Med",
    "High",
    "Low",
    "Med",
    "High",
    "High",
    "Med",
    "Low",
    "Med",
  ];

  return (
    <div className="rounded-3xl bg-white/10 p-8 shadow-xl ring-1 ring-[#8b735f]/20">
      <h3 className="text-2xl font-black">Workflow Heatmap</h3>
      <p className="mt-2 text-sm text-[#8b735f]">
        Simulated risk levels across workflow areas.
      </p>

      <div className="mt-8 grid grid-cols-4 gap-3">
        {cells.map((cell, index) => (
          <div
            key={index}
            className={`rounded-2xl p-4 text-center text-xs font-black ${
              cell === "High"
                ? "bg-[#3b2f27] text-white"
                : cell === "Med"
                ? "bg-[#d8b894] text-[#241c16]"
                : "bg-[#efe3d3] text-[#241c16]"
            }`}
          >
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl bg-white/10 p-6 shadow-lg ring-1 ring-[#8b735f]/20">
      <p className="text-sm font-black text-[#d8b894]">{number}</p>
      <h3 className="mt-3 text-xl font-black">{title}</h3>
      <p className="mt-3 text-sm text-[#8b735f]">{text}</p>
    </div>
  );
}

function InsightBox({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <div className="rounded-3xl border border-[#8b735f]/20 bg-white/10 p-6">
      <h3 className="text-2xl font-black">{title}</h3>

      <ul className="mt-5 space-y-3 text-[#8b735f]">
        {points.map((point) => (
          <li key={point}>• {point}</li>
        ))}
      </ul>
    </div>
  );
}