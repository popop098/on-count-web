import Link from "next/link";
import { NextSeo } from "next-seo";
import ContainerBox from "@/components/ContainerBox";

export default function AboutPage() {
  const canonicalUrl = "https://on-count.kr/about";
  const description =
    "온-카운트의 서비스 목적, 데이터 수집 기준, 갱신 주기, 그리고 사용자가 실제로 얻는 가치를 정리한 소개 페이지입니다.";

  return (
    <>
      <NextSeo
        title="온-카운트 소개"
        description={description}
        canonical={canonicalUrl}
        openGraph={{
          url: canonicalUrl,
          title: "온-카운트 소개",
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
              온-카운트(ON-COUNT) 서비스 소개
            </h1>
            <p className="text-default-600">
              온-카운트는 치지직(CHZZK) 기반 채널 데이터를 바탕으로 스트리머의
              팔로워 추이를 빠르게 확인할 수 있도록 설계된 데이터 탐색형
              서비스입니다. 단순히 숫자를 보여주는 데 그치지 않고, 검색·비교·최근
              갱신 흐름을 함께 제공해 크리에이터 분석, 팬덤 성장 관찰, 콘텐츠 기획
              검토까지 연결할 수 있는 실용적인 정보를 제공하는 것이 목표입니다.
            </p>
          </header>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">서비스 설명과 제공 범위</h2>
            <p>
              서비스는 공개 채널 목록, 팔로워 순위, 최근 조회 기반 업데이트 목록을
              핵심 영역으로 구성합니다. 사용자는 특정 채널을 직접 검색하거나,
              홈에서 노출되는 순위/최근 갱신 목록을 통해 변화를 빠르게 파악할 수
              있습니다. 특히 단기적인 이벤트나 방송 이슈 이후 팔로워 변화가
              실제로 반영되는지 확인하려는 사용자에게 즉시성 있는 확인 경험을
              제공하도록 UI와 API 응답 흐름을 단순화했습니다.
            </p>
            <p>
              또한 운영자는 공지 및 약관/정책 페이지를 통해 서비스 정책과
              데이터 처리 원칙을 투명하게 공개하며, 주요 안내 문서는 누구나 링크로
              접근할 수 있도록 구성해 검색엔진 크롤러와 일반 사용자 모두에게 접근
              장벽을 낮췄습니다.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">데이터 수집 기준</h2>
            <p>
              온-카운트는 공개적으로 확인 가능한 채널 식별 정보(채널 ID, 채널명,
              프로필 이미지, 인증 여부 등)와 팔로워 수를 수집·정리합니다. 데이터는
              서비스 기능 제공을 위한 최소 범위를 원칙으로 하며, 채널 정보와
              팔로워 지표 외에 개인 민감 정보를 수집하지 않습니다. 검색 기능은
              사용자가 입력한 키워드를 기반으로 결과를 조회하지만, 검색 기록 보관은
              로컬 저장소 옵션에 따라 사용자 단말 내에서 제어할 수 있도록 되어
              있습니다.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">갱신 주기와 데이터 신뢰성</h2>
            <p>
              채널 데이터는 사용자 조회 요청과 내부 갱신 로직에 따라 주기적으로
              업데이트됩니다. 즉, 모든 채널이 동일한 초 단위 간격으로 고정 갱신되는
              구조가 아니라, 실제 접근 빈도와 운영 정책을 반영해 갱신 우선순위가
              조정됩니다. 이를 통해 트래픽 효율성을 유지하면서도 실제 사용자에게
              필요한 채널의 최신성을 높이는 방향으로 서비스가 동작합니다.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">사용자가 얻는 가치</h2>
            <p>
              시청자는 관심 스트리머의 성장 흐름을 빠르게 확인할 수 있고, 스트리머
              본인이나 매니저는 채널 운영 이벤트 이후 반응 추이를 체크할 수
              있습니다. 또 커뮤니티 운영자나 협업 담당자는 순위와 증가 추세를 통해
              협업 후보군을 탐색하는 데 참고할 수 있습니다. 결과적으로 온-카운트는
              실시간성에 가까운 팔로워 지표를 통해 의사결정의 속도를 높이는
              데이터 관찰 도구로 기능합니다.
            </p>
          </section>

          <nav className="flex flex-wrap gap-3 pt-2">
            <Link href="/" className="text-primary underline underline-offset-4">
              홈으로 이동
            </Link>
            <Link
              href="/guide/adsense-safe-content"
              className="text-primary underline underline-offset-4"
            >
              애드센스 안전 콘텐츠 가이드
            </Link>
            <Link
              href="/guide/follower-trends"
              className="text-primary underline underline-offset-4"
            >
              팔로워 추이 해석 가이드
            </Link>
          </nav>
        </article>
      </ContainerBox>
    </>
  );
}
