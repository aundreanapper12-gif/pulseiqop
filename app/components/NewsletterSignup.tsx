"use client";

import { FormEvent, useState } from "react";
import { track } from "@vercel/analytics";
import { ArrowRight, Mail } from "lucide-react";

export default function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source: window.location.pathname }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.message || "Newsletter signup is not connected yet.");
      track("newsletter_signup", { source: window.location.pathname });
      setStatus("You’re on the list. Your free Profit Leak Checklist is ready below.");
      setEmail("");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Newsletter signup is not connected yet.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={`rounded-3xl border border-slate-900/10 bg-white ${compact ? "p-5" : "p-6 md:p-8"}`}>
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-700 text-white"><Mail size={18} /></span>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">PulseIQ Weekly</p>
          <h2 className={`${compact ? "mt-1 text-xl" : "mt-2 text-2xl md:text-3xl"} font-semibold`}>Get practical profit and operations insights.</h2>
          <p className="mt-2 leading-7 text-slate-600">Join the list for new guides, checklists, and practical ways to find costly operating gaps.</p>
        </div>
      </div>
      <form onSubmit={submit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="newsletter-email">Email address</label>
        <input id="newsletter-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@business.com" className="min-w-0 flex-1 rounded-xl border border-slate-900/10 bg-[#f8fafc] px-4 py-3.5 font-semibold outline-none focus:border-blue-700" />
        <button disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 font-semibold text-white disabled:opacity-60">{busy ? "Joining…" : "Join Free"} <ArrowRight size={16} /></button>
      </form>
      <p className="mt-2 text-xs leading-5 text-slate-500">By joining, you agree to receive PulseIQ educational and product emails. You can unsubscribe at any time. See the <a href="/privacy" className="font-semibold underline">Privacy Policy</a>.</p>
      {status ? <p role="status" className="mt-3 text-sm font-semibold text-slate-600">{status}</p> : null}
      <a href="/resources/profit-leak-checklist" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">Open the free Profit Leak Checklist <ArrowRight size={15} /></a>
    </div>
  );
}
