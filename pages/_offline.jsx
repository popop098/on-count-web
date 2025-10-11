import { NextSeo } from "next-seo";
import React from "react";

const OfflinePage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        backgroundColor: "#f0f0f0",
        color: "#333",
        padding: "20px",
      }}
    >
      <NextSeo
        title="오프라인 - 온카운트"
        description="네트워크 연결이 끊어졌습니다. 오프라인 상태입니다."
        noindex={true}
        nofollow={true}
      />
      <h1 style={{ fontSize: "2.5em", marginBottom: "10px" }}>오프라인</h1>
      <p style={{ fontSize: "1.2em" }}>네트워크 연결이 끊어졌습니다.</p>
      <p style={{ fontSize: "1.2em" }}>
        다시 연결되면 자동으로 페이지가 로드됩니다.
      </p>
      <p style={{ fontSize: "0.9em", color: "#666", marginTop: "20px" }}>
        불편을 드려 죄송합니다.
      </p>
    </div>
  );
};

export default OfflinePage;
