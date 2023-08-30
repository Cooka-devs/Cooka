import Styles from "./index.module.css";
import { useState, useEffect, useCallback } from "react";
import Modal from "@/components/Modal";
import JoinContent from "@/components/JoinContent";
import { useRouter } from "next/router";

export const kakao_client_Id = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
export const kakao_redirect_Uri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL;
export const kakao_Secret_code = process.env.NEXT_PUBLIC_KAKAO_SECRET;
export const kakao_Auth_Uri = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao_client_Id}&redirect_uri=${kakao_redirect_Uri}&response_type=code`;

export const naver_client_Id = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
export const naver_redirect_Uri = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URL;
export const naver_state = process.env.NEXT_PUBLIC_NAVER_STATE;
const naver_Auth_Uri = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naver_client_Id}&redirect_uri=${naver_redirect_Uri}&state=${naver_state}`;
const LoginPage = () => {
  const router = useRouter();

  const [onModal, setOnModal] = useState<boolean>(false);

  const openModal = () => {
    setOnModal(true);
  };
  const closeModal = () => {
    setOnModal(false);
  };

  const kakaoLoginHandler = useCallback(() => {
    router.push(kakao_Auth_Uri);
  }, [router]);
  const naverLoginHandler = useCallback(() => {
    router.push(naver_Auth_Uri);
  }, [router]);

  return (
    <div style={{ paddingTop: "15rem" }}>
      {onModal ? (
        <Modal
          closeModal={closeModal}
          content={<JoinContent closeModal={closeModal} />}
        />
      ) : (
        ""
      )}
      <div className={Styles.loginpage}>
        <div className={Styles.login_title}>
          <h1>로그인</h1>
        </div>
        <div className={Styles.login_input}>
          <input
            type="text"
            placeholder="아이디를 입력하세요!"
            className={Styles.input_text}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요!"
            className={Styles.input_text}
          />
        </div>
        <div className={Styles.login_btn}>
          <button className={Styles.login_btnitem}>로그인</button>
          <button className={Styles.login_btnitem} onClick={() => openModal()}>
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
