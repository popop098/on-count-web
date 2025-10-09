import { NextSeo } from 'next-seo';
import { memo, useEffect, useState } from "react";
import useSWR from "swr";
import {
    Alert,
    Avatar,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader, Select, SelectItem,
    Spinner,
    useDisclosure,
} from "@heroui/react";
import NumberFlow, { continuous } from "@number-flow/react";
import ContainerBox from "@/components/ContainerBox";
import { StreamerInfoCard } from "@/components/StreamerInfoCard";
import { useUser } from "@/store/userStore";
import { swrFetcher } from "@/tools/fetchTools";
import { CopyToClipboard } from "react-copy-to-clipboard";
const FollowerCount = memo(({ count }) => (
  <NumberFlow value={count} plugins={[continuous]} willChange />
));
FollowerCount.displayName = "FollowerCount";

export const colors = [
    {key: "white", label: "White"},
    {key: "black", label: "Black"},
    {key: "red", label: "Red"},
    {key: "orange", label: "Orange"},
    {key: "yellow", label: "Yellow"},
    {key: "green", label: "Green"},
    {key: "teal", label: "Teal"},
    {key: "blue", label: "Blue"},
    {key: "indigo", label: "Indigo"},
    {key: "purple", label: "Purple"},
    {key: "pink", label: "Pink"},
    {key: "gray", label: "Gray"},
];

export default function Me() {
  const user = useUser();
  const { data, error, isLoading, isValidating } = useSWR(
    () => `/api/channel-info?mode=followers&channelid=${user.channelId}`,
    swrFetcher,
    { refreshInterval: 3000 },
  );
  const { data: meSubscribeData } = useSWR(
    user && "/api/subscribe?need_more_info=y",
    swrFetcher,
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [patchApiLoading, setPatchApiLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(data?.isPublic);
  const [_isSigninBtnLoading, setIsSigninBtnLoading] = useState(false);
    const [color, setColor] = useState(new Set(["white"]));
  const handleChangePublicMode = async (setToPublicState) => {
    setPatchApiLoading(true);
    const patchApi = await fetch("/api/edit/info", {
      method: "PATCH",
      body: JSON.stringify({
        grantType: "change_public",
        isPublic: setToPublicState,
        channelId: user.channelId,
      }),
    });
    console.log(patchApi);
    if (patchApi.status === 200) {
      setIsPublic(setToPublicState);
      alert("변경이 완료되었어요.");
    } else {
      alert("변경이 완료되지 않았어요. 다시 시도해주세요.");
    }
    setPatchApiLoading(false);
  };

  const handleSigninBtn = async () => {
    setIsSigninBtnLoading(true);
    const generateSigninLink = await fetch("/api/auth/login", {});
    window.location.href = await generateSigninLink.text();
  };
  useEffect(() => {
    console.log(data);
    if (!isValidating && !isLoading && data) setIsPublic(data.isPublic);
  }, [data, isLoading, isValidating]);
  if (!user)
    return (
      <>
        <NextSeo title="로그인 필요" noindex={true} nofollow={true} />
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-3">
          <h1 className="text-6xl font-bold">흠...</h1>
          <h2 className="text-xl font-bold">로그인 상태가 아닌 것 같아요..</h2>
          <Button color="primary" onPress={handleSigninBtn}>
            로그인하기
          </Button>
        </div>
      </>
    );

  return (
    <>
      <NextSeo title="내 정보" noindex={true} nofollow={true} />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                정말로 프로필을 {isPublic ? "비공개로 전환" : "공개"}할까요?
              </ModalHeader>
              <ModalBody>
                {isPublic ? (
                  <>
                    <p>
                      아래 버튼을 클릭하면 프로필이 다시 비공개상태가 되고,
                      아무도 '<code>{user.channelName}</code>'님의 프로필을
                      검색과 열람을 할 수 없어요.
                    </p>
                    <p>
                      물론, 언제나 다시 프로필을 공개 상태로 전환할 수 있어요.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      아래 버튼을 클릭하면 프로필이 공개상태가 되고, 누구나 '
                      <code>{user.channelName}</code>'님의 프로필을 검색과
                      열람을 할 수 있어요.
                    </p>
                    <p>
                      물론, 언제나 다시 프로필을 비공개 상태로 전환할 수 있어요.
                    </p>
                  </>
                )}
                <p>진행할까요?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  취소
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    handleChangePublicMode(!data?.isPublic).then(() =>
                      onClose(),
                    );
                  }}
                  isLoading={patchApiLoading}
                >
                  진행하기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="h-[10em]" />
      <ContainerBox>
        <div className="w-[60%] shadow-2xl flex flex-col items-center justify-center gap-4 p-5 rounded-3xl dark:shadow-sky-950 dark:bg-gray-700">
          <div className="w-full text-center font-extrabold text-3xl space-y-2">
            <h1 className="text-primary">내 정보</h1>
            <Alert description="팔로워 현황은 매 3초마다 실시간으로 갱신되고 있습니다." />
          </div>
          <div className="h-1 w-full rounded-3xl bg-gray-500" />
          {!user || error || isLoading ? (
            <div className="w-full h-1/2 flex flex-col items-center justify-center">
              <Spinner color="primary" size="lg" label="로딩중..." />
            </div>
          ) : (
            <>
              <Avatar
                src={user?.channelImageUrl}
                className="w-32 h-32"
                showFallback
              />
              <p className="font-semibold">{user?.channelName}</p>
            </>
          )}
          <div className="w-full h-80 flex flex-col items-center justify-center bg-gray-300 dark:bg-gray-800 shadow-lg dark:shadow-gray-800 rounded-xl">
            <div className="flex items-start gap-1">
              <p className="-mb-6 font-semibold">현재 팔로워 수</p>
              {!error || !data || !isValidating ? (
                <div className="w-2 h-2 bg-primary rounded-full">
                  <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                </div>
              ) : (
                <div className="w-2 h-2 bg-danger rounded-full" />
              )}
            </div>
                <p className={`text-[7rem] font-extrabold`} style={{color:color.anchorKey}}>
              <FollowerCount count={!data ? 0 : data.currFollowerCount} />
            </p>
          </div>
          <div className="h-1 w-full rounded-3xl bg-gray-500" />
          <p className="text-lg font-semibold">구독 정보</p>
          {meSubscribeData?.length > 0 ? (
            <div className="w-full flex flex-wrap items-center gap-1">
              {meSubscribeData.map((item) => (
                <StreamerInfoCard
                  key={item.channelId}
                  channelName={item.channelName}
                  channelImageUrl={item.channelImageUrl}
                  channelUrl={`/info/${item.channelId}`}
                />
              ))}
            </div>
          ) : (
            <p className="text-lg font-semibold">구독 정보가 없어요.</p>
          )}
            <div className="h-1 w-full rounded-3xl bg-gray-500" />
            <p className="text-lg font-semibold">오버레이 설정</p>
            <Button color="primary" variant="shadow" onPress={()=>window.open('https://on-count-overlay.vercel.app/', '_blank')}>
                신규 오버레이 페이지
            </Button>
            <p className="text-lg font-semibold">혹은 레거시</p>
            <div className="px-2 py-1 bg-gray-800 rounded hover:pointer hover:underline">
                <CopyToClipboard
                    text={`https://on-count.kr/ovly/${user.channelId}?color=${color.anchorKey || "white"}`}
                    onCopy={() => alert("오버레이 링크가 복사되었습니다.")}
                >
                    <code className="hover:pointer">https://on-count.kr/ovly/{user.channelId}?color={color}</code>
                </CopyToClipboard>
            </div>
            <Select selectedKeys={color} defaultSelectedKeys={["white"]} onSelectionChange={setColor} className="max-w-xs" label="글자 색상 선택">
                {colors.map((item) => (
                    <SelectItem key={item.key}>{item.label}</SelectItem>
                ))}
            </Select>
            <div className="h-1 w-full rounded-3xl bg-gray-500" />
          <Button
            color={isPublic ? "warning" : "primary"}
            onPress={onOpen}
            fullWidth
            isLoading={isOpen}
            className="text-white font-extrabold"
          >
            {isPublic ? "프로필 비공개 전환하기" : "프로필 공개하기"}
          </Button>
        </div>
      </ContainerBox>
    </>
  );
}
