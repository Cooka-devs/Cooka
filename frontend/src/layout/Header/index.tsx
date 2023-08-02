import Styles from "./index.module.css";
import Link from "next/link";
import Gnb from "@/layout/Header/Gnb";

const Header = () => {
  return (
    <div>
      <div className={Styles.header}>
        <div className={Styles.header_main}>
          <Link href="/">
            <span className={Styles.header_main_logo}>로고img</span>
          </Link>
        </div>
        <div className={Styles.header_main_login}>
          <button>로그인img</button>
          <button>검색img</button>
        </div>
      </div>
      <Gnb />
    </div>
  );
};
export default Header;
