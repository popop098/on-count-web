import { NextSeo } from "next-seo";
import ContainerBox from "@/components/ContainerBox";

export default function Privacy() {
  const title = "개인정보처리방침";
  const description = "온카운트 서비스의 개인정보처리방침입니다.";

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical="https://on-count.kr/privacy"
        openGraph={{
          url: "https://on-count.kr/privacy",
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

            <h2>제 1조 (총칙)</h2>
            <p>
              온카운트(이하 '서비스')는 이용자의 개인정보를 중요시하며,
              "정보통신망 이용촉진 및 정보보호"에 관한 법률을 준수하고 있습니다.
              서비스는 개인정보처리방침을 통하여 이용자가 제공하는 개인정보가
              어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한
              조치가 취해지고 있는지 알려드립니다.
            </p>

            <h2>제 2조 (개인정보의 수집 및 이용 목적)</h2>
            <p>
              서비스는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
              개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용
              목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를
              이행할 예정입니다.
            </p>
            <ul>
              <li>회원 가입 및 관리</li>
              <li>서비스 제공 및 운영</li>
              <li>이용자 문의 및 불만 처리</li>
            </ul>

            <h2>제 3조 (처리하는 개인정보의 항목)</h2>
            <p>
              서비스는 회원가입, 원활한 고객상담, 각종 서비스의 제공을 위해
              아래와 같은 최소한의 개인정보를 필수항목으로 수집하고 있습니다.
            </p>
            <ul>
              <li>
                필수항목: 치지직 공식 API 제공 데이터(고유 채널 ID, 채널명, 채널
                이미지 URL, 팔로워 수, 채널 인증 여부)
              </li>
              <li>선택항목: 없음</li>
            </ul>

            <h2>제 4조 (개인정보의 처리 및 보유 기간)</h2>
            <p>
              서비스는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
              개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간 내에서
              개인정보를 처리·보유합니다. 회원 탈퇴 시 수집된 개인정보는 지체
              없이 파기됩니다.
            </p>

            <p>
              기타 개인정보 처리에 관한 자세한 사항은 관련 법령 및 서비스의
              개인정보처리방침을 참조하시기 바랍니다.
            </p>
          </div>
        </div>
      </ContainerBox>
    </>
  );
}
