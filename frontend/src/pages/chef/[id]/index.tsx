import { CsItem, PlaceProps, User } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SearchUserData from "@/components/SearchUserData";
import Styles from "./index.module.css";
import ContentsByUser from "@/components/ContentsByUser";
import { Recipe } from "@/types";
const ChefDetail = () => {
  const [checkType, setCheckType] = useState<string>();
  const [myRecipe, setMyRecipe] = useState<Recipe[]>();
  const [myPlace, setMyPlace] = useState<PlaceProps[]>();
  const [myCs, setMyCs] = useState<CsItem[]>();
  const router = useRouter();
  const chefId = router.query.id;
  //해당id를 가진 유저의 get
  //그 유저의 nickname을 이용해 데이터를 찾아옴

  //이작업을 위해 user에 index를 id값으로 할당
  //예시로 이런식의 유저정보를 가져옴
  const userData = {
    status: "user",
    id: 13,
    nickname: "승휘",
    email: "tmdgnl1201@naver.com",
    profileImgSrc: "/nonuser.webp",
    introduction:
      "wewedfdfdfdvsdvsdvwewedfdfdfdvsdvsdvwewewedfdfdfdvsdvsdvwewedfdfdfdvsdvsdvwewedfdwewedfdfdfdvsdvsdvwewedfdfdfdvsdvsdvwewedfdwewedfdfdfdvsdvsdvwewedfdfdfdvsdvsdvwewedfdwedfd",
  };
  useEffect(() => {
    const { myRecipe, myCs, myPlace } = SearchUserData(userData);
    setMyCs(myCs);
    setMyPlace(myPlace);
    setMyRecipe(myRecipe);
  }, [router.query.id]);
  return (
    <div className={Styles.chefpage}>
      <div>{userData.nickname}님의 프로필</div>
      <div className={Styles.chef_profile}>
        <img
          src={userData.profileImgSrc}
          className={Styles.profile_img}
          alt="프로필이미지"
        />
        <div className={Styles.profile_text}>{userData.introduction}</div>
      </div>
      <ContentsByUser
        uniqueRecipeList={myRecipe}
        uniqueCsList={myCs}
        uniquePlaceList={myPlace}
        onClick={setCheckType}
      />
    </div>
  );
};
export default ChefDetail;
