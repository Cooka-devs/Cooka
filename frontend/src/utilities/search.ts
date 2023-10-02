import { NEWSDATA } from "@/data";
import { CsItem, PlaceProps, Recipe } from "@/types";
const Search = (
  text: string,
  cData: CsItem[],
  pData: PlaceProps[],
  rData: Recipe[]
) => {
  return {
    searchCounselingData: cData.filter((item) => item.title.includes(text)),
    searchNewsData: NEWSDATA.filter((item) => item.title.includes(text)),
    searchPlaceListData: pData.filter((item) => item.title.includes(text)),
    searchRecipeListData: rData.filter((item) => item.title.includes(text)),
  };
};
export default Search;
