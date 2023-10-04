import { getComment } from "@/api/getComment";
import { getCounseling } from "@/api/getCounseling";
import { getPlace } from "@/api/getPlace";
import { getReipce } from "@/api/getRecipe";
import { Comment, CsItem, PlaceProps, Recipe } from "@/types";

const getMyComments = async (nickname: string) => {
  const getCounselingComments: Comment[] = await getComment({
    type: "counseling",
  });
  const getRecipeComments: Comment[] = await getComment({ type: "recipe" });
  const getPlaceComments: Comment[] = await getComment({ type: "place" });
  const getCounselingList: CsItem[] = await getCounseling();
  const getRecipeList: Recipe[] = await getReipce();
  const getPlaceList: PlaceProps[] = await getPlace();
  const csCommentsList = getCounselingComments.filter(
    (item) => item.writer === nickname
  );
  const recipeCommentsList = getRecipeComments.filter(
    (item) => item.writer === nickname
  );
  const placeCommentsList = getPlaceComments.filter(
    (item) => item.writer === nickname
  );
  const myCsListByComments: CsItem[] = [];
  const myRecipeListByComments: Recipe[] = [];
  const myPlaceListByComments: PlaceProps[] = [];
  const uniqueCsList: CsItem[] = [];
  const uniqueRecipeList: Recipe[] = [];
  const uniquePlaceList: PlaceProps[] = [];

  csCommentsList.map((myCommentsList) => {
    getCounselingList.map((commentsList) => {
      myCommentsList.postId === commentsList.id
        ? myCsListByComments.push(commentsList)
        : "";
    });
  });

  recipeCommentsList.map((myCommentsList) => {
    getRecipeList.map((commentsList) => {
      myCommentsList.postId === commentsList.id
        ? myRecipeListByComments.push(commentsList)
        : "";
    });
  });

  placeCommentsList.map((myCommentsList) => {
    getPlaceList.map((commentsList) => {
      myCommentsList.postId === commentsList.id
        ? myPlaceListByComments.push(commentsList)
        : "";
    });
  });

  myCsListByComments.forEach((item) => {
    if (!uniqueCsList.includes(item)) {
      uniqueCsList.push(item);
    }
  });

  myRecipeListByComments.forEach((item) => {
    if (!uniqueRecipeList.includes(item)) {
      uniqueRecipeList.push(item);
    }
  });

  myPlaceListByComments.forEach((item) => {
    if (!uniquePlaceList.includes(item)) {
      uniquePlaceList.push(item);
    }
  });

  return { uniqueCsList, uniqueRecipeList, uniquePlaceList };
};
export default getMyComments;
