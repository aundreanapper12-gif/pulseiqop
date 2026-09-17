import { NextRequest, NextResponse } from "next/server";

const allowedSources = new Set(["/insights", "/resources/profit-leak-checklist", "/"]);

export async function POST(request: NextRequest) {
  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  const body = await request.json().catch(() => null) as { email?: string; source?: string } | null;
  const email = body?.email?.trim().toLowerCase();
  const source = body?.source?.trim() || "/insights";

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
  }

  if (!webhook) {
    return NextResponse.json({ message: "Email signup is being connected. You can still open the free checklist now." }, { status: 503 });
  }

  const response = await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      email,
      source: allowedSources.has(source) ? source : "/insights",
      list: "pulseiq-weekly",
      leadMagnet: "profit-leak-checklist",
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({ message: "We could not add you right now. Please try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
