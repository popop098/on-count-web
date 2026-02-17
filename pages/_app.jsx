import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config.js';
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NavBarComp } from "@/components/NavBarComp";
import { useEffect, useState } from "react";
import useUserStore, { useUser } from "@/store/userStore";
import localFont from "next/font/local";
import Image from "next/image";
import OnCountLogo from "@/public/icon.png";
import {useRouter} from "next/router";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import ErrorBoundary from "@/components/ErrorBoundary";

const pretendard = localFont({
  src: "../public/fonts/pretendard/PretendardVariable.woff2",
  weight: "45 920",
  variable: "--font-pretendard",
  display: "swap",
  preload: true,
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif"
  ],
});

// Channel.io will be loaded dynamically in useEffect
function MyApp({ Component, pageProps }) {
    const { setUser } = useUserStore();
  const user = useUser();
    const router = useRouter();
    const [isRouteLoading, setIsRouteLoading] = useState(false);

    useEffect(() => {
        // Load Channel.io only after user interaction or after a delay
        const loadChannelIO = async () => {
            try {
                const ChannelService = await import('@channel.io/channel-web-sdk-loader');
                ChannelService.loadScript();
                ChannelService.boot({
                    "pluginKey": "b5cd1ac0-3d25-4b09-bdac-70cced30c09e",
                });
            } catch (error) {
                console.warn('Failed to load Channel.io:', error);
            }
        };

        // Load after 3 seconds or on user interaction
        const timer = setTimeout(loadChannelIO, 3000);
        
        const handleUserInteraction = () => {
            clearTimeout(timer);
            loadChannelIO();
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('scroll', handleUserInteraction);
        };

        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('scroll', handleUserInteraction);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('scroll', handleUserInteraction);
        };
    }, [])
    useEffect(() => {
        const handleStart = () => setIsRouteLoading(true);
        const handleDone = () => setIsRouteLoading(false);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleDone);
        router.events.on('routeChangeError', handleDone);
        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleDone);
            router.events.off('routeChangeError', handleDone);
        };
    }, [router.events])
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/user');
                if (res.ok) {
                    const user = await res.json();
                    setUser(user);
                }
            } catch (error) {
                console.error('Failed to fetch user', error);
            }
        };
        if(!user)fetchUser();
    }, [setUser]);

  return (
    <main className={pretendard.className}>
      <PerformanceMonitor />
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <HeroUIProvider>
          {isRouteLoading && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-black/30 border border-white/10">
                <div className="w-10 h-10">
                  <svg className="animate-spin w-10 h-10 text-primary" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                </div>
                <p className="text-sm text-white/80">로딩 중...</p>
              </div>
            </div>
          )}
          <DefaultSeo {...SEO} />
          <ErrorBoundary>
            <header className="sticky top-0 w-full z-50">
                <NavBarComp />
            </header>
            <main className="overflow-x-hidden">
              <ErrorBoundary>
                <Component {...pageProps} />
              </ErrorBoundary>
            </main>
          </ErrorBoundary>
            <footer className="w-full flex items-center justify-center py-3">
                <div className="flex flex-col items-center gap-1 text-current">
                    <div className="flex items-center gap-1">
                        <Image 
                            src={OnCountLogo} 
                            alt="온카운트 로고" 
                            width={20} 
                            height={20}
                            priority
                            quality={90}
                        />
                        <p className="text-sm font-bold">온카운트</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">
                            Powered by{" "}
                            <button
                                type="button"
                                className="hover:underline hover:decoration-blue-600 hover:cursor-pointer hover:text-blue-600"
                                onClick={() => window.open("https://eliv.kr/", "_blank")}
                            >
                                PROJECT ELIV(도메인 제공)
                            </button>
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                        <p className="text-sm text-gray-500">
                            <button
                                type="button"
                                className="hover:underline hover:decoration-blue-600 hover:cursor-pointer hover:text-blue-600"
                                onClick={()=>router.push('/privacy')}
                            >
                                개인정보처리방침
                            </button>
                        </p>
                        <div className="h-1 w-1 bg-gray-300/50 rounded-2xl"/>
                        <p className="text-sm text-gray-500">
                            <button
                                type="button"
                                className="hover:underline hover:decoration-blue-600 hover:cursor-pointer hover:text-blue-600"
                                onClick={()=>router.push('/terms')}
                            >
                                서비스 이용약관
                            </button>
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <button
                            type="button"
                            className="text-sm text-gray-500 hover:underline hover:decoration-blue-600 hover:text-blue-600"
                            onClick={() => router.push('/about')}
                        >
                            서비스 소개
                        </button>
                        <div className="h-1 w-1 bg-gray-300/50 rounded-2xl"/>
                        <button
                            type="button"
                            className="text-sm text-gray-500 hover:underline hover:decoration-blue-600 hover:text-blue-600"
                            onClick={() => router.push('/guide/adsense-safe-content')}
                        >
                            애드센스 안전 콘텐츠
                        </button>
                        <div className="h-1 w-1 bg-gray-300/50 rounded-2xl"/>
                        <button
                            type="button"
                            className="text-sm text-gray-500 hover:underline hover:decoration-blue-600 hover:text-blue-600"
                            onClick={() => router.push('/guide/follower-trends')}
                        >
                            팔로워 추이 가이드
                        </button>
                    </div>
                </div>
            </footer>

        </HeroUIProvider>
      </NextThemesProvider>
    </main>
  );
}

export default MyApp;
