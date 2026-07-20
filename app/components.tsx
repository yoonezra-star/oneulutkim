import Link from "next/link";
import type { ReactNode } from "react";
import { categories, getCategoryName, type Post, site } from "./data";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="topline">
        <Link className="brand" href="/" aria-label={`${site.name} 홈`}>
          <span className="brand-mark">웃</span>
          <span>
            <strong>{site.name}</strong>
            <em>{site.tagline}</em>
          </span>
        </Link>
        <form className="search-box" action="/search">
          <label className="sr-only" htmlFor="site-search">
            게시글 검색
          </label>
          <input id="site-search" name="q" type="search" placeholder="제목, 태그 검색" />
          <button type="submit">검색</button>
        </form>
        <nav className="utility-nav" aria-label="운영 정보">
          <Link href="/about">소개</Link>
          <Link href="/editorial-policy">운영원칙</Link>
          <Link href="/contact">문의</Link>
          <Link href="/takedown">삭제요청</Link>
        </nav>
      </div>
      <nav className="board-nav" aria-label="게시판">
        <Link href="/">전체</Link>
        {categories.map((category) => (
          <Link key={category.id} href={`/board/${category.id}`}>
            {category.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{site.name}</strong>
        <p>
          직접 작성한 생활 유머와 짧은 에세이를 모아 게시판 형식으로 제공하는
          한국어 유머 사이트입니다.
        </p>
        <p>운영 문의: {site.contactEmail}</p>
      </div>
      <nav aria-label="하단 정보">
        <Link href="/about">사이트 소개</Link>
        <Link href="/editorial-policy">운영원칙</Link>
        <Link href="/privacy">개인정보처리방침</Link>
        <Link href="/terms">이용약관</Link>
        <Link href="/takedown">삭제요청</Link>
        <Link href="/contact">문의</Link>
      </nav>
    </footer>
  );
}

export function RankList({ title, posts }: { title: string; posts: Post[] }) {
  return (
    <section className="rank-panel" aria-labelledby={title.replace(/\s/g, "-")}>
      <h2 id={title.replace(/\s/g, "-")}>{title}</h2>
      <ol>
        {posts.map((post) => (
          <li key={post.slug}>
            <span className="score">{post.recommends}</span>
            <Link href={`/posts/${post.slug}`}>
              {post.title}
              {post.comments > 0 ? <small>[{post.comments}]</small> : null}
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function PostTable({ posts }: { posts: Post[] }) {
  return (
    <section className="post-list" aria-label="게시글 목록">
      <div className="table-head" role="row">
        <span>번호</span>
        <span>제목</span>
        <span>이름</span>
        <span>날짜</span>
        <span>조회</span>
        <span>추천</span>
      </div>
      {posts.map((post) => (
        <article className="post-row" key={post.slug}>
          <span className="post-id">{post.id}</span>
          <h2>
            <Link href={`/posts/${post.slug}`}>
              {post.label ? <b>{post.label}</b> : null}
              {post.title}
              {post.comments > 0 ? <small>[{post.comments}]</small> : null}
            </Link>
            <em>{getCategoryName(post.category)}</em>
          </h2>
          <span>{post.author}</span>
          <time>{post.date}</time>
          <span>{post.views.toLocaleString("ko-KR")}</span>
          <span className="recommend">{post.recommends}</span>
        </article>
      ))}
    </section>
  );
}

export function InfoPage({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="info-page">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="info-content">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}
