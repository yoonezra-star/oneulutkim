import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategoryName,
  getEditorialScore,
  getPost,
  getReadingMinutes,
  posts,
  site,
} from "../../data";
import { SiteFooter, SiteHeader } from "../../components";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

function toIsoDate(date: string) {
  const match = date.match(/^(\d{2})\/(\d{2})\/(\d{2})\s+(\d{2}):(\d{2})/);

  if (!match) {
    return "2026-07-20T00:00:00+09:00";
  }

  const [, year, month, day, hour, minute] = match;
  return `20${year}-${month}-${day}T${hour}:${minute}:00+09:00`;
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {
      title: `게시글 없음 - ${site.name}`,
    };
  }

  return {
    title: `${post.title} - ${site.name}`,
    description: post.summary,
    keywords: post.tags,
    alternates: {
      canonical: `/posts/${post.slug}/`,
    },
    openGraph: {
      title: `${post.title} - ${site.name}`,
      description: post.summary,
      type: "article",
      url: `/posts/${post.slug}/`,
      siteName: site.name,
      locale: "ko_KR",
      publishedTime: toIsoDate(post.date),
      authors: [post.author],
      tags: post.tags,
      images: ["/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} - ${site.name}`,
      description: post.summary,
      images: ["/og.png"],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const related = posts
    .filter((candidate) => candidate.category === post.category && candidate.slug !== post.slug)
    .slice(0, 5);
  const postIndex = posts.findIndex((candidate) => candidate.slug === post.slug);
  const previousPost = postIndex > 0 ? posts[postIndex - 1] : undefined;
  const nextPost = postIndex >= 0 && postIndex < posts.length - 1 ? posts[postIndex + 1] : undefined;
  const postUrl = `${site.url}/posts/${post.slug}/`;
  const publishedAt = toIsoDate(post.date);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.summary,
      image: `${site.url}/og.png`,
      datePublished: publishedAt,
      dateModified: publishedAt,
      inLanguage: "ko-KR",
      mainEntityOfPage: postUrl,
      author: {
        "@type": "Person",
        name: post.author,
      },
      publisher: {
        "@type": "Organization",
        name: site.owner,
        url: site.url,
        email: site.contactEmail,
        logo: {
          "@type": "ImageObject",
          url: `${site.url}/og.png`,
        },
      },
      articleSection: getCategoryName(post.category),
      keywords: post.tags.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "홈",
          item: `${site.url}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: getCategoryName(post.category),
          item: `${site.url}/board/${post.category}/`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: postUrl,
        },
      ],
    },
  ];

  return (
    <>
      <SiteHeader />
      <main className="post-detail">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <nav className="breadcrumb" aria-label="현재 위치">
          <Link href="/">홈</Link>
          <span>/</span>
          <Link href={`/board/${post.category}`}>{getCategoryName(post.category)}</Link>
        </nav>
        <article>
          <header className="article-head">
            <p className="eyebrow">{getCategoryName(post.category)}</p>
            <h1>{post.title}</h1>
            <dl>
              <div>
                <dt>작성자</dt>
                <dd>{post.author}</dd>
              </div>
              <div>
                <dt>날짜</dt>
                <dd>{post.date}</dd>
              </div>
              <div>
                <dt>읽는 시간</dt>
                <dd>{getReadingMinutes(post)}분</dd>
              </div>
              <div>
                <dt>편집 점수</dt>
                <dd>{getEditorialScore(post)}</dd>
              </div>
            </dl>
          </header>
          <p className="article-summary">{post.summary}</p>
          <div className="article-body">
            {post.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <footer className="article-foot">
            <div className="tags" aria-label="태그">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}&sort=recommends`}>
                  #{tag}
                </Link>
              ))}
            </div>
            <p>
              이 글은 오늘웃김 운영 기준에 따라 직접 작성한 생활 관찰형 유머 콘텐츠입니다.
              외부 자료가 포함된 경우 출처와 삭제 요청 절차를 함께 안내합니다.
            </p>
          </footer>
        </article>

        <nav className="article-nav" aria-label="이전 다음 글">
          <Link href={previousPost ? `/posts/${previousPost.slug}` : "/archive"}>
            <span>이전 글</span>
            <strong>{previousPost?.title ?? "전체 글 보기"}</strong>
          </Link>
          <Link href={nextPost ? `/posts/${nextPost.slug}` : "/"}>
            <span>다음 글</span>
            <strong>{nextPost?.title ?? "최신 글 보기"}</strong>
          </Link>
        </nav>

        <aside className="related-posts">
          <h2>같은 게시판 글</h2>
          <ul>
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/posts/${item.slug}`}>{item.title}</Link>
                <span>{getReadingMinutes(item)}분</span>
              </li>
            ))}
          </ul>
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}
