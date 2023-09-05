import { RecipeList } from "@/components";
import CounselingList from "@/components/CounselingList";
import CounselingPageMove from "@/components/CounselingPageMove";
import PlaceList from "@/components/PlaceList";
import PlacePageMove from "@/components/PlacePageMove";
import NewsPageMove from "@/components/RecipePageMove";
import SearchUserData from "@/components/SearchUserData";
import { CsItem, PlaceProps, Recipe, Table, User } from "@/types";
import getMyComments from "@/utilities/getMyComments";
import { useEffect, useState } from "react";
import Styles from "./index.module.css";

const Mypage = () => {
  const [user, setUser] = useState<User>();
  const [checkType, setCheckType] = useState<string>("마이페이지");
  const [myRecipe, setMyRecipe] = useState<Recipe[]>();
  const [myPlace, setMyPlace] = useState<PlaceProps[]>();
  const [myCs, setMyCs] = useState<CsItem[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMNUM = 9;
  const indexOfLast = currentPage * ITEMNUM;
  const indexOfFirst = indexOfLast - ITEMNUM;

  const userData = {
    status: "user",
    id: 13,
    nickname: "승휘",
    email: "tmdgnl1201@naver.com",
  };

  const CurrentPost = <T extends Table>(posts: T): T => {
    return posts.slice(indexOfFirst, indexOfLast) as T;
  };

  const noData = () => {
    return (
      <div style={{ paddingLeft: "1rem" }}>게시물이 존재하지 않습니다.</div>
    );
  };

  const TypeByContent = (type: string) => {
    if (type === "내가작성한 레시피") {
      if (myRecipe?.length) {
        return (
          <>
            <RecipeList items={CurrentPost(myRecipe)} />
            <NewsPageMove
              totalPosts={myRecipe.length}
              postsPerPage={ITEMNUM}
              pageMove={setCurrentPage}
              currentPage={currentPage}
            />
          </>
        );
      } else {
        return noData();
      }
    } else if (type === "내가작성한 맛집") {
      if (myPlace?.length) {
        return (
          <>
            <PlaceList items={CurrentPost(myPlace)} />
            <PlacePageMove
              totalPosts={myPlace.length}
              postsPerPage={ITEMNUM}
              pageMove={setCurrentPage}
              currentPage={currentPage}
            />
          </>
        );
      } else {
        return noData();
      }
    } else if (type === "내가작성한 질문") {
      if (myCs?.length) {
        return (
          <>
            <CounselingList items={CurrentPost(myCs)} />
            <CounselingPageMove
              totalPosts={myCs.length}
              postsPerPage={ITEMNUM}
              pageMove={setCurrentPage}
              currentPage={currentPage}
            />
          </>
        );
      } else {
        return noData();
      }
    } else if (checkType === "내가댓글단 게시물") {
      if (user) {
        const { uniqueCsList, uniqueRecipeList, uniquePlaceList } =
          getMyComments(user.nickname);
        return (
          <div>
            <div>레시피</div>
            <RecipeList items={uniqueRecipeList} />
            <div>맛집</div>
            <PlaceList items={uniquePlaceList} />
            <div>상담소</div>
            <CounselingList items={uniqueCsList} />
          </div>
        );
      } else return;
    } else if (type === "마이페이지") {
      return <div style={{ paddingLeft: "1rem" }}>클릭해주세요</div>;
    } else {
      return noData();
    }
  };
  useEffect(() => {
    setUser(userData);
    if (!user) return;
    const { myRecipe, myCs, myPlace } = SearchUserData(user);
    setMyRecipe(myRecipe);
    setMyCs(myCs);
    setMyPlace(myPlace);
    setCurrentPage(1);
  }, [checkType]);

  return (
    //사람버튼 로그인상태시 마우스 올리면 로그아웃 마이페이지 노출 => 마이페이지화면
    <div className={Styles.mypage}>
      <div className={Styles.mypage_head}>
        <h1
          className={Styles.head_left}
          onClick={() => setCheckType("마이페이지")}
        >
          <button className={Styles.head_btn}>마이페이지</button>
        </h1>
        <div className={Styles.head_right}>
          <h1 style={{}}>{checkType}</h1>
        </div>
      </div>
      <div className={Styles.mypage_container}>
        <div className={Styles.snb_column}>
          <div className={Styles.snb_subhead}>내가 작성한글</div>
          <ul className={Styles.snb_menu}>
            <li onClick={() => setCheckType("내가작성한 레시피")}>
              <button className={Styles.li_btn}>나만의 레시피</button>
            </li>
            <li onClick={() => setCheckType("내가작성한 맛집")}>
              <button className={Styles.li_btn}>이런곳도 있어요!</button>
            </li>
            <li onClick={() => setCheckType("내가작성한 질문")}>
              <button className={Styles.li_btn}>요리연구소</button>
            </li>
          </ul>
          <div className={Styles.snb_subhead}>나의 관심목록</div>
          <ul className={Styles.snb_menu}>
            <li onClick={() => setCheckType("내가추천한 게시물")}>
              <button className={Styles.li_btn}>추천한 목록</button>
            </li>
            <li onClick={() => setCheckType("내가댓글단 게시물")}>
              <button className={Styles.li_btn}>댓글단 목록</button>
            </li>
          </ul>
        </div>
        <div className={Styles.content}>{TypeByContent(checkType)}</div>
      </div>
    </div>
  );
};
export default Mypage;
