import { CsItem, PlaceProps, User } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SearchUserData from "@/components/SearchUserData";
import Styles from "./index.module.css";
import { Recipe } from "@/types";
import DefaultAxiosService from "@/service/DefaultAxiosService";
import { ContentsByChef } from "@/components/ContentsByChef";
import { getListLength } from "@/components/ContentsByChef/getLength";
import { RecipeList } from "@/components";
import NoData from "@/components/NoData";
import PlaceList from "@/components/PlaceList";
import CounselingList from "@/components/CounselingList";
import { searchUser } from "@/api/getCurrentUser";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { LeftButton, RightButton } from "@/components/Button";
const ChefDetail = () => {
  const [myRecipe, setMyRecipe] = useState<Recipe[] | undefined>();
  const [myPlace, setMyPlace] = useState<PlaceProps[] | undefined>();
  const [myCs, setMyCs] = useState<CsItem[] | undefined>();

  const [recipeListNum, setRecipeListNum] = useState<number>(0);
  const [placeListNum, setPlaceListNum] = useState<number>(0);
  const [csListNum, setCsListNum] = useState<number>(0);

  const [userData, setUserData] = useState<User | undefined>();
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [recipePage, setRecipePage] = useState<number>(1);
  const [placePage, setPlacePage] = useState<number>(1);
  const [csPage, setCsPage] = useState<number>(1);
  const SIZE = 4;
  const router = useRouter();
  const chefId = router.query.id;

  useEffect(() => {
    const getUser = async () => {
      if (!chefId) return;
      const user = await DefaultAxiosService.instance.get(`/users/${chefId}`);
      setUserData(user.data.data[0]);
      const currentUser = await searchUser();
      setCurrentUser(currentUser);
    };
    getUser();
  }, [router.query.id]);
  useEffect(() => {
    if (userData) {
      getListLength({
        writer: userData.nickname,
        setRNum: setRecipeListNum,
        setPNum: setPlaceListNum,
        setCNum: setCsListNum,
      });
    }
  }, [userData]);
  useEffect(() => {
    if (userData) {
      ContentsByChef({
        rPage: recipePage,
        pPage: placePage,
        cPage: csPage,
        writer: userData.nickname,
        setR: setMyRecipe,
        setP: setMyPlace,
        setC: setMyCs,
        size: SIZE,
      });
    }
  }, [recipePage, placePage, csPage, userData]);
  return (
    <div className={Styles.chefpage}>
      {userData ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "10rem",
            }}
          >
            <div className={Styles.title}>{userData.nickname}님의 프로필</div>
            <div className={Styles.chef_profile}>
              <img
                src={userData.profile_img}
                className={Styles.profile_img}
                alt="프로필이미지"
              />
              <div className={Styles.profile_text}>{userData.profile_text}</div>
            </div>
          </div>
          <div className={Styles.view_list}>
            <RightButton
              listLength={recipeListNum}
              itemNum={SIZE}
              pageNum={recipePage}
              setPageNum={setRecipePage}
            />
            <LeftButton pageNum={recipePage} setPageNum={setRecipePage} />
            <div className={Styles.title}>{userData.nickname}님의 레시피</div>
            {myRecipe && myRecipe.length ? (
              <RecipeList item={myRecipe} />
            ) : (
              <NoData paddingTop="1rem" paddingLeft="1rem" />
            )}
          </div>
          <div className={Styles.view_list}>
            <RightButton
              listLength={placeListNum}
              itemNum={SIZE}
              pageNum={placePage}
              setPageNum={setPlacePage}
            />
            <LeftButton pageNum={placePage} setPageNum={setPlacePage} />
            <div className={Styles.title}>{userData.nickname}님의 맛집</div>
            {myPlace && myPlace.length ? (
              <PlaceList items={myPlace} />
            ) : (
              <NoData paddingTop="1rem" paddingLeft="1rem" />
            )}
          </div>
          <div className={Styles.view_list}>
            <RightButton
              listLength={csListNum}
              itemNum={SIZE}
              pageNum={csPage}
              setPageNum={setCsPage}
            />
            <LeftButton pageNum={csPage} setPageNum={setCsPage} />
            <div className={Styles.title}>{userData.nickname}님의 질문</div>
            {myCs && myCs.length ? (
              <CounselingList items={myCs} user={currentUser} />
            ) : (
              <NoData paddingTop="1rem" paddingLeft="1rem" />
            )}
          </div>
        </>
      ) : (
        <div>유저정보를 받아올수 없습니다.</div>
      )}
    </div>
  );
};
export default ChefDetail;
