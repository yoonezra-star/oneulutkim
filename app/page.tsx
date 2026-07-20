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
};

export default function Home() {
  const latest = posts.slice(0, 24);
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
              <RankList title="베스트 오브 베스트" posts={bestOfBest} />
              <RankList title="베스트 게시물" posts={bestPosts} />
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
