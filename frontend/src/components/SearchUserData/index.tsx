import { CsItem, PlaceProps, Recipe, User } from "@/types";
import { useState } from "react";
import { COUNSELINGDATA, PLACELIST, RECIPELIST } from "@/data";
const SearchUserData = (userdata: User) => {
  const name = userdata.nickname;
  return {
    myRecipe: RECIPELIST.filter((item) => item.writer === name),
    myPlace: PLACELIST.filter((item) => item.writer === name),
    myCs: COUNSELINGDATA.filter((item) => item.writer === name),
  };
};
export default SearchUserData;
