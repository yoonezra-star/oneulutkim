import type { Metadata } from "next";
import { PostTable, SiteFooter, SiteHeader } from "../components";
import { searchPosts, site } from "../data";

type SearchPageProps = {
  searchParams?: Promise<{ q?: string }>;
};

export const metadata: Metadata = {
  title: `검색 - ${site.name}`,
  description: `${site.name} 게시글 검색`,
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = (await searchParams)?.q?.trim() ?? "";
  const results = searchPosts(query);

  return (
    <>
      <SiteHeader />
      <main className="board-page">
        <section className="board-hero">
          <p className="eyebrow">검색</p>
          <h1>{query ? `"${query}" 검색 결과` : "게시글 검색"}</h1>
          <p>
            {query
              ? `${results.length}개의 글을 찾았습니다.`
              : "제목, 태그, 작성자, 요약 문장으로 글을 찾을 수 있습니다."}
          </p>
        </section>
        {query && results.length > 0 ? (
          <PostTable posts={results} />
        ) : (
          <div className="empty-state">
            <strong>검색어를 입력하거나 다른 단어로 다시 찾아보세요.</strong>
            <p>예: 라면, 메신저, 회사생활, 아침</p>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
