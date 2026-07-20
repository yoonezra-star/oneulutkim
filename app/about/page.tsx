import type { Metadata } from "next";
import { InfoPage } from "../components";
import { site } from "../data";

export const metadata: Metadata = {
  title: `소개 - ${site.name}`,
  description: site.description,
};

export default function AboutPage() {
  return (
    <InfoPage title="사이트 소개" eyebrow="About">
      <p>
        오늘웃김은 빠르게 읽히는 게시판형 유머 사이트를 목표로 합니다. 다만 단순
        복사 게시판이 아니라, 생활에서 관찰한 장면을 직접 쓴 문장과 짧은 해설로
        정리합니다.
      </p>
      <h2>운영 방향</h2>
      <p>
        글은 일상, 회사생활, 먹는 이야기, 디지털 생활, 문화잡담으로 나누어
        발행합니다. 제목만 모으는 방식은 피하고, 각 글마다 자체 문장과 맥락을
        포함합니다.
      </p>
      <h2>광고와 콘텐츠 기준</h2>
      <p>
        광고 게재가 시작되더라도 본문을 가리거나 클릭을 유도하는 배치는 하지
        않습니다. 불쾌감을 주는 표현, 저작권이 불분명한 자료, 성인용 콘텐츠,
        혐오 또는 과도한 폭력 표현은 게시하지 않습니다.
      </p>
    </InfoPage>
  );
}
