import type { Metadata } from "next";
import { InfoPage } from "../components";
import { site } from "../data";

export const metadata: Metadata = {
  title: `면책고지 - ${site.name}`,
  description:
    "오늘웃김 콘텐츠의 오락 목적, 정보 정확성, 외부 링크, 이용자 판단에 관한 면책 안내입니다.",
};

export default function DisclaimerPage() {
  return (
    <InfoPage title="면책고지" eyebrow="Disclaimer">
      <p className="policy-meta">최종 업데이트: {site.updatedAt}</p>
      <p>
        오늘웃김의 콘텐츠는 생활 속 웃음과 가벼운 읽을거리를 제공하기 위한 오락 목적의
        글입니다. 특정 개인, 단체, 직업, 지역을 비방하거나 전문적인 판단을 대신하기 위한
        목적으로 작성하지 않습니다.
      </p>

      <h2>전문 자문이 아닙니다</h2>
      <p>
        사이트의 글은 의료, 법률, 세무, 투자, 정치, 심리 상담 등 전문 조언이 아닙니다.
        중요한 의사결정이 필요한 경우에는 관련 분야의 자격 있는 전문가나 공식 기관의
        정보를 확인해 주세요.
      </p>

      <h2>정보의 정확성</h2>
      <p>
        오늘웃김은 오류를 줄이기 위해 노력하지만, 모든 콘텐츠의 완전성, 최신성, 정확성을
        보장하지 않습니다. 표현상 오류나 사실관계 정정이 필요한 경우{" "}
        <a href="/corrections">정정·제보</a> 절차를 통해 알려 주세요.
      </p>

      <h2>외부 링크와 광고</h2>
      <p>
        사이트에는 광고나 외부 링크가 포함될 수 있습니다. 외부 사이트의 콘텐츠, 상품,
        서비스, 개인정보 처리 방식은 해당 사이트의 정책에 따릅니다. 오늘웃김은 외부
        사이트에서 발생한 거래나 분쟁에 대해 직접적인 책임을 지지 않습니다.
      </p>

      <h2>권리 침해 신고</h2>
      <p>
        저작권, 초상권, 개인정보, 명예훼손 등 권리 침해가 의심되는 경우{" "}
        <a href="/takedown">삭제요청</a> 페이지에서 필요한 정보를 확인한 뒤 신고해 주세요.
      </p>
    </InfoPage>
  );
}
