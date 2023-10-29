import { getLikedList } from "@/api/getLikedList";
import { getListLength } from "@/api/getListLength";
import { getListNumByComments, getMyCommentsByType } from "@/api/getMyComments";
import { CsItem, PlaceProps, Recipe, User } from "@/types";
import { getMyLikedList } from "@/utilities/getMyLikes";
import SearchUserData from "../SearchUserData";

interface ContentsByCheckTypeProps {
  checkType: string;
  user: User;
  setMyRecipe: React.Dispatch<React.SetStateAction<Recipe[] | undefined>>;
  setMyPlace: React.Dispatch<React.SetStateAction<PlaceProps[] | undefined>>;
  setMyCs: React.Dispatch<React.SetStateAction<CsItem[] | undefined>>;
  setMyRecipeLength: React.Dispatch<React.SetStateAction<number>>;
  setMyPlaceLength: React.Dispatch<React.SetStateAction<number>>;
  setMyCsLength: React.Dispatch<React.SetStateAction<number>>;
  ITEMNUM: number;
  currentPage: number;
}

export const ContentsByCheckType = async ({
  user,
  checkType,
  setMyRecipe,
  setMyRecipeLength,
  setMyPlace,
  setMyPlaceLength,
  setMyCs,
  setMyCsLength,
  ITEMNUM,
  currentPage,
}: ContentsByCheckTypeProps) => {
  let selectedSetList;
  let type;
  if (checkType === "내가작성한 레시피") {
    selectedSetList = setMyRecipe;
    type = "recipe";
    const length = await getListLength("recipe", user.nickname);
    setMyRecipeLength(length);
  } else if (checkType === "내가작성한 맛집") {
    selectedSetList = setMyPlace;
    type = "place";
    const length = await getListLength("place", user.nickname);
    setMyPlaceLength(length);
  } else if (checkType === "내가작성한 질문") {
    selectedSetList = setMyCs;
    type = "counseling";
    const length = await getListLength("counseling", user.nickname);
    setMyCsLength(length);
  } else if (checkType === "좋아요 레시피자세히보기") {
    getMyLikedList({
      type: "recipe",
      user: user,
      set: setMyRecipe,
      size: ITEMNUM,
      page: currentPage,
    });
    getLikedList({ type: "recipe", user: user, set: setMyRecipeLength });
  } else if (checkType === "좋아요 맛집자세히보기") {
    getMyLikedList({
      type: "place",
      user: user,
      set: setMyPlace,
      size: ITEMNUM,
      page: currentPage,
    });
    getLikedList({ type: "place", user: user, set: setMyPlaceLength });
  } else if (checkType === "좋아요 상담자세히보기") {
    getMyLikedList({
      type: "counseling",
      user: user,
      set: setMyCs,
      size: ITEMNUM,
      page: currentPage,
    });
    getLikedList({ type: "counseling", user: user, set: setMyCsLength });
  } else if (checkType === "댓글 레시피자세히보기") {
    getMyCommentsByType({
      type: "recipe",
      user: user,
      set: setMyRecipe,
      page: currentPage,
      size: ITEMNUM,
    });
    getListNumByComments({
      user: user,
      type: "recipe",
      set: setMyRecipeLength,
    });
  } else if (checkType === "댓글 맛집자세히보기") {
    getMyCommentsByType({
      type: "place",
      user: user,
      set: setMyPlace,
      page: currentPage,
      size: ITEMNUM,
    });
    getListNumByComments({
      user: user,
      type: "place",
      set: setMyPlaceLength,
    });
  } else if (checkType === "댓글 상담자세히보기") {
    getMyCommentsByType({
      type: "counseling",
      user: user,
      set: setMyCs,
      page: currentPage,
      size: ITEMNUM,
    });
    getListNumByComments({
      user: user,
      type: "counseling",
      set: setMyCsLength,
    });
  }
  if (selectedSetList && type) {
    SearchUserData({
      user: user,
      set: selectedSetList,
      page: currentPage,
      size: ITEMNUM,
      type: type,
    });
  }
};
