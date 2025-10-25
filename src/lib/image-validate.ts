import { parse } from "node:url";
import { promises as fs } from "node:fs";
import path from "node:path";

export type ImageItem = { alt: string; src: string };

export type ImageRegistry = {
  homeHero: ImageItem[];
  compliance: ImageItem[];
  revenue: ImageItem[];
  risk: ImageItem[];
  whoWeServe: ImageItem[];
  partners: Record<string, ImageItem[]>;
};

export function validateImageUrl(url: string): { ok: boolean; reason?: string } {
  try {
    const u = new URL(url);
    if (!/^https:$/i.test(u.protocol)) return { ok: false, reason: "Only https URLs allowed" };
    const host = u.hostname;
    if (!/(images\.pexels\.com|images\.unsplash\.com|plus\.unsplash\.com)$/i.test(host)) {
      return { ok: false, reason: `Host not allowed: ${host}` };
    }
    const q = u.searchParams;
    const wParam = q.get("w");
    if (wParam) {
      const w = Number(wParam);
      if (Number.isFinite(w) && w < 1920) {
        return { ok: false, reason: `width param w=${w} < 1920` };
      }
    } else {
      // Pexels uses w param; ensure at least one of w present or it's a large original path
      // For Unsplash, we require w>=1920 param for deterministic sizing
      if (/unsplash\.com/i.test(host)) {
        return { ok: false, reason: "Unsplash URL missing w param" };
      }
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: "Invalid URL" };
  }
}

export async function loadRegistry(): Promise<ImageRegistry> {
  const file = path.join(process.cwd(), "src", "data", "images.json");
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw) as ImageRegistry;
}
