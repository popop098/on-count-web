import "@/styles/globals.css";
import {HeroUIProvider} from '@heroui/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {NavBarComp} from "@/components/NavBarComp";
import { useEffect } from 'react';
import useUserStore, {useUser} from '@/store/userStore';
import HoverMenuBtn from "@/components/HoverMenuBtn";
import NoticeMobileMode from "@/components/NoticeMobileMode";
import localFont from 'next/font/local'
import ContainerBox from "@/components/ContainerBox";
import Image from "next/image";
import OnCountLogo from "@/public/icon.png";
import {Slide, ToastContainer} from "react-toastify";
const pretendard = localFont({
    src: '../public/fonts/pretendard/PretendardVariable.woff2',
    display: 'swap',
    weight: '100 900',
    variable: '--font-pretendard',
})
export default function App({ Component, pageProps }) {
  const { setUser } = useUserStore();
  const user = useUser()

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
      <HeroUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
              <main className={pretendard.className}>
                  <NavBarComp/>
                  <div className="overflow-x-hidden">
                      <Component {...pageProps} />
                      <div className="flex flex-col items-center justify-center gap-10 pt-10 ">
                          <div className="h-full w-[80%] mx-auto px-10 py-3 rounded-t-3xl bg-gray-900/40 backdrop-blur-4xl text-gray-600">
                              <div className="flex items-center gap-2">
                                  <div className="w-[50px] h-[50px] rounded-xl overflow-hidden relative">
                                      <Image
                                          alt={`OnCount Image`}
                                          src={OnCountLogo}
                                          quality={100}
                                          fill
                                          style={{ objectFit: 'cover' }}
                                      />
                                  </div>
                                  <p className="text-2xl font-extrabold">
                                      온-카운트
                                  </p>
                              </div>
                              <div className="w-full text-center">
                                  <p className="text-sm text-gray-500">
                                      Copyright ©2025 재능낭비개발자
                                  </p>
                                  <p className="text-sm text-gray-500">
                                      Powered by{' '}
                                      <span className="hover:underline hover:decoration-blue-600 hover:cursor-pointer hover:text-blue-600"
                                            onClick={()=>window.open("https://eliv.kr/", "_blank")}>
                                          PROJECT ELIV(도메인 제공)
                                      </span>
                                  </p>
                              </div>
                          </div>
                      </div>

                  </div>
              </main>
              {/*<HoverMenuBtn/>*/}
              {/*<NoticeMobileMode/>*/}

          </NextThemesProvider>
      </HeroUIProvider>
  )
}
