import type { Metadata } from "next";
import Link from "next/link";
import {
  bestOfBest,
  bestPosts,
  categories,
  posts,
  site,
} from "./data";
import {
  CategoryBoard,
  CommunitySidebar,
  IssueNavigator,
  IssueTagCloud,
  PostTable,
  RankList,
  SiteFooter,
  SiteHeader,
} from "./components";

export const metadata: Metadata = {
  title: `${site.name} - 생활 유머 게시판`,
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${site.name} - 생활 유머 게시판`,
    description: site.description,
    type: "website",
    url: "/",
    siteName: site.name,
    locale: "ko_KR",
    images: ["/og.png"],
  },
};

export default function Home() {
  const latest = posts.slice(0, 24);
  const editorialPicks = posts.slice(0, 5);
  const categoryBoards = categories.map((category) => ({
    category,
    posts: posts.filter((post) => post.category === category.id).slice(0, 6),
  }));

  return (
    <>
      <SiteHeader />
      <main className="portal-main">
        <section className="portal-summary" aria-label="오늘웃김 요약">
          <div>
            <p className="eyebrow">오늘웃김</p>
            <h1>오늘 많이 본 웃음</h1>
          </div>
          <dl>
            <div>
              <dt>전체 글</dt>
              <dd>{posts.length}</dd>
            </div>
            <div>
              <dt>게시판</dt>
              <dd>{categories.length}</dd>
            </div>
            <div>
              <dt>운영문서</dt>
              <dd>11</dd>
            </div>
          </dl>
        </section>

        <div className="portal-layout">
          <div className="portal-content">
            <section className="category-strip" aria-label="게시판 바로가기">
              {categories.map((category) => (
                <Link key={category.id} href={`/board/${category.id}`}>
                  <strong>{category.name}</strong>
                  <span>{category.description}</span>
                </Link>
              ))}
            </section>

            <IssueNavigator />

            <section className="editor-note" aria-labelledby="editor-note-title">
              <div>
                <p className="eyebrow">EDITOR NOTE</p>
                <h2 id="editor-note-title">오늘웃김 편집 노트</h2>
              </div>
              <div>
                <p>
                  오늘웃김은 외부 게시판을 그대로 복제하지 않고, 일상에서 바로 떠올릴 수 있는
                  생활 장면을 직접 작성한 짧은 글로 정리합니다. 제목은 가볍게, 본문은 상황이
                  선명하게 보이도록 다듬습니다.
                </p>
                <p>
                  새 글은 카테고리, 요약, 태그, 관련 글을 함께 제공해 한 번 보고 지나가는
                  목록이 아니라 다시 찾을 수 있는 작은 유머 아카이브가 되도록 관리합니다.
                </p>
              </div>
            </section>

            <section className="digest" aria-labelledby="digest-title">
              <h2 id="digest-title">깊게 읽는 오늘웃김</h2>
              <div>
                {editorialPicks.map((post) => (
                  <article key={post.slug}>
                    <span>{post.date}</span>
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                    <small>{post.summary}</small>
                  </article>
                ))}
              </div>
            </section>

            <section className="category-board-section" aria-labelledby="category-board-title">
              <div className="section-title">
                <div>
                  <p className="eyebrow">CATEGORY</p>
                  <h2 id="category-board-title">카테고리별 업데이트</h2>
                </div>
                <span>{categoryBoards.length}개 게시판</span>
              </div>
              <div className="category-board-grid">
                {categoryBoards.map(({ category, posts: categoryPosts }) => (
                  <CategoryBoard key={category.id} category={category} posts={categoryPosts} />
                ))}
              </div>
            </section>

            <section className="rank-grid">
              <RankList title="편집 추천 글" posts={bestOfBest} />
              <RankList title="깊게 읽는 글" posts={bestPosts} />
            </section>

            <section id="latest" className="latest-section">
              <div className="section-title">
                <div>
                  <p className="eyebrow">전체 게시판</p>
                  <h2>최신 게시물</h2>
                </div>
                <span>{latest.length}개 글</span>
              </div>
              <PostTable posts={latest} />
            </section>

            <IssueTagCloud />
          </div>

          <CommunitySidebar latestPosts={latest} rankingPosts={bestOfBest} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
