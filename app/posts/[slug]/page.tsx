import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryName, getPost, posts, site } from "../../data";
import { SiteFooter, SiteHeader } from "../../components";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

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

  return (
    <>
      <SiteHeader />
      <main className="post-detail">
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
                <dt>조회</dt>
                <dd>{post.views.toLocaleString("ko-KR")}</dd>
              </div>
              <div>
                <dt>추천</dt>
                <dd>{post.recommends}</dd>
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
                <span key={tag}>#{tag}</span>
              ))}
            </div>
            <p>
              이 글은 오늘웃김 편집 기준에 따라 직접 작성한 생활 관찰형 유머
              콘텐츠입니다. 외부 자료가 포함될 경우 출처와 삭제 요청 절차를 함께
              표시합니다.
            </p>
          </footer>
        </article>

        <aside className="related-posts">
          <h2>같은 게시판 글</h2>
          <ul>
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/posts/${item.slug}`}>{item.title}</Link>
                <span>{item.recommends}</span>
              </li>
            ))}
          </ul>
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}
