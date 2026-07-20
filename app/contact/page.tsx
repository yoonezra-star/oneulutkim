import type { Metadata } from "next";
import { InfoPage } from "../components";
import { site } from "../data";

export const metadata: Metadata = {
  title: `문의 - ${site.name}`,
  description: `${site.name} 운영 문의 안내`,
};

export default function ContactPage() {
  return (
    <InfoPage title="문의" eyebrow="Contact">
      <p>
        사이트 운영, 광고, 제휴, 오류 신고는 아래 이메일로 보내 주세요. 답변이
        필요한 문의는 내용과 연락 가능한 주소를 함께 남겨 주세요.
      </p>
      <p className="contact-box">
        <strong>운영 이메일</strong>
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
      </p>
      <h2>문의 전 확인</h2>
      <p>
        저작권 또는 개인정보 관련 삭제 요청은 더 빠르게 확인할 수 있도록
        삭제요청 페이지의 양식 기준에 맞춰 보내 주세요.
      </p>
    </InfoPage>
  );
}
