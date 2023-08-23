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
const kakaoLoginPage = () => {
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
