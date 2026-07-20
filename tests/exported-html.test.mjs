import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../out/", import.meta.url);

async function readOut(path) {
  return readFile(new URL(path, root), "utf8");
}

test("exports the humor board homepage for Cloudflare Pages", async () => {
  const html = await readOut("index.html");

  assert.match(html, /오늘웃김/);
  assert.match(html, /베스트 오브 베스트/);
  assert.match(html, /최신 게시물/);
  assert.match(html, /개인정보처리방침/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton|codex-preview/i);
});

test("exports board, post, search, and policy pages", async () => {
  const files = [
    "board/daily.html",
    "posts/ramen-water-precision.html",
    "search.html",
    "about.html",
    "contact.html",
    "privacy.html",
    "terms.html",
    "takedown.html",
  ];

  const pages = await Promise.all(files.map((file) => readOut(file)));
  for (const html of pages) {
    assert.match(html, /오늘웃김/);
  }

  assert.match(pages[1], /라면 물 맞추기/);
  assert.match(pages[1], /직접 작성한 생활 관찰형 유머 콘텐츠/);
  assert.match(pages[4], /chw1914@gmail.com/);
  assert.match(pages[7], /chw1914@gmail.com/);
});

test("exports crawler and adsense preparation files", async () => {
  const [ads, robots, sitemap] = await Promise.all([
    readOut("ads.txt"),
    readOut("robots.txt"),
    readOut("sitemap.xml"),
  ]);

  assert.match(ads, /Add your Google AdSense publisher line/);
  assert.doesNotMatch(ads, /pub-0000000000000000/);
  assert.match(robots, /Allow: \//);
  assert.match(sitemap, /https:\/\/oneulutkim\.pages\.dev/);
});
