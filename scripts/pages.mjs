import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const name of ["services", "work", "about", "contact"]) {
  await page.goto(`http://localhost:3000/${name}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);
  await page.screenshot({ path: `screenshots/sections/page-${name}.png` });
  console.log(name);
}

// Pricing block on services
await page.goto("http://localhost:3000/services", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
await page.evaluate(() => {
  document.querySelectorAll("h2").forEach((h) => {
    if (h.textContent?.includes("Simple pricing")) h.scrollIntoView({ block: "start" });
  });
  window.scrollBy(0, -100);
});
await page.waitForTimeout(1800);
await page.screenshot({ path: "screenshots/sections/pricing.png" });

await browser.close();
console.log("done");
