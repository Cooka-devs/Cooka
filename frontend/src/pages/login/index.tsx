import Styles from "./index.module.css";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { User } from "@/types";
import axios from "axios";
import DefaultAxiosService from "@/service/DefaultAxiosService";

export const kakao_client_Id = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
export const kakao_redirect_Uri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL;
export const kakao_Secret_code = process.env.NEXT_PUBLIC_KAKAO_SECRET;
export const kakao_Auth_Uri = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao_client_Id}&redirect_uri=${kakao_redirect_Uri}&response_type=code`;

export const naver_client_Id = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
export const naver_redirect_Uri = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URL;
export const naver_state = process.env.NEXT_PUBLIC_NAVER_STATE;
const naver_Auth_Uri = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naver_client_Id}&redirect_uri=${naver_redirect_Uri}&state=${naver_state}`;
const LoginPage = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const kakaoLoginHandler = useCallback(() => {
    router.push(kakao_Auth_Uri);
  }, [router]);
  const naverLoginHandler = useCallback(() => {
    router.push(naver_Auth_Uri);
  }, [router]);

  const onChangeId: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };
  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };
  const onClickJoin = () => {
    DefaultAxiosService.instance
      .post(`http://${process.env.NEXT_PUBLIC_SERVER_HOST}:8000/login`, {
        userId: id,
        userPw: password,
      })
      .then((res) => {
        const status = res.status;
        if (status === 200) {
          router.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ paddingTop: "15rem" }}>
      <div className={Styles.loginpage}>
        <div className={Styles.login_title}>
          <h1>로그인</h1>
        </div>
        <div className={Styles.login_input}>
          <input
            type="text"
            placeholder="아이디를 입력하세요!"
            className={Styles.input_text}
            onChange={onChangeId}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요!"
            className={Styles.input_text}
            onChange={onChangePassword}
          />
        </div>
        <div className={Styles.login_btn}>
          <button
            className={Styles.login_btnitem}
            onClick={() => onClickJoin()}
          >
            로그인
          </button>
          <button
            className={Styles.login_btnitem}
            onClick={() => router.push(`/join`)}
          >
            회원가입
          </button>
        </div>
        <div className={Styles.social_login}>
          <div
            className={Styles.social_login_naver}
            onClick={() => naverLoginHandler()}
          >
            <img src={"naverlogin.png"} alt="네이버" />
          </div>
          <div
            className={Styles.social_login_kakao}
            onClick={() => kakaoLoginHandler()}
          >
            <img src={"kakaologin.png"} alt="카카오" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
