import { NextSeo } from 'next-seo';
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import useSWR from "swr";
import { getChannelsInfo, swrFetcher } from "@/tools/fetchTools";
import Image from "next/image";
import NumberFlow, { continuous } from "@number-flow/react";
import {
  Accordion,
  AccordionItem,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { useUser } from "@/store/userStore";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import axios from "axios";
import { Slide, toast, ToastContainer } from "react-toastify";
import Lottie from "react-lottie-player";
import RocketLaunch from "@/public/assets/RocketLaunch.json";
import { supabase } from "@/lib/supabaseClient";

const FollowerCount = memo(({ count }) => (
  <NumberFlow value={count} plugins={[continuous]} willChange />
));
FollowerCount.displayName = "FollowerCount";

export const Warning = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <title>Warning</title>
    <g fill="#fff">
      <path d="M12 14a1 1 0 0 1-1-1v-3a1 1 0 1 1 2 0v3a1 1 0 0 1-1 1zm-1.5 2.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0z"></path>
      <path d="M10.23 3.216c.75-1.425 2.79-1.425 3.54 0l8.343 15.852C22.814 20.4 21.85 22 20.343 22H3.657c-1.505 0-2.47-1.6-1.77-2.931L10.23 3.216zM20.344 20L12 4.147L3.656 20h16.688z"></path>
    </g>
  </svg>
);

export const Bell = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    {...props}
  >
    <title>Bell</title>
    <path
      fill="#fff"
      d="M9.985 0c1.089 0 1.971.898 1.971 2.006l-.009.163c.868.352 1.707.936 2.451 1.71c.862.893 1.366 2.077 1.521 3.596v5.478l1.191 2.098c.4.666.528 1.224.216 1.707c-.286.441-.797.595-1.49.583h-2.67C12.854 18.86 11.532 20 9.95 20c-1.584 0-2.905-1.14-3.216-2.658H3.778l-.056-.003c-.627-.054-1.094-.357-1.199-.94c-.071-.397.023-.823.268-1.331l1.225-2.18l.003-5.473c.107-1.21.56-2.337 1.348-3.371c.667-.875 1.62-1.519 2.654-1.89a1.752 1.752 0 0 1-.006-.148C8.015.898 8.897 0 9.985 0Zm1.818 17.342H8.097c.275.77 1 1.32 1.853 1.32c.852 0 1.578-.55 1.853-1.32ZM10.082 3.124c-1.354 0-2.843.645-3.677 1.74c-.638.836-.994 1.722-1.075 2.61v5.59c0 .117-.03.232-.087.333l-1.291 2.296a1.71 1.71 0 0 0-.12.311h12.014c.121.002.213-.003.276-.005a2.615 2.615 0 0 0-.141-.265l-1.287-2.267a.678.678 0 0 1-.088-.335l.003-5.586c-.121-1.162-.506-2.064-1.149-2.732c-1.04-1.08-2.262-1.69-3.378-1.69Zm-.097-1.787a.66.66 0 0 0-.635.497c.246-.031.49-.047.732-.047c.177 0 .356.01.535.032a.66.66 0 0 0-.632-.482Z"
    ></path>
  </svg>
);
export const BellGold = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 36 36"
    {...props}
  >
    <title>BellGold</title>
    <path
      fill="#FFAC33"
      d="M28 13c0 11 5 10 5 15c0 0 0 2-2 2H5c-2 0-2-2-2-2c0-5 5-4 5-15C8 7.478 12.477 3 18 3s10 4.478 10 10z"
    ></path>
    <circle cx="18" cy="3" r="3" fill="#FFAC33"></circle>
    <path fill="#FFAC33" d="M18 36a4 4 0 0 0 4-4h-8a4 4 0 0 0 4 4z"></path>
  </svg>
);

export const Lock = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 512 512"
    {...props}
  >
    <title>Lock</title>
    <path
      fill="#B1B4B5"
      d="M376.749 349.097c-13.531 0-24.5-10.969-24.5-24.5V181.932c0-48.083-39.119-87.203-87.203-87.203c-48.083 0-87.203 39.119-87.203 87.203v82.977c0 13.531-10.969 24.5-24.5 24.5s-24.5-10.969-24.5-24.5v-82.977c0-75.103 61.1-136.203 136.203-136.203s136.203 61.1 136.203 136.203v142.665c0 13.531-10.969 24.5-24.5 24.5z"
    ></path>
    <path
      fill="#FFB636"
      d="M414.115 497.459H115.977c-27.835 0-50.4-22.565-50.4-50.4V274.691c0-27.835 22.565-50.4 50.4-50.4h298.138c27.835 0 50.4 22.565 50.4 50.4v172.367c0 27.836-22.565 50.401-50.4 50.401z"
    ></path>
    <path
      fill="#FFD469"
      d="M109.311 456.841h-2.525c-7.953 0-14.4-6.447-14.4-14.4V279.309c0-7.953 6.447-14.4 14.4-14.4h2.525c7.953 0 14.4 6.447 14.4 14.4v163.132c0 7.953-6.447 14.4-14.4 14.4z"
    ></path>
  </svg>
);
export const SoundFilled = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <title>SoundFilled</title>
    <path
      fill="#fff"
      d="m892.1 737.8l-110.3-63.7a15.9 15.9 0 0 0-21.7 5.9l-19.9 34.5c-4.4 7.6-1.8 17.4 5.8 21.8L856.3 800a15.9 15.9 0 0 0 21.7-5.9l19.9-34.5c4.4-7.6 1.7-17.4-5.8-21.8zM760 344a15.9 15.9 0 0 0 21.7 5.9L892 286.2c7.6-4.4 10.2-14.2 5.8-21.8L878 230a15.9 15.9 0 0 0-21.7-5.9L746 287.8a15.99 15.99 0 0 0-5.8 21.8L760 344zm174 132H806c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16h128c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16zM625.9 115c-5.9 0-11.9 1.6-17.4 5.3L254 352H90c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h164l354.5 231.7c5.5 3.6 11.6 5.3 17.4 5.3c16.7 0 32.1-13.3 32.1-32.1V147.1c0-18.8-15.4-32.1-32.1-32.1z"
    ></path>
  </svg>
);
export const SoundOffFilled = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 512 512"
    {...props}
  >
    <title>SoundOffFilled</title>
    <path
      fill="#000000"
      fillRule="evenodd"
      d="m89.752 59.582l251.583 251.584l5.433 5.432l49.473 49.473v-.001l30.861 30.861h-.001l25.318 25.318l-30.17 30.17l-187.833-187.834l.001 164.103l-110.73-85.458h-81.02V172.563h80.896l10.537-8.293l-74.518-74.518zm314.213 28.015c67.74 75.639 82.5 181.38 44.28 270.136l-32.95-32.95c23.87-71.003 8.999-151.972-44.615-210.559zm-84.385 67.509c28.626 31.924 41.556 72.77 38.788 112.752l-49.236-49.236c-4.823-12.914-12.148-25.12-21.976-35.884l-.9-.973zm-85.163-69.772l-.001 58.574l-32.78-32.78z"
    ></path>
  </svg>
);
export default function StreamerPage({ channelId, channelData }) {
  const router = useRouter();
  const user = useUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data, error, isLoading, isValidating } = useSWR(
    `/api/channel-info?mode=followers&channelid=${channelId}`,
    swrFetcher,
    { 
      fallbackData: channelData,
      refreshInterval: 3000, 
      refreshWhenHidden: true 
    },
  );
  const {
    data: meSubscribeData,
    isLoading: meSubscribeDataIsLoading,
    isValidating: meSubscribeDataIsValidating,
    mutate,
  } = useSWR(user && "/api/subscribe", swrFetcher);
  const [count, setCount] = useState(0);
  const [followerColor, setFollowerColor] = useState("inherit");
  const [enabledSoundEffect, setEnabledSoundEffect] = useState(true);
  const [isEnabledUpAnimation, setIsEnabledUpAnimation] = useState(false);
  const [isEnabledDownAnimation, setIsEnabledDownAnimation] = useState(false);
  const handleSubscribe = async () => {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return false;

    const firebaseApp = initializeApp({
      apiKey: "AIzaSyBwMRuuJ-UQIU98u5jx_plZUeEJMBfyScs",
      authDomain: "on-count-fcc1b.firebaseapp.com",
      projectId: "on-count-fcc1b",
      storageBucket: "on-count-fcc1b.firebasestorage.app",
      messagingSenderId: "679660297255",
      appId: "1:679660297255:web:0696a709ec546fd11ac202",
      measurementId: "G-PS481MY3B3",
    });

    const messaging = getMessaging(firebaseApp);

    getToken(messaging, {
      vapidKey:
        "BNwPHj1YdMqN0nJ64m8E144vxLHJ5xQzQDcxLp01kswYTJvyTyccwwPtAIVr3p-lKVOs8d3bbSkNodMM-yLxJI0",
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log(currentToken);
          axios
            .post("/api/subscribe", {
              channel_id: channelId,
              user_id: user.channelId,
              topic: "streamer_subscribe",
              fcm_token: currentToken,
            })
            .then((data) => {
              if (data.status !== 200) return null;
              mutate();
            });
        } else {
          console.log(
            "No registration token available. Request permission to generate one.",
          );
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
      });
  };

  const handleUnsubscribe = async () => {
    const resp = await axios.delete("/api/subscribe", {
      data: {
        channel_id: channelId,
        user_id: user.channelId,
        topic: "streamer_subscribe",
      },
    });
    if (resp.status !== 200)
      return alert("무엇인가 잘못되었어요. 잠시후 다시 시도해주세요.");
    await mutate();
  };

  useEffect(() => {
    const newCount = data?.currFollowerCount || data?.followerCount;
    if (count !== 0 && newCount !== undefined) {
      if (newCount > count) {
        if (enabledSoundEffect) new Audio("/count_bell.wav").play();
        if (newCount - count >= 5) setIsEnabledUpAnimation(true);
        setFollowerColor("blue");
        setTimeout(() => setFollowerColor("inherit"), 1500);
        toast.success(
          `⬆️ 팔로워 증가! ${count.toLocaleString()} -> ${newCount.toLocaleString()}(+${newCount - count})`,
          {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
          },
        );
      }
      if (newCount < count) {
        if (enabledSoundEffect) new Audio("/count_down_bell.wav").play();
        setFollowerColor("red");
        setTimeout(() => setFollowerColor("inherit"), 1500);
        toast.error(
          `⬇️ 팔로워 감소! ${count.toLocaleString()} -> ${newCount.toLocaleString()}(-${count - newCount})`,
          {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
          },
        );
      }
    }
    if (newCount !== undefined) {
      setCount(newCount);
    }
  }, [data, count, setFollowerColor, enabledSoundEffect]);

  const title = `${channelData?.channelName || '스트리머'} - 실시간 팔로워`;
  const description = `${channelData?.channelName || '스트리머'}님의 실시간 팔로워 수를 확인하세요.`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={`https://on-count.kr/info/${channelId}`}
        openGraph={{
          url: `https://on-count.kr/info/${channelId}`,
          title: title,
          description: description,
          images: [
            {
              url: `https://on-count.kr/api/og?title=${encodeURIComponent(channelData?.channelName || '스트리머')}&description=${encodeURIComponent('실시간 팔로워 현황')}`,
              width: 1200,
              height: 630,
              alt: `${channelData?.channelName || '스트리머'} OG 이미지`,
            },
          ],
        }}
      />
      {isEnabledUpAnimation && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-20 w-96 h-96 ">
          <Lottie
            animationData={RocketLaunch}
            loop={false}
            play
            autoplay
            onComplete={() => setIsEnabledUpAnimation(false)}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        draggable
        theme="colored"
        transition={Slide}
        stacked
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              {meSubscribeData?.find((item) => item.channel_id === channelId) ? (
                <ModalHeader className="flex items-center gap-1">
                  '{data?.channelName}'님을{" "}
                  <span className="text-warning underline underline-offset-4">
                    구독 취소
                  </span>{" "}
                  하시겠어요?
                </ModalHeader>
              ) : (
                <ModalHeader className="flex items-center gap-1">
                  '{data?.channelName}'님을{" "}
                  <span className="text-primary underline underline-offset-4">
                    구독
                  </span>
                  하시겠어요?
                </ModalHeader>
              )}
              {meSubscribeData?.find((item) => item.channel_id === channelId) ? (
                <ModalBody>
                  <p>
                    만약 구독 해지하실 경우 특정 팔로워 단위(예: 100명, 1000명,
                    1500명 •••) 달성 소식을 수신 받지 못해요.
                  </p>
                  <p>언제든 구독을 재개하여 알림을 수신받을 수 있어요.</p>
                </ModalBody>
              ) : (
                <ModalBody>
                  <p>
                    특정 팔로워 단위(예: 100명, 1000명, 1500명 •••)를 달성할
                    경우 알림을 전송해드려요.
                  </p>
                  <p>언제든 구독을 취소하여 알림을 수신받지 않을 수 있어요.</p>
                  <p>
                    만약 구독을 원하실 경우 구독정보 등록 및 푸쉬 메시지 전송을
                    위해 알림 전송 권한 요구가 발생할 수 있어요.
                  </p>
                  <p>
                    시스템상 꼭! 필요한 과정이니 권한을 허가해주세요.
                    <br />
                    만일 권한을 거부하실경우 구독 거부 의사로 판단하여 등록을
                    진행하지 않아요.
                  </p>
                  <Accordion>
                    <AccordionItem
                      key="1"
                      aria-label="Accordion 1"
                      title="주의하세요."
                      className="text-warning font-extralight"
                      startContent={<Warning />}
                    >
                      브라우저 데이터 삭제 혹은 캐시 삭제, 공장 초기화같은
                      데이터가 만료될 조건이 발생할 경우 알림 전송을 위한 토큰
                      값이 만료될 가능성이 있어 알림을 받지 못하고, 그로 인한
                      구독 취소가 될 수 있어요.
                    </AccordionItem>
                  </Accordion>
                </ModalBody>
              )}
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  취소
                </Button>
                {meSubscribeData?.find(
                  (item) => item.channel_id === channelId,
                ) ? (
                  <Button
                    color="warning"
                    onPress={async () => {
                      await handleUnsubscribe();
                      onClose();
                    }}
                  >
                    구독 취소
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    onPress={() => {
                      handleSubscribe().then(() => onClose());
                    }}
                  >
                    구독
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="w-[60%] h-[10em] mx-auto flex flex-col items-center justify-center gap-4" />
      <div className="w-[80%] h-fit mx-auto flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center gap-4 my-30">
          {!data ? (
            <>
              <Spinner color="primary" size="lg" />
            </>
          ) : (
            <>
              <div className="w-[150px] h-[150px] rounded-full overflow-hidden relative">
                <Image
                  alt={`${data?.channelName}Image`}
                  src={data?.channelImageUrl}
                  quality={100}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <h1 className="font-bold text-2xl">{data?.channelName}</h1>
                <div className="flex items-center justify-center gap-2">
                  {!data?.dbFollowerCount && (
                    <Popover placement="bottom">
                      <PopoverTrigger>
                        <Button
                          isIconOnly
                          color="warning"
                          size="xs"
                          className="p-1 rounded-md"
                        >
                          <Warning />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="px-1 py-2">
                          <div className="text-small font-bold">
                            미등록 스트리머
                          </div>
                          <div className="text-tiny">
                            온-카운트에 등록되지 않은 스트리머에요.
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
                  {user ? (
                    !meSubscribeData ? null : (
                      <Button
                        isIconOnly
                        color="danger"
                        size="xs"
                        className="p-1 rounded-md"
                        onPress={onOpen}
                        isLoading={isOpen}
                      >
                        {Boolean(
                          meSubscribeData?.find(
                            (item) => item.channel_id === channelId,
                          ),
                        ) ? (
                          <BellGold />
                        ) : (
                          <Bell />
                        )}
                      </Button>
                    )
                  ) : (
                    <Tooltip content="로그인이 필요해요.">
                      <div className="p-1 rounded-md bg-danger-300/80 text-gray-600/20">
                        <Lock />
                      </div>
                    </Tooltip>
                  )}
                  <Button
                    startContent={
                      enabledSoundEffect ? <SoundFilled /> : <SoundOffFilled />
                    }
                    color={enabledSoundEffect ? "primary" : "default"}
                    size="xs"
                    className="p-1 rounded-md text-xs font-regular"
                    onPress={() => setEnabledSoundEffect(!enabledSoundEffect)}
                  >
                    {enabledSoundEffect ? "효과음 활성화" : "효과음 비활성화"}
                  </Button>
                </div>
              </div>
              <div className="w-full h-fit flex flex-col items-center justify-center gap-1">
                <p className="-mb-10 mt-10 font-thin">현재 팔로워 수</p>
                <div
                  className="text-9xl"
                  style={{
                    fontWeight: 900,
                    color: followerColor,
                    transition: "color 0.3s ease",
                  }}
                >
                  <FollowerCount
                    count={
                      data?.currFollowerCount
                        ? data?.currFollowerCount
                        : data?.followerCount
                    }
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { channelId } = params;

  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", channelId)
      .single();

    const channels = await getChannelsInfo(channelId);
    if (!channels || channels.length === 0) {
      return { notFound: true };
    }
    const channelInfo = channels[0];

    if (error) {
      return { props: { channelId, channelData: channelInfo } };
    }

    const { follower_count, channel_image_url, verified_mark, is_public } = profile;
    const { followerCount, channelName } = channelInfo;

    const channelData = {
      dbFollowerCount: follower_count,
      currFollowerCount: followerCount,
      isPublic: is_public,
      verifiedMark: verified_mark,
      channelImageUrl: channel_image_url,
      channelName: channelName,
    };

    return {
      props: {
        channelId,
        channelData,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps for [channelId]:", error);
    return {
      props: {
        channelId,
        channelData: null,
      },
    };
  }
}
