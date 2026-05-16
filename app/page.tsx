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

export default function Home() {
  const [inputs, setInputs] = useState<ScannerInput>({
    industry: "Small Business",
    monthlyLeads: 220,
    missedLeadRate: 12,
    avgLeadValue: 150,
    responseDelayHours: 8,
    teamSize: 4,
  });

  const results = useMemo(() => {
    const missedLeads = Math.round(
      inputs.monthlyLeads * (inputs.missedLeadRate / 100)
    );

    const estimatedLoss = missedLeads * inputs.avgLeadValue;

    const riskScore = Math.min(
      100,
      Math.round(
        inputs.missedLeadRate * 2 +
          inputs.responseDelayHours * 3 +
          Math.max(0, 8 - inputs.teamSize) * 4
      )
    );

    const efficiencyScore = Math.max(0, 100 - riskScore);

    const annualLoss = estimatedLoss * 12;

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

  function updateInput(key: keyof ScannerInput, value: string) {
    setInputs((prev) => ({
      ...prev,
      [key]: key === "industry" ? value : Math.max(0, Number(value)),
    }));
  }

  return (
    <main className="min-h-screen bg-[#f7f2ea] text-[#241c16]">
      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-[#e1d5c5] bg-[#f7f2ea]/90 px-6 py-4 backdrop-blur md:px-16">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#" className="text-xl font-black">
            PulseIQ Solutions
          </a>

          <div className="hidden gap-6 text-sm font-semibold md:flex">
            <a href="#scanner">Scanner</a>
            <a href="#dashboard">Dashboard</a>
            <a href="#case-study">Case Study</a>
            <a href="#contact">Free Audit</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-[#3b2f27] px-4 py-2 text-sm font-medium text-white">
              AI-Powered Operational Intelligence
            </p>

            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Find the hidden leaks costing your business time, revenue, and
              customer trust.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-[#5f5147]">
              PulseIQ scans missed leads, follow-up delays, workflow friction,
              staffing pressure, and customer experience gaps to show where
              your business can improve.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#scanner"
                className="rounded-xl bg-[#241c16] px-6 py-3 font-semibold text-white shadow-lg hover:bg-[#3b2f27]"
              >
                Run Free Scanner
              </a>

              <a
                href="#contact"
                className="rounded-xl border border-[#241c16] px-6 py-3 font-semibold hover:bg-white"
              >
                Request Free Audit
              </a>
            </div>
          </div>

          <DashboardPreview results={results} />
        </div>
      </section>

      {/* TRUST METRICS */}
      <section className="px-6 pb-8 md:px-16">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          <MetricCard title="Monthly Risk" value={`$${results.estimatedLoss.toLocaleString()}`} />
          <MetricCard title="Annualized Risk" value={`$${results.annualLoss.toLocaleString()}`} />
          <MetricCard title="Missed Leads" value={`${results.missedLeads}`} />
          <MetricCard title="Risk Level" value={results.riskLevel} />
        </div>
      </section>

      {/* SCANNER */}
      <section id="scanner" className="px-6 py-20 md:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 font-semibold uppercase tracking-wide text-[#9b6b43]">
              Free Business Scanner
            </p>

            <h2 className="text-3xl font-black md:text-5xl">
              Estimate your operational leak risk.
            </h2>

            <p className="mt-5 text-[#5f5147]">
              Adjust the numbers below to see how missed leads and slow
              response times can quietly affect revenue.
            </p>

            <div className="mt-8 rounded-3xl bg-white p-6 shadow-xl">
              <ScannerField
                label="Industry"
                value={inputs.industry}
                onChange={(value) => updateInput("industry", value)}
              />

              <ScannerField
                label="Monthly Leads"
                type="number"
                value={inputs.monthlyLeads}
                onChange={(value) => updateInput("monthlyLeads", value)}
              />

              <ScannerField
                label="Missed Lead Rate %"
                type="number"
                value={inputs.missedLeadRate}
                onChange={(value) => updateInput("missedLeadRate", value)}
              />

              <ScannerField
                label="Average Lead Value"
                type="number"
                value={inputs.avgLeadValue}
                onChange={(value) => updateInput("avgLeadValue", value)}
              />

              <ScannerField
                label="Average Response Delay Hours"
                type="number"
                value={inputs.responseDelayHours}
                onChange={(value) => updateInput("responseDelayHours", value)}
              />

              <ScannerField
                label="Team Size"
                type="number"
                value={inputs.teamSize}
                onChange={(value) => updateInput("teamSize", value)}
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

            <ScoreGauge score={results.efficiencyScore} />

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
          </div>
        </div>
      </section>

      {/* CHART SECTION */}
      <section id="dashboard" className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black md:text-4xl">
            Operational Dashboard Preview
          </h2>

          <p className="mt-4 max-w-2xl text-[#5f5147]">
            This turns scanner inputs into visual insight so business owners can
            quickly see what needs attention first.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <BarChartCard
              title="Leak Drivers"
              data={[
                { label: "Missed Leads", value: inputs.missedLeadRate },
                { label: "Response Delay", value: inputs.responseDelayHours * 5 },
                { label: "Team Pressure", value: Math.max(0, 8 - inputs.teamSize) * 12 },
                { label: "Workflow Risk", value: results.riskScore },
              ]}
            />

            <BarChartCard
              title="Improvement Focus"
              data={[
                { label: "Follow-Up", value: 90 },
                { label: "Routing", value: 72 },
                { label: "Staffing", value: 64 },
                { label: "Automation", value: 83 },
              ]}
            />
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section id="case-study" className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl rounded-3xl bg-white p-8 shadow-xl md:p-12">
          <p className="font-semibold uppercase tracking-wide text-[#9b6b43]">
            Portfolio Case Study
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Simulated Small Business Revenue Leak Analysis
          </h2>

          <p className="mt-5 max-w-3xl text-[#5f5147]">
            A small service business with steady monthly inquiries was losing
            revenue because missed leads, delayed follow-up, and unclear
            workflow ownership were not being tracked together.
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

      {/* CONTACT FORM */}
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
              Use this section as your lead capture area. Later, you can connect
              it to Formspree, Google Forms, Airtable, or a real backend.
            </p>
          </div>

          <form className="rounded-3xl bg-white p-6 text-[#241c16]">
            <ScannerField label="Name" value="" onChange={() => {}} />
            <ScannerField label="Business Name" value="" onChange={() => {}} />
            <ScannerField label="Email" value="" onChange={() => {}} />
            <ScannerField label="Biggest Operational Challenge" value="" onChange={() => {}} />

            <button
              type="button"
              className="mt-2 w-full rounded-xl bg-[#241c16] px-6 py-3 font-bold text-white hover:bg-[#3b2f27]"
              onClick={() =>
                alert("Lead form demo only. Connect this to Formspree or Airtable next.")
              }
            >
              Request Free Audit
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

function DashboardPreview({ results }: { results: any }) {
  return (
    <div className="rounded-3xl border border-[#dccfbd] bg-white/80 p-6 shadow-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black">PulseIQ Command Center</h2>
          <p className="text-sm text-[#7a6a5d]">Live demo preview</p>
        </div>

        <span className="rounded-full bg-[#efe3d3] px-3 py-1 text-sm font-semibold">
          Active Scan
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <MetricCard title="Efficiency Score" value={`${results.efficiencyScore}%`} />
        <MetricCard title="Revenue Risk" value={`$${results.estimatedLoss.toLocaleString()}`} />
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

function ScoreGauge({ score }: { score: number }) {
  return (
    <div className="mt-8">
      <div className="mb-2 flex justify-between text-sm text-[#eadccf]">
        <span>Business Health Score</span>
        <span>{score}/100</span>
      </div>

      <div className="h-5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#d8b894] transition-all duration-700"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function AIRecommendation({
  results,
  inputs,
}: {
  results: any;
  inputs: ScannerInput;
}) {
  const recommendation =
    results.riskScore >= 70
      ? "High risk detected. Prioritize lead follow-up, routing ownership, and missed inquiry tracking immediately."
      : results.riskScore >= 40
      ? "Moderate risk detected. Improve response time, assign follow-up ownership, and monitor workload patterns weekly."
      : "Low risk detected. Continue monitoring response speed and lead capture to prevent small leaks from growing.";

  return (
    <div className="mt-8 rounded-2xl bg-white/10 p-5">
      <p className="font-semibold">AI-Style Recommendation</p>
      <p className="mt-2 text-[#eadccf]">{recommendation}</p>

      <p className="mt-4 text-sm text-[#d8b894]">
        Based on {inputs.monthlyLeads} monthly leads, {inputs.missedLeadRate}%
        missed lead rate, and {inputs.responseDelayHours} hour response delay.
      </p>
    </div>
  );
}

function MetricCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#e3d7c8] bg-[#fbf8f3] p-5">
      <p className="text-sm text-[#7a6a5d]">{title}</p>
      <p className="mt-2 text-2xl font-black text-[#241c16]">{value}</p>
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
      <span className="mb-2 block text-sm font-semibold text-[#5f5147]">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-[#dccfbd] bg-[#fbf8f3] px-4 py-3 outline-none focus:border-[#9b6b43]"
      />
    </label>
  );
}

function ResultRow({ label, value }: { label: string; value: string | number }) {
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
    <div className="rounded-3xl bg-white p-8 shadow-xl">
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

              <div className="h-4 overflow-hidden rounded-full bg-[#efe3d3]">
                <div
                  className="h-full rounded-full bg-[#3b2f27] transition-all duration-700"
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

function InsightBox({ title, points }: { title: string; points: string[] }) {
  return (
    <div className="rounded-3xl border border-[#e3d7c8] bg-[#fbf8f3] p-6">
      <h3 className="text-2xl font-black">{title}</h3>

      <ul className="mt-5 space-y-3 text-[#5f5147]">
        {points.map((point) => (
          <li key={point}>• {point}</li>
        ))}
      </ul>
    </div>
  );
}