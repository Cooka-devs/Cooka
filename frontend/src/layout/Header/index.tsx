import Styles from "./index.module.css";
import Link from "next/link";
import Gnb from "@/layout/Header/Gnb";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
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
          <a>
            <PersonOutlineIcon
              style={{
                width: "4rem",
                height: "4rem",
                marginRight: "2rem",
                color: "grey",
              }}
            />
          </a>
          <a>
            <SearchIcon
              style={{ width: "4rem", height: "4rem", color: "grey" }}
            />
          </a>
        </div>
      </div>
      <Gnb />
    </div>
  );
};
export default Header;
