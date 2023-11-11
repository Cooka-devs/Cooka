import AniButton from "@/components/AniButton";
import DefaultAxiosService from "@/service/DefaultAxiosService";
import useStore from "@/store";
import { encodePw } from "@/utilities/encodePw";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import Styles from "./index.module.css";
import useGetEnterKeyup from "@/hooks/useGetEnterKeyUp";

export const kakao_client_Id = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
export const kakao_redirect_Uri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL;
export const kakao_Secret_code = process.env.NEXT_PUBLIC_KAKAO_SECRET;
export const kakao_Auth_Uri = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao_client_Id}&redirect_uri=${kakao_redirect_Uri}&response_type=code`;

const LoginPage = () => {
  const { url } = useStore();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  const router = useRouter();
  const ref = useRef();

  const kakaoLoginHandler = useCallback(() => {
    router.push(kakao_Auth_Uri);
  }, [router]);

  const onChangeId: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };
  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const onClickJoin = useCallback(() => {
    DefaultAxiosService.instance
      .post("/pw", {
        login_id: id,
        social_id: 0,
      })
      .then((res) => res.data[0])
      .then((userData) => {
        if (userData) {
          console.log("id", id, "pw", password, "router", router, "url", url);
          const getPw = encodePw(userData.salt, password);
          DefaultAxiosService.instance
            .post("/login", {
              userId: id,
              userPw: getPw,
            })
            .then((res) => {
              const status = res.status;
              console.log(status);
              if (status === 200) {
                router.push(`${url}`, undefined, { shallow: true });
              } else if (status === 202) {
                setText("입력하신 비밀번호가 틀렸습니다.");
              }
            })
            .catch((err) => console.log(err));
        } else {
          setText("아이디가 존재하지않습니다.");
        }
      })
      .catch((err) => console.log(err));
  }, [id, password, router, url]);

  useGetEnterKeyup({ inputId: "password", onClick: onClickJoin });

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
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요!"
            className={Styles.input_text}
            onChange={onChangePassword}
          />
        </div>
        {text != "" ? (
          <div style={{ paddingTop: "1rem", fontSize: "1.5rem", color: "red" }}>
            {text}
          </div>
        ) : (
          ""
        )}
        <div className={Styles.login_btn}>
          <AniButton
            className={Styles.login_btnitem}
            onClick={() => onClickJoin()}
          >
            로그인
          </AniButton>
          <AniButton
            className={Styles.login_btnitem}
            onClick={() => router.push(`/join`)}
          >
            회원가입
          </AniButton>
        </div>
        <div className={Styles.social_login}>
          <div
            className={Styles.social_login_kakao}
            onClick={() => kakaoLoginHandler()}
          >
            <Image
              width={183 * 1.2}
              height={45 * 1.2}
              src={"/kakaologin.png"}
              alt="카카오"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
