import Styles from "./index.module.css";
const LoginPage = () => {
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
          />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요!"
            className={Styles.input_text}
          />
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
