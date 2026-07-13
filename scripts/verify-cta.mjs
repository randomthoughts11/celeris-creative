import { chromium } from "playwright";

const browser = await chromium.launch();

// Desktop: final CTA
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
await page.evaluate(() => {
  document.getElementById("cta-title")?.scrollIntoView({ block: "center" });
});
await page.waitForTimeout(1800);
await page.screenshot({ path: "screenshots/sections/final-cta.png" });

// Mobile: hero
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await m.waitForTimeout(2500);
await m.screenshot({ path: "screenshots/sections/hero-mobile.png" });

// Mobile: menu open
await m.click("button[aria-label='Open menu']");
await m.waitForTimeout(1000);
await m.screenshot({ path: "screenshots/sections/menu-mobile.png" });

await browser.close();
console.log("done");
