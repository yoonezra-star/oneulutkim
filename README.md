# 오늘웃김

생활 유머와 짧은 해설을 모으는 게시판형 큐레이션 사이트입니다. Google AdSense
승인 준비를 고려해 소개, 문의, 개인정보처리방침, 이용약관, 삭제요청,
`robots.txt`, `sitemap.xml`, `ads.txt`를 포함합니다.

## 운영 정보

- 사이트명: 오늘웃김
- 운영 이메일: chw1914@gmail.com
- 콘텐츠 방향: 직접 작성한 생활 관찰형 유머와 짧은 해설

## 로컬 실행

```bash
npm install
npm run dev
```

## Cloudflare Pages 설정

GitHub 저장소를 Cloudflare Pages에 연결한 뒤 아래 값으로 설정합니다.

- Framework preset: Next.js
- Build command: `npm run build`
- Build output directory: `out`
- Node.js version: `22.16.0`

Cloudflare Pages는 GitHub 저장소와 연결하면 `main` 브랜치에 푸시될 때마다
자동으로 빌드하고 배포합니다.

## 검증

```bash
npm test
npm run lint
```

## AdSense 적용 전 체크

- `app/ads.txt/route.ts`의 안내 문구를 AdSense publisher 라인으로 교체
- 실제 도메인 연결 후 `NEXT_PUBLIC_SITE_URL` 또는 sitemap 기본 URL 갱신
- Search Console 등록 및 `sitemap.xml` 제출
- 빈 게시판 없이 원본성 있는 글을 꾸준히 추가
