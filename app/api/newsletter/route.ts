import { NextRequest, NextResponse } from "next/server";

const allowedSources = new Set(["/insights", "/resources/profit-leak-checklist", "/"]);

export async function POST(request: NextRequest) {
  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ message: "Send newsletter signup data as JSON." }, { status: 415 });
  }
  const body = await request.json().catch(() => null) as { email?: string; source?: string } | null;
  const email = body?.email?.trim().toLowerCase();
  const source = body?.source?.trim() || "/insights";

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
  }

  if (!webhook) {
    return NextResponse.json({ message: "Email signup is being connected. You can still open the free checklist now." }, { status: 503 });
  }

  let webhookUrl: URL;
  try {
    webhookUrl = new URL(webhook);
    if (webhookUrl.protocol !== "https:") throw new Error("Webhook must use HTTPS");
  } catch {
    return NextResponse.json({ message: "Email signup is temporarily unavailable. You can still open the free checklist now." }, { status: 503 });
  }

  let response: Response;
  try {
    response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email,
        source: allowedSources.has(source) ? source : "/insights",
        list: "pulseiq-weekly",
        leadMagnet: "profit-leak-checklist",
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
  } catch {
    return NextResponse.json({ message: "We could not add you right now. Please try again shortly." }, { status: 502 });
  }

  if (!response.ok) {
    return NextResponse.json({ message: "We could not add you right now. Please try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
