import { Button, Input, Spinner, Switch } from "@heroui/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import useSWR from "swr";
import ContainerBox from "@/components/ContainerBox";
import { swrFetcher } from "@/tools/fetchTools";

// Lazy load heavy components using Next.js dynamic imports
const DarkVeil = dynamic(() => import("@/components/backgrounds/DarkVeil"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900" />
  ),
});

const StreamerInfoCard = dynamic(
  () => import("@/components/StreamerInfoCard"),
  {
    loading: () => (
      <div className="w-full h-64 flex flex-col items-center justify-center">
        <Spinner color="primary" size="lg" />
      </div>
    ),
  },
);

const TextType = dynamic(() => import("@/components/TextType"), {
  loading: () => (
    <div className="sm:text-3xl text-xl font-extrabold -my-90 z-0 text-white">
      로딩 중...
    </div>
  ),
});

const StreamerSection = ({ title, description, channels, loading }) => (
  <div className="w-[92%] sm:w-[85%] lg:w-[60%] mx-auto flex flex-col items-start justify-center gap-4">
    <div className="w-full flex flex-col items-start justify-center">
      <p className="font-extrabold text-xl sm:text-2xl text-primary text-center w-full">
        {title}
      </p>
      <p className="font-medium text-xs sm:text-sm text-gray-500 text-center w-full">
        {description}
      </p>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 w-full">
      {loading ? (
        <div className="w-full h-64 flex flex-col items-center justify-center">
          <Spinner color="primary" size="lg" />
        </div>
      ) : (
        channels?.map((item) => (
          <StreamerInfoCard
            key={item?.channel_id || Math.random()}
            channelName={item?.channel_name || ""}
            channelImageUrl={item?.channel_image_url || ""}
            channelUrl={`/info/${item?.channel_id || ""}`}
            channelFollwerCount={item?.follower_count || 0}
            channelVerificationMark={item?.verified_mark || false}
          />
        ))
      )}
    </div>
  </div>
);

export default function Index() {
  const { data, isLoading, isValidating } = useSWR(
    "/api/get-channels-data",
    swrFetcher,
    {
      revalidateOnFocus: false,
    },
  );
  const [searchInput, setSearchInput] = useState("");
  const [enabledSaveSearchHistory, setEnabledSaveSearchHistory] =
    useState(undefined);
  const [searchHistory, setSearchHistory] = useState(undefined);
  const router = useRouter();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (enabledSaveSearchHistory) {
        const prevHistory = Array.isArray(searchHistory) ? searchHistory : [];
        const newHistory = [searchInput, ...prevHistory];
        setSearchHistory(newHistory);
        localStorage.setItem("searchHistory", JSON.stringify(newHistory));
      }

      return router.push({
        pathname: "/search",
        query: {
          q: searchInput,
        },
      });
    }
  };

  const handleSwitchSaveSearchHistoryOption = (e) => {
    const value = e.target.checked;
    setEnabledSaveSearchHistory(value);
    if (!value) {
      localStorage.setItem("searchHistory", JSON.stringify([]));
      setSearchHistory([]);
    }
    localStorage.setItem("saveSearchHistory", JSON.stringify(value));
  };

  useEffect(() => {
    const localStorageSaveSearchHistory =
      localStorage.getItem("saveSearchHistory");
    const localStorageSearchHistory = localStorage.getItem("searchHistory");

    const initialSaveHistory = localStorageSaveSearchHistory
      ? JSON.parse(localStorageSaveSearchHistory)
      : true;

    const initialSearchHistory = localStorageSearchHistory
      ? JSON.parse(localStorageSearchHistory)
      : [];

    if (!localStorageSaveSearchHistory) {
      localStorage.setItem("saveSearchHistory", JSON.stringify(true));
    }
    if (!localStorageSearchHistory) {
      localStorage.setItem("searchHistory", JSON.stringify([]));
    }

    setEnabledSaveSearchHistory(initialSaveHistory);
    setSearchHistory(initialSearchHistory);
  }, []);

  const description =
    "좋아하는 스트리머의 팔로워 수를 실시간으로 확인하고 검색하세요.";
  const isSectionLoading = isLoading || isValidating || !data;

  return (
    <>
      <NextSeo
        title="홈"
        description={description}
        canonical="https://on-count.kr/"
      />
      <ContainerBox>
        <div
          style={{
            width: "100%",
            height: "600px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <DarkVeil />
        </div>
        <TextType
          text={[
            "실시간 팔로워 현황 검색은?",
            "온-카운트와 함께!",
            "언제 어디서나 온-카운트.",
          ]}
          typingSpeed={100}
          pauseDuration={1500}
          showCursor
          cursorCharacter="|"
          textColors={["#ffffff"]}
          className="sm:text-3xl text-xl font-extrabold -my-90 z-0"
          cursorClassName="text-primary"
        />
        <div className="w-[92%] sm:w-[65%] h-[16em] sm:h-[22em] mx-auto flex flex-col items-center justify-center gap-4" />
        <div className="w-[92%] sm:w-[80%] lg:w-[65%] h-[22em] sm:h-[25em] mx-auto flex flex-col items-center justify-center gap-4 z-0">
          <p className="font-extrabold text-lg sm:text-2xl text-primary">
            검색하고 싶은 스트리머 있으신가요?
          </p>
          <div className="flex item-center justify-center gap-1 w-full">
            <Input
              label="스트리머 검색하기"
              variant="flat"
              color="primary"
              className="font-extrabold w-full sm:w-[60%]"
              type="search"
              value={searchInput}
              onValueChange={setSearchInput}
              onKeyDown={handleKeyDown}
            />
            <Button
              size="sm"
              className="h-full text-xl"
              onPress={() => {
                const goBtn = document.activeElement;
                if (goBtn) {
                  goBtn.setAttribute("aria-busy", "true");
                  goBtn.setAttribute("disabled", "true");
                }
                if (enabledSaveSearchHistory) {
                  const prevHistory = Array.isArray(searchHistory)
                    ? searchHistory
                    : [];
                  const newHistory = [searchInput, ...prevHistory];
                  setSearchHistory(newHistory);
                  localStorage.setItem(
                    "searchHistory",
                    JSON.stringify(newHistory),
                  );
                }
                router.push({
                  pathname: "/search",
                  query: {
                    q: searchInput,
                  },
                });
              }}
            >
              GO!
            </Button>
          </div>
          <Switch
            size="sm"
            className="font-thin"
            onChange={(e) => handleSwitchSaveSearchHistoryOption(e)}
            isSelected={enabledSaveSearchHistory}
          >
            검색 기록 {enabledSaveSearchHistory === true ? "끄기" : "켜기"}
          </Switch>
          <div className="flex flex-wrap items-center justify-center gap-2 w-full">
            {searchHistory?.map((item, index) => {
              const displayItem =
                typeof item === "string" ? item : String(item || "");
              return (
                <div key={`search-history-${displayItem}`} className="relative">
                  <Button
                    size="sm"
                    onPress={() =>
                      router.push({
                        pathname: "/search",
                        query: {
                          q: displayItem,
                        },
                      })
                    }
                  >
                    {displayItem}
                  </Button>
                  <button
                    type="button"
                    className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs cursor-pointer"
                    onClick={() => {
                      const newHistory = searchHistory.filter(
                        (_, i) => i !== index,
                      );
                      setSearchHistory(newHistory);
                      localStorage.setItem(
                        "searchHistory",
                        JSON.stringify(newHistory),
                      );
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const newHistory = searchHistory.filter(
                          (_, i) => i !== index,
                        );
                        setSearchHistory(newHistory);
                        localStorage.setItem(
                          "searchHistory",
                          JSON.stringify(newHistory),
                        );
                      }
                    }}
                  >
                    x
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <section className="w-[92%] sm:w-[80%] lg:w-[65%] mx-auto flex flex-col items-center gap-3 py-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-primary">온-카운트 고정 안내 페이지</h2>
          <p className="text-xs sm:text-sm text-gray-500">
            서비스 설명, 데이터 수집 기준, 갱신 주기, 활용 가치를 정리한 문서를 통해 온-카운트를 더 깊게 이해해보세요.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/about" className="underline underline-offset-4 text-primary">
              서비스 소개
            </Link>
            <Link
              href="/guide/adsense-safe-content"
              className="underline underline-offset-4 text-primary"
            >
              애드센스 안전 콘텐츠 가이드
            </Link>
            <Link
              href="/guide/follower-trends"
              className="underline underline-offset-4 text-primary"
            >
              팔로워 추이 해석 가이드
            </Link>
          </div>
        </section>

        <div className="w-[92%] sm:w-[60%] h-1 bg-gray-300/50 rounded-2xl" />

        <StreamerSection
          title="공개 스트리머"
          description="온-카운트내에 등록과 공개상태인 스트리머 리스트에요."
          channels={data?.publicChannels || []}
          loading={isSectionLoading}
        />

        <div className="w-[92%] sm:w-[60%] h-1 bg-gray-300/50 rounded-2xl mt-10" />

        <StreamerSection
          title="팔로워 순위"
          description="공개 여부와 관계없이 데이터베이스에 저장된 채널의 팔로워 순위를 보여줘요."
          channels={data?.followerRanking || []}
          loading={isSectionLoading}
        />

        <div className="w-[92%] sm:w-[60%] h-1 bg-gray-300/50 rounded-2xl mt-10" />

        <StreamerSection
          title="최근 조회된 채널"
          description="최근 검색/접근 과정에서 저장되거나 갱신된 채널을 보여줘요."
          channels={data?.recentViewedChannels || []}
          loading={isSectionLoading}
        />
      </ContainerBox>
    </>
  );
}
