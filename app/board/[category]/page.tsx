import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categories,
  getCategory,
  getPostsByCategory,
  site,
} from "../../data";
import { IssueNavigator, IssueTagCloud, PostTable, SiteFooter, SiteHeader } from "../../components";

type BoardPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.id }));
}

export async function generateMetadata({
  params,
}: BoardPageProps): Promise<Metadata> {
  const { category: categoryId } = await params;
  const category = getCategory(categoryId);

  if (!category) {
    return {
      title: `게시판 없음 - ${site.name}`,
    };
  }

  return {
    title: `${category.name} - ${site.name}`,
    description: category.description,
    alternates: {
      canonical: `/board/${category.id}/`,
    },
    openGraph: {
      title: `${category.name} - ${site.name}`,
      description: category.description,
      type: "website",
      url: `/board/${category.id}/`,
      siteName: site.name,
      locale: "ko_KR",
      images: ["/og.png"],
    },
  };
}

export default async function BoardPage({ params }: BoardPageProps) {
  const { category: categoryId } = await params;
  const category = getCategory(categoryId);

  if (!category) {
    notFound();
  }

  const categoryPosts = getPostsByCategory(category.id);

  return (
    <>
      <SiteHeader />
      <main className="board-page">
        <nav className="breadcrumb" aria-label="현재 위치">
          <Link href="/">홈</Link>
          <span>/</span>
          <span>{category.name}</span>
        </nav>
        <section className="board-hero">
          <p className="eyebrow">게시판</p>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </section>
        <IssueNavigator activeCategory={category.id} sourcePosts={categoryPosts} />
        <PostTable posts={categoryPosts} />
        <IssueTagCloud posts={categoryPosts} />
      </main>
      <SiteFooter />
    </>
  );
}
