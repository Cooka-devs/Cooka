import { CsItem, PlaceProps, Recipe, User } from "@/types";
import { useState } from "react";
import { getReipce } from "@/api/getRecipe";
import { getPlace } from "@/api/getPlace";
import { getCounseling } from "@/api/getCounseling";
const SearchUserData = async (userdata: User) => {
  const recipe: Recipe[] = await getReipce();
  const place: PlaceProps[] = await getPlace();
  const counseling: CsItem[] = await getCounseling();
  const name = userdata.nickname;
  return {
    myRecipe: recipe.filter((item) => item.writer === name),
    myPlace: place.filter((item) => item.writer === name),
    myCs: counseling.filter((item) => item.writer === name),
  };
};
export default SearchUserData;
