import type { Metadata } from "next";
import "./globals.css";
import { site } from "./data";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - 생활 유머 게시판`,
    template: `%s`,
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${site.name} - 생활 유머 게시판`,
    description: site.description,
    type: "website",
    locale: "ko_KR",
    url: site.url,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name} 대표 이미지`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} - 생활 유머 게시판`,
    description: site.description,
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  description: site.description,
  inLanguage: "ko-KR",
  publisher: {
    "@type": "Organization",
    name: site.owner,
    email: site.contactEmail,
    url: site.url,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${site.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
