"use client";

import { useSearchParams } from "next/navigation";
import { PostTable } from "../components";
import { searchPosts } from "../data";

export function SearchClient() {
  const query = useSearchParams().get("q")?.trim() ?? "";
  const results = searchPosts(query);

  return (
    <>
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
    </>
  );
}
