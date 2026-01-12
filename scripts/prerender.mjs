import path from "node:path";
import { fileURLToPath } from "node:url";
import { promises as fs } from "node:fs";
import http from "node:http";
import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, "..", "dist");
const htmlPath = path.join(distDir, "index.html");

const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url || "/", "http://localhost");
  const pathname =
    requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
  const filePath = path.join(distDir, decodeURIComponent(pathname));
  try {
    const data = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});

await new Promise((resolve) => server.listen(0, resolve));
const { port } = server.address();
const url = `http://127.0.0.1:${port}/`;

const browser = await chromium.launch();
const context = await browser.newContext({
  userAgent: "PrerenderBot",
  viewport: { width: 1400, height: 900 },
});
const page = await context.newPage();

page.on("pageerror", (err) => {
  console.error("Prerender page error:", err);
});
page.on("console", (msg) => {
  if (msg.type() === "error") {
    console.error("Prerender console error:", msg.text());
  }
});

await page.goto(url, { waitUntil: "load" });
await page.waitForFunction(
  () => {
    const main = document.querySelector("main");
    const text = main?.textContent?.trim() || "";
    return text.length > 0;
  },
  { timeout: 30000 },
);
await page.waitForTimeout(800);

await page.evaluate(() => {
  document.documentElement.classList.remove(
    "boot-loader-skip",
    "boot-loading",
    "page-enter",
    "lang-change",
  );
  let bootLoader = document.getElementById("boot-loader");
  if (!bootLoader) {
    bootLoader = document.createElement("div");
    bootLoader.id = "boot-loader";
    bootLoader.setAttribute("aria-hidden", "true");
    const logo = document.createElement("div");
    logo.className = "boot-logo";
    logo.textContent = "MYSXAN";
    bootLoader.appendChild(logo);
    document.body.insertBefore(bootLoader, document.body.firstChild);
  }
  bootLoader.classList.remove("boot-loader--hide");
});

const html = await page.evaluate(() => {
  const doc = document.documentElement;
  return doc ? "<!doctype html>\n" + doc.outerHTML : "";
});

await fs.writeFile(htmlPath, html, "utf8");
await browser.close();
server.close();

console.log("Prerendered:", htmlPath);
