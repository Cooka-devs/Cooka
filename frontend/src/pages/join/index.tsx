import Styles from "./index.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { User } from "@/types";
import { createSalt } from "@/utilities/createSalt";
import { encodePw } from "@/utilities/encodePw";

const JoinContent = ({ closeModal }: any) => {
  const [users, setUsers] = useState<User[]>([]); //DB에서 불러온 user 목록

  //유효성검사에 따른 상태메시지
  const [nicknameMessage, setNicknameMessage] = useState<string>("");
  const [idMessage, setIdMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [checkPasswordMessage, setCheckPasswordMessage] = useState<string>("");
  const [phoneMessage, setPhoneMessage] = useState<string>("");
  //입력된 nickname,id,password,
  const [nickname, setNickname] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [name, setName] = useState<string>("");
  // 유효성검사
  const [isNickname, setIsNickname] = useState<boolean>(false);
  const [isId, setIsId] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPhoneNum, setIsPhoneNum] = useState<boolean>(false);

  const idRegExp = /^[a-zA-z0-9]{6,12}$/;
  const nicknameRegExp = /^[가-힣]{2,8}$/;
  const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  const phoneNumRegExp = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;
  const router = useRouter();
  const onChangeId: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };
  const onChangeNickname: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setNickname(e.target.value);
  };
  const onChangePhoneNum: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPhoneNum(e.target.value);
  };
  const onChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };
  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
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
      users.map((item) => {
        if (item.login_id === id) {
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
      users.map((item) => {
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

  const onClickPhoneNum = () => {
    if (phoneNumRegExp.test(phoneNum)) {
      setIsPhoneNum(true);
      setPhoneMessage("사용가능한 휴대폰번호입니다.");
      users.map((item) => {
        if (item.phone_number === phoneNum) {
          setIsPhoneNum(false);
          setPhoneMessage("이미가입한 휴대폰번호입니다.");
        }
      });
    } else {
      setIsPhoneNum(false);
      setPhoneMessage("-를 포함하여 입력바랍니다.");
    }
  };

  const onClickJoin = async () => {
    if (isId && isPhoneNum && isPassword && isNickname) {
      const salt = await createSalt();
      const encodePassword = encodePw(salt, password);
      console.log("salt:", salt);
      console.log("pw:", encodePassword);
      axios
        .post(`http://${process.env.NEXT_PUBLIC_SERVER_HOST}:8000/users`, {
          name: name,
          nickname: nickname,
          phone_number: phoneNum,
          login_type: "user",
          social_id: 0,
          login_id: id,
          login_password: encodePassword,
          profile_img: "/nonuser.webp",
          profile_text: "자기소개를 입력해주세요",
          salt: salt,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      alert("회원가입이 완료되었습니다!");
      router.push("/");
    } else {
      alert("양식에맞게 입력 부탁드립니다!");
    }
  };

  useEffect(() => {
    const getUser = axios(
      `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:8000/users`
    )
      .then((res) => res.data)
      .then((res) => res.data)
      .then((res) => {
        setUsers(res), console.log(res);
      });
  }, []);
  return (
    <div className={Styles.join}>
      <div className={Styles.join_title}>
        <h1>회원가입</h1>
        <div>cooka 회원이 되어 다양한 혜택을 받아보세요!</div>
      </div>
      <div>
        <div>
          <span style={{ color: "red" }}>*</span>성함
        </div>
        <input
          type="text"
          className={Styles.input_text}
          onChange={onChangeName}
        />
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
        <div>
          <span style={{ color: "red" }}>*</span>휴대폰번호
        </div>
        <input
          type="text"
          className={Styles.input_text}
          onChange={onChangePhoneNum}
        />
        <button className={Styles.check_btn} onClick={() => onClickPhoneNum()}>
          중복확인
        </button>
        <div className={isPhoneNum ? Styles.okmessage : Styles.nomessage}>
          {phoneMessage}
        </div>
      </div>
      <div className={Styles.gojoin}>
        <button className={Styles.gojoin_btn} onClick={onClickJoin}>
          가입하기
        </button>
        <button
          className={Styles.gojoin_btn}
          onClick={() => router.push(`/login`)}
        >
          돌아가기
        </button>
      </div>
    </div>
  );
};
export default JoinContent;
