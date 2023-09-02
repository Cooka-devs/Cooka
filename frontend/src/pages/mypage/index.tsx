import { RecipeList } from "@/components";
import Styles from "./index.module.css";
import { useEffect, useState } from "react";
import { CsItem, PlaceProps, Recipe, User } from "@/types";
import SearchUserData from "@/components/SearchUserData";
import PlaceList from "@/components/PlaceList";
import CounselingList from "@/components/CounselingList";
import NewsPageMove from "@/components/RecipePageMove";
import PlacePageMove from "@/components/PlacePageMove";
import CounselingPageMove from "@/components/CounselingPageMove";
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
    id: "tmdgnl1201",
    nickname: "승휘",
    email: "tmdgnl1201@naver.com",
  };

  const CurrentPost = (post: (CsItem | Recipe | PlaceProps)[]) => {
    let currentPosts: (CsItem | Recipe | PlaceProps)[] = [];
    currentPosts = post.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
  const noData = (data: string) => {
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
        return noData("no");
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
        return noData("no");
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
        return noData("no");
      }
    } else if (type === "마이페이지") {
      return <div style={{ paddingLeft: "1rem" }}>클릭해주세요</div>;
    } else {
      return noData("마이페이지");
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
          마이페이지
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
