import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

const font = fetch(new URL('../../public/fonts/pretendard/PretendardVariable.woff2', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

export default async function handler(req) {
  const fontData = await font;
  const { searchParams } = new URL(req.url);

  const title = searchParams.get('title') || '온카운트';
  const description = searchParams.get('description') || '실시간 스트리머 팔로워 현황';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
          color: 'white',
          fontFamily: ''Pretendard'',
          padding: '40px',
        }}
      >
        <div style={{ fontSize: 60, fontWeight: 700, marginBottom: 20 }}>{title}</div>
        <div style={{ fontSize: 30, fontWeight: 400, color: '#cccccc' }}>{description}</div>
        <div style={{
          position: 'absolute',
          bottom: 40,
          right: 40,
          display: 'flex',
          alignItems: 'center',
          fontSize: 24,
          color: '#cccccc'
        }}>
          <span style={{ fontWeight: 600 }}>온카운트</span> | on-count.kr
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Pretendard',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  );
}
