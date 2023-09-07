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
import Styles from "./index.module.scss";
import { useRef } from "react";
const Mypage = () => {
  const [user, setUser] = useState<User>();
  const [checkType, setCheckType] = useState<string>("마이페이지");
  const [myRecipe, setMyRecipe] = useState<Recipe[]>();
  const [myPlace, setMyPlace] = useState<PlaceProps[]>();
  const [myCs, setMyCs] = useState<CsItem[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [imgFile, setImgFile] = useState<any>(""); //any수정하기
  const [profileEdit, setProfileEdit] = useState<boolean>(false);
  const [profileText, setProfileText] = useState<string>();
  const imgRef = useRef<HTMLInputElement>(null);
  const ITEMNUM = 9;
  const indexOfLast = currentPage * ITEMNUM;
  const indexOfFirst = indexOfLast - ITEMNUM;

  const userData = {
    status: "user",
    id: 13,
    nickname: "승휘",
    email: "tmdgnl1201@naver.com",
    profileImgSrc: "",
    introduction: "wewe",
  };
  const onChangeProfileText = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProfileText(event.target.value);
    console.log(profileText);
  };
  const saveImgFile = () => {
    if (imgRef.current != null && imgRef.current.files != null) {
      const file = imgRef.current.files[0];
      if (file === undefined) {
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImgFile(reader.result);
        };
      }
    } else return;
  };
  const CurrentPost = <T extends Table>(posts: T): T => {
    return posts.slice(indexOfFirst, indexOfLast) as T;
  };

  const noData = () => {
    return (
      <div style={{ paddingLeft: "1rem", marginBottom: "1rem" }}>
        게시물이 존재하지 않습니다.
      </div>
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
          <div className={Styles.mycommentpage}>
            <div>
              <div>
                <div className={Styles.head_name}>레시피</div>
                {uniqueRecipeList.length > 3 ? (
                  <div
                    style={{ position: "absolute", right: "1rem", bottom: "0" }}
                  >
                    <button
                      className={Styles.li_btn}
                      onClick={() => setCheckType("댓글 레시피자세히보기")}
                    >
                      자세히보기
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {uniqueRecipeList.length ? (
                <RecipeList items={uniqueRecipeList.slice(0, 3)} />
              ) : (
                noData()
              )}
            </div>
            <div>
              <div style={{ position: "relative" }}>
                <div className={Styles.head_name}>맛집</div>
                {uniquePlaceList.length > 3 ? (
                  <div
                    style={{ position: "absolute", right: "1rem", bottom: "0" }}
                  >
                    <button
                      className={Styles.li_btn}
                      onClick={() => setCheckType("댓글 맛집자세히보기")}
                    >
                      자세히보기
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {uniquePlaceList.length ? (
                <PlaceList items={uniquePlaceList.slice(0, 3)} />
              ) : (
                noData()
              )}
            </div>
            <div>
              <div>
                <div className={Styles.head_name}>상담소</div>
                {uniqueCsList.length > 3 ? (
                  <div
                    style={{ position: "absolute", right: "1rem", bottom: "0" }}
                  >
                    <button
                      className={Styles.li_btn}
                      onClick={() => setCheckType("댓글 상담자세히보기")}
                    >
                      자세히보기
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {uniqueCsList.length ? (
                <CounselingList items={uniqueCsList.slice(0, 3)} />
              ) : (
                noData()
              )}
            </div>
          </div>
        );
      } else return;
    } else if (type === "마이페이지") {
      return (
        <div className={Styles.profile}>
          <div>프로필 이미지 등록</div>
          <div className={Styles.profile_img}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <img
                src={imgFile ? imgFile : `nonuser.webp`}
                alt="프로필 이미지"
                className={Styles.img_preview}
              />
              <div>이미지 미리보기</div>
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={saveImgFile}
                ref={imgRef}
                id="upload"
              />
              <label htmlFor="upload" className={Styles.upload_btn}>
                업로드
              </label>
              <button
                className={Styles.upload_btn}
                style={{ marginLeft: "1rem" }}
              >
                등록완료
                {/**등록완료 버튼 클릭시 fetch POST imgFile(암호화되있는듯 ? 엄청김 변환하는법알아내기)) */}
              </button>
              <div style={{ paddingTop: "2rem" }}>
                <div>이미지 업로드후 등록완료를 꼭 눌러주세요!</div>
                <div>등록완료를 눌러야 저장됩니다!</div>
              </div>
            </div>
          </div>
          <div>프로필 소개</div>
          <div className={Styles.introduction}>
            {user?.introduction && !profileEdit ? (
              <div className={Styles.introduction_text}>
                {user.introduction}
              </div>
            ) : profileEdit ? (
              <textarea
                onChange={onChangeProfileText}
                className={Styles.introduction_text_edit}
              >
                {user?.introduction}
              </textarea>
            ) : (
              "자기소개를 입력해보세요!"
            )}
          </div>
          <div
            style={{
              paddingTop: "3rem",
              display: "flex",
              gap: "1rem",
              justifyContent: "right",
            }}
          >
            {profileEdit ? (
              <>
                <button
                  className={Styles.upload_btn}
                  onClick={() => setProfileEdit(false)}
                >
                  수정취소
                </button>
                <button className={Styles.upload_btn}>수정완료</button>
                {/**수정완료 클릭시 user.introduction를
                 * profileText 로 fetch update
                 */}
              </>
            ) : (
              <button
                className={Styles.upload_btn}
                onClick={() => {
                  setProfileEdit(true);
                }}
              >
                수정
              </button>
            )}
          </div>
        </div>
      );
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
