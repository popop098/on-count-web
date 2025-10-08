import { NextSeo } from 'next-seo';
import { Button } from "@heroui/react";
import buzzk from "buzzk";
import { useRouter } from "next/router";
import ContainerBox from "@/components/ContainerBox";
import { StreamerInfoCard } from "@/components/StreamerInfoCard";
import OnCountLogo from "@/public/icon.png";

export default function Search({ data }) {
  const router = useRouter();
  const searchQuery = data.q || "";
  const searchResult = JSON.parse(data.searchResult);
  const title = `'${searchQuery}' 검색 결과`;
  const description = `'${searchQuery}'에 대한 검색 결과입니다.`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={`https://on-count.kr/search?q=${searchQuery}`}
        openGraph={{
          url: `https://on-count.kr/search?q=${searchQuery}`,
          title: title,
          description: description,
          images: [
            {
              url: `https://on-count.kr/api/og?title=${encodeURIComponent(title)}`,
              width: 1200,
              height: 630,
              alt: `'${searchQuery}' 검색 결과`,
            },
          ],
        }}
      />
      <ContainerBox>
        <div className="w-full h-[10em]" />
        <div className="w-[80%] space-y-4">
          <h1 className="text-2xl leading-tight">
            "{searchQuery}"
            에 대한 검색 결과입니다.
          </h1>
          <Button fullWidth variant="ghost" onPress={() => router.back()}>
            이전
          </Button>
          <div className="w-full h-1 bg-gray-600 rounded-xl" />
          {searchResult.length > 0 ? (
            <div className="w-full flex flex-wrap items-center gap-2">
              {searchResult.map((item) => (
                <StreamerInfoCard
                  key={item.channelID}
                  channelName={item.name}
                  channelUrl={`/info/${item.channelID}`}
                  channelFollwerCount={item.follower}
                  channelImageUrl={item.imageURL || OnCountLogo}
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-[30em] flex items-center justify-center">
              <p className="text-xl leading-tight">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </ContainerBox>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { q } = query;
  buzzk.login(process.env.CHZZK_NID_AUT, process.env.CHZZK_NID_SES);
  return {
    props: {
      data: {
        q,
        searchResult: JSON.stringify(
          Object?.values((await buzzk.channel.search(q)) || []) || [],
        ),
      },
    },
  };
}
