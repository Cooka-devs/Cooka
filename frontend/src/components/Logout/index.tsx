import axios from "axios";
import DefaultAxiosService from "@/service/DefaultAxiosService";
import { useRouter } from "next/router";
import { ClassNames } from "@emotion/react";
export const Logout = () => {
  const router = useRouter();
  const onClickLogout = async () => {
    try {
      DefaultAxiosService.instance
        .get(`http://${process.env.NEXT_PUBLIC_SERVER_HOST}:8000/logout`)
        .then((res) => {
          const status = res.status;
          console.log(status);
          if (status === 200) {
            router.reload();
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ display: "flex", gap: "1rem" }} className="logout">
      <button
        onClick={onClickLogout}
        style={{ fontFamily: "SUITE-Regular", fontSize: "2rem" }}
      >
        로그아웃
      </button>
      |
      <button
        style={{ fontFamily: "SUITE-Regular", fontSize: "2rem" }}
        onClick={() => {
          router.push("/mypage");
        }}
      >
        마이페이지
      </button>
    </div>
  );
};
