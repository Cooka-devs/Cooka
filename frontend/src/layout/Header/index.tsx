import Styles from "./index.module.scss";
import Link from "next/link";
import Gnb from "@/layout/Header/Gnb";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useState } from "react";
import Search from "@/utilities/search";
import { useRouter } from "next/router";

const Header = () => {
  const [searchText, setSearchText] = useState<string>("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const router = useRouter();
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
          {/*유저가 존재한다면 link를 마이페이지로 존재안하면 login페이지로 ,로그인이 되있다면 마이페이지로 +커서시 메뉴바 로그아웃/마이페이지*/}
          <span className={Styles.header_main_login}>
            <Link href="/login">
              <PersonOutlineIcon className={Styles.login_icon} />
            </Link>
            <Link href="/mypage">
              <PersonOutlineIcon className={Styles.login_icon} />
            </Link>
          </span>
        </div>
      </div>
      <Gnb />
    </div>
  );
};
export default Header;
