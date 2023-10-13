import { Logout } from "@/components/Logout";
import { getCurrentUser } from "@/api/getCurrentUser";
import Gnb from "@/layout/Header/Gnb";
import { CurrentUserProps } from "@/types";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Styles from "./index.module.scss";

const Header = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<
    CurrentUserProps | undefined
  >();
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
              <img src={`temporaryLogo.png`} className={Styles.logo_img} />
            </Link>
          </span>
          <span className={Styles.header_searchbox}>
            <input
              type="text"
              className={Styles.search_text}
              onChange={onChangeSearch}
            />
            <button
              className={Styles.search_btn}
              onClick={() => {
                router.push({
                  pathname: "/search",
                  query: { keyword: searchText },
                });
              }}
            >
              검색
            </button>
          </span>
          <span className={Styles.header_main_login}>
            {currentUser && currentUser.isLogin === true ? (
              <>
                <Link href="/mypage">
                  <PersonOutlineIcon className={Styles.login_icon} />
                </Link>
                {<Logout />}
              </>
            ) : (
              <>
                <Link href="/login">
                  <PersonOutlineIcon className={Styles.login_icon} />
                </Link>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button
                    style={{ fontFamily: "SUITE-Regular", fontSize: "2rem" }}
                    onClick={() => router.push("/login")}
                  >
                    로그인
                  </button>
                  |
                  <button
                    style={{ fontFamily: "SUITE-Regular", fontSize: "2rem" }}
                    onClick={() => router.push("/join")}
                  >
                    회원가입
                  </button>
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
