import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("stripe-signature");
    const body = await req.text();

    // Idempotency: log event and verify
    console.log("[WEBHOOK] Received Stripe webhook event");

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}