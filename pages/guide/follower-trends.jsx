import Link from "next/link";
import { NextSeo } from "next-seo";
import ContainerBox from "@/components/ContainerBox";

export default function FollowerTrendsGuidePage() {
  const canonicalUrl = "https://on-count.kr/guide/follower-trends";
  const description =
    "팔로워 증감 데이터를 어떻게 해석해야 하는지, 수집 기준과 갱신 주기를 포함해 온-카운트 실무 관점으로 정리한 가이드입니다.";

  return (
    <>
      <NextSeo
        title="가이드: 팔로워 추이 읽는 법"
        description={description}
        canonical={canonicalUrl}
        openGraph={{
          url: canonicalUrl,
          title: "가이드: 팔로워 추이 읽는 법",
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
              팔로워 추이 데이터 해석 가이드
            </h1>
            <p className="text-default-600">
              팔로워 숫자는 직관적이지만, 해석 방식에 따라 의미가 크게 달라집니다.
              온-카운트는 단일 시점의 절대값보다 "변화의 패턴"을 중요하게 보고,
              검색 결과·순위·최근 갱신 정보가 어떤 맥락을 가지는지 함께 읽도록
              안내합니다. 이 문서는 데이터 소비자가 오해 없이 지표를 사용할 수
              있도록 기본 해석 프레임을 제공합니다.
            </p>
          </header>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">서비스에서 제공하는 추이 단서</h2>
            <p>
              홈의 공개 스트리머/팔로워 순위/최근 조회된 채널 영역은 각각 다른
              관찰 포인트를 제공합니다. 공개 스트리머는 비교 가능한 표본 집합,
              순위는 상대적 위치, 최근 조회는 실시간 관심도를 반영한 업데이트
              우선순위 힌트로 볼 수 있습니다. 사용자는 이 세 영역을 교차 확인해
              "갑작스러운 증가가 일시 이벤트인지, 지속 성장인지"를 보다 안정적으로
              판단할 수 있습니다.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">데이터 수집 기준과 해석 시 주의점</h2>
            <p>
              수집 데이터는 공개 채널 기준의 식별 정보와 팔로워 수이며, 서비스
              목적은 채널 성장 관찰입니다. 따라서 팔로워 수는 콘텐츠 품질의 절대적
              평가 지표가 아니라, 특정 기간의 반응량을 보여주는 운영 지표로
              해석해야 합니다. 예를 들어 외부 협업, 클립 바이럴, 플랫폼 추천 노출
              같은 변수는 단기간 변동을 만들 수 있으므로, 단 하루의 상승/하락만으로
              장기 성과를 단정하지 않는 것이 바람직합니다.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">갱신 주기 이해하기</h2>
            <p>
              온-카운트 데이터는 조회 트래픽과 내부 업데이트 흐름에 따라 갱신되며,
              채널마다 반영 시점이 완전히 동일하지 않을 수 있습니다. 이 구조는
              사용자가 실제로 많이 확인하는 채널을 우선 갱신해 효율과 최신성을 함께
              확보하기 위한 방식입니다. 따라서 추세를 평가할 때는 단일 화면 캡처보다
              일정 시간 간격으로 반복 확인해 변화 방향을 비교하는 접근이 더
              신뢰할 수 있습니다.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">사용자가 얻는 실질적 가치</h2>
            <p>
              팬은 관심 채널의 성장 타이밍을 빠르게 파악하고, 스트리머/매니저는
              이벤트 이후의 반응을 확인하며, 커뮤니티 운영자는 협업 혹은 주제 선정
              시 참고 가능한 근거를 축적할 수 있습니다. 즉 온-카운트의 팔로워
              추이 정보는 단순 관전용 수치가 아니라, 콘텐츠 전략·커뮤니케이션
              계획·성과 회고에 활용되는 의사결정 보조 데이터로 기능합니다.
            </p>
          </section>

          <nav className="flex flex-wrap gap-3 pt-2">
            <Link href="/about" className="text-primary underline underline-offset-4">
              온-카운트 소개 보기
            </Link>
            <Link
              href="/guide/adsense-safe-content"
              className="text-primary underline underline-offset-4"
            >
              애드센스 안전 콘텐츠 가이드
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
