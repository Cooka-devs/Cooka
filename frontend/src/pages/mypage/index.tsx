import { RecipeList } from "@/components";
import CounselingList from "@/components/CounselingList";
import PlaceList from "@/components/PlaceList";
import ListPageMove from "@/components/ListPageMove";
import SearchUserData from "@/components/SearchUserData";
import { CsItem, PlaceProps, Recipe, Table, User } from "@/types";
import { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import { useRef } from "react";
import ContentsByUser from "@/components/ContentsByUser";
import { getCurrentUser, searchUser } from "@/api/getCurrentUser";
import { useRouter } from "next/router";
import Modal from "@/components/Modal";
import { WantLoginModalText } from "@/components/WantLoginModalText";
import LikesContentsByUser from "@/components/LikesContentsByUser";
import FormAxiosService from "@/service/FormAxiosService";
import DefaultAxiosService from "@/service/DefaultAxiosService";
import { getListLength } from "@/api/getListLength";
import { getMyLikedList, getMyLikes } from "@/utilities/getMyLikes";
import { getLikedList } from "@/api/getLikedList";
import { getListNumByComments, getMyCommentsByType } from "@/api/getMyComments";
import { ContentsByCheckType } from "@/components/ContentsByCheckType";

const Mypage = () => {
  const [user, setUser] = useState<User | string | undefined>("최초실행방지");
  const [modal, setModal] = useState<boolean>(false);

  const [checkType, setCheckType] = useState<string>("마이페이지");

  const [myRecipe, setMyRecipe] = useState<Recipe[]>(); //체크타입별로 데이터
  const [myPlace, setMyPlace] = useState<PlaceProps[]>();
  const [myCs, setMyCs] = useState<CsItem[]>();

  const [myRecipeLength, setMyRecipeLength] = useState<number>(0); //체크타입별로 데이터의 길이
  const [myPlaceLength, setMyPlaceLength] = useState<number>(0);
  const [myCsLength, setMyCsLength] = useState<number>(0);

  const [currentPage, setCurrentPage] = useState(1); // 페이지의 넘버
  const [imgFile, setImgFile] = useState<any>();
  const [profileEdit, setProfileEdit] = useState<boolean>(false);
  const [profileText, setProfileText] = useState<string>();

  const imgRef = useRef<HTMLInputElement>(null);
  const ITEMNUM = 9;

  const router = useRouter();
  const onChangeProfileText = async (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    await setProfileText(event.target.value);
  };
  const onClickMyIntroduceChange = async () => {
    if (typeof user != "string" && user != undefined && profileText != "") {
      try {
        await DefaultAxiosService.instance.put(`/user/text/${user.id}`, {
          profile_text: profileText,
        });
        router.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };
  const onClickProfileImgChange = async () => {
    if (
      imgRef.current != null &&
      imgRef.current.files != null &&
      imgRef.current.files[0] != undefined &&
      user != undefined &&
      typeof user != "string"
    ) {
      const file = imgRef.current.files[0];
      const formData = new FormData();
      formData.append("image", file);
      try {
        const result = await FormAxiosService.instance.post("/image", formData);
        const imgUrl = `${result.data.imgSrc}`;

        await DefaultAxiosService.instance.put(`/user/image/${user.id}`, {
          profile_img: imgUrl,
        });
        router.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("이미지를 선택해주세요!");
    }
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
  const closeModal = () => {
    setModal(false);
  };

  const noData = () => {
    return (
      <div style={{ paddingLeft: "1rem", marginBottom: "1rem" }}>
        게시물이 존재하지 않습니다.
      </div>
    );
  };

  const TypeByContent = (type: string) => {
    if (
      type === "내가작성한 레시피" ||
      type === "좋아요 레시피자세히보기" ||
      type === "댓글 레시피자세히보기"
    ) {
      if (myRecipe?.length) {
        return (
          <>
            <RecipeList item={myRecipe} />
            <ListPageMove
              totalPosts={myRecipeLength}
              postsPerPage={ITEMNUM}
              pageMove={setCurrentPage}
              currentPage={currentPage}
            />
          </>
        );
      } else {
        return noData();
      }
    } else if (
      type === "내가작성한 맛집" ||
      type === "좋아요 맛집자세히보기" ||
      type === "댓글 맛집자세히보기"
    ) {
      if (myPlace?.length) {
        return (
          <>
            <PlaceList items={myPlace} />
            <ListPageMove
              totalPosts={myPlaceLength}
              postsPerPage={ITEMNUM}
              pageMove={setCurrentPage}
              currentPage={currentPage}
            />
          </>
        );
      } else {
        return noData();
      }
    } else if (
      type === "내가작성한 질문" ||
      type === "좋아요 상담자세히보기" ||
      type === "댓글 상담자세히보기"
    ) {
      if (myCs?.length) {
        return (
          <>
            {typeof user != "string" ? (
              <CounselingList items={myCs} user={user} />
            ) : (
              ""
            )}
            <ListPageMove
              totalPosts={myCsLength}
              postsPerPage={ITEMNUM}
              pageMove={setCurrentPage}
              currentPage={currentPage}
            />
          </>
        );
      } else {
        return noData();
      }
    } else if (type === "내가댓글단 게시물") {
      if (typeof user != "string" && user != undefined) {
        return <ContentsByUser onClick={setCheckType} user={user} />;
      } else return;
    } else if (type === "내가추천한 게시물") {
      if (typeof user != "string" && user != undefined) {
        return <LikesContentsByUser onClick={setCheckType} user={user} />;
      }
    } else if (type === "마이페이지") {
      if (typeof user != "string" && user != undefined) {
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
                  src={imgFile}
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
                  onClick={() => onClickProfileImgChange()}
                >
                  등록완료
                </button>
                <div style={{ paddingTop: "2rem" }}>
                  <div>이미지 업로드후 등록완료를 꼭 눌러주세요!</div>
                  <div>등록완료를 눌러야 저장됩니다!</div>
                </div>
              </div>
            </div>
            <div>프로필 소개</div>
            <div className={Styles.introduction}>
              {user?.profile_text && !profileEdit ? (
                <div
                  className={Styles.introduction_text}
                  dangerouslySetInnerHTML={{ __html: user.profile_text }}
                />
              ) : profileEdit ? (
                <textarea
                  onChange={onChangeProfileText}
                  className={Styles.introduction_text_edit}
                  defaultValue={user?.profile_text}
                />
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
                  <button
                    className={Styles.upload_btn}
                    onClick={() => onClickMyIntroduceChange()}
                  >
                    수정완료
                  </button>
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
      } else return;
    }
  };
  useEffect(() => {
    const changedCheckType = async () => {
      await setCurrentPage(1);
    };
    changedCheckType();
  }, [checkType]);
  useEffect(() => {
    const changedCheckTypeOrPage = async () => {
      if (typeof user != "string" && user) {
        ContentsByCheckType({
          user: user,
          checkType: checkType,
          currentPage: currentPage,
          setMyRecipe: setMyRecipe,
          setMyPlace: setMyPlace,
          setMyCs: setMyCs,
          setMyRecipeLength: setMyRecipeLength,
          setMyPlaceLength: setMyPlaceLength,
          setMyCsLength: setMyCsLength,
          ITEMNUM: ITEMNUM,
        });
      }
    };
    changedCheckTypeOrPage();
  }, [checkType, currentPage]);

  useEffect(() => {
    const getUserData = async () => {
      const getU = await searchUser();
      await setUser(getU);
      if (getU != undefined) {
        SearchUserData({
          user: getU,
          set: setMyRecipe,
          page: 1,
          size: 9,
          type: "recipe",
        });
        SearchUserData({
          user: getU,
          set: setMyPlace,
          page: 1,
          size: 9,
          type: "place",
        });
        SearchUserData({
          user: getU,
          set: setMyCs,
          page: 1,
          size: 9,
          type: "counseling",
        });

        setImgFile(getU.profile_img);
        setProfileText(getU.profile_text);
      } else {
        setModal(true);
      }
    };
    getUserData();
  }, []);

  return (
    <div className={Styles.mypage}>
      {modal ? (
        <Modal
          closeModal={closeModal}
          content={<WantLoginModalText closeModal={setModal} />}
        />
      ) : (
        ""
      )}
      <div className={Styles.mypage_head}>
        <h1
          className={Styles.head_left}
          onClick={() => {
            setCheckType("마이페이지");
          }}
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
            <li
              onClick={() => {
                setCheckType("내가작성한 레시피");
              }}
            >
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
