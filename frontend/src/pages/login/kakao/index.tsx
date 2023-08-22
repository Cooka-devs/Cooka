import { useEffect, useState } from "react";
import {
  kakao_Auth_Uri,
  kakao_Secret_code,
  kakao_client_Id,
  kakao_redirect_Uri,
} from "..";
const getTokenUrl = `https://kauth.kakao.com/oauth/token`;
const getUserUrl = `https://kapi.kakao.com/v2/user/me`;
const kakaoLoginPage = () => {
  const [code, setCode] = useState<any>("");
  useEffect(() => {
    setCode(new URL(window.location.href).searchParams.get("code"));
    console.log("code:", code);
    fetch(getTokenUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: `grant_type=authorization_code&client_id=${kakao_client_Id}&redirect_uri=${kakao_redirect_Uri}&code=${code}&client_secret=${kakao_Secret_code}`,
    }).then((res) =>
      res.json().then((data) => {
        if (data.access_token) {
          console.log("token:", data.access_token);
          fetch(getUserUrl, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.access_token}`,
              "Content-type": `application/x-www-form-urlencoded;charset=utf-8`,
            },
          })
            .then((res) =>
              res.json().then((data) => console.log("회원정보:", data))
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
export default kakaoLoginPage;
