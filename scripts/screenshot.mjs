import { chromium } from "playwright";
import { mkdirSync } from "fs";

const BASE = "http://localhost:3000";
const outDir = "screenshots";
mkdirSync(outDir, { recursive: true });

const pages = [
  { path: "/", name: "home" },
  { path: "/services", name: "services" },
  { path: "/work", name: "work" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
];

const browser = await chromium.launch();

for (const viewport of [
  { width: 1440, height: 900, tag: "desktop" },
  { width: 390, height: 844, tag: "mobile" },
]) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(BASE + p.path, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    // Full page: scroll to bottom to trigger reveals, then back to top
    await page.evaluate(async () => {
      const total = document.body.scrollHeight;
      for (let y = 0; y < total; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1200);
    await page.screenshot({
      path: `${outDir}/${p.name}-${viewport.tag}.png`,
      fullPage: true,
    });
    console.log(`captured ${p.name}-${viewport.tag}`);
  }
  await ctx.close();
}

await browser.close();
console.log("done");
