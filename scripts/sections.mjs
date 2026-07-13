import { chromium } from "playwright";
import { mkdirSync } from "fs";

mkdirSync("screenshots/sections", { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
await page.screenshot({ path: "screenshots/sections/hero.png" });

const stops = [
  ["marquee", 900],
  ["services", 1700],
  ["process", 3600],
  ["work", 5200],
  ["why", 8200],
  ["ai", 9800],
  ["industries", 11400],
  ["testimonials", 12800],
  ["faq", 14000],
  ["cta", 15600],
];

for (const [name, y] of stops) {
  await page.evaluate((yy) => window.scrollTo({ top: yy }), y);
  await page.waitForTimeout(1600);
  await page.screenshot({ path: `screenshots/sections/${name}.png` });
  console.log(name);
}

await browser.close();
console.log("done");
