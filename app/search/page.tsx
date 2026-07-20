import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchTools, SiteFooter, SiteHeader } from "../components";
import { site } from "../data";
import { SearchClient } from "./SearchClient";

export const metadata: Metadata = {
  title: `검색 - ${site.name}`,
  description: `${site.name} 게시글 검색`,
};

export default function SearchPage() {
  return (
    <>
      <SiteHeader />
      <main className="board-page">
        <Suspense
          fallback={
            <>
              <section className="board-hero">
                <p className="eyebrow">검색</p>
                <h1>게시글 검색</h1>
                <p>제목, 태그, 작성자, 요약 문장으로 글을 찾을 수 있습니다.</p>
              </section>
              <SearchTools />
            </>
          }
        >
          <SearchClient />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
