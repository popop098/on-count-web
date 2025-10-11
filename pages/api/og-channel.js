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

  // Responsive channel name sizing to prevent clipping
  const nameLen = (channelName || '').length;
  const nameFontSize = nameLen > 22 ? 56 : nameLen > 16 ? 66 : nameLen > 12 ? 76 : 86;
  const nameMaxWidth = 720; // slightly wider safe width
  const nameWrapped = (channelName || '').split('').join('\u200B');

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
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 56 }}>
          <div
            style={{
              width: 520,
              height: 320,
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
              display: 'flex',
            }}
          >
            <img src={img} alt="channel" width={520} height={320} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ fontSize: nameFontSize, fontWeight: 900, lineHeight: 1.18, maxWidth: nameMaxWidth, marginRight: 8, padding: '8px 12px 6px 12px', borderRadius: 8, wordBreak: 'keep-all', overflow: 'hidden' }}>{nameWrapped}</div>
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
            <div style={{ fontSize: 44, color: '#cbd5e1', marginTop: 16, fontWeight: 600, paddingLeft: 12 }}>{followerText}</div>
          </div>
        </div>

        <div style={{ position: 'absolute', right: 64, bottom: 48, display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 4,
              background: 'rgba(15,23,42,0.65)',
              border: '1px solid #334155',
              padding: '12px 16px',
              borderRadius: 12,
            }}
          >
            <div style={{ fontSize: 28, color: '#e2e8f0', fontWeight: 800 }}>온-카운트 | on-count.kr</div>
            <div style={{ fontSize: 20, color: '#94a3b8' }}>실시간 스트리머 팔로워 현황</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}


