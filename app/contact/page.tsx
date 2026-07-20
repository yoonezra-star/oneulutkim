import type { Metadata } from "next";
import { InfoPage } from "../components";
import { site } from "../data";

export const metadata: Metadata = {
  title: `문의 - ${site.name}`,
  description: "오늘웃김 운영 문의, 광고 문의, 오류 신고, 권리 침해 신고 접수 안내입니다.",
};

export default function ContactPage() {
  return (
    <InfoPage title="문의" eyebrow="Contact">
      <p className="policy-meta">최종 업데이트: {site.updatedAt}</p>
      <p>
        사이트 운영, 광고, 제휴, 오류 신고, 개인정보 문의는 아래 이메일로 보내 주세요.
        정확한 확인을 위해 문의 목적과 관련 URL, 회신 가능한 이메일 주소를 함께 적어 주시면
        더 빠르게 확인할 수 있습니다.
      </p>

      <p className="contact-box">
        <strong>운영 이메일</strong>
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
      </p>

      <h2>문의 가능 항목</h2>
      <ul>
        <li>사이트 이용 오류, 깨진 링크, 모바일 표시 문제</li>
        <li>콘텐츠 오탈자, 사실관계 오류, 표현 수정 요청</li>
        <li>광고 게재, 제휴, 협업 제안</li>
        <li>개인정보 열람, 정정, 삭제 요청</li>
        <li>저작권, 초상권, 명예훼손 등 권리 침해 신고</li>
      </ul>

      <h2>빠른 접수 경로</h2>
      <p>
        오탈자나 사실관계 수정은 <a href="/corrections">정정·제보</a>, 광고 관련 문의는{" "}
        <a href="/advertising-policy">광고정책</a>, 청소년에게 부적절한 콘텐츠 신고는{" "}
        <a href="/youth-protection">청소년보호정책</a>을 먼저 확인하면 필요한 정보를 더
        빠르게 정리할 수 있습니다.
      </p>

      <h2>권리 침해 또는 삭제 요청</h2>
      <p>
        게시물 삭제, 비공개, 출처 정정이 필요한 경우에는 <a href="/takedown">삭제요청</a>{" "}
        페이지의 양식에 맞춰 보내 주세요. 문제 게시물 URL, 요청 사유, 권리자임을 확인할 수
        있는 정보가 있어야 더 정확하게 처리할 수 있습니다.
      </p>

      <h2>답변 기준</h2>
      <p>
        일반 문의는 가능한 한 영업일 기준 3일 안에 답변합니다. 권리 침해나 개인정보 노출이
        의심되는 요청은 우선 검토하며, 내용 확인에 추가 자료가 필요한 경우 회신 이메일로
        보완을 요청할 수 있습니다.
      </p>

      <h2>문의 예시</h2>
      <ul>
        <li>문의 유형: 오류 신고 / 광고 문의 / 삭제 요청 / 개인정보 문의</li>
        <li>관련 주소: 문제가 있는 게시물 또는 페이지 URL</li>
        <li>내용: 확인이 필요한 부분과 원하는 조치</li>
        <li>회신처: 답변을 받을 이메일 주소</li>
      </ul>
    </InfoPage>
  );
}
