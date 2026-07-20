import type { Metadata } from "next";
import Link from "next/link";
import {
  CategoryBoard,
  IssueNavigator,
  IssueTagCloud,
  PostTable,
  SiteFooter,
  SiteHeader,
} from "../components";
import { categories, getPostsByCategory, posts, site } from "../data";

export const metadata: Metadata = {
  title: `전체글 아카이브 - ${site.name}`,
  description: `${site.name}에 게시된 생활 유머와 짧은 관찰 글을 한 번에 확인하는 전체글 아카이브입니다.`,
  alternates: {
    canonical: "/archive/",
  },
  openGraph: {
    title: `전체글 아카이브 - ${site.name}`,
    description: `${site.name}의 모든 게시글과 카테고리별 업데이트를 확인할 수 있습니다.`,
    type: "website",
    url: "/archive/",
    images: ["/og.png"],
  },
};

export default function ArchivePage() {
  const categoryBoards = categories.map((category) => ({
    category,
    posts: getPostsByCategory(category.id).slice(0, 6),
  }));

  return (
    <>
      <SiteHeader />
      <main className="board-page">
        <nav className="breadcrumb" aria-label="현재 위치">
          <Link href="/">홈</Link>
          <span>/</span>
          <span>전체글 아카이브</span>
        </nav>

        <section className="board-hero">
          <p className="eyebrow">ARCHIVE</p>
          <h1>전체글 아카이브</h1>
          <p>
            오늘웃김에 올라온 직접 작성 생활 유머를 최신순으로 정리했습니다. 카테고리별
            흐름과 태그를 함께 확인할 수 있어 오래된 글도 쉽게 다시 찾을 수 있습니다.
          </p>
        </section>

        <IssueNavigator />

        <section className="category-board-section" aria-labelledby="archive-category-title">
          <div className="section-title">
            <div>
              <p className="eyebrow">CATEGORY</p>
              <h2 id="archive-category-title">카테고리별 빠른 탐색</h2>
            </div>
            <span>{categories.length}개 게시판</span>
          </div>
          <div className="category-board-grid">
            {categoryBoards.map(({ category, posts: categoryPosts }) => (
              <CategoryBoard key={category.id} category={category} posts={categoryPosts} />
            ))}
          </div>
        </section>

        <section className="latest-section" aria-labelledby="archive-all-title">
          <div className="section-title">
            <div>
              <p className="eyebrow">ALL POSTS</p>
              <h2 id="archive-all-title">전체 게시물</h2>
            </div>
            <span>{posts.length}개 글</span>
          </div>
          <PostTable posts={posts} />
        </section>

        <IssueTagCloud />
      </main>
      <SiteFooter />
    </>
  );
}
