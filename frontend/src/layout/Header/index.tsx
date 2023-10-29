import { getCurrentUser } from "@/api/getCurrentUser";
import { Logout } from "@/components/Logout";
import Gnb from "@/layout/Header/Gnb";
import { CurrentUserProps } from "@/types";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import AniButton from "@/components/AniButton";
import Image from "next/image";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [currentUser, setCurrentUser] = useState<CurrentUserProps>();

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const router = useRouter();

  useEffect(() => {
    const setData = async () => {
      try {
        const result = await getCurrentUser();
        setCurrentUser(result);
      } catch (error) {
        console.log("error");
      }
    };
    setData();
  }, []);

  return (
    <div>
      <div className={Styles.header}>
        <div className={Styles.header_main}>
          <span className={Styles.header_main_logo}>
            <Link href="/">
              <Image
                width={135 * 1.2}
                height={95 * 1.2}
                src={`/temporaryLogo.png`}
                alt="logo"
              />
            </Link>
          </span>
          <span className={Styles.header_searchbox}>
            <input type="text" onChange={onChangeSearch} />
            <AniButton
              className={Styles.search_btn}
              onClick={() => {
                router.push({
                  pathname: "/search",
                  query: { keyword: searchText },
                });
              }}
            >
              <span>검색</span>
            </AniButton>
          </span>
          <span className={Styles.header_main_login}>
            {currentUser && currentUser.isLogin === true ? (
              <>
                <Link href="/mypage">
                  <div className={Styles.login_icon}>
                    <PersonOutlineIcon />
                  </div>
                </Link>
                {<Logout />}
              </>
            ) : (
              <>
                <Link href="/login">
                  <div className={Styles.login_icon}>
                    <PersonOutlineIcon />
                  </div>
                </Link>
                <div
                  className={Styles.buttons}
                  style={{ display: "flex", gap: "1rem" }}
                >
                  <AniButton
                    style={{ fontFamily: "SUITE-Regular", fontSize: "2rem" }}
                    onClick={() => router.push("/login")}
                  >
                    로그인
                  </AniButton>
                  |
                  <AniButton
                    style={{ fontFamily: "SUITE-Regular", fontSize: "2rem" }}
                    onClick={() => router.push("/join")}
                  >
                    회원가입
                  </AniButton>
                </div>
              </>
            )}
          </span>
        </div>
      </div>
      <Gnb />
    </div>
  );
};
export default Header;
