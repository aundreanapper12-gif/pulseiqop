"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Clock3, Sparkles } from "lucide-react";
import { parseTrialState, trialDaysLeft, trialStatus, type TrialState } from "../trial/state";

const TRIAL_KEY = "pulseiq:trial:v1";

export default function TrialBanner() {
  const [trial, setTrial] = useState<TrialState | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [nowMs, setNowMs] = useState(0);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(TRIAL_KEY);
      if (raw) setTrial(parseTrialState(raw));
    } catch {
      // Keep the workspace usable when browser storage is unavailable.
    } finally {
      setNowMs(Date.now());
      setHydrated(true);
    }
  }, []);

  const daysLeft = useMemo(() => {
    if (!trial || !nowMs) return 0;
    return trialDaysLeft(trial, nowMs);
  }, [trial, nowMs]);

  if (!hydrated) return null;

  if (!trial) {
    return (
      <div className="border-b border-blue-200 bg-blue-50 px-5 py-3 text-slate-900 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Sparkles size={18} className="mt-0.5 shrink-0 text-blue-700" />
            <div><p className="font-semibold">Unlock the full PulseIQ experience for 14 days.</p><p className="text-sm text-slate-600">No card required. Guided onboarding, executive dashboard, scenario planning, and action tracking.</p></div>
          </div>
          <a href="/trial" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white">Start free trial <ArrowRight size={15} /></a>
        </div>
      </div>
    );
  }

  const expired = trialStatus(trial, nowMs) !== "active";
  return (
    <div className={`border-b px-5 py-3 md:px-8 ${expired ? "border-amber-200 bg-amber-50" : "border-emerald-200 bg-emerald-50"}`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Clock3 size={18} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">{expired ? "Your 14-day Premium Trial has ended." : `${daysLeft} day${daysLeft === 1 ? "" : "s"} left in your Premium Trial.`}</p>
            <p className="text-sm text-slate-600">{expired ? "Your browser workspace still works. Upgrade when you want recurring intelligence and deeper analysis." : "Use the dashboard to track priorities, test scenarios, and measure improvements."}</p>
          </div>
        </div>
        <a href={expired ? "/pricing" : "/dashboard"} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">{expired ? "View plans" : "Open dashboard"} <ArrowRight size={15} /></a>
      </div>
    </div>
  );
}
