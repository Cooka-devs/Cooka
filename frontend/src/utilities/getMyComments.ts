import {
  COUNSELINGCOMMENTS,
  RECIPECOMMENTS,
  COUNSELINGDATA,
  RECIPELIST,
  PLACECOMMENTS,
  PLACELIST,
} from "@/data";
import { CsItem, PlaceProps, Recipe } from "@/types";

const getMyComments = (nickname: string) => {
  const csCommentsList = COUNSELINGCOMMENTS.filter(
    (item) => item.nickname === nickname
  );
  const recipeCommentsList = RECIPECOMMENTS.filter(
    (item) => item.nickname === nickname
  );
  const placeCommentsList = PLACECOMMENTS.filter(
    (item) => item.nickname === nickname
  );
  const myCsListByComments: CsItem[] = [];
  const myRecipeListByComments: Recipe[] = [];
  const myPlaceListByComments: PlaceProps[] = [];
  const uniqueCsList: CsItem[] = [];
  const uniqueRecipeList: Recipe[] = [];
  const uniquePlaceList: PlaceProps[] = [];

  csCommentsList.map((myCommentsList) => {
    COUNSELINGDATA.map((commentsList) => {
      myCommentsList.postId === commentsList.id
        ? myCsListByComments.push(commentsList)
        : "";
    });
  });

  recipeCommentsList.map((myCommentsList) => {
    RECIPELIST.map((commentsList) => {
      myCommentsList.postId === commentsList.id
        ? myRecipeListByComments.push(commentsList)
        : "";
    });
  });

  placeCommentsList.map((myCommentsList) => {
    PLACELIST.map((commentsList) => {
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
