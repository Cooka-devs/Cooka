import Styles from "./index.module.css";
import { useState, useEffect } from "react";
interface UserProps {
  id: string;
  password: string;
  nickname: string;
  email?: string;
}

const USERDATA = [
  {
    id: "test11",
    password: "test1!1!",
    nickname: "우힛히힛",
    email: "test11@naver.com",
  },
  {
    id: "test12",
    password: "test1!1!",
    nickname: "우힛히홋",
    email: "test12@naver.com",
  },
];
const JoinContent = ({ closeModal }: any) => {
  const [user, setUser] = useState<UserProps[]>([]); //DB에서 불러온 user 목록

  //유효성검사에 따른 상태메시지
  const [nicknameMessage, setNicknameMessage] = useState<string>("");
  const [idMessage, setIdMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [checkPasswordMessage, setCheckPasswordMessage] = useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string>("");
  //입력된 nickname,id,password,
  const [nickname, setNickname] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  // 유효성검사
  const [isNickname, setIsNickname] = useState<boolean>(false);
  const [isId, setIsId] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(true);

  const idRegExp = /^[a-zA-z0-9]{6,12}$/;
  const nicknameRegExp = /^[가-힣]{2,8}$/;
  const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  const emailRegExp =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordRegExp.test(e.target.value)) {
      setPasswordMessage("사용가능한 비밀번호 입니다!");
    } else {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리이상 입력해주세요"
      );
    }
  };
  const onChangePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === password) {
      if (!passwordRegExp.test(e.target.value)) {
        setIsPassword(false);
        setCheckPasswordMessage(
          "숫자+영문자+특수문자 조합으로 8자리이상 입력해주세요"
        );
      } else {
        setIsPassword(true);
        setCheckPasswordMessage("비밀번호가 일치합니다.");
      }
    } else {
      setIsPassword(false);
      setCheckPasswordMessage("비밀번호가 불일치합니다");
    }
  };
  const onClickCheckId = () => {
    if (idRegExp.test(id)) {
      setIsId(true);
      setIdMessage("사용가능한 아이디입니다!");
      user.map((item) => {
        if (item.id === id) {
          setIsId(false);
          setIdMessage("이미사용중인 아이디입니다!");
        }
      });
    } else {
      setIsId(false);
      setIdMessage("6~12사이 대소문자 또는 숫자만 입력해 주세요!");
    }
  };
  const onClickCheckNickName = () => {
    if (nicknameRegExp.test(nickname)) {
      setIsNickname(true);
      setNicknameMessage("사용가능한 닉네임입니다!");
      user.map((item) => {
        if (item.nickname === nickname) {
          setIsNickname(false);
          setNicknameMessage("이미사용중인 닉네임입니다!");
        }
      });
    } else {
      setIsNickname(false);
      setNicknameMessage("2~8사이 한글만 입력해 주세요!");
    }
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setIsEmail(true);
      setEmailMessage("");
    } else {
      if (emailRegExp.test(email)) {
        setIsEmail(true);
        setEmailMessage("사용가능한 이메일입니다");
      } else {
        setIsEmail(false);
        setEmailMessage("이메일 형식이 잘못되었습니다");
      }
    }
  };
  const onClickJoin = () => {
    if (isId && isEmail && isPassword && isNickname) {
      //post 쏘기
    } else {
      alert("양식에맞게 입력 부탁드립니다!");
    }
  };
  useEffect(() => {
    setUser(USERDATA);
  }, []);
  return (
    <div className={Styles.joinmodal}>
      <div className={Styles.join_title}>
        <h1>회원가입</h1>
        <div>cooka 회원이 되어 다양한 혜택을 받아보세요!</div>
      </div>
      <div>
        <div>
          <span style={{ color: "red" }}>*</span>닉네임
        </div>
        <input
          type="text"
          className={Styles.input_text}
          onChange={onChangeNickname}
        />
        <button
          className={Styles.check_btn}
          onClick={() => onClickCheckNickName()}
        >
          중복확인
        </button>
        <div className={isNickname ? Styles.okmessage : Styles.nomessage}>
          {nicknameMessage}
        </div>
      </div>
      <div>
        <div>
          <span style={{ color: "red" }}>*</span>아이디
        </div>
        <input
          type="text"
          className={Styles.input_text}
          onChange={onChangeId}
        />
        <button className={Styles.check_btn} onClick={() => onClickCheckId()}>
          중복확인
        </button>
        <div className={isId ? Styles.okmessage : Styles.nomessage}>
          {idMessage}
        </div>
      </div>
      <div>
        <div>
          <span style={{ color: "red" }}>*</span>비밀번호
        </div>
        <input
          type="password"
          className={Styles.input_text}
          onChange={onChangePassword}
        />
        <div
          className={
            passwordMessage === "사용가능한 비밀번호 입니다!"
              ? Styles.okmessage
              : Styles.nomessage
          }
        >
          {passwordMessage}
        </div>
      </div>
      <div>
        <div>
          <span style={{ color: "red" }}>*</span>비밀번호 확인
        </div>
        <input
          type="password"
          className={Styles.input_text}
          onChange={onChangePasswordCheck}
        />
        <div className={isPassword ? Styles.okmessage : Styles.nomessage}>
          {checkPasswordMessage}
        </div>
      </div>
      <div>
        <div style={{ paddingLeft: "0.8rem" }}>e-mail</div>
        <input
          type="text"
          className={Styles.input_text}
          onChange={onChangeEmail}
        />
        <div className={isEmail ? Styles.okmessage : Styles.nomessage}>
          {emailMessage}
        </div>
      </div>
      <div className={Styles.gojoin}>
        <button className={Styles.gojoin_btn} onClick={onClickJoin}>
          가입하기
        </button>
        <button className={Styles.gojoin_btn} onClick={closeModal}>
          돌아가기
        </button>
      </div>
    </div>
  );
};
export default JoinContent;
