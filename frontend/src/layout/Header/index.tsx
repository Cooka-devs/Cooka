import { getCurrentUser } from "@/api/getCurrentUser";
import { Logout } from "@/components/Logout";
import Gnb from "@/layout/Header/Gnb";
import { CurrentUserProps } from "@/types";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Styles from "./index.module.scss";
import AniButton from "@/components/AniButton";
import Image from "next/image";
import useStore from "@/store";
import useGetEnterKeyup from "@/hooks/useGetEnterKeyUp";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [currentUser, setCurrentUser] = useState<CurrentUserProps>();
  const { setUrl } = useStore();
  const router = useRouter();

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const onClickSearchBtn = useCallback(() => {
    router.push(
      {
        pathname: "/search",
        query: { keyword: searchText },
      },
      undefined,
      { shallow: true }
    );
  }, [router, searchText]);

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
  useGetEnterKeyup({ inputId: "search", onClick: onClickSearchBtn });
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
            <input type="text" id="search" onChange={onChangeSearch} />
            <AniButton className={Styles.search_btn} onClick={onClickSearchBtn}>
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
                    onClick={() => {
                      router.push("/login");
                      setUrl(router.asPath);
                    }}
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
