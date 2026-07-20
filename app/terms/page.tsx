import type { Metadata } from "next";
import { InfoPage } from "../components";
import { site } from "../data";

export const metadata: Metadata = {
  title: `이용약관 - ${site.name}`,
  description: `${site.name} 이용약관`,
};

export default function TermsPage() {
  return (
    <InfoPage title="이용약관" eyebrow="Terms">
      <p>
        오늘웃김은 생활 유머와 가벼운 읽을거리를 제공하는 웹사이트입니다. 이용자는
        사이트를 정상적인 열람 목적으로 사용할 수 있습니다.
      </p>
      <h2>콘텐츠 이용</h2>
      <p>
        사이트의 글, 구성, 편집 문구는 오늘웃김의 자체 콘텐츠입니다. 사전 허락
        없는 무단 복제, 대량 수집, 재배포를 금지합니다.
      </p>
      <h2>금지 행위</h2>
      <p>
        서비스 장애를 유발하는 자동화 요청, 콘텐츠 무단 수집, 운영자를 사칭하는
        행위, 불법 또는 권리 침해 목적의 이용을 금지합니다.
      </p>
      <h2>약관 변경</h2>
      <p>
        기능 추가나 광고 정책 변경에 따라 약관이 수정될 수 있습니다. 중요한 변경은
        사이트 내 공지 또는 관련 페이지 업데이트로 안내합니다.
      </p>
    </InfoPage>
  );
}
