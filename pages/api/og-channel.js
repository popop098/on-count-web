import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);

  const channelName = searchParams.get('name') || '스트리머';
  const follower = searchParams.get('follower') || '0';
  const img = searchParams.get('img') || 'https://on-count.kr/icon.png';
  const verified = searchParams.get('verified') === 'true';

  const followerText = `팔로워 ${Number(follower).toLocaleString()}명`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: '#ffffff',
          fontFamily: 'Pretendard, Noto Sans KR, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
          padding: '48px 64px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
          <div
            style={{
              width: 360,
              height: 360,
              borderRadius: 32,
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.45)',
              display: 'flex',
            }}
          >
            <img src={img} alt="channel" width={360} height={360} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 72, fontWeight: 800 }}>{channelName}</div>
              {verified && (
                <div style={{ display: 'flex' }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 9999,
                      background: '#3b82f6',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 28,
                      fontWeight: 900,
                    }}
                  >
                    ✓
                  </div>
                </div>
              )}
            </div>
            <div style={{ fontSize: 42, color: '#cbd5e1', marginTop: 8 }}>{followerText}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <div style={{ fontSize: 28, color: '#94a3b8' }}>on-count.kr</div>
          <div style={{ fontSize: 20, color: '#64748b', marginTop: 4 }}>실시간 스트리머 팔로워 현황</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}


