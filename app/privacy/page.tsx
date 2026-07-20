import type { Metadata } from "next";
import { InfoPage } from "../components";
import { site } from "../data";

export const metadata: Metadata = {
  title: `개인정보처리방침 - ${site.name}`,
  description: `${site.name} 개인정보처리방침`,
};

export default function PrivacyPage() {
  return (
    <InfoPage title="개인정보처리방침" eyebrow="Privacy">
      <p>
        오늘웃김은 현재 회원가입과 댓글 기능을 제공하지 않으며, 이용자가 직접
        입력하는 개인정보는 문의 이메일 발송 시 제공한 정보에 한정됩니다.
      </p>
      <h2>수집하는 정보</h2>
      <p>
        문의 처리 과정에서 이메일 주소, 문의 내용, 첨부 자료에 포함된 정보가
        확인될 수 있습니다. 해당 정보는 문의 답변과 분쟁 대응 목적 외에는 사용하지
        않습니다.
      </p>
      <h2>광고와 쿠키</h2>
      <p>
        향후 Google AdSense 등 광고 서비스가 적용될 경우 광고 제공자는 쿠키 또는
        유사 기술을 사용해 광고 노출과 성과를 측정할 수 있습니다. 광고 적용 시 이
        방침과 ads.txt를 최신 상태로 갱신합니다.
      </p>
      <h2>보관 기간</h2>
      <p>
        문의 기록은 처리 완료 후 필요한 기간 동안 보관한 뒤 삭제합니다. 법령상
        보존 의무가 있는 경우에는 해당 기간 동안 보관할 수 있습니다.
      </p>
    </InfoPage>
  );
}
