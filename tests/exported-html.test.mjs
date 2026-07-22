import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../out/", import.meta.url);

async function readOut(path) {
  return readFile(new URL(path, root), "utf8");
}

test("exports a trust-focused homepage for Cloudflare Pages", async () => {
  const html = await readOut("index.html");

  assert.match(html, /<html lang="ko">/);
  assert.match(html, /operation-panel-title/);
  assert.match(html, /latest-panel-title/);
  assert.match(html, /policy-panel-title/);
  assert.match(html, /best-panel-title/);
  assert.match(html, /editor-note-title/);
  assert.match(html, /digest-title/);
  assert.match(html, /office-printer-paper-truce/);
  assert.match(html, /subway-door-position-science/);
  assert.match(html, /\/archive\//);
  assert.match(html, /\/privacy\//);
  assert.match(html, /\/advertising-policy\//);
  assert.match(html, /\/takedown\//);
  assert.match(html, /<link rel="canonical" href="https:\/\/oneulutkim\.kr\/"/);
  assert.match(html, /<meta property="og:url" content="https:\/\/oneulutkim\.kr\/"/);
  assert.match(html, /<meta name="google-site-verification" content="9f9nGoLWpS9LLtN5zbmkgiOip8_w-X-aymNUa-UHD4M"/);
  assert.match(html, /<meta name="google-site-verification" content="Z6quXrXvnnQHQy83CW_e3ndk5zP87WJsJVD1wN3rMQI"/);
  assert.match(html, /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-1441018945572157/);
  assert.doesNotMatch(html, /oneulutkim\.pages\.dev/);
  assert.doesNotMatch(html, /Login|1,284|ad-slot|pub-0000000000000000/i);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton|codex-preview/i);
});

test("exports board, archive, article, search, and policy pages", async () => {
  const files = [
    "board/daily/index.html",
    "archive/index.html",
    "posts/ramen-water-precision/index.html",
    "posts/office-printer-paper-truce/index.html",
    "search/index.html",
    "about/index.html",
    "editorial-policy/index.html",
    "corrections/index.html",
    "contact/index.html",
    "privacy/index.html",
    "cookie-policy/index.html",
    "advertising-policy/index.html",
    "terms/index.html",
    "disclaimer/index.html",
    "youth-protection/index.html",
    "takedown/index.html",
  ];

  const pages = await Promise.all(files.map((file) => readOut(file)));
  for (const html of pages) {
    assert.match(html, /<html lang="ko">/);
  }

  assert.match(pages[0], /filter-matrix/);
  assert.match(pages[0], /hot-keywords/);
  assert.match(pages[1], /archive-all-title/);
  assert.match(pages[1], /office-printer-paper-truce/);
  assert.match(pages[2], /Article/);
  assert.match(pages[2], /BreadcrumbList/);
  assert.match(pages[3], /Article/);
  assert.match(pages[3], /BreadcrumbList/);
  assert.match(pages[4], /search-tools/);
  assert.match(pages[8], /chw1914@gmail.com/);
  assert.match(pages[9], /Google AdSense/);
  assert.match(pages[10], /Google/);
  assert.match(pages[11], /Google AdSense/);
  assert.match(pages[15], /chw1914@gmail.com/);
});

test("exports strengthened body copy for previously short posts", async () => {
  const [ramen, notification] = await Promise.all([
    readOut("posts/ramen-water-precision/index.html"),
    readOut("posts/notification-badge-weight/index.html"),
  ]);

  assert.match(ramen, /라면 물의 기준/);
  assert.match(ramen, /라면 물을 맞추는 사람의 표정/);
  assert.match(ramen, /href="\/search\/\?q=[^"]+amp;sort=recommends"/);
  assert.match(ramen, /class="article-nav"/);
  assert.match(notification, /알림 배지의 숫자/);
  assert.match(notification, /알림 배지의 무게/);
});

test("exports crawler and adsense preparation files", async () => {
  const [ads, robots, sitemap] = await Promise.all([
    readOut("ads.txt"),
    readOut("robots.txt"),
    readOut("sitemap.xml"),
  ]);

  assert.match(ads, /google\.com, pub-1441018945572157, DIRECT, f08c47fec0942fa0/);
  assert.doesNotMatch(ads, /pub-0000000000000000/);
  assert.match(robots, /Allow: \//);
  assert.match(robots, /https:\/\/oneulutkim\.kr\/sitemap\.xml/);
  assert.doesNotMatch(robots, /oneulutkim\.pages\.dev/);
  assert.match(sitemap, /https:\/\/oneulutkim\.kr\//);
  assert.match(sitemap, /2026-07-22T00:00:00\.000Z/);
  assert.doesNotMatch(sitemap, /oneulutkim\.pages\.dev/);
  assert.match(sitemap, /archive\//);
  assert.match(sitemap, /search\//);
  assert.match(sitemap, /board\/daily\//);
  assert.match(sitemap, /posts\/office-printer-paper-truce\//);
  assert.match(sitemap, /editorial-policy\//);
  assert.match(sitemap, /corrections\//);
  assert.match(sitemap, /cookie-policy\//);
  assert.match(sitemap, /advertising-policy\//);
  assert.match(sitemap, /disclaimer\//);
  assert.match(sitemap, /youth-protection\//);
});
