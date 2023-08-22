import Styles from "./index.module.css";
import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import JoinContent from "@/components/JoinContent";

export const kakao_client_Id = `1`;
export const kakao_redirect_Uri = `http://localhost:3000/login/kakao`;
export const kakao_Auth_Uri = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao_client_Id}&redirect_uri=${kakao_redirect_Uri}&response_type=code`;
export const kakao_Secret_code = `1`;

const naver_client_Id = `1`;
const naver_redirect_Uri = `http://localhost:3000/login/naver`;
const naver_state = `test`;
const naver_Auth_Uri = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naver_client_Id}&redirect_uri=${naver_redirect_Uri}&state=${naver_state}`;
const LoginPage = () => {
  const [onModal, setOnModal] = useState<boolean>(false);
  const openModal = () => {
    setOnModal(true);
  };
  const closeModal = () => {
    setOnModal(false);
  };
  const kakaoLoginHandler = () => {
    window.location.href = kakao_Auth_Uri;
  };
  const naverLoginHandler = () => {
    window.location.href = naver_Auth_Uri;
  };
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
