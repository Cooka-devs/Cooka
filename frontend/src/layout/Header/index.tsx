import Styles from "./index.module.scss";
import Link from "next/link";
import Gnb from "@/layout/Header/Gnb";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useState, useEffect } from "react";
import Search from "@/utilities/search";
import { useRouter } from "next/router";
import axios from "axios";
import DefaultAxiosService from "@/service/DefaultAxiosService";
import { CurrentUserProps } from "@/types";
import { getCurrentUser } from "@/fetch/getCurrentUser";
import { Logout } from "@/components/Logout";
import { encodePw } from "@/utilities/encodePw";
import { createSalt } from "@/utilities/createSalt";
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
        console.log(result.user_Uid);
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
                  pathname: "search",
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
                <div>
                  <button
                    style={{ fontFamily: "SUITE-Regular", fontSize: "2rem" }}
                    onClick={() => router.push("/login")}
                  >
                    로그인
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
