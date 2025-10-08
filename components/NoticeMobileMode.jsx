import { Alert } from "@heroui/react";
import { useState } from "react";

export default function NoticeMobileMode() {
  const [showAlert, setShowAlert] = useState(true);
  return (
    <>
      {showAlert && (
        <div className="sm:hidden fixed bottom-5 w-screen z-0">
          <div className="px-16">
            <Alert
              title="모바일 환경이신가요?"
              description="'온-카운트'서비스는 데스크톱 환경에 최적화 되어있어요. 데스크톱 환경으로 이용하시는 것을 적극 권장 드릴게요."
              onClose={() => setShowAlert(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
