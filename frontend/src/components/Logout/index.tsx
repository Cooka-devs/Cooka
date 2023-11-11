import DefaultAxiosService from "@/service/DefaultAxiosService";
import { useRouter } from "next/router";
import AniButton from "../AniButton";

export const Logout = () => {
  const router = useRouter();

  const onClickLogout = async () => {
    try {
      DefaultAxiosService.instance.get("/logout").then((res) => {
        const status = res.status;
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
      <AniButton
        onClick={onClickLogout}
        style={{ fontFamily: "SUITE-Regular", fontSize: "2rem" }}
      >
        로그아웃
      </AniButton>
      |
      <AniButton
        style={{ fontFamily: "SUITE-Regular", fontSize: "2rem" }}
        onClick={() => {
          router.push("/mypage");
        }}
      >
        마이페이지
      </AniButton>
    </div>
  );
};
