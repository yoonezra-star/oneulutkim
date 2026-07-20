import type { Metadata } from "next";
import { InfoPage } from "../components";
import { site } from "../data";

export const metadata: Metadata = {
  title: `광고정책 - ${site.name}`,
  description:
    "오늘웃김의 광고 게재 기준, Google AdSense 운영 원칙, 무효 클릭 방지, 제휴 콘텐츠 표기 정책입니다.",
};

export default function AdvertisingPolicyPage() {
  return (
    <InfoPage title="광고정책" eyebrow="Advertising Policy">
      <p className="policy-meta">최종 업데이트: {site.updatedAt}</p>
      <p>
        오늘웃김은 사이트 운영비를 마련하기 위해 Google AdSense 등 제3자 광고 서비스를
        사용할 수 있습니다. 광고는 콘텐츠와 구분되도록 배치하며, 이용자가 본문과 광고를
        혼동하지 않도록 운영합니다.
      </p>

      <h2>광고 배치 기준</h2>
      <ul>
        <li>본문을 가리거나 이용 흐름을 방해하는 방식으로 광고를 배치하지 않습니다.</li>
        <li>광고를 콘텐츠 제목, 메뉴, 다운로드 버튼처럼 보이게 만들지 않습니다.</li>
        <li>실수 클릭을 유도하는 지나치게 가까운 버튼 배치를 피합니다.</li>
        <li>모바일 화면에서도 광고가 본문을 읽기 어렵게 만들지 않도록 점검합니다.</li>
      </ul>

      <h2>무효 클릭과 무효 트래픽 방지</h2>
      <p>
        운영자는 본인 광고를 클릭하거나, 다른 사람에게 광고 클릭을 요청하거나, 자동화된
        수단으로 노출과 클릭을 늘리는 행위를 하지 않습니다. 비정상적인 트래픽이 의심되는
        경우 광고 단위, 페이지, 유입 경로를 점검하고 필요한 조치를 취합니다.
      </p>

      <h2>제휴와 협찬 콘텐츠</h2>
      <p>
        향후 협찬, 제휴 링크, 유료 게재 콘텐츠가 포함되는 경우 방문자가 알 수 있도록 본문
        또는 페이지 상단에 명확히 표시합니다. 광고성 콘텐츠라도 저작권, 개인정보, 청소년
        보호, 혐오·폭력 금지 기준은 동일하게 적용합니다.
      </p>

      <h2>광고 개인화와 쿠키</h2>
      <p>
        광고 제공 과정에서 Google 및 광고 파트너가 쿠키, 웹 비콘, 기기 정보, IP 주소 등을
        사용할 수 있습니다. 자세한 내용은 <a href="/privacy">개인정보처리방침</a>과{" "}
        <a href="/cookie-policy">쿠키정책</a>에서 확인할 수 있습니다.
      </p>

      <h2>광고 관련 문의</h2>
      <p>
        광고 배치, 부적절한 광고, 제휴 문의는{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> 로 보내 주세요. 문제가
        확인되면 광고 차단, 신고, 배치 조정 등 가능한 범위의 조치를 검토합니다.
      </p>
    </InfoPage>
  );
}
