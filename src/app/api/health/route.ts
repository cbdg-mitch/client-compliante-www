import { NextResponse } from "next/server";

export async function GET() {
  const body = {
    ok: true,
    service: "compliante-www",
    env: process.env.NODE_ENV || "unknown",
    timestamp: new Date().toISOString(),
  } as const;

  // Explicitly disable caching at all layers (browser, proxies, CDNs)
  const headers = new Headers({
    "Cache-Control": "no-store, max-age=0, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
    // Some CDNs honor these
    "CDN-Cache-Control": "no-store",
    "Surrogate-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
  });

  return new NextResponse(JSON.stringify(body), {
    status: 200,
    headers,
  });
}
