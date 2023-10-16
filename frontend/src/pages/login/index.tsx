import DefaultAxiosService from "@/service/DefaultAxiosService";
import { encodePw } from "@/utilities/encodePw";
import { useRouter } from "next/router";
import { useCallback, useState, useMemo } from "react";
import Styles from "./index.module.css";
import useStore from "@/store";

export const kakao_client_Id = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
export const kakao_redirect_Uri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL;
export const kakao_Secret_code = process.env.NEXT_PUBLIC_KAKAO_SECRET;
export const kakao_Auth_Uri = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao_client_Id}&redirect_uri=${kakao_redirect_Uri}&response_type=code`;

const LoginPage = () => {
  const { url } = useStore();
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [text, setText] = useState<string>("");
  const router = useRouter();
  const kakaoLoginHandler = useCallback(() => {
    router.push(kakao_Auth_Uri);
  }, [router]);

  const onChangeId: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };
  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };
  const onClickJoin = () => {
    console.log("id:", id);
    DefaultAxiosService.instance
      .post("/pw", {
        login_id: id,
        social_id: 0,
      })
      .then((res) => res.data[0])
      .then((userData) => {
        if (userData) {
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
                router.push(`/${url}`);
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
  };
  const passwordInput = document.getElementById("password");

  //엔터키 로그인 추가
  passwordInput?.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      onClickJoin();
    }
  });

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
