import { useEffect, useState } from "react";
import {
  kakao_Auth_Uri,
  kakao_Secret_code,
  kakao_client_Id,
  kakao_redirect_Uri,
} from "..";
import { useRouter } from "next/router";

const getTokenUrl = `https://kauth.kakao.com/oauth/token`;
const getUserUrl = `https://kapi.kakao.com/v2/user/me`;

interface KaKaoLoginData {
  connected_at: string;
  id: number;
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile: {
      email: string;
      email_needs_agreement: boolean;
      has_email: boolean;
      is_email_valid: boolean;
      is_email_verified: boolean;
      profile: { nickname: string };
      profile_nickname_needs_agreement: boolean;
    };
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
  };
  properties: { nickname: string };
}

const KakaoLoginPage = () => {
  const router = useRouter();
  const [code, setCode] = useState("");

  useEffect(() => {
    console.log("query??", router.query);
    if (!router.isReady || !router.query["code"]) return;
    setCode(router.query["code"].toString());
    console.log("code:", code);
  }, [router]);

  useEffect(() => {
    if (!code) return;
    fetch(getTokenUrl, {
      // code로 토큰 받아오기
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: `grant_type=authorization_code&client_id=${kakao_client_Id}&redirect_uri=${kakao_redirect_Uri}&code=${code}&client_secret=${kakao_Secret_code}`,
    }).then((res) =>
      res.json().then((data) => {
        if (data.access_token) {
          console.log("token:", data.access_token); //토큰을 받아왔다면
          fetch(getUserUrl, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.access_token}`,
              "Content-type": `application/x-www-form-urlencoded;charset=utf-8`,
            },
          })
            .then(
              (res) =>
                res
                  .json()
                  .then((data: KaKaoLoginData) =>
                    console.log("회원정보:", data)
                  ) //해당토큰으로 회원정보 받아오기
              //사용할 nickname,휴대폰번호 입력받기 login_id는 해당유저의 이메일사용,
            )
            .catch((err) => console.log("err:", err));
        } else {
          console.log("토큰이 존재하지 않습니다.");
        }
      })
    );
  }, [code]);

  return (
    <div>
      <div>카카오로그인페이지</div>
    </div>
  );
};
export default KakaoLoginPage;
