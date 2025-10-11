import { NextSeo } from "next-seo";
import ContainerBox from "@/components/ContainerBox";

export default function Terms() {
  const title = "서비스 이용약관";
  const description = "온카운트 서비스의 이용약관입니다.";

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical="https://on-count.kr/terms"
        openGraph={{
          url: "https://on-count.kr/terms",
          title: title,
          description: description,
        }}
      />
      <ContainerBox>
        <div className="w-full max-w-4xl mx-auto py-32 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {title}
          </h1>
          <div className="mt-6 prose prose-lg text-gray-600 dark:text-gray-300 mx-auto">
            <p>
              <strong>최종 수정일: 2025년 10월 9일</strong>
            </p>

            <h2>제 1조 (목적)</h2>
            <p>
              이 약관은 온카운트(이하 '서비스')가 제공하는 모든 서비스의 이용
              조건 및 절차, 이용자와 서비스의 권리, 의무, 책임사항과 기타 필요한
              사항을 규정함을 목적으로 합니다.
            </p>

            <h2>제 2조 (약관의 효력과 변경)</h2>
            <p>
              1. 이 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그
              효력을 발생합니다.
            </p>
            <p>
              2. 서비스는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 이
              약관을 변경할 수 있습니다. 변경된 약관은 서비스 화면에 공지하며,
              공지 후 일정 기간이 경과함으로써 효력이 발생합니다.
            </p>

            <h2>제 3조 (용어의 정의)</h2>
            <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
            <ul>
              <li>
                이용자: 이 약관에 따라 서비스가 제공하는 서비스를 받는 회원 및
                비회원
              </li>
              <li>
                회원: 서비스에 개인정보를 제공하여 회원 등록을 한 자로서,
                서비스의 정보를 지속적으로 제공받으며 서비스를 계속적으로 이용할
                수 있는 자
              </li>
            </ul>

            <h2>제 4조 (서비스의 제공 및 변경)</h2>
            <p>1. 서비스는 다음과 같은 업무를 수행합니다.</p>
            <ul>
              <li>치지직 스트리머의 팔로워 수 실시간 집계</li>
              <li>스트리머 검색 및 정보 제공</li>
              <li>기타 서비스가 정하는 업무</li>
            </ul>
            <p>
              2. 서비스는 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라
              제공하고 있는 전부 또는 일부 서비스를 변경할 수 있습니다.
            </p>

            <h2>제 5조 (서비스의 중단)</h2>
            <p>
              서비스는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신
              두절 또는 운영상 상당한 이유가 있는 경우 서비스의 제공을
              일시적으로 중단할 수 있습니다.
            </p>

            <p>
              기타 서비스 이용에 관한 자세한 사항은 관련 법령 및 서비스의 운영
              정책을 참조하시기 바랍니다.
            </p>
          </div>
        </div>
      </ContainerBox>
    </>
  );
}
