import { Divider, RecipeList } from "@/components";
import Styles from "./index.module.css";
import { useEffect, useState } from "react";
import { CsItem, PlaceProps, Recipe, User } from "@/types";
import SearchUserData from "@/components/SearchUserData";
import PlaceList from "@/components/PlaceList";
import CounselingList from "@/components/CounselingList";

const Mypage = () => {
  const [user, setUser] = useState<User>();
  const [checkType, setCheckType] = useState<string>("");
  const [myRecipe, setMyRecipe] = useState<Recipe[]>();
  const [myPlace, setMyPlace] = useState<PlaceProps[]>();
  const [myCs, setMyCs] = useState<CsItem[]>();
  const userData = {
    //로그인된 user데이터를 가져옴
    status: "user",
    id: "tmdgnl1201",
    nickname: "승휘",
    email: "tmdgnl1201@naver.com",
  };
  const TypeByContent = (type: string) => {
    if (type === "내가작성한 레시피") {
      if (myRecipe?.length) {
        return <RecipeList items={myRecipe} />;
      } else {
        return "게시물이 존재하지 않습니다.";
      }
    } else if (type === "내가작성한 맛집") {
      if (myPlace?.length) {
        return <PlaceList items={myPlace} />;
      } else {
        return "게시물이 존재하지 않습니다.";
      }
    } else if (type === "내가작성한 질문") {
      if (myCs?.length) {
        return <CounselingList items={myCs} />;
      } else {
        return "게시물이 존재하지 않습니다.";
      }
    }
  };
  useEffect(() => {
    setUser(userData);
    if (!user) return;
    const { myRecipe, myCs, myPlace } = SearchUserData(user);
    setMyRecipe(myRecipe);
    setMyCs(myCs);
    setMyPlace(myPlace);
    console.log(checkType);
  }, []);
  return (
    //사람버튼 로그인상태시 마우스 올리면 로그아웃 마이페이지 노출 => 마이페이지화면
    <div className={Styles.mypage}>
      <div className={Styles.mypage_head}>
        <h1 className={Styles.head_left}>마이페이지</h1>
        <div className={Styles.head_right}>
          <h1 style={{}}>{checkType}</h1>
        </div>
      </div>
      <div className={Styles.mypage_container}>
        <div className={Styles.snb_column}>
          <div className={Styles.snb_subhead}>내가 작성한글</div>
          <ul className={Styles.snb_menu}>
            <li onClick={() => setCheckType("내가작성한 레시피")}>
              나만의 레시피
            </li>
            <li onClick={() => setCheckType("내가작성한 맛집")}>
              이런곳도 있어요!
            </li>
            <li onClick={() => setCheckType("내가작성한 질문")}>요리연구소</li>
          </ul>
          <div className={Styles.snb_subhead}>나의 관심목록</div>
          <ul className={Styles.snb_menu}>
            <li onClick={() => setCheckType("내가추천한 게시물")}>
              추천한 목록
            </li>
            <li onClick={() => setCheckType("내가댓글단 게시물")}>
              댓글단 목록
            </li>
          </ul>
        </div>
        <div className={Styles.content}>{TypeByContent(checkType)}</div>
      </div>
    </div>
  );
};
export default Mypage;
