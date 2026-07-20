import type { Metadata } from "next";
import { InfoPage } from "../components";
import { site } from "../data";

export const metadata: Metadata = {
  title: `쿠키정책 - ${site.name}`,
  description:
    "오늘웃김에서 사용될 수 있는 필수 쿠키, 광고 쿠키, 분석 쿠키와 이용자 관리 방법 안내입니다.",
};

export default function CookiePolicyPage() {
  return (
    <InfoPage title="쿠키정책" eyebrow="Cookie Policy">
      <p className="policy-meta">최종 업데이트: {site.updatedAt}</p>
      <p>
        쿠키는 웹사이트가 이용자의 브라우저에 저장하는 작은 텍스트 정보입니다. 오늘웃김은
        사이트 보안, 기본 기능 제공, 광고 제공, 트래픽 이해를 위해 쿠키 또는 유사 기술을
        사용할 수 있습니다.
      </p>

      <h2>쿠키의 종류</h2>
      <ul>
        <li>필수 쿠키: 보안, 네트워크 안정성, 기본 페이지 제공에 필요한 정보</li>
        <li>분석 쿠키: 방문 페이지, 유입 경로, 기기 유형 등 사이트 품질 개선을 위한 정보</li>
        <li>광고 쿠키: 광고 노출, 빈도 조정, 맞춤 광고, 광고 성과 측정에 필요한 정보</li>
        <li>부정 사용 방지 기술: 무효 트래픽, 자동화 클릭, 악성 요청을 탐지하기 위한 정보</li>
      </ul>

      <h2>Google 광고 쿠키</h2>
      <p>
        Google AdSense가 적용되는 경우 Google 및 제3자 광고 사업자는 이전 방문 기록이나
        관심사에 기반해 광고를 제공하기 위해 쿠키를 사용할 수 있습니다. Google은 광고 노출
        횟수 제한, 광고 성과 측정, 부정 사용 방지 목적으로도 쿠키와 유사 기술을 사용할 수
        있습니다.
      </p>

      <h2>이용자의 선택</h2>
      <p>
        이용자는 브라우저 설정에서 쿠키 저장을 차단하거나 이미 저장된 쿠키를 삭제할 수
        있습니다. 다만 일부 쿠키를 차단하면 사이트가 느리게 보이거나 광고 설정, 보안 기능,
        개인화 기능이 제한될 수 있습니다.
      </p>
      <p>
        Google 광고 맞춤 설정은{" "}
        <a href="https://myadcenter.google.com/" target="_blank" rel="noreferrer">
          Google 내 광고 센터
        </a>
        에서 관리할 수 있습니다. Google의 쿠키 사용 방식은{" "}
        <a href="https://policies.google.com/technologies/cookies?hl=ko" target="_blank" rel="noreferrer">
          Google 쿠키 안내
        </a>
        에서 확인할 수 있습니다.
      </p>

      <h2>동의 관리</h2>
      <p>
        유럽경제지역, 영국, 스위스 등 별도 동의가 필요한 지역을 대상으로 광고를 제공하게
        되는 경우 Google이 요구하는 동의 관리 플랫폼 또는 동등한 동의 절차를 적용할 수
        있습니다. 현재 정책 변경이 필요한 경우 이 페이지와 개인정보처리방침을 함께
        업데이트합니다.
      </p>
    </InfoPage>
  );
}
