import { costCategories } from "./model";

export type RecoveryAction = {
  id: string;
  business: string;
  categoryId: string;
  categoryName: string;
  baselinePeriod: string;
  baselineActual: number;
  baselineTarget: number;
  plannedFix: string;
  createdAt: string;
  owner: string;
  followupPeriod: string;
  followupActual: number | null;
  evidence: string;
  ownerConfirmedAmount: number | null;
};

export const MAX_RECOVERY_ACTIONS = 30;
export const businessKey = (name: string) => name.trim().replace(/\s+/g, " ").toLocaleLowerCase("en-US");

const validAmount = (value: unknown) => typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 1_000_000_000;

export function normalizeRecoveryActions(value: unknown): RecoveryAction[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, MAX_RECOVERY_ACTIONS).flatMap((raw): RecoveryAction[] => {
    if (!raw || typeof raw !== "object") return [];
    const item = raw as Partial<RecoveryAction>;
    if (typeof item.id !== "string" || typeof item.business !== "string" ||
        !costCategories.some((category) => category.id === item.categoryId) ||
        !validAmount(item.baselineActual) || !validAmount(item.baselineTarget)) return [];
    return [{
      id: item.id.slice(0, 100),
      business: businessKey(item.business).slice(0, 100),
      categoryId: item.categoryId!,
      categoryName: costCategories.find((category) => category.id === item.categoryId)!.name,
      baselinePeriod: String(item.baselinePeriod || "").slice(0, 80),
      baselineActual: item.baselineActual!,
      baselineTarget: item.baselineTarget!,
      plannedFix: String(item.plannedFix || "").slice(0, 400),
      createdAt: String(item.createdAt || "").slice(0, 40),
      owner: String(item.owner || "").slice(0, 80),
      followupPeriod: String(item.followupPeriod || "").slice(0, 80),
      followupActual: validAmount(item.followupActual) ? item.followupActual! : null,
      evidence: String(item.evidence || "").slice(0, 500),
      ownerConfirmedAmount: validAmount(item.ownerConfirmedAmount) ? item.ownerConfirmedAmount! : null,
    }];
  });
}

export function recoveryObservation(action: RecoveryAction) {
  const comparable = action.followupPeriod.trim().length > 0 &&
    action.followupPeriod.trim() !== action.baselinePeriod.trim() &&
    action.followupActual !== null && validAmount(action.followupActual);
  if (!comparable) return null;
  const observedCostChange = Math.round((action.baselineActual - action.followupActual!) * 100) / 100;
  const baselineOverTarget = Math.max(0, action.baselineActual - action.baselineTarget);
  const followupOverTarget = Math.max(0, action.followupActual! - action.baselineTarget);
  const targetGapChange = Math.round((baselineOverTarget - followupOverTarget) * 100) / 100;
  const confirmed = action.ownerConfirmedAmount !== null && action.evidence.trim().length >= 10 &&
    observedCostChange > 0 && action.ownerConfirmedAmount >= 0 && action.ownerConfirmedAmount <= observedCostChange;
  return { observedCostChange, targetGapChange, ownerConfirmedAmount: confirmed ? action.ownerConfirmedAmount : null };
}
