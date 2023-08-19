import Styles from "./index.module.css";
import { useState } from "react";
import Modal from "@/components/Modal";
import JoinContent from "@/components/JoinContent";
const LoginPage = () => {
  const [onModal, setOnModal] = useState<boolean>(false);
  const openModal = () => {
    setOnModal(true);
  };
  const closeModal = () => {
    setOnModal(false);
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
          <div className={Styles.login_btn}>
            <button className={Styles.login_btnitem}>로그인</button>
            <button
              className={Styles.login_btnitem}
              onClick={() => openModal()}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
