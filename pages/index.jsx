import { NextSeo } from 'next-seo';
import { Button, Input, Spinner, Switch } from "@heroui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import ContainerBox from "@/components/ContainerBox";
import { swrFetcher } from "@/tools/fetchTools";
import dynamic from "next/dynamic";

// Lazy load heavy components using Next.js dynamic imports
const DarkVeil = dynamic(() => import("@/components/backgrounds/DarkVeil"), {
  ssr: false, // Disable SSR for WebGL component
  loading: () => <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900" />
});

const StreamerInfoCard = dynamic(() => import("@/components/StreamerInfoCard"), {
  loading: () => <div className="w-full h-64 flex flex-col items-center justify-center"><Spinner color="primary" size="lg" /></div>
});

const TextType = dynamic(() => import("@/components/TextType"), {
  loading: () => <div className="sm:text-3xl text-xl font-extrabold -my-90 z-0 text-white">로딩 중...</div>
});

export default function Index() {
  const { data, isLoading, isValidating } = useSWR(
    "/api/get-channels-data",
    swrFetcher,
    { revalidateOnFocus: false },
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
  const title = '온카운트 - 실시간 스트리머 팔로워 현황';
  const description = '좋아하는 스트리머의 팔로워 수를 실시간으로 확인하고 검색하세요.';

  return (
    <>
      <NextSeo
        title="홈"
        description={description}
        canonical="https://on-count.kr/"
        openGraph={{
          url: 'https://on-count.kr/',
          title: title,
          description: description,
          images: [
            {
              url: `https://on-count.kr/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
              width: 1200,
              height: 630,
              alt: '온카운트 홈',
            },
          ],
        }}
      />
      <ContainerBox>
          <div style={{ width: "100%", height: "600px", position: "relative" }}>
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
        <div className="w-[60%] h-[22em] mx-auto flex flex-col items-center justify-center gap-4"></div>
        <div className="w-[65%] h-[25em] mx-auto flex flex-col items-center justify-center gap-4 z-0">
          <p className="font-extrabold text-lg sm:text-2xl text-primary">
            검색하고 싶은 스트리머 있으신가요?
          </p>
          <div className="flex item-center justify-center gap-1 w-full">
            <Input
              label="스트리머 검색하기"
              variant="flat"
              color="primary"
              className="font-extrabold sm:w-[60%]"
              type="search"
              value={searchInput}
              onValueChange={setSearchInput}
              onKeyDown={handleKeyDown}
            />
            <Button
              size="sm"
              className="h-full text-xl"
              onPress={() => {
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
            검색 기록 {enabledSaveSearchHistory ? "끄기" : "켜기"}
          </Switch>
          <div className="flex flex-wrap items-center justify-center gap-2 w-full">
            {searchHistory?.map((item, index) => (
              <div key={`search-history-${item}-${index}`} className="relative">
                <Button
                  size="sm"
                  onPress={() =>
                    router.push({
                      pathname: "/search",
                      query: {
                        q: item,
                      },
                    })
                  }
                >
                  {item}
                </Button>
                <div
                  role="button"
                  tabIndex={0}
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
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[60%] h-1 bg-gray-300/50 rounded-2xl" />
        <div className="w-[60%] mx-auto flex flex-col items-start justify-center gap-4">
          <div className="w-full flex flex-col items-start justify-center">
            <p className="font-extrabold text-2xl text-primary text-center w-full">
              공개 스트리머
            </p>
            <p className="font-medium text-sm text-gray-500 text-center w-full">
              온-카운트내에 등록과 공개상태인 스트리머 리스트에요.
            </p>
          </div>
            <div className="flex flex-wrap items-center gap-1 w-full">
                {isLoading || isValidating || !data ? (
                    <div className="w-full h-64 flex flex-col items-center justify-center">
                        <Spinner color="primary" size="lg" />
                    </div>
                ) : (
                    data.map((item) => (
                        <StreamerInfoCard
                            key={item.channel_id}
                            channelName={item.channel_name}
                            channelImageUrl={item.channel_image_url}
                            channelUrl={`/info/${item.channel_id}`}
                            channelFollwerCount={item.follower_count}
                            channelVerificationMark={item.verified_mark}
                        />
                    ))
                )}
            </div>

        </div>
      </ContainerBox>
    </>
  );
}
