import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext(); // fresh, no cookies/localStorage
const page = await context.newPage();

await page.goto("http://localhost:5173/services/buy-rent", { waitUntil: "networkidle" });
await page.waitForTimeout(600);
console.log("URL after visiting /services/buy-rent logged out:", page.url());

const localStorageDump = await page.evaluate(() => JSON.stringify(localStorage));
console.log("localStorage:", localStorageDump);

console.log("DONE");
await browser.close();
