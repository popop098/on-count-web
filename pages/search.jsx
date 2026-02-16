import { Button } from "@heroui/react";
import buzzk from "buzzk";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import ContainerBox from "@/components/ContainerBox";
import { StreamerInfoCard } from "@/components/StreamerInfoCard";
import { ensureProfilesExist } from "@/lib/profileSync";
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
        }}
      />
      <ContainerBox>
        <div className="w-full h-[10em]" />
        <div className="w-[92%] sm:w-[80%] space-y-4">
          <h1 className="text-xl sm:text-2xl leading-tight">
            "{searchQuery}" 에 대한 검색 결과입니다.
          </h1>
          <Button fullWidth variant="ghost" onPress={() => router.back()}>
            이전
          </Button>
          <div className="w-full h-1 bg-gray-600 rounded-xl" />
          {searchResult.length > 0 ? (
            <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
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
  const searchResult = Object.values((await buzzk.channel.search(q)) || {});

  try {
    await ensureProfilesExist(searchResult);
  } catch (error) {
    console.error("Failed to sync profiles from search page:", error);
  }

  return {
    props: {
      data: {
        q,
        searchResult: JSON.stringify(searchResult || []),
      },
    },
  };
}
