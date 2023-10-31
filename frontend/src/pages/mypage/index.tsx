import { searchUser } from "@/api/getCurrentUser";
import { RecipeList } from "@/components";
import AniButton from "@/components/AniButton";
import { ContentsByCheckType } from "@/utilities/ContentsByCheckType";
import ContentsByUser from "@/components/ContentsByUser";
import CounselingList from "@/components/CounselingList";
import LikesContentsByUser from "@/components/LikesContentsByUser";
import ListPageMove from "@/components/ListPageMove";
import Modal from "@/components/Modal";
import PlaceList from "@/components/PlaceList";
import SearchUserData from "@/utilities/SearchUserData";
import { WantLoginModalText } from "@/components/WantLoginModalText";
import DefaultAxiosService from "@/service/DefaultAxiosService";
import FormAxiosService from "@/service/FormAxiosService";
import { CsItem, PlaceProps, Recipe, User } from "@/types";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import Styles from "./index.module.scss";
import NoData from "@/components/NoData";
import GetUser from "@/utilities/GetUser";

const Mypage = () => {
  const [user, setUser] = useState<User | null>(null);
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
    if (!!user && profileText != "") {
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
      !!user
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

  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

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
        return <NoData paddingLeft="1rem" marginBottom="1rem" />;
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
        return <NoData paddingLeft="1rem" marginBottom="1rem" />;
      }
    } else if (
      type === "내가작성한 질문" ||
      type === "좋아요 상담자세히보기" ||
      type === "댓글 상담자세히보기"
    ) {
      if (myCs?.length) {
        return (
          <>
            {!!user ? <CounselingList items={myCs} user={user} /> : ""}
            <ListPageMove
              totalPosts={myCsLength}
              postsPerPage={ITEMNUM}
              pageMove={setCurrentPage}
              currentPage={currentPage}
            />
          </>
        );
      } else {
        return <NoData paddingLeft="1rem" marginBottom="1rem" />;
      }
    } else if (type === "내가댓글단 게시물") {
      if (!!user) {
        return <ContentsByUser onClick={setCheckType} user={user} />;
      } else return;
    } else if (type === "내가추천한 게시물") {
      if (!!user) {
        return <LikesContentsByUser onClick={setCheckType} user={user} />;
      }
    } else if (type === "마이페이지") {
      if (!!user) {
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
                <Image
                  src={imgFile}
                  alt="프로필 이미지"
                  className={Styles.img_preview}
                  width={300}
                  height={300}
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
                <AniButton
                  className={Styles.upload_btn}
                  style={{ marginLeft: "1rem" }}
                  onClick={onClickProfileImgChange}
                >
                  등록완료
                </AniButton>
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
                  <AniButton
                    className={Styles.upload_btn}
                    onClick={() => setProfileEdit(false)}
                  >
                    수정취소
                  </AniButton>
                  <AniButton
                    className={Styles.upload_btn}
                    onClick={() => onClickMyIntroduceChange()}
                  >
                    수정완료
                  </AniButton>
                </>
              ) : (
                <AniButton
                  className={Styles.upload_btn}
                  onClick={() => {
                    setProfileEdit(true);
                  }}
                >
                  수정
                </AniButton>
              )}
            </div>
          </div>
        );
      } else return;
    }
  };
  useEffect(() => {
    //체크타입이 바뀔때마다 페이지를 1로 바꿔줍니다
    const changedCheckType = async () => {
      await setCurrentPage(1);
    };
    changedCheckType();
  }, [checkType]);

  useEffect(() => {
    //체크타입과 페이지를 종합해 데이터를 가져옵니다.
    const changedCheckTypeOrPage = async () => {
      if (!!user) {
        ContentsByCheckType({
          user,
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
  }, [checkType, currentPage, user]);

  useEffect(() => {
    const getUserData = async () => {
      GetUser(setUser);
      if (!!user) {
        SearchUserData({
          user: user,
          set: setMyRecipe,
          page: 1,
          size: 9,
          type: "recipe",
        });
        SearchUserData({
          user: user,
          set: setMyPlace,
          page: 1,
          size: 9,
          type: "place",
        });
        SearchUserData({
          user: user,
          set: setMyCs,
          page: 1,
          size: 9,
          type: "counseling",
        });

        setImgFile(user.profile_img);
        setProfileText(user.profile_text);
      } else {
        setModal(true);
      }
    };
    getUserData();
  }, [user]);

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
          <AniButton className={Styles.head_btn}>마이페이지</AniButton>
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
              <AniButton className={Styles.li_btn}>나만의 레시피</AniButton>
            </li>
            <li onClick={() => setCheckType("내가작성한 맛집")}>
              <AniButton className={Styles.li_btn}>이런곳도 있어요!</AniButton>
            </li>
            <li onClick={() => setCheckType("내가작성한 질문")}>
              <AniButton className={Styles.li_btn}>요리연구소</AniButton>
            </li>
          </ul>
          <div className={Styles.snb_subhead}>나의 관심목록</div>
          <ul className={Styles.snb_menu}>
            <li onClick={() => setCheckType("내가추천한 게시물")}>
              <AniButton className={Styles.li_btn}>추천한 목록</AniButton>
            </li>
            <li onClick={() => setCheckType("내가댓글단 게시물")}>
              <AniButton className={Styles.li_btn}>댓글단 목록</AniButton>
            </li>
          </ul>
        </div>
        <div className={Styles.content}>{TypeByContent(checkType)}</div>
      </div>
    </div>
  );
};
export default Mypage;
