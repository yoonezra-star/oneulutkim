import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  categories,
  getCategory,
  getCategoryName,
  getIssueKeywords,
  quickSearchLinks,
  sortOptions,
  type CategoryId,
  type Post,
  site,
} from "./data";

const policyLinks = [
  { href: "/about", label: "사이트 소개" },
  { href: "/editorial-policy", label: "운영원칙" },
  { href: "/corrections", label: "정정·제보" },
  { href: "/privacy", label: "개인정보처리방침" },
  { href: "/cookie-policy", label: "쿠키정책" },
  { href: "/advertising-policy", label: "광고정책" },
  { href: "/terms", label: "이용약관" },
  { href: "/disclaimer", label: "면책고지" },
  { href: "/youth-protection", label: "청소년보호정책" },
  { href: "/takedown", label: "삭제요청" },
  { href: "/contact", label: "문의" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="utility-bar">
        <div>
          <a href="#latest">새글</a>
          <time dateTime="2026-07-20">07월 20일(월)</time>
        </div>
        <div>
          <span>직접 작성 콘텐츠</span>
          <Link href="/contact">문의하기</Link>
          <Link href="/search">검색하기</Link>
          <Link href="/editorial-policy">운영원칙</Link>
        </div>
      </div>
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
        {policyLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
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

export function CategoryBoard({
  category,
  posts,
}: {
  category: (typeof categories)[number];
  posts: Post[];
}) {
  const [featured, ...items] = posts;

  return (
    <section className="category-board-card" aria-labelledby={`${category.id}-board`}>
      <header>
        <div>
          <p className="eyebrow">BOARD</p>
          <h2 id={`${category.id}-board`}>{category.name}</h2>
        </div>
        <Link href={`/board/${category.id}`}>더보기</Link>
      </header>

      {featured ? (
        <Link className="featured-post" href={`/posts/${featured.slug}`}>
          <span>{featured.label ?? "PICK"}</span>
          <strong>{featured.title}</strong>
          <em>
            {featured.date} · 추천 {featured.recommends} · 댓글 {featured.comments}
          </em>
        </Link>
      ) : (
        <p className="empty-line">새 글을 준비 중입니다.</p>
      )}

      <ul>
        {items.slice(0, 5).map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            <time>{post.date}</time>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CommunitySidebar({
  latestPosts,
  rankingPosts,
}: {
  latestPosts: Post[];
  rankingPosts: Post[];
}) {
  const policyShortcuts = [
    { href: "/about", label: "사이트 소개" },
    { href: "/editorial-policy", label: "운영원칙" },
    { href: "/privacy", label: "개인정보" },
    { href: "/advertising-policy", label: "광고정책" },
    { href: "/takedown", label: "삭제요청" },
    { href: "/contact", label: "문의하기" },
  ];

  return (
    <aside className="community-sidebar" aria-label="커뮤니티 정보">
      <section className="login-panel" aria-labelledby="operation-panel-title">
        <h2 id="operation-panel-title">운영 안내</h2>
        <p>오늘웃김은 직접 작성한 짧은 생활 유머를 게시판 형식으로 정리합니다.</p>
        <div>
          <Link href="/contact">문의하기</Link>
          <Link href="/corrections">정정·제보</Link>
        </div>
      </section>

      <section className="sidebar-visual" aria-label="오늘웃김 대표 이미지">
        <Image
          src="/og.png"
          alt="오늘웃김 대표 이미지"
          width={1200}
          height={630}
          sizes="(max-width: 900px) 100vw, 320px"
        />
      </section>

      <section className="sidebar-panel" aria-labelledby="latest-panel-title">
        <h2 id="latest-panel-title">최근 글</h2>
        <ol className="comment-list">
          {latestPosts.slice(0, 8).map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              <small>{getCategoryName(post.category)} · {post.date}</small>
            </li>
          ))}
        </ol>
      </section>

      <section className="sidebar-panel" aria-labelledby="policy-panel-title">
        <h2 id="policy-panel-title">정책 바로가기</h2>
        <ol className="member-ranking">
          {policyShortcuts.map((link, index) => (
            <li key={link.href}>
              <span>{index + 1}</span>
              <Link href={link.href}>{link.label}</Link>
              <em>필수</em>
            </li>
          ))}
        </ol>
      </section>

      <section className="sidebar-panel" aria-labelledby="best-panel-title">
        <h2 id="best-panel-title">인기 글</h2>
        <ol className="side-posts">
          {rankingPosts.slice(0, 6).map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              <span>{post.recommends}</span>
            </li>
          ))}
        </ol>
      </section>
    </aside>
  );
}

export function IssueNavigator({
  activeCategory,
  sourcePosts,
}: {
  activeCategory?: CategoryId;
  sourcePosts?: Post[];
}) {
  const topTags = getIssueKeywords(10, sourcePosts);

  return (
    <section className="issue-navigator" aria-label="이슈 탐색">
      <div className="issue-navigator-head">
        <div>
          <p className="eyebrow">커뮤니티 탐색</p>
          <h2>오늘의 웃음 이슈</h2>
        </div>
        <time dateTime="2026-07-20T09:20:00+09:00">2026.07.20 09:20 갱신</time>
      </div>

      <div className="filter-matrix">
        <div>
          <strong>빠른검색</strong>
          <nav aria-label="빠른검색">
            {quickSearchLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <strong>게시판</strong>
          <nav aria-label="게시판 필터">
            <Link className={!activeCategory ? "is-active" : undefined} href="/">
              전체
            </Link>
            {categories.map((category) => (
              <Link
                className={activeCategory === category.id ? "is-active" : undefined}
                key={category.id}
                href={`/board/${category.id}`}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <strong>정렬</strong>
          <nav aria-label="정렬">
            {sortOptions.map((option) => (
              <Link key={option.id} href={option.href}>
                {option.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="hot-keywords">
        <h3>핫이슈 Top 10</h3>
        <ol>
          {topTags.map((keyword, index) => (
            <li key={keyword.tag}>
              <Link href={`/search?q=${encodeURIComponent(keyword.tag)}&sort=recommends`}>
                <span>{index + 1}</span>
                {keyword.tag}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function IssueTagCloud({ posts: sourcePosts }: { posts?: Post[] }) {
  const tags = getIssueKeywords(30, sourcePosts);

  return (
    <section className="tag-board" aria-label="이슈 태그">
      <div className="section-title">
        <div>
          <p className="eyebrow">이슈 태그</p>
          <h2>이슈 태그 Top30</h2>
        </div>
        <span>{tags.length}개 태그</span>
      </div>
      <div>
        {tags.map((tag, index) => (
          <Link key={tag.tag} href={`/search?q=${encodeURIComponent(tag.tag)}&sort=recommends`}>
            <span>{index + 1}</span>
            {tag.tag}
            <small>{tag.count}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function SearchTools({
  query = "",
  categoryId,
  sortMode = "latest",
}: {
  query?: string;
  categoryId?: string;
  sortMode?: string;
}) {
  const category = categoryId ? getCategory(categoryId) : undefined;

  return (
    <section className="search-tools" aria-label="검색 필터">
      <div>
        <strong>게시판</strong>
        <nav>
          <Link href="/search?sort=latest">전체</Link>
          {categories.map((item) => (
            <Link key={item.id} href={`/search?category=${item.id}&sort=${sortMode}`}>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div>
        <strong>정렬</strong>
        <nav>
          {sortOptions.map((option) => (
            <Link
              key={option.id}
              href={`/search?${query ? `q=${encodeURIComponent(query)}&` : ""}${
                category ? `category=${category.id}&` : ""
              }sort=${option.id}`}
            >
              {option.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}

export function PostTable({ posts }: { posts: Post[] }) {
  return (
    <section className="post-list" aria-label="게시글 목록">
      <div className="table-head" role="row">
        <span>번호</span>
        <span>게시판</span>
        <span>제목</span>
        <span>이름</span>
        <span>날짜</span>
        <span>조회</span>
        <span>추천</span>
      </div>
      {posts.map((post) => (
        <article className="post-row" key={post.slug}>
          <span className="post-id">{post.id}</span>
          <Link className="source-badge" href={`/board/${post.category}`}>
            {getCategoryName(post.category)}
          </Link>
          <h2>
            <Link href={`/posts/${post.slug}`}>
              {post.label ? <b>{post.label}</b> : null}
              {post.title}
              {post.comments > 0 ? <small>[{post.comments}]</small> : null}
            </Link>
          </h2>
          <span className="post-author">{post.author}</span>
          <time className="post-date">{post.date}</time>
          <span className="post-views">{post.views.toLocaleString("ko-KR")}</span>
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
        <div className="info-content">
          {children}
          <nav className="policy-nav" aria-label="운영 문서 바로가기">
            <strong>운영 문서</strong>
            <div>
              {policyLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
