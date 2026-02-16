import { Button, Card, CardBody, Chip, Spinner } from "@heroui/react";
import { NextSeo } from "next-seo";
import useSWR from "swr";
import ContainerBox from "@/components/ContainerBox";
import { swrFetcher } from "@/tools/fetchTools";

const DEFAULT_FOLLOW_URL = "https://discord.gg/p2UnyUXU7P";

const toDateText = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export default function NoticePage() {
  const title = "공지사항 - 온카운트";
  const description =
    "온카운트의 최신 공지사항과 업데이트 소식을 전해드립니다.";

  const { data, isLoading, error } = useSWR(
    "/api/notices?limit=15",
    swrFetcher,
    {
      refreshInterval: 60_000,
      revalidateOnFocus: false,
    },
  );

  const notices = data?.notices || [];
  const followUrl = data?.followUrl || DEFAULT_FOLLOW_URL;

  return (
    <>
      <NextSeo
        title="공지사항"
        description={description}
        canonical="https://on-count.kr/notice"
        openGraph={{
          url: "https://on-count.kr/notice",
          title,
          description,
        }}
      />
      <ContainerBox>
        <div className="w-full h-[8em]" />
        <div className="w-[90%] max-w-4xl space-y-4 pb-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold">공지사항</h1>
              <p className="text-sm text-gray-400">
                Discord 공지채널 연동 · 1분 캐시 갱신
              </p>
            </div>
            <Button
              as="a"
              href={followUrl}
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
            >
              공식 서버 팔로우
            </Button>
          </div>

          <div className="w-full h-1 bg-gray-600 rounded-xl" />

          {isLoading && (
            <div className="w-full h-[24em] flex items-center justify-center">
              <Spinner color="primary" size="lg" />
            </div>
          )}

          {!isLoading && error && (
            <div className="w-full h-[16em] flex flex-col items-center justify-center gap-2 text-center">
              <p className="text-lg font-semibold">
                공지사항을 불러오지 못했습니다.
              </p>
              <p className="text-sm text-gray-400">
                {typeof error?.message === "string"
                  ? error.message
                  : "잠시 후 다시 시도해주세요."}
              </p>
            </div>
          )}

          {!isLoading && !error && notices.length === 0 && (
            <div className="w-full h-[16em] flex items-center justify-center">
              <p className="text-xl leading-tight">
                현재 등록된 공지사항이 없습니다.
              </p>
            </div>
          )}

          {!isLoading && !error && notices.length > 0 && (
            <div className="space-y-3">
              {notices.map((notice) => (
                <Card
                  key={notice.id}
                  className="bg-black/20 border border-white/10"
                >
                  <CardBody className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-lg font-semibold whitespace-pre-wrap break-words">
                        {notice.title}
                      </h2>
                      {notice.pinned && (
                        <Chip color="warning" size="sm">
                          고정
                        </Chip>
                      )}
                    </div>
                    <p className="text-sm text-gray-300 whitespace-pre-wrap break-words">
                      {notice.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                      <span>{toDateText(notice.createdAt)}</span>
                      <a
                        href={notice.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary hover:underline"
                      >
                        원문 보기
                      </a>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </div>
      </ContainerBox>
    </>
  );
}
