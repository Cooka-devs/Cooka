import Styles from "./index.module.css";
import Link from "next/link";
const Gnb = () => {
  return (
    <div>
      <div className={Styles.gnb}>
        <div className={Styles.gnb_list} style={{ fontWeight: "700" }}>
          <Link href="/recipe">나만의 레시피</Link>
          <Link href="/news">cooka News</Link>
          <Link href="/gnb_place">이런곳도 있어요!</Link>
          <Link href="/gnb_board">요리상담소</Link>
        </div>
      </div>
    </div>
  );
};
export default Gnb;
