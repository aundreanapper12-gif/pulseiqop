"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  LineChart,
  Radar,
  ShieldCheck,
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

const trendData = [
  { month: "Jan", efficiency: 62, revenueRisk: 42 },
  { month: "Feb", efficiency: 68, revenueRisk: 36 },
  { month: "Mar", efficiency: 74, revenueRisk: 28 },
  { month: "Apr", efficiency: 81, revenueRisk: 21 },
  { month: "May", efficiency: 88, revenueRisk: 14 },
];

const leakData = [
  { name: "Missed Calls", value: 38 },
  { name: "Slow Follow-Up", value: 27 },
  { name: "Scheduling Gaps", value: 19 },
  { name: "Workflow Errors", value: 16 },
];

const features = [
  {
    icon: TrendingUp,
    title: "Revenue Leak Detection",
    desc: "Find where missed calls, slow replies, and broken workflows are costing you money.",
  },
  {
    icon: Workflow,
    title: "Workflow Intelligence",
    desc: "Identify bottlenecks across intake, scheduling, follow-up, and customer experience.",
  },
  {
    icon: Brain,
    title: "AI Recommendations",
    desc: "Receive practical next steps based on your business patterns and operational risks.",
  },
  {
    icon: Radar,
    title: "Operational Health Scoring",
    desc: "Turn scattered business activity into a clear score your team can actually act on.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f2ea] text-[#111111]">
      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f2ea]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-black text-white">
              <Sparkles size={18} />
            </div>
            <span className="text-xl font-black tracking-tight">PulseIQ</span>
          </div>

          <div className="hidden items-center gap-8 text-sm font-semibold text-black/70 md:flex">
            <a href="#features">Features</a>
            <a href="#dashboard">Dashboard</a>
            <a href="#scan">Free Scan</a>
            <a href="#services">Services</a>
          </div>

          <a
            href="#scan"
            className="rounded-full bg-black px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-105"
          >
            Get Free Scan
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-rose-200/40 blur-3xl" />
        <div className="absolute right-20 top-40 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-bold shadow-sm">
              <Zap size={16} />
              AI-Powered Operational Intelligence
            </div>

            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Your business is losing revenue every day.{" "}
              <span className="text-black/50">PulseIQ shows you where.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-black/65">
              PulseIQ helps service businesses uncover missed leads, workflow
              gaps, staffing risks, and customer experience issues using AI,
              analytics, and operational intelligence.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#scan"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 font-bold text-white shadow-xl transition hover:scale-105"
              >
                Get Free Business Scan <ArrowRight size={18} />
              </a>
              <a
                href="#dashboard"
                className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/70 px-7 py-4 font-bold text-black shadow-sm transition hover:scale-105"
              >
                View Dashboard
              </a>
            </div>
          </motion.div>

          {/* HERO DASHBOARD */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="rounded-[2rem] border border-black/10 bg-white/75 p-5 shadow-2xl backdrop-blur-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-black/50">
                  PulseIQ Command Center
                </p>
                <h3 className="text-2xl font-black">Operational Snapshot</h3>
              </div>
              <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-black text-emerald-700">
                LIVE
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Efficiency Score", "88%", "+14%"],
                ["Revenue at Risk", "$18.4K", "-32%"],
                ["Missed Leads", "42", "-21%"],
              ].map(([label, value, change]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-black/10 bg-[#faf7f1] p-4"
                >
                  <p className="text-xs font-bold uppercase text-black/45">
                    {label}
                  </p>
                  <p className="mt-2 text-2xl font-black">{value}</p>
                  <p className="mt-1 text-sm font-bold text-emerald-600">
                    {change}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 h-64 rounded-3xl border border-black/10 bg-white p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="efficiency" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#111" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#111" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="efficiency"
                    stroke="#111"
                    fill="url(#efficiency)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-5 rounded-3xl bg-black p-5 text-white">
              <p className="text-sm font-bold text-white/50">AI Insight</p>
              <p className="mt-2 text-lg font-semibold leading-7">
                Missed lead risk spikes after 3 PM. Add a follow-up workflow and
                backup coverage window to recover an estimated $4.2K/month.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LOGO / TRUST STRIP */}
      <section className="border-y border-black/10 bg-white/55 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 text-sm font-black uppercase tracking-[0.2em] text-black/35">
          <span>Revenue Intelligence</span>
          <span>Workflow Audits</span>
          <span>KPI Dashboards</span>
          <span>Customer Experience</span>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 font-black uppercase tracking-[0.25em] text-black/40">
              What PulseIQ Finds
            </p>
            <h2 className="text-4xl font-black tracking-tight md:text-6xl">
              Turn messy operations into measurable intelligence.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  whileHover={{ y: -8 }}
                  className="rounded-[2rem] border border-black/10 bg-white/70 p-7 shadow-sm"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-black">{feature.title}</h3>
                  <p className="mt-4 leading-7 text-black/60">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section id="dashboard" className="bg-black px-6 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 font-black uppercase tracking-[0.25em] text-white/40">
              Live Intelligence Layer
            </p>
            <h2 className="text-4xl font-black tracking-tight md:text-6xl">
              See the hidden patterns behind lost revenue.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
              PulseIQ converts missed calls, late follow-ups, inconsistent
              staffing, and customer friction into clear executive-level action.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Operational health score",
                "Revenue leak estimate",
                "Workflow bottleneck alerts",
                "AI-generated next steps",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-400" size={20} />
                  <span className="font-semibold text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
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
                {[
                  ["Response Delay", "High Risk", "bg-red-500/20 text-red-200"],
                  ["Staffing Coverage", "Moderate", "bg-amber-500/20 text-amber-200"],
                  ["Customer Follow-Up", "Needs Review", "bg-blue-500/20 text-blue-200"],
                ].map(([title, status, color]) => (
                  <div
                    key={title}
                    className="rounded-3xl border border-white/10 bg-white/10 p-5"
                  >
                    <p className="text-sm font-bold text-white/45">{title}</p>
                    <p className={`mt-3 inline-flex rounded-full px-4 py-2 text-sm font-black ${color}`}>
                      {status}
                    </p>
                  </div>
                ))}
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

      {/* SERVICES */}
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
            {[
              {
                name: "AI Revenue Leak Audit",
                price: "$97",
                desc: "A focused audit identifying missed revenue and operational gaps.",
              },
              {
                name: "KPI Dashboard Build",
                price: "$297",
                desc: "A custom dashboard for tracking leads, calls, follow-up, and efficiency.",
              },
              {
                name: "Operations Intelligence Plan",
                price: "$497+",
                desc: "A complete workflow improvement plan with AI recommendations.",
              },
            ].map((service) => (
              <div
                key={service.name}
                className="rounded-[2rem] border border-black/10 bg-white/75 p-8 shadow-sm"
              >
                <h3 className="text-2xl font-black">{service.name}</h3>
                <p className="mt-4 text-black/60">{service.desc}</p>
                <p className="mt-8 text-4xl font-black">{service.price}</p>
                <button className="mt-8 w-full rounded-full bg-black px-6 py-4 font-bold text-white">
                  Start Here
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCAN FORM */}
      <section id="scan" className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.5rem] bg-[#111] p-8 text-white md:p-12 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
              <Target size={16} />
              Free Business Scan
            </div>
            <h2 className="text-4xl font-black md:text-5xl">
              Find your biggest operational leak in under 3 minutes.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
              Enter a few quick details and receive a starter view of your
              operational risk, revenue leak potential, and workflow improvement
              opportunities.
            </p>
          </div>

          <form className="rounded-[2rem] bg-white p-6 text-black">
            <div className="grid gap-4">
              {[
                "Business Name",
                "Monthly Leads",
                "Missed Call %",
                "Average Response Time",
                "Review Score",
                "Biggest Workflow Problem",
              ].map((label) => (
                <div key={label}>
                  <label className="text-sm font-black text-black/50">
                    {label}
                  </label>
                  <input
                    className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f7f2ea] px-4 py-3 outline-none"
                    placeholder={label}
                  />
                </div>
              ))}
              <button
                type="button"
                className="mt-2 rounded-full bg-black px-6 py-4 font-black text-white"
              >
                Generate My Scan
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h3 className="text-2xl font-black">PulseIQ Operations</h3>
            <p className="mt-2 text-black/55">
              AI-powered operational intelligence for service businesses.
            </p>
          </div>

          <div className="flex gap-5 text-sm font-bold text-black/55">
            <a href="#features">Features</a>
            <a href="#dashboard">Dashboard</a>
            <a href="#scan">Scan</a>
          </div>
        </div>
      </footer>
    </main>
  );
}