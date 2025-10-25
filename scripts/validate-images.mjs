#!/usr/bin/env node
import https from 'node:https';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

function head(url) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: 'HEAD' }, (res) => {
      resolve({ status: res.statusCode || 0 });
    });
    req.on('error', () => resolve({ status: 0 }));
    req.end();
  });
}

function validateImageUrl(url) {
  try {
    const u = new URL(url);
    if (!/^https:$/i.test(u.protocol)) return { ok: false, reason: 'Only https URLs allowed' };
    const host = u.hostname;
    if (!/(images\.pexels\.com|images\.unsplash\.com|plus\.unsplash\.com)$/i.test(host)) {
      return { ok: false, reason: `Host not allowed: ${host}` };
    }
    const q = u.searchParams;
    const wParam = q.get('w');
    if (wParam) {
      const w = Number(wParam);
      if (Number.isFinite(w) && w < 1920) {
        return { ok: false, reason: `width param w=${w} < 1920` };
      }
    } else {
      if (/unsplash\.com/i.test(host)) {
        return { ok: false, reason: 'Unsplash URL missing w param' };
      }
    }
    return { ok: true };
  } catch {
    return { ok: false, reason: 'Invalid URL' };
  }
}

(async () => {
  try {
    const file = path.join(process.cwd(), 'src', 'data', 'images.json');
    const reg = JSON.parse(await readFile(file, 'utf8'));
    const all = [
      ...reg.homeHero,
      ...reg.compliance,
      ...reg.revenue,
      ...reg.risk,
      ...reg.whoWeServe,
      ...Object.values(reg.partners).flat(),
    ];

    let ok = true;
    for (const item of all) {
      const basic = validateImageUrl(item.src);
      if (!basic.ok) {
        console.error(`✗ Invalid URL: ${item.src} (${basic.reason})`);
        ok = false;
        continue;
      }
      const res = await head(item.src);
      if (res.status !== 200) {
        console.error(`✗ HTTP ${res.status} for ${item.src}`);
        ok = false;
      } else {
        console.log(`✓ ${item.src}`);
      }
    }

    if (!ok) {
      console.error('Image validation failed.');
      process.exit(1);
    } else {
      console.log('All images validated.');
      process.exit(0);
    }
  } catch (e) {
    console.error('Validator error:', e);
    process.exit(1);
  }
})();
