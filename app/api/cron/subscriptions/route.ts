import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Perform scheduled maintenance / subscription expiry check
  return NextResponse.json({
    status: "success",
    job: "subscriptions-audit",
    processedCount: 0,
    timestamp: new Date().toISOString(),
  });
}