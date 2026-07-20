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
  assert.match(html, /운영원칙/);
  assert.match(html, /광고정책/);
  assert.match(html, /쿠키정책/);
  assert.match(html, /청소년보호정책/);
  assert.match(html, /오늘의 웃음 이슈/);
  assert.match(html, /핫이슈 Top 10/);
  assert.match(html, /이슈 태그 Top30/);
  assert.match(html, /빠른검색/);
  assert.match(html, /추천순/);
  assert.match(html, /조회순/);
  assert.match(html, /댓글순/);
  assert.match(html, /게시판/);
  assert.doesNotMatch(html, /AdSense 심사|심사 준비형|빠르게 훑는|최신글 보기|운영 기준/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton|codex-preview/i);
});

test("exports board, post, search, and strengthened policy pages", async () => {
  const files = [
    "board/daily.html",
    "posts/ramen-water-precision.html",
    "search.html",
    "about.html",
    "editorial-policy.html",
    "corrections.html",
    "contact.html",
    "privacy.html",
    "cookie-policy.html",
    "advertising-policy.html",
    "terms.html",
    "disclaimer.html",
    "youth-protection.html",
    "takedown.html",
  ];

  const pages = await Promise.all(files.map((file) => readOut(file)));
  for (const html of pages) {
    assert.match(html, /오늘웃김/);
  }

  assert.match(pages[1], /라면 물 맞추기/);
  assert.match(pages[1], /직접 작성한 생활 관찰형 유머 콘텐츠/);
  assert.match(pages[0], /오늘의 웃음 이슈/);
  assert.match(pages[0], /핫이슈 Top 10/);
  assert.match(pages[0], /이슈 태그 Top30/);
  assert.match(pages[3], /운영 목적/);
  assert.match(pages[4], /광고 배치 원칙/);
  assert.match(pages[5], /정정 제보 이메일/);
  assert.match(pages[5], /chw1914@gmail.com/);
  assert.match(pages[6], /빠른 접수 경로/);
  assert.match(pages[7], /Google AdSense/);
  assert.match(pages[7], /쿠키/);
  assert.match(pages[8], /Google 광고 쿠키/);
  assert.match(pages[8], /Google 내 광고 센터/);
  assert.match(pages[9], /무효 클릭/);
  assert.match(pages[9], /Google AdSense/);
  assert.match(pages[10], /부정 클릭/);
  assert.match(pages[11], /전문 자문이 아닙니다/);
  assert.match(pages[12], /청소년에게 유해/);
  assert.match(pages[13], /삭제 요청 이메일/);
  assert.match(pages[13], /chw1914@gmail.com/);
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
  assert.match(sitemap, /editorial-policy/);
  assert.match(sitemap, /corrections/);
  assert.match(sitemap, /cookie-policy/);
  assert.match(sitemap, /advertising-policy/);
  assert.match(sitemap, /disclaimer/);
  assert.match(sitemap, /youth-protection/);
});
