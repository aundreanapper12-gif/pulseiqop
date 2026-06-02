"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Mail,
  Radar,
  Sparkles,
  Target,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const emailAddress = "aundreanapper12@gmail.com";

const trendData = [
  { month: "Jan", efficiency: 62 },
  { month: "Feb", efficiency: 68 },
  { month: "Mar", efficiency: 74 },
  { month: "Apr", efficiency: 81 },
  { month: "May", efficiency: 88 },
];

const leakData = [
  { name: "Missed Calls", value: 38 },
  { name: "Slow Follow-Up", value: 27 },
  { name: "Scheduling", value: 19 },
  { name: "Workflow", value: 16 },
];

export default function Home() {
  const [monthlyLeads, setMonthlyLeads] = useState(220);
  const [missRate, setMissRate] = useState(12);
  const [leadValue, setLeadValue] = useState(150);
  const [responseDelay, setResponseDelay] = useState(8);
  const [teamSize, setTeamSize] = useState(4);

  const scan = useMemo(() => {
    const missedLeads = Math.round(monthlyLeads * (missRate / 100));
    const monthlyLoss = missedLeads * leadValue;
    const annualLoss = monthlyLoss * 12;

    let score = 100 - missRate * 2 - Math.min(responseDelay * 3, 30);

    if (teamSize <= 2) score -= 8;
    if (monthlyLeads > 200 && teamSize <= 4) score -= 7;

    const healthScore = Math.max(12, Math.min(100, Math.round(score)));

    const riskLevel =
      healthScore >= 80 ? "Low" : healthScore >= 55 ? "Moderate" : "High";

    const recommendation =
      riskLevel === "Low"
        ? "Keep monitoring lead response time and maintain consistent follow-up."
        : riskLevel === "Moderate"
        ? "Create a same-day follow-up process and assign ownership for missed leads."
        : "Fix missed-lead handling immediately with faster response windows, backup coverage, and automated follow-up.";

    return {
      missedLeads,
      monthlyLoss,
      annualLoss,
      healthScore,
      riskLevel,
      recommendation,
    };
  }, [monthlyLeads, missRate, leadValue, responseDelay, teamSize]);

  const mailtoLink = `mailto:${emailAddress}?subject=PulseIQ Operations Inquiry&body=Hi Aundrea,%0D%0A%0D%0AI am interested in a PulseIQ Operations review for my business.`;

  return (
    <main className="min-h-screen bg-[#f7f2ea] text-[#111111]">
      <nav className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f2ea]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#home" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-black text-white">
              <Sparkles size={18} />
            </div>
            <span className="text-xl font-black">PulseIQ Operations</span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-semibold text-black/70 md:flex">
            <a href="#features">Features</a>
            <a href="#dashboard">Dashboard</a>
            <a href="#services">Services</a>
            <a href="#scan">Free Scan</a>
            <a href="#contact">Contact</a>
          </div>

          <a
            href="#scan"
            className="rounded-full bg-black px-5 py-3 text-sm font-bold text-white"
          >
            Get Free Scan
          </a>
        </div>
      </nav>

      <section id="home" className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-bold shadow-sm">
              <Zap size={16} />
              AI-Powered Operational Intelligence
            </div>

            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Find where your business is losing revenue.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-black/65">
              PulseIQ Operations helps service businesses identify missed leads,
              slow response times, workflow gaps, and customer experience risks
              using simple operational analytics.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#scan"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 font-bold text-white"
              >
                Run Free Business Scan <ArrowRight size={18} />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/70 px-7 py-4 font-bold text-black"
              >
                View Services
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white/75 p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-black/50">
                  PulseIQ Command Center
                </p>
                <h3 className="text-2xl font-black">Operational Snapshot</h3>
              </div>
              <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-black text-emerald-700">
                DEMO
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Metric label="Health Score" value={`${scan.healthScore}/100`} note={scan.riskLevel} />
              <Metric label="Monthly Leak" value={`$${scan.monthlyLoss.toLocaleString()}`} note="Estimate" />
              <Metric label="Missed Leads" value={`${scan.missedLeads}`} note="Monthly" />
            </div>

            <div className="mt-5 h-64 rounded-3xl border border-black/10 bg-white p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="efficiency"
                    stroke="#111"
                    fill="#111"
                    fillOpacity={0.15}
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-5 rounded-3xl bg-black p-5 text-white">
              <p className="text-sm font-bold text-white/50">Insight</p>
              <p className="mt-2 text-lg font-semibold leading-7">
                Missed lead risk increases when response delays, unclear
                ownership, and inconsistent follow-up happen together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white/55 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 text-sm font-black uppercase tracking-[0.2em] text-black/35">
          <span>Revenue Intelligence</span>
          <span>Workflow Audits</span>
          <span>KPI Dashboards</span>
          <span>Customer Experience</span>
        </div>
      </section>

      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 font-black uppercase tracking-[0.25em] text-black/40">
            What PulseIQ Finds
          </p>
          <h2 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
            Turn messy operations into measurable intelligence.
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Feature
              icon={<TrendingUp size={22} />}
              title="Revenue Leak Detection"
              text="Estimate lost revenue from missed calls, slow replies, and weak follow-up."
            />
            <Feature
              icon={<Workflow size={22} />}
              title="Workflow Intelligence"
              text="Find bottlenecks across intake, scheduling, communication, and daily operations."
            />
            <Feature
              icon={<BarChart3 size={22} />}
              title="KPI Dashboarding"
              text="Turn business activity into simple metrics leaders can act on."
            />
            <Feature
              icon={<Radar size={22} />}
              title="Health Scoring"
              text="Get a clear snapshot of risk level, efficiency, and improvement areas."
            />
          </div>
        </div>
      </section>

      <section id="dashboard" className="bg-black px-6 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 font-black uppercase tracking-[0.25em] text-white/40">
              Intelligence Layer
            </p>
            <h2 className="text-4xl font-black tracking-tight md:text-6xl">
              See the hidden patterns behind lost revenue.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
              PulseIQ converts missed calls, late follow-ups, inconsistent
              staffing, and customer friction into clear action steps.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Operational health score",
                "Revenue leak estimate",
                "Workflow bottleneck review",
                "Recommended next steps",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-400" size={20} />
                  <span className="font-semibold text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-white p-5 text-black">
                <p className="text-sm font-bold text-black/40">Leak Sources</p>
                <div className="mt-4 h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={leakData}>
                      <XAxis dataKey="name" hide />
                      <YAxis hide />
                      <Tooltip />
                      <Bar dataKey="value" fill="#111" radius={[12, 12, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-4">
                <Status title="Response Delay" status="High Risk" />
                <Status title="Staffing Coverage" status="Moderate" />
                <Status title="Customer Follow-Up" status="Needs Review" />
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-white/10 bg-white/10 p-5">
              <p className="text-sm font-bold text-white/45">
                Recommended Action
              </p>
              <p className="mt-2 text-xl font-bold leading-8">
                Create a same-day follow-up system for unanswered leads and
                assign ownership by shift window.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 font-black uppercase tracking-[0.25em] text-black/40">
              Services
            </p>
            <h2 className="text-4xl font-black md:text-6xl">
              Simple offers. Serious operational clarity.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Service
              name="Revenue Leak Audit"
              price="$97"
              text="A focused review of missed leads, response delays, and follow-up gaps."
            />
            <Service
              name="KPI Dashboard Build"
              price="$297"
              text="A simple dashboard to track leads, response speed, workflow issues, and health."
            />
            <Service
              name="Operations Improvement Plan"
              price="$497+"
              text="A practical action plan for improving workflows, customer experience, and performance."
            />
          </div>
        </div>
      </section>

      <section id="scan" className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.5rem] bg-[#111] p-8 text-white md:p-12 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
              <Target size={16} />
              Free Business Scan
            </div>
            <h2 className="text-4xl font-black md:text-5xl">
              Estimate your missed-lead revenue leak.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
              Enter a few quick numbers to estimate monthly loss, annual loss,
              operational health, and recommended next steps.
            </p>

            <div className="mt-8 rounded-3xl bg-white/10 p-5 text-sm text-white/70">
              This tool provides an estimate based on the information entered.
              Results are for planning purposes and may vary.
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 text-black">
            <div className="grid gap-4">
              <NumberInput label="Monthly Leads" value={monthlyLeads} onChange={setMonthlyLeads} />
              <NumberInput label="Missed Lead Percentage" value={missRate} onChange={setMissRate} />
              <NumberInput label="Average Lead Value" value={leadValue} onChange={setLeadValue} />
              <NumberInput label="Average Response Delay in Hours" value={responseDelay} onChange={setResponseDelay} />
              <NumberInput label="Team Size" value={teamSize} onChange={setTeamSize} />
            </div>

            <div className="mt-6 rounded-3xl bg-[#f7f2ea] p-5">
              <p className="text-sm font-black uppercase text-black/45">
                Scan Results
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Result label="Monthly Loss" value={`$${scan.monthlyLoss.toLocaleString()}`} />
                <Result label="Annual Loss" value={`$${scan.annualLoss.toLocaleString()}`} />
                <Result label="Missed Leads" value={`${scan.missedLeads}`} />
                <Result label="Risk Level" value={scan.riskLevel} />
              </div>

              <div className="mt-4 rounded-2xl bg-black p-4 text-white">
                <p className="text-sm font-bold text-white/50">
                  Recommended Action
                </p>
                <p className="mt-2 font-semibold leading-7">
                  {scan.recommendation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 pb-24">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-black/10 bg-white/75 p-8 text-center md:p-12">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
            <Mail size={24} />
          </div>
          <h2 className="text-4xl font-black md:text-5xl">
            Ready to review your operations?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-black/60">
            Send a message to request a PulseIQ Operations review, dashboard, or
            revenue leak audit.
          </p>

          <a
            href={mailtoLink}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 font-bold text-white"
          >
            Contact PulseIQ <ArrowRight size={18} />
          </a>

          <p className="mt-6 text-sm text-black/45">
            Your information is used only to respond to your request.
          </p>
        </div>
      </section>

      <footer className="border-t border-black/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h3 className="text-2xl font-black">PulseIQ Operations</h3>
            <p className="mt-2 text-black/55">
              Operations Analytics | Revenue Leak Detection | Workflow Improvement
            </p>
            <p className="mt-2 text-black/55">Contact: {emailAddress}</p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm font-bold text-black/55">
            <a href="#features">Features</a>
            <a href="#dashboard">Dashboard</a>
            <a href="#services">Services</a>
            <a href="#scan">Scan</a>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-7xl text-sm text-black/40">
          © 2026 PulseIQ Operations. Estimates are for planning purposes only.
        </p>
      </footer>
    </main>
  );
}

function Metric({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-3xl border border-black/10 bg-[#faf7f1] p-4">
      <p className="text-xs font-bold uppercase text-black/45">{label}</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
      <p className="mt-1 text-sm font-bold text-emerald-600">{note}</p>
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[2rem] border border-black/10 bg-white/70 p-7 shadow-sm">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
        {icon}
      </div>
      <h3 className="text-xl font-black">{title}</h3>
      <p className="mt-4 leading-7 text-black/60">{text}</p>
    </div>
  );
}

function Status({ title, status }: { title: string; status: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
      <p className="text-sm font-bold text-white/45">{title}</p>
      <p className="mt-3 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-black text-white">
        {status}
      </p>
    </div>
  );
}

function Service({
  name,
  price,
  text,
}: {
  name: string;
  price: string;
  text: string;
}) {
  return (
    <div className="rounded-[2rem] border border-black/10 bg-white/75 p-8 shadow-sm">
      <h3 className="text-2xl font-black">{name}</h3>
      <p className="mt-4 text-black/60">{text}</p>
      <p className="mt-8 text-4xl font-black">{price}</p>
      <a
        href="#contact"
        className="mt-8 block rounded-full bg-black px-6 py-4 text-center font-bold text-white"
      >
        Start Here
      </a>
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="text-sm font-black text-black/50">{label}</label>
      <input
        type="number"
        min="0"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f7f2ea] px-4 py-3 outline-none"
      />
    </div>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <p className="text-xs font-black uppercase text-black/40">{label}</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  );
}