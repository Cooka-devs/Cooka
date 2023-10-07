import DefaultAxiosService from "@/service/DefaultAxiosService";
import { KaKaoLoginData } from "@/pages/login/kakao";

export const kakaoLogin = async (
  kakaoLoginData: KaKaoLoginData,
  token: string,
  setState?: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const userDataResponse = await DefaultAxiosService.instance.post("/pw", {
      login_id: kakaoLoginData.id,
      social_id: 1,
    });
    const userData = userDataResponse.data[0];
    if (userData) {
      const loginResponse = await DefaultAxiosService.instance.post(
        "/login/social",
        {
          id: userData.id,
          login_id: userData.login_id,
          login_type: userData.login_type,
          social_id: userData.social_id,
          token: token,
        }
      );
      const status = loginResponse.status;
      if (status === 200) {
        console.log("status : 200 return");
        return { status: 200 };
      } else {
        console.log("로그인실패");
      }
    } else {
      setState ? setState("join") : "";
    }
  } catch (err) {
    console.log(err);
  }
};
