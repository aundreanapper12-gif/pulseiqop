const pulseiqUrl = "https://www.pulseiqsolutions.site/";
const linkedInUrl = "https://www.linkedin.com/in/aundreanapper1205";
const emailAddress = "aundreanapper12@gmail.com/";
const projects = [
  {
    title: "PulseIQ Operations Intelligence",
    type: "Live Website / AI Operations Tool",
    description:
      "A business operations website and dashboard concept that helps companies identify hidden workflow gaps, missed lead risks, customer friction, and operational inefficiencies.",
    impact:
      "Shows employers that I can combine business analysis, customer experience, AI ideas, and dashboard thinking into one practical solution.",
    tools: ["Next.js", "Operations Analytics", "AI Insights", "Customer Experience"],
    liveUrl: pulseiqUrl,
    buttonText: "Open PulseIQ Website",
  },
  {
    title: "Revenue Leak Scanner",
    type: "Business Analysis Project",
    description:
      "A scoring tool concept that reviews missed leads, follow-up delays, unclear contact options, website friction, and automation opportunities for small businesses.",
    impact:
      "Helps businesses understand where they may be losing money, time, and customer trust before the problem grows.",
    tools: ["Business Analysis", "Scoring Model", "Process Improvement", "Automation Strategy"],
    liveUrl: pulseiqUrl,
    buttonText: "View Scanner Concept",
  },
  {
    title: "KPI Operations Dashboard",
    type: "Portfolio Dashboard Project",
    description:
      "A professional dashboard concept tracking operational health, efficiency score, response speed, missed opportunity risk, and customer satisfaction.",
    impact:
      "Demonstrates how I use metrics to explain performance, identify trends, and support better leadership decisions.",
    tools: ["KPI Tracking", "Excel Thinking", "Dashboard Design", "Performance Analytics"],
    liveUrl: pulseiqUrl,
    buttonText: "View Dashboard Demo",
  },
  {
    title: "Performance Readiness Scorecard",
    type: "Workforce Analytics Project",
    description:
      "A scorecard concept that measures quality, consistency, efficiency, missed opportunity risk, and coaching readiness for remote operations teams.",
    impact:
      "Connects daily work performance to coaching, training, QA, and advancement readiness.",
    tools: ["Workforce Analytics", "QA Metrics", "Coaching", "Excel Dashboards"],
    liveUrl: pulseiqUrl,
    buttonText: "View Scorecard Concept",
  },
  {
    title: "Supplier Delivery Analysis",
    type: "Academic Business Analytics Project",
    description:
      "A descriptive analytics project analyzing shipment timing, supplier performance, defect rates, and delivery trends using business data.",
    impact:
      "Shows applied analytics skills through descriptive statistics, pivot tables, trend identification, and visual reporting.",
    tools: ["Excel", "Descriptive Statistics", "Pivot Tables", "Data Visualization"],
    liveUrl: "#contact",
    buttonText: "Ask About This Project",
  },
];

const skills = [
  "Operations Analytics",
  "Customer Experience",
  "KPI Dashboards",
  "Business Analysis",
  "Workflow Improvement",
  "Excel Data Analysis",
  "AI Workflow Ideas",
  "Process Documentation",
  "QA Thinking",
  "Training Support",
  "Performance Coaching",
  "Remote Operations",
  "HR Analytics Interest",
  "Workforce Analytics",
  "Problem Solving",
  "Customer Support Strategy",
];

const resumeHighlights = [
  "Built portfolio projects focused on operations analytics, customer experience, KPI tracking, AI workflow ideas, and process improvement.",
  "Created dashboard and scorecard concepts that translate performance data into clear business insights and leadership recommendations.",
  "Applied business analytics coursework to real-world problems using Excel, descriptive statistics, visual reporting, and what-if thinking.",
  "Developed training-style resources, workflow guides, coaching prompts, and documentation designed to help teams perform more consistently.",
  "Focused on remote roles that combine customer experience, QA, operations, HR, analytics, and workforce performance.",
];

const dashboardMetrics = [
  { label: "Operational Health", value: "88%", note: "Overall business workflow score" },
  { label: "Efficiency Score", value: "91/100", note: "Performance and process strength" },
  { label: "CX Score", value: "94%", note: "Customer experience indicator" },
  { label: "Risk Level", value: "Low", note: "Missed opportunity risk" },
];

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#070A13] text-white">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#070A13]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <a href="#home" className="text-lg font-black tracking-tight">
            Aundrea<span className="text-violet-300">.</span>
          </a>

          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#projects" className="hover:text-white">Projects</a>
            <a href="#skills" className="hover:text-white">Skills</a>
            <a href="#resume" className="hover:text-white">Resume</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>

          <a
            href={pulseiqUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-violet-100"
          >
            Open PulseIQ
          </a>
        </div>
      </nav>

      <section id="home" className="relative overflow-hidden px-6 py-24 lg:px-8 lg:py-32">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute right-0 top-40 h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-violet-200 shadow-2xl backdrop-blur">
              Operations Analytics • AI Workflows • Customer Experience
            </div>

            <h1 className="max-w-4xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              I turn business problems into clear operational insights.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              I’m Aundrea Napper, an operations and analytics-focused professional building practical dashboards, scorecards, and AI-inspired tools for customer experience, workflow improvement, and workforce performance.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#projects"
                className="rounded-full bg-violet-300 px-7 py-4 text-center font-bold text-slate-950 shadow-xl shadow-violet-500/20 transition hover:-translate-y-1 hover:bg-violet-200"
              >
                View Portfolio Projects
              </a>

              <a
                href={pulseiqUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 bg-white/5 px-7 py-4 text-center font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
              >
                Visit PulseIQ Operations
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="rounded-[1.5rem] bg-[#0D1224] p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Featured Project</p>
                  <h2 className="text-2xl font-bold">PulseIQ Command Center</h2>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Live Website
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {dashboardMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-sm text-slate-400">{metric.label}</p>
                    <p className="mt-2 text-3xl font-black">{metric.value}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{metric.note}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-violet-300/20 bg-violet-300/10 p-5">
                <p className="text-sm font-semibold text-violet-100">AI Insight Example</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Missed lead risk decreases when response speed, follow-up consistency, workflow clarity, and staffing coverage are reviewed together instead of separately.
                </p>
              </div>

              <a
                href={pulseiqUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 block rounded-full bg-white px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-violet-100"
              >
                Open Live PulseIQ Site
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-violet-300">About Me</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              Built for roles where data meets people.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-slate-300">
            <p>
              My work sits at the intersection of operations, customer experience, HR thinking, and business analytics. I’m focused on roles where I can help teams improve workflows, understand performance, support customers better, and make smarter decisions with data.
            </p>
            <p>
              This portfolio highlights how I think: identify the problem, measure what matters, find the pattern, explain the business impact, and recommend realistic next steps.
            </p>
          </div>
        </div>
      </section>

      <section id="projects" className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-violet-300">Featured Projects</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              Projects employers can click, understand, and remember.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              These projects connect analytics, operations, customer experience, process improvement, and AI-powered business thinking.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:bg-white/[0.07]"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <p className="rounded-full bg-violet-300/10 px-4 py-2 text-xs font-bold text-violet-200">
                    {project.type}
                  </p>
                  <span className="text-2xl transition group-hover:translate-x-1">↗</span>
                </div>

                <h3 className="text-2xl font-black">{project.title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{project.description}</p>

                <div className="mt-6 rounded-2xl border border-white/10 bg-[#0D1224] p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Business Impact</p>
                  <p className="mt-2 leading-7 text-slate-200">{project.impact}</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={project.liveUrl}
                    target={project.liveUrl.startsWith("http") ? "_blank" : undefined}
                    rel={project.liveUrl.startsWith("http") ? "noreferrer" : undefined}
                    className="rounded-full bg-violet-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-violet-200"
                  >
                    {project.buttonText}
                  </a>

                  <a
                    href="#contact"
                    className="rounded-full border border-white/10 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Discuss Project
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-8 lg:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-violet-300">Skills</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            What I bring to a team
          </h2>

          <div className="mt-10 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill} className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-black/10">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="resume" className="px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-violet-300">Resume Highlights</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              Positioning for operations, QA, training, HR, and analytics roles.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              This section gives employers a quick snapshot of how my experience and projects translate into professional value.
            </p>
          </div>

          <div className="space-y-4">
            {resumeHighlights.map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <p className="leading-7 text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-violet-300/20 bg-violet-300/10 p-8 text-center shadow-2xl shadow-violet-500/10 lg:p-14">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-violet-200">Career Focus</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">Roles I’m targeting</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Operations Coordinator, Customer Experience Specialist, QA Specialist, Training Coordinator, Workforce Analytics Assistant, HR Operations Assistant, Business Analyst Assistant, and Remote Team Support roles.
          </p>
        </div>
      </section>

      <section id="contact" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-violet-300">Contact</p>
          <h2 className="mt-4 text-5xl font-black tracking-tight">Let’s connect.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            I’m open to remote opportunities where I can support operations, customer experience, training, QA, HR, analytics, and process improvement.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={`mailto:${emailAddress}`}
              className="rounded-full bg-violet-300 px-8 py-4 font-bold text-slate-950 shadow-xl shadow-violet-500/20 transition hover:-translate-y-1 hover:bg-violet-200"
            >
              Email Me
            </a>

            <a
              href={linkedInUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-white/5 px-8 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-white/10"
            >
              LinkedIn
            </a>

            <a
              href={pulseiqUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-white/5 px-8 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-white/10"
            >
              PulseIQ Website
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500 lg:px-8">
        © 2026 Aundrea Napper. Operations Analytics Portfolio.
      </footer>
    </main>
  );
}
