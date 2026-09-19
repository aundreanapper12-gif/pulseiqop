import test from "node:test";
import assert from "node:assert/strict";
import { parseTrialState, trialDaysLeft, trialStatus } from "../app/trial/state";

test("trial state rejects malformed storage and identifies access status", () => {
  assert.equal(parseTrialState(null), null);
  assert.equal(parseTrialState("not-json"), null);
  assert.equal(parseTrialState(JSON.stringify({ startedAt: "bad", endsAt: "also-bad" })), null);

  const now = Date.UTC(2026, 8, 19, 12);
  const active = parseTrialState(JSON.stringify({
    startedAt: new Date(now - 86_400_000).toISOString(),
    endsAt: new Date(now + 13 * 86_400_000).toISOString(),
  }));
  assert.equal(trialStatus(active, now), "active");
  assert.equal(trialDaysLeft(active, now), 13);
  assert.equal(trialStatus(active, now + 14 * 86_400_000), "expired");
  assert.equal(trialDaysLeft(active, now + 14 * 86_400_000), 0);
});
