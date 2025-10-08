// pages/index.jsx

import Image from "next/image";
import { useUser } from '@/store/userStore';
import {Button, Input, Spinner, Switch} from "@heroui/react";
import {StreamerInfoCard} from "@/components/StreamerInfoCard";
import ContainerBox from "@/components/ContainerBox";
import {useEffect, useState} from "react";
import useSWR from "swr";
import {swrFetcher} from "@/tools/fetchTools";
import TextType from "@/components/TextType";
import DarkVeil from "@/components/backgrounds/DarkVeil";
import {useRouter} from "next/router";
// user 객체가 있으면 로그인 상태, 없으면 로그아웃 상태
export default function Index() {
    const {data, error, isLoading,isValidating} = useSWR('/api/get-channels-data', swrFetcher,{revalidateOnFocus:false});
    const [searchInput, setSearchInput] = useState("");
    const [enabledSaveSearchHistory, setEnabledSaveSearchHistory] = useState(undefined);
    const [searchHistory, setSearchHistory] = useState(undefined);
    const router = useRouter();
    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();

            if(enabledSaveSearchHistory) {
                // 1. 새로운 검색 기록 배열을 계산하여 변수에 저장
                const prevHistory = Array.isArray(searchHistory) ? searchHistory : [];
                const newHistory = [searchInput, ...prevHistory]; // 새 값 계산

                // 2. 상태를 업데이트 (비동기적으로 진행)
                setSearchHistory(newHistory);

                // 3. 계산된 새 배열(newHistory)을 localStorage에 저장
                //    **상태 변수(searchHistory)를 사용하지 않습니다.**
                localStorage.setItem("searchHistory", JSON.stringify(newHistory));

            }

            // 라우터 이동은 상태 업데이트/저장과 별개로 진행
            return router.push({
                pathname: '/search',
                query : {
                    q: searchInput,
                }
            })
        }
    }
    const handleSwitchSaveSearchHistoryOption = (e) => {
        const value = e.target.checked
        setEnabledSaveSearchHistory(value)
        if(!value){
            localStorage.setItem("searchHistory", JSON.stringify([]));
            setSearchHistory([])
        }
        localStorage.setItem("saveSearchHistory", JSON.stringify(value))
    }
    useEffect(() => {
        const localStorageSaveSearchHistory = localStorage.getItem("saveSearchHistory");
        const localStorageSearchHistory = localStorage.getItem("searchHistory");

        // 초기 localStorage 값 설정 및 상태 업데이트
        const initialSaveHistory = localStorageSaveSearchHistory
            ? JSON.parse(localStorageSaveSearchHistory)
            : true;

        const initialSearchHistory = localStorageSearchHistory
            ? JSON.parse(localStorageSearchHistory)
            : [];

        // localStorage에 값이 없으면 기본값으로 설정 (중복 실행 방지)
        if(!localStorageSaveSearchHistory) {
            localStorage.setItem("saveSearchHistory", JSON.stringify(true));
        }
        if(!localStorageSearchHistory) {
            localStorage.setItem("searchHistory", JSON.stringify([]));
        }

        // 상태 업데이트 (Setter 함수를 의존성 배열에서 제거)
        setEnabledSaveSearchHistory(initialSaveHistory);
        setSearchHistory(initialSearchHistory);

// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // 의존성 배열을 비워 최초 렌더링 시 1회만 실행되게 합니다.
    return (
        <ContainerBox>
            <div style={{ width: '100%', height: '600px', position: 'relative' }}>
                <DarkVeil />
            </div>
            <TextType text={["실시간 팔로워 현황 검색은?", "온-카운트와 함께!", "언제 어디서나 온-카운트."]}
                      typingSpeed={100}
                      pauseDuration={1500}
                      showCursor
                      cursorCharacter="|"
                      textColors={["#ffffff"]}
                      className="sm:text-3xl text-xl font-extrabold -my-90 z-0"
                      cursorClassName="text-primary"
            />
            <div className="w-[60%] h-[22em] mx-auto flex flex-col items-center justify-center gap-4">

            </div>
            <div className="w-[65%] h-[25em] mx-auto flex flex-col items-center justify-center gap-4 z-0">
                <p className="font-extrabold text-lg sm:text-2xl text-primary">검색하고 싶은 스트리머 있으신가요?</p>
                <div className="flex item-center justify-center gap-1 w-full">
                    <Input label="스트리머 검색하기" variant="flat" color="primary" className="font-extrabold sm:w-[60%]"
                           type="search" value={searchInput} onValueChange={setSearchInput} onKeyDown={handleKeyDown} />
                    <Button size="sm" className="h-full text-xl" onPress={()=> {
                        if(enabledSaveSearchHistory) {
                            // 1. 새로운 검색 기록 배열을 계산하여 변수에 저장
                            const prevHistory = Array.isArray(searchHistory) ? searchHistory : [];
                            const newHistory = [searchInput, ...prevHistory]; // 새 값 계산

                            // 2. 상태를 업데이트 (비동기적으로 진행)
                            setSearchHistory(newHistory);

                            // 3. 계산된 새 배열(newHistory)을 localStorage에 저장
                            //    **상태 변수(searchHistory)를 사용하지 않습니다.**
                            localStorage.setItem("searchHistory", JSON.stringify(newHistory));

                        }
                        router.push({
                            pathname: '/search',
                            query: {
                                q: searchInput,
                            }
                        })
                    }}>
                        GO!
                    </Button>
                </div>
                <Switch size="sm"
                        className="font-thin"
                        onChange={(e)=>handleSwitchSaveSearchHistoryOption(e)}
                        isSelected={enabledSaveSearchHistory}>
                    검색 기록 {enabledSaveSearchHistory ? "끄기" : "켜기"}
                </Switch>
                <div className="flex flex-wrap items-center justify-center gap-2 w-full">
                    {
                        searchHistory?.map((item, index) => (
                            <div className="relative">
                                <Button size="sm" key={index} onPress={()=>router.push({
                                    pathname: '/search',
                                    query : {
                                        q: item,
                                    }
                                })}>
                                    {item}
                                </Button>
                                <div
                                    key={`delete-${index}`}
                                    className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs cursor-pointer"
                                    onClick={() => {
                                        const newHistory = searchHistory.filter((_, i) => i !== index);
                                        setSearchHistory(newHistory);
                                        localStorage.setItem("searchHistory", JSON.stringify(newHistory));
                                    }}
                                >
                                    x
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="w-[60%] h-1 bg-gray-300/50 rounded-2xl"/>
            <div className="w-[60%] mx-auto flex flex-col items-start justify-center gap-4">
                <div className="w-full flex flex-col items-start justify-center">
                    <p className="font-extrabold text-2xl text-primary text-center w-full">공개 스트리머</p>
                    <p className="font-medium text-sm text-gray-500 text-center w-full">온-카운트내에 등록과 공개상태인 스트리머 리스트에요.</p>
                </div>
                {
                    isLoading || isValidating || !data ? <div className="w-full h-64 flex flex-col items-center justify-center">
                        <Spinner color="primary" size="lg"/>
                    </div> : data.map((item, index) => (
                        <StreamerInfoCard channelName={item.channel_name}
                                          channelImageUrl={item.channel_image_url}
                                          channelUrl={'/info/'+item.channel_id}
                                          channelFollwerCount={item.follower_count}
                                          channelVerificationMark={item.verified_mark} key={index} />
                    ))
                }
            </div>
        </ContainerBox>
    );
}