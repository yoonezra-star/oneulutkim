import type { Metadata } from "next";
import { InfoPage } from "../components";
import { site } from "../data";

export const metadata: Metadata = {
  title: `청소년보호정책 - ${site.name}`,
  description:
    "오늘웃김의 청소년 유해 콘텐츠 제한, 신고 접수, 광고와 외부 링크 관리 원칙 안내입니다.",
};

export default function YouthProtectionPage() {
  return (
    <InfoPage title="청소년보호정책" eyebrow="Youth Protection">
      <p className="policy-meta">최종 업데이트: {site.updatedAt}</p>
      <p>
        오늘웃김은 생활 유머와 가벼운 에세이를 제공하는 사이트로, 청소년에게 유해할 수 있는
        콘텐츠를 게시하지 않도록 관리합니다. 모든 게시물에는 운영원칙과 이용약관의 금지
        기준을 적용합니다.
      </p>

      <h2>게시하지 않는 내용</h2>
      <ul>
        <li>성적 착취, 음란물, 노골적인 성적 표현</li>
        <li>자해, 폭력, 범죄, 위험 행위를 조장하는 내용</li>
        <li>도박, 불법 약물, 불법 거래를 홍보하거나 유도하는 내용</li>
        <li>청소년 대상 괴롭힘, 혐오, 차별을 조장하는 내용</li>
        <li>개인정보 노출, 사생활 침해, 초상권 침해 가능성이 있는 내용</li>
      </ul>

      <h2>광고와 외부 링크 관리</h2>
      <p>
        광고나 외부 링크가 표시되는 경우에도 청소년에게 부적절한 내용이 노출되지 않도록
        가능한 범위에서 차단과 신고 조치를 검토합니다. 부적절한 광고가 보이면 화면 정보와
        페이지 URL을 함께 보내 주세요.
      </p>

      <h2>신고와 조치</h2>
      <p>
        청소년에게 유해하다고 판단되는 콘텐츠나 광고를 발견하면{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> 로 신고해 주세요.
        확인 후 수정, 비공개, 삭제, 광고 차단 요청 등 필요한 조치를 검토합니다.
      </p>

      <h2>보호 책임</h2>
      <p>
        운영 주체는 {site.owner}이며, 청소년 보호와 관련한 신고는 일반 문의보다 우선
        확인합니다. 신고 내용에 개인정보가 포함된 경우 개인정보처리방침에 따라 관리합니다.
      </p>
    </InfoPage>
  );
}
