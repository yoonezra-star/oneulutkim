"use client";

import { useSearchParams } from "next/navigation";
import { PostTable } from "../components";
import { categories, filterPosts, getCategory, isSortMode, sortOptions } from "../data";

export function SearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const categoryId = searchParams.get("category") ?? undefined;
  const sortMode = searchParams.get("sort") ?? "latest";
  const category = categoryId ? getCategory(categoryId) : undefined;
  const sortLabel = isSortMode(sortMode)
    ? (sortOptions.find((option) => option.id === sortMode)?.label ?? "최신순")
    : "최신순";
  const results = filterPosts({ query, category: category?.id, sort: sortMode });
  const hasFilter = Boolean(query || category || searchParams.has("sort"));

  return (
    <>
      <section className="board-hero">
        <p className="eyebrow">검색</p>
        <h1>{query ? `"${query}" 검색 결과` : category ? `${category.name} 검색 결과` : "게시글 검색"}</h1>
        <p>
          {hasFilter
            ? `${results.length}개의 글을 ${sortLabel}으로 정리했습니다.`
            : "제목, 태그, 작성자, 요약 문장으로 글을 찾을 수 있습니다."}
        </p>
      </section>

      <section className="search-tools" aria-label="검색 필터">
        <div>
          <strong>게시판</strong>
          <nav>
            <a href="/search?sort=latest">전체</a>
            {categories.map((item) => (
              <a key={item.id} href={`/search?category=${item.id}&sort=${sortMode}`}>
                {item.name}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <strong>정렬</strong>
          <nav>
            {sortOptions.map((option) => (
              <a
                key={option.id}
                href={`/search?${query ? `q=${encodeURIComponent(query)}&` : ""}${
                  category ? `category=${category.id}&` : ""
                }sort=${option.id}`}
              >
                {option.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {hasFilter && results.length > 0 ? (
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
