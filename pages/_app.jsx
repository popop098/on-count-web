import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config.js';
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NavBarComp } from "@/components/NavBarComp";
import { useEffect } from "react";
import useUserStore, { useUser } from "@/store/userStore";
import localFont from "next/font/local";
import Image from "next/image";

import OnCountLogo from "@/public/icon.png";
const pretendard = localFont({
  src: "../public/fonts/pretendard/PretendardVariable.woff2",
  weight: "45 920",
  variable: "--font-pretendard",
    display: "swap",
});

function MyApp({ Component, pageProps }) {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          const response = await fetch("/api/user");
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    if (!user) fetchUser();
  }, [setUser, user]);

  return (
    <main className={pretendard.className}>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <HeroUIProvider>
          <DefaultSeo {...SEO} />
          <header className="sticky top-0 w-full z-50">
            <NavBarComp />
          </header>
          <main className="overflow-x-hidden">
            <Component {...pageProps} />
          </main>
          <footer className="w-full flex items-center justify-center py-3">
            <div className="flex flex-col items-center gap-1 text-current">
              <div className="flex items-center gap-1">
                <Image src={OnCountLogo} alt="온카운트 로고" width={20} />
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
            </div>
          </footer>
        </HeroUIProvider>
      </NextThemesProvider>
    </main>
  );
}

export default MyApp;
