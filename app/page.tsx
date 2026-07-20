import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  bestOfBest,
  bestPosts,
  categories,
  getCategoryName,
  posts,
  site,
} from "./data";
import {
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

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">오늘의 생활 유머</p>
            <h1>{site.name}</h1>
          </div>
          <figure className="hero-visual">
            <Image
              src="/og.png"
              alt="게시판형 유머 사이트를 표현한 대표 이미지"
              width={1200}
              height={630}
              priority
              sizes="(max-width: 900px) 100vw, 54vw"
            />
          </figure>
        </section>

        <section className="category-strip" aria-label="게시판 바로가기">
          {categories.map((category) => (
            <Link key={category.id} href={`/board/${category.id}`}>
              <strong>{category.name}</strong>
              <span>{category.description}</span>
            </Link>
          ))}
        </section>

        <section className="rank-grid">
          <RankList title="베스트 오브 베스트" posts={bestOfBest} />
          <RankList title="베스트 게시물" posts={bestPosts} />
        </section>

        <IssueNavigator />

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

        <section className="digest">
          <h2>카테고리별 최근 글</h2>
          <div>
            {categories.map((category) => {
              const firstPost = posts.find((post) => post.category === category.id);

              return (
                <article key={category.id}>
                  <span>{category.name}</span>
                  {firstPost ? (
                    <Link href={`/posts/${firstPost.slug}`}>{firstPost.title}</Link>
                  ) : (
                    <p>새 글을 준비 중입니다.</p>
                  )}
                  <small>{getCategoryName(category.id)}</small>
                </article>
              );
            })}
          </div>
        </section>

        <IssueTagCloud />
      </main>
      <SiteFooter />
    </>
  );
}
