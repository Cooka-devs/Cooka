import { useEffect, useState } from "react";
import {
  kakao_Auth_Uri,
  kakao_Secret_code,
  kakao_client_Id,
  kakao_redirect_Uri,
} from "..";
import { useRouter } from "next/router";
import DefaultAxiosService from "@/service/DefaultAxiosService";
import { createSalt } from "@/utilities/createSalt";
import { encodePw } from "@/utilities/encodePw";
import randomstring from "randomstring";
import Styles from "./index.module.css";
import { User } from "@/types";
import { kakaoLogin } from "@/api/kakaologin";
const getTokenUrl = `https://kauth.kakao.com/oauth/token`;
const getUserUrl = `https://kapi.kakao.com/v2/user/me`;

export interface KaKaoLoginData {
  connected_at: string;
  id: number;
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile: {
      email: string;
      email_needs_agreement: boolean;
      has_email: boolean;
      is_email_valid: boolean;
      is_email_verified: boolean;
      profile: { nickname: string };
      profile_nickname_needs_agreement: boolean;
    };
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
  };
  properties: { nickname: string };
}

const KakaoLoginPage = () => {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]); //DB에서 불러온 user 목록
  const [kakaoLoginData, setKakaoLoginData] = useState<KaKaoLoginData>();
  const [code, setCode] = useState("");
  const [state, setState] = useState<string | undefined>(undefined);

  //입력받을 nickname,phoneNum
  const [nickname, setNickname] = useState<string>("");
  const [phoneNum, setPhoneNum] = useState<string>("");

  //유효성검사
  const [isNickname, setIsNickname] = useState<boolean>(false);
  const [isPhoneNum, setIsPhoneNum] = useState<boolean>(false);
  //유효성검사에 따른 상태메시지
  const [nicknameMessage, setNicknameMessage] = useState<string>("");
  const [phoneMessage, setPhoneMessage] = useState<string>("");

  const phoneNumRegExp = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;
  const nicknameRegExp = /^[가-힣]{2,8}$/;
  const onChangeNickname: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setNickname(e.target.value);
  };
  const onChangePhoneNum: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPhoneNum(e.target.value);
  };
  const onClickJoin = async () => {
    if (isNickname && isPhoneNum) {
      const salt = await createSalt();
      const password = randomstring.generate(10); //소셜로그인시 랜덤비밀번호생성
      const encodePassword = encodePw(salt, password);
      if (kakaoLoginData) {
        try {
          await DefaultAxiosService.instance.post("/users", {
            name: nickname,
            nickname: nickname,
            phone_number: phoneNum,
            login_type: "user",
            social_id: 1,
            login_id: kakaoLoginData.id,
            login_password: encodePassword,
            profile_img: "/nonuser.webp",
            profile_text: "자기소개를 입력해주세요",
            salt: salt,
          });
          const loginResult = await kakaoLogin(kakaoLoginData, token);
          if (loginResult?.status === 200) {
            router.push("/");
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("data없음");
      }
    } else {
      alert("양식에 맞게 입력해주세요!");
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
  useEffect(() => {
    DefaultAxiosService.instance
      .get("/users")
      .then((res) => res.data.data)
      .then((data) => setUsers(data));
    console.log("query??", router.query);
    if (!router.isReady || !router.query["code"]) return;
    setCode(router.query["code"].toString());
    console.log("code:", code);
  }, [router]);

  useEffect(() => {
    if (!code) return;
    fetch(getTokenUrl, {
      // code로 토큰 받아오기
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: `grant_type=authorization_code&client_id=${kakao_client_Id}&redirect_uri=${kakao_redirect_Uri}&code=${code}&client_secret=${kakao_Secret_code}`,
    }).then((res) =>
      res.json().then(async (data) => {
        if (data.access_token) {
          console.log("token:", data.access_token);
          await setToken(data.access_token);
          fetch(getUserUrl, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.access_token}`,
              "Content-type": `application/x-www-form-urlencoded;charset=utf-8`,
            },
          })
            .then((res) =>
              res.json().then(async (kakaoData: KaKaoLoginData) => {
                setKakaoLoginData(kakaoData);
                console.log(kakaoData);
                try {
                  const loginResult = await kakaoLogin(
                    kakaoData,
                    data.access_token,
                    setState
                  );
                  if (loginResult?.status === 200) {
                    router.push("/");
                  }
                } catch (err) {
                  console.log(err);
                }
              })
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
      {state === "join" ? (
        <div className={Styles.join}>
          <div className={Styles.join_title}>
            카카오로그인으로 회원가입을 진행합니다.
          </div>
          <div>
            <div>닉네임을 입력해주세요.</div>
            <input
              type="text"
              onChange={onChangeNickname}
              className={Styles.input_text}
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
            <div>휴대폰번호를 입력해주세요.</div>
            <input
              type="text"
              onChange={onChangePhoneNum}
              className={Styles.input_text}
            />
            <button
              className={Styles.check_btn}
              onClick={() => onClickPhoneNum()}
            >
              중복확인
            </button>
            <div className={isPhoneNum ? Styles.okmessage : Styles.nomessage}>
              {phoneMessage}
            </div>
          </div>
          <button className={Styles.gojoin_btn} onClick={onClickJoin}>
            가입하기
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default KakaoLoginPage;
