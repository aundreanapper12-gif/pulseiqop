export type TrialState = {
  startedAt: string;
  endsAt: string;
  businessName?: string;
  industry?: string;
  concern?: string;
};

export type TrialStatus = "missing" | "active" | "expired" | "invalid";

export function parseTrialState(raw: string | null): TrialState | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<TrialState>;
    if (typeof value.startedAt !== "string" || typeof value.endsAt !== "string") return null;
    const startedAt = new Date(value.startedAt).getTime();
    const endsAt = new Date(value.endsAt).getTime();
    if (!Number.isFinite(startedAt) || !Number.isFinite(endsAt) || endsAt <= startedAt) return null;
    return value as TrialState;
  } catch {
    return null;
  }
}

export function trialStatus(trial: TrialState | null, nowMs: number): TrialStatus {
  if (!trial) return "missing";
  const endsAt = new Date(trial.endsAt).getTime();
  if (!Number.isFinite(endsAt)) return "invalid";
  return endsAt > nowMs ? "active" : "expired";
}

export function trialDaysLeft(trial: TrialState | null, nowMs: number) {
  if (trialStatus(trial, nowMs) !== "active") return 0;
  return Math.max(1, Math.ceil((new Date(trial!.endsAt).getTime() - nowMs) / 86_400_000));
}
