import { NextSeo, BreadcrumbJsonLd } from 'next-seo';
import ContainerBox from "@/components/ContainerBox";

export default function NoticePage() {
  const title = '공지사항 - 온카운트';
  const description = '온카운트의 최신 공지사항과 업데이트 소식을 전해드립니다.';

  return (
    <>
      <NextSeo
        title="공지사항"
        description={description}
        canonical="https://on-count.kr/notice"
        openGraph={{
          url: 'https://on-count.kr/notice',
          title: title,
          description: description,
          images: [
            {
              url: `https://on-count.kr/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
              width: 1200,
              height: 630,
              alt: '온카운트 공지사항',
            },
          ],
        }}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: '홈',
            item: 'https://on-count.kr',
          },
          {
            position: 2,
            name: '공지사항',
            item: 'https://on-count.kr/notice',
          },
        ]}
      />
      <ContainerBox>
        <div className="w-full h-[10em]" />
        <div className="w-[80%] space-y-4">
            <h1 className="text-2xl font-bold">공지사항</h1>
            <div className="w-full h-1 bg-gray-600 rounded-xl" />
            <div className="w-full h-[30em] flex items-center justify-center">
                <p className="text-xl leading-tight">현재 등록된 공지사항이 없습니다.</p>
            </div>
        </div>
      </ContainerBox>
    </>
  );
}
