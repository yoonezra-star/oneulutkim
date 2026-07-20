import type { Metadata } from "next";
import { InfoPage } from "../components";
import { site } from "../data";

export const metadata: Metadata = {
  title: `삭제요청 - ${site.name}`,
  description: `${site.name} 저작권 및 개인정보 삭제 요청 안내`,
};

export default function TakedownPage() {
  return (
    <InfoPage title="삭제요청" eyebrow="Takedown">
      <p>
        저작권, 초상권, 개인정보, 명예훼손 등 권리 침해가 우려되는 콘텐츠가 있다면
        운영 이메일로 요청해 주세요. 확인 후 필요한 조치를 진행합니다.
      </p>
      <h2>보내주실 내용</h2>
      <ul>
        <li>문제가 되는 게시글 주소</li>
        <li>권리 침해라고 판단하는 이유</li>
        <li>권리자 또는 대리인임을 확인할 수 있는 정보</li>
        <li>답변을 받을 이메일 주소</li>
      </ul>
      <p className="contact-box">
        <strong>삭제 요청 이메일</strong>
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
      </p>
      <p>
        명백한 개인정보 또는 권리 침해가 확인되는 경우 게시글 비공개, 일부 수정,
        삭제 등의 조치를 할 수 있습니다.
      </p>
    </InfoPage>
  );
}
