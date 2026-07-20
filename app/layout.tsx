import type { Metadata } from "next";
import "./globals.css";
import { site } from "./data";

export const metadata: Metadata = {
  metadataBase: new URL("https://oneulutkim.pages.dev"),
  title: {
    default: `${site.name} - 생활 유머 게시판`,
    template: `%s`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} - 생활 유머 게시판`,
    description: site.description,
    type: "website",
    locale: "ko_KR",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
