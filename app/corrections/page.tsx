import type { Metadata } from "next";
import { InfoPage } from "../components";
import { site } from "../data";

export const metadata: Metadata = {
  title: `정정·제보 - ${site.name}`,
  description:
    "오늘웃김 콘텐츠의 오탈자, 사실관계 오류, 출처 오류, 부적절한 표현 정정 요청 절차입니다.",
};

export default function CorrectionsPage() {
  return (
    <InfoPage title="정정·제보" eyebrow="Corrections">
      <p className="policy-meta">최종 업데이트: {site.updatedAt}</p>
      <p>
        오늘웃김은 직접 작성한 생활 유머 콘텐츠를 운영하지만, 오탈자나 표현상 오류, 출처
        오류, 사실관계 착오가 생길 수 있습니다. 더 정확하고 안전한 사이트 운영을 위해
        방문자의 정정 제보를 받습니다.
      </p>

      <h2>정정 요청 대상</h2>
      <ul>
        <li>오탈자, 잘못된 링크, 깨진 이미지, 모바일 표시 오류</li>
        <li>사실관계 착오, 부정확한 설명, 과장된 표현</li>
        <li>출처 누락, 출처 표기 오류, 인용 범위 관련 문제</li>
        <li>특정 개인이나 집단을 불필요하게 오해하게 만들 수 있는 표현</li>
        <li>광고, 개인정보, 청소년 보호 정책과 충돌할 수 있는 요소</li>
      </ul>

      <h2>보내 주실 내용</h2>
      <ul>
        <li>문제가 있는 페이지 URL</li>
        <li>정정이 필요한 문장이나 위치</li>
        <li>수정이 필요하다고 판단하는 이유</li>
        <li>가능하다면 확인 가능한 근거 또는 참고 자료</li>
        <li>답변을 받을 이메일 주소</li>
      </ul>

      <p className="contact-box">
        <strong>정정 제보 이메일</strong>
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
      </p>

      <h2>처리 방식</h2>
      <p>
        제보가 접수되면 운영 기준에 따라 확인합니다. 단순 오탈자는 바로 수정할 수 있고,
        권리 침해나 개인정보 노출이 의심되는 경우에는 <a href="/takedown">삭제요청</a>{" "}
        절차에 준해 우선 조치할 수 있습니다.
      </p>
    </InfoPage>
  );
}
