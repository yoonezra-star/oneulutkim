import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/", accept = "text/html") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the humor board homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /오늘웃김/);
  assert.match(html, /베스트 오브 베스트/);
  assert.match(html, /최신 게시물/);
  assert.match(html, /개인정보처리방침/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton|codex-preview/i);
});

test("renders board, post, search, and policy routes", async () => {
  const routes = [
    "/board/daily",
    "/posts/ramen-water-precision",
    "/search?q=%EB%9D%BC%EB%A9%B4",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/takedown",
  ];

  const responses = await Promise.all(routes.map((route) => render(route)));
  for (const response of responses) {
    assert.equal(response.status, 200);
  }

  const postHtml = await responses[1].text();
  assert.match(postHtml, /라면 물 맞추기/);
  assert.match(postHtml, /직접 작성한 생활 관찰형 유머 콘텐츠/);

  const searchHtml = await responses[2].text();
  assert.match(searchHtml, /검색 결과/);
  assert.match(searchHtml, /라면/);
});

test("serves ads.txt placeholder safely", async () => {
  const response = await render("/ads.txt", "text/plain");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/plain\b/i);

  const text = await response.text();
  assert.match(text, /Add your Google AdSense publisher line/);
  assert.doesNotMatch(text, /pub-0000000000000000/);
});
