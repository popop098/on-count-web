import Link from "next/link";
import { NextSeo } from "next-seo";
import ContainerBox from "@/components/ContainerBox";

export default function AdsenseSafeContentGuidePage() {
  const canonicalUrl = "https://on-count.kr/guide/adsense-safe-content";
  const description =
    "온-카운트가 콘텐츠 페이지를 애드센스 친화적으로 운영하기 위해 적용한 작성 원칙, 데이터 기준, 갱신 정책을 안내합니다.";

  return (
    <>
      <NextSeo
        title="가이드: 애드센스 안전 콘텐츠"
        description={description}
        canonical={canonicalUrl}
        openGraph={{
          url: canonicalUrl,
          title: "가이드: 애드센스 안전 콘텐츠",
          description,
          type: "article",
          siteName: "온-카운트",
          locale: "ko_KR",
        }}
      />
      <ContainerBox>
        <article className="w-[92%] sm:w-[80%] lg:w-[68%] mx-auto py-28 sm:py-32 text-sm sm:text-base leading-7 flex flex-col gap-8">
          <header className="flex flex-col gap-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-primary">
              애드센스 안전 콘텐츠 운영 가이드
            </h1>
            <p className="text-default-600">
              이 문서는 온-카운트가 검색 노출과 광고 정책을 동시에 만족하기 위해
              어떤 콘텐츠 기준을 적용하는지 설명합니다. 단순 키워드 나열, 자동
              생성 문장 반복, 출처가 불명확한 데이터 강조 같은 저품질 패턴을
              지양하고, 사용자에게 실제로 도움이 되는 정보 밀도를 유지하는 것이
              핵심 원칙입니다.
            </p>
          </header>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">서비스 설명 중심의 문서 구조</h2>
            <p>
              온-카운트의 고정 페이지는 반드시 서비스 기능, 데이터 수집 원칙,
              갱신 주기, 사용자 가치라는 네 가지 축을 포함합니다. 이는 광고 승인을
              위한 형식 맞추기가 아니라, 방문자가 페이지를 읽고 즉시 "어떤 문제를
              해결할 수 있는지"를 이해하도록 돕기 위한 구조입니다. 페이지마다
              문장·사례·맥락을 다르게 작성해 중복 콘텐츠로 판단될 여지를 줄이고,
              실사용 관점의 설명 비율을 높여 체류 가치가 유지되도록 설계합니다.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">데이터 수집 기준과 표현 원칙</h2>
            <p>
              채널 관련 데이터는 공개된 지표를 기반으로 하며, 개인 민감 정보
              수집이나 추론형 프로파일링을 목적으로 하지 않습니다. 수집 항목은
              채널 식별 및 팔로워 관찰에 필요한 범위로 제한하고, 페이지 본문에서는
              "어떤 수치가 어떤 맥락에서 유의미한지"를 함께 설명해 숫자만 과도하게
              부각하는 방식에서 벗어납니다. 또한 데이터는 참고 지표이며, 플랫폼
              원천 데이터의 변경 가능성이 존재함을 안내해 과장 표현을 방지합니다.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">갱신 주기와 품질 유지 절차</h2>
            <p>
              온-카운트는 사용자 요청, 내부 큐, 운영 점검을 조합해 데이터를
              갱신합니다. 문서 페이지는 기능 업데이트나 정책 변경이 있을 때 텍스트를
              재검토하여 오래된 설명이 누적되지 않도록 관리합니다. 특히 광고 정책
              관련 문서는 분기 단위 점검을 권장해 링크 상태, 중복 문장, 과도한
              키워드 반복, 오해 소지가 있는 문구를 정리하고 최신 기준에 맞춰
              개선합니다.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">사용자 가치: 왜 이 문서가 필요한가</h2>
            <p>
              방문자는 이 가이드를 통해 온-카운트의 콘텐츠가 단순 트래픽 확보용
              페이지가 아니라, 신뢰 가능한 데이터 안내 문서라는 점을 확인할 수
              있습니다. 운영자는 문서 표준을 공유함으로써 페이지 추가 시 품질 편차를
              줄일 수 있고, 결과적으로 사용자·검색엔진·광고 심사 관점에서 모두
              안정적인 콘텐츠 운영 체계를 유지할 수 있습니다.
            </p>
          </section>

          <nav className="flex flex-wrap gap-3 pt-2">
            <Link href="/about" className="text-primary underline underline-offset-4">
              온-카운트 소개 보기
            </Link>
            <Link
              href="/guide/follower-trends"
              className="text-primary underline underline-offset-4"
            >
              팔로워 추이 해석 가이드
            </Link>
            <Link href="/" className="text-primary underline underline-offset-4">
              홈으로 이동
            </Link>
          </nav>
        </article>
      </ContainerBox>
    </>
  );
}
