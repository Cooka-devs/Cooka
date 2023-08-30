import { COUNSELINGDATA, NEWSDATA, PLACELIST, RECIPELIST } from "@/data";
const Search = (text: string) => {
  return {
    searchCounselingData: COUNSELINGDATA.filter((item) =>
      item.title.includes(text)
    ),
    searchNewsData: NEWSDATA.filter((item) => item.title.includes(text)),
    searchPlaceListData: PLACELIST.filter((item) => item.title.includes(text)),
    searchRecipeListData: RECIPELIST.filter((item) =>
      item.title.includes(text)
    ),
  };
};
export default Search;
