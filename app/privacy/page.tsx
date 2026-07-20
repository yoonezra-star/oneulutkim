import type { Metadata } from "next";
import { InfoPage } from "../components";
import { site } from "../data";

export const metadata: Metadata = {
  title: `개인정보처리방침 - ${site.name}`,
  description:
    "오늘웃김의 개인정보 수집 항목, 이용 목적, 보관 기간, 쿠키와 Google AdSense 광고 고지입니다.",
};

export default function PrivacyPage() {
  return (
    <InfoPage title="개인정보처리방침" eyebrow="Privacy">
      <p className="policy-meta">최종 업데이트: {site.updatedAt}</p>
      <p>
        {site.name}은 이용자의 개인정보를 필요한 범위에서만 처리하며, 문의 응답과
        사이트 운영 안정성 확보 목적 외에는 개인정보를 임의로 사용하지 않습니다. 이
        방침은 {site.url} 및 연결된 사용자 지정 도메인에 적용됩니다.
      </p>

      <h2>1. 수집하는 개인정보</h2>
      <ul>
        <li>문의 접수 시: 이메일 주소, 문의 내용, 첨부 자료에 포함된 정보</li>
        <li>삭제 요청 시: 권리자 확인 정보, 문제 게시물 URL, 요청 사유, 회신 이메일</li>
        <li>자동 생성 정보: 접속 로그, 브라우저 정보, 기기 정보, IP 주소 일부, 쿠키 정보</li>
      </ul>
      <p>
        현재 회원가입, 댓글 작성, 결제, 위치 기반 서비스는 제공하지 않으며, 주민등록번호나
        결제 정보 같은 민감한 정보를 요구하지 않습니다.
      </p>

      <h2>2. 개인정보 이용 목적</h2>
      <ul>
        <li>문의, 제휴, 오류 신고, 권리 침해 신고에 대한 답변</li>
        <li>게시물 수정, 비공개, 삭제 등 운영상 필요한 조치</li>
        <li>사이트 보안, 악성 트래픽 대응, 서비스 품질 개선</li>
        <li>광고 노출 빈도 조정, 광고 성과 측정, 부정 클릭 방지</li>
      </ul>

      <h2>3. 쿠키와 제3자 광고 고지</h2>
      <p>
        오늘웃김은 Google AdSense 등 제3자 광고 서비스를 사용할 수 있습니다. 이 경우
        Google 및 광고 파트너는 이용자의 브라우저에 쿠키를 저장하거나 읽을 수 있으며,
        웹 비콘, IP 주소, 기기 정보와 같은 기술을 이용해 광고 제공, 맞춤 광고, 광고 성과
        측정, 부정 사용 방지에 필요한 정보를 처리할 수 있습니다.
      </p>
      <p>
        Google의 광고 관련 데이터 처리 방식은{" "}
        <a href="https://policies.google.com/technologies/ads?hl=ko" target="_blank" rel="noreferrer">
          Google 광고 기술 안내
        </a>
        에서 확인할 수 있습니다. 광고 맞춤 설정은{" "}
        <a href="https://myadcenter.google.com/" target="_blank" rel="noreferrer">
          Google 내 광고 센터
        </a>
        에서 관리할 수 있으며, Google이 공개한{" "}
        <a
          href="https://support.google.com/admanager/answer/9012903?hl=ko"
          target="_blank"
          rel="noreferrer"
        >
          광고 기술 제공업체 목록
        </a>
        도 확인할 수 있습니다. 오늘웃김의 광고 운영 기준은{" "}
        <a href="/advertising-policy">광고정책</a>, 쿠키별 안내는{" "}
        <a href="/cookie-policy">쿠키정책</a>을 함께 참고해 주세요.
      </p>

      <h2>4. 보관 기간</h2>
      <p>
        문의와 삭제 요청 기록은 처리 완료 후 분쟁 대응과 재문의 확인을 위해 최대 3년간
        보관할 수 있습니다. 단, 관련 법령에 따라 보존 의무가 있는 경우에는 해당 기간 동안
        보관합니다. 단순 접속 로그는 보안 점검과 통계 확인을 위해 필요한 기간만 보관합니다.
      </p>

      <h2>5. 제3자 제공과 처리 위탁</h2>
      <p>
        오늘웃김은 이용자의 개인정보를 사전 동의 없이 외부에 판매하거나 임의 제공하지
        않습니다. 다만 사이트 호스팅, 보안, 이메일 수신, 광고 제공 과정에서 Cloudflare,
        GitHub, Google 등 서비스 제공자가 기술적으로 데이터를 처리할 수 있습니다. 각
        제공자의 처리는 해당 서비스의 개인정보 보호정책과 약관에 따릅니다.
      </p>

      <h2>6. 이용자의 권리</h2>
      <p>
        이용자는 본인과 관련된 문의 기록의 열람, 정정, 삭제, 처리 제한을 요청할 수
        있습니다. 요청은 <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> 로
        보내 주시면 본인 확인 후 필요한 조치를 안내합니다.
      </p>

      <h2>7. 문의처</h2>
      <p>
        개인정보 보호와 관련한 문의, 정정, 삭제 요청은 운영 이메일{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> 로 접수합니다.
        법령 또는 광고 정책 변경, 서비스 기능 변경이 있을 경우 이 방침을 업데이트합니다.
        권리 침해가 우려되는 게시물은 <a href="/takedown">삭제요청</a>으로, 일반 오류는{" "}
        <a href="/corrections">정정·제보</a>로 접수할 수 있습니다.
      </p>
    </InfoPage>
  );
}
