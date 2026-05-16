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

    return {
      missedLeads,
      estimatedLoss,
      riskScore,
      efficiencyScore,
    };
  }, [inputs]);

  function updateInput(key: keyof ScannerInput, value: string) {
    setInputs((prev) => ({
      ...prev,
      [key]:
        key === "industry"
          ? value
          : Number(value) < 0
          ? 0
          : Number(value),
    }));
  }

  return (
    <main className="min-h-screen bg-[#f7f2ea] text-[#241c16]">
      {/* HERO */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-[#3b2f27] px-4 py-2 text-sm font-medium text-white">
              AI-Powered Operational Intelligence
            </p>

            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Find the hidden leaks costing your business time, revenue, and
              customer trust.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-[#5f5147]">
              PulseIQ helps small businesses identify missed opportunities,
              workflow bottlenecks, customer experience gaps, and operational
              friction before they become expensive problems.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#scanner"
                className="rounded-xl bg-[#241c16] px-6 py-3 font-semibold text-white shadow-lg hover:bg-[#3b2f27]"
              >
                Run Free Scanner
              </a>

              <a
                href="#dashboard"
                className="rounded-xl border border-[#241c16] px-6 py-3 font-semibold hover:bg-white"
              >
                View Dashboard
              </a>
            </div>
          </div>

          {/* DASHBOARD PREVIEW */}
          <div
            id="dashboard"
            className="rounded-3xl border border-[#dccfbd] bg-white/80 p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Operational Health</h2>
                <p className="text-sm text-[#7a6a5d]">Live demo preview</p>
              </div>

              <span className="rounded-full bg-[#efe3d3] px-3 py-1 text-sm font-semibold">
                PulseIQ Score
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard title="Efficiency Score" value="84%" />
              <MetricCard title="Revenue Risk" value="$3.9K" />
              <MetricCard title="Missed Leads" value="26" />
              <MetricCard title="Workflow Risk" value="Medium" />
            </div>

            <div className="mt-6 rounded-2xl bg-[#241c16] p-5 text-white">
              <p className="text-sm text-[#d8c6b2]">AI Insight</p>
              <p className="mt-2 text-lg font-semibold">
                Response delays and missed follow-ups are the strongest
                indicators of revenue leakage this month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEAK CATEGORIES */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold md:text-4xl">
            What PulseIQ Detects
          </h2>

          <p className="mt-4 max-w-2xl text-[#5f5147]">
            Businesses rarely lose money from one major failure. They lose it
            through small operational leaks that repeat every day.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            <FeatureCard
              title="Revenue Leaks"
              items={["Missed leads", "Delayed follow-ups", "Lost inquiries"]}
            />
            <FeatureCard
              title="Workflow Friction"
              items={["Bottlenecks", "Manual tasks", "Slow handoffs"]}
            />
            <FeatureCard
              title="Customer Experience"
              items={["Long wait times", "Repeat issues", "Confusing steps"]}
            />
            <FeatureCard
              title="Workforce Strain"
              items={["Uneven workload", "Burnout risk", "Queue pressure"]}
            />
          </div>
        </div>
      </section>

      {/* SCANNER */}
      <section id="scanner" className="px-6 py-20 md:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 font-semibold uppercase tracking-wide text-[#9b6b43]">
              Free Business Scanner
            </p>

            <h2 className="text-3xl font-bold md:text-5xl">
              Estimate where your business may be losing money.
            </h2>

            <p className="mt-5 text-[#5f5147]">
              Enter a few numbers and PulseIQ will estimate missed lead risk,
              potential revenue leakage, and operational efficiency.
            </p>

            <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">
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

            <h3 className="mt-3 text-3xl font-bold">
              {inputs.industry} Risk Snapshot
            </h3>

            <div className="mt-8 grid gap-4">
              <ResultRow label="Estimated Missed Leads" value={results.missedLeads} />
              <ResultRow
                label="Estimated Monthly Revenue Leakage"
                value={`$${results.estimatedLoss.toLocaleString()}`}
              />
              <ResultRow label="Operational Risk Score" value={`${results.riskScore}/100`} />
              <ResultRow
                label="Efficiency Score"
                value={`${results.efficiencyScore}/100`}
              />
            </div>

            <div className="mt-8 rounded-2xl bg-white/10 p-5">
              <p className="font-semibold">PulseIQ Recommendation</p>
              <p className="mt-2 text-[#eadccf]">
                Review follow-up speed, missed inquiry tracking, and workload
                distribution. These areas are likely creating preventable
                revenue loss and customer frustration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BEFORE AFTER */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold md:text-4xl">
            Before PulseIQ vs. After PulseIQ
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-bold">Before</h3>
              <ul className="mt-5 space-y-3 text-[#5f5147]">
                <li>• Missed leads go unnoticed</li>
                <li>• Teams react after problems grow</li>
                <li>• Workflow issues are hard to see</li>
                <li>• Customer frustration increases</li>
                <li>• Reports show numbers without action</li>
              </ul>
            </div>

            <div className="rounded-3xl bg-[#3b2f27] p-8 text-white shadow-lg">
              <h3 className="text-2xl font-bold">After</h3>
              <ul className="mt-5 space-y-3 text-[#eadccf]">
                <li>• Revenue leaks become visible</li>
                <li>• Teams spot bottlenecks earlier</li>
                <li>• Leaders know what to fix first</li>
                <li>• Customer experience improves</li>
                <li>• Data connects directly to action</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl rounded-3xl bg-white p-8 shadow-xl md:p-12">
          <p className="font-semibold uppercase tracking-wide text-[#9b6b43]">
            Example Case Study
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            How one workflow analysis revealed hidden queue inefficiencies.
          </h2>

          <p className="mt-5 max-w-3xl text-[#5f5147]">
            A simulated service business was receiving steady monthly leads but
            losing opportunities due to delayed follow-up, unclear routing, and
            overloaded team members during peak hours.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <MetricCard title="Missed Lead Rate" value="12%" />
            <MetricCard title="Monthly Risk" value="$3,900" />
            <MetricCard title="Fix Priority" value="Follow-Up Speed" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 md:px-16">
        <div className="mx-auto max-w-5xl rounded-3xl bg-[#241c16] p-10 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-bold md:text-5xl">
            Ready to find your operational leaks?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[#eadccf]">
            Start with a simple scanner, then turn the results into better
            workflows, stronger follow-up, and smarter business decisions.
          </p>

          <a
            href="#scanner"
            className="mt-8 inline-flex rounded-xl bg-[#d8b894] px-7 py-3 font-bold text-[#241c16] hover:bg-[#e8c9a3]"
          >
            Run the Free Scanner
          </a>
        </div>
      </section>
    </main>
  );
}

function MetricCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#e3d7c8] bg-[#fbf8f3] p-5">
      <p className="text-sm text-[#7a6a5d]">{title}</p>
      <p className="mt-2 text-2xl font-bold text-[#241c16]">{value}</p>
    </div>
  );
}

function FeatureCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <h3 className="text-xl font-bold">{title}</h3>
      <ul className="mt-4 space-y-2 text-[#5f5147]">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
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
      <span className="text-xl font-bold">{value}</span>
    </div>
  );
}