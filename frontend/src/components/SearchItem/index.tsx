import { Recipe, PlaceProps, NewItem, CsItem } from "@/types";
import { COUNSELINGDATA, NEWSDATA, PLACELIST, RECIPELIST } from "@/data";

const searchCounselingData: CsItem[] = [];
const searchNewsData: NewItem[] = [];
const searchPlaceListData: PlaceProps[] = [];
const searchRecipeListData: Recipe[] = [];

const datacontent = [COUNSELINGDATA, NEWSDATA, PLACELIST, RECIPELIST];

const SearchItem = (text: string) => {
  console.log(COUNSELINGDATA, NEWSDATA, PLACELIST, RECIPELIST);
  {
    COUNSELINGDATA.map((item) => {
      item.title.includes(text) ? searchCounselingData.push(item) : "";
    });
    NEWSDATA.map((item) => {
      item.title.includes(text) ? searchNewsData.push(item) : "";
    });
    PLACELIST.map((item) => {
      item.title.includes(text) ? searchPlaceListData.push(item) : "";
    });
    RECIPELIST.map((item) => {
      item.title.includes(text) ? searchRecipeListData.push(item) : "";
    });
  }
  console.log("searchCounselingData:", searchCounselingData);
  console.log("searchNewsData:", searchNewsData);
  console.log("searchPlaceListData:", searchPlaceListData);
  console.log("searchRecipeListData:", searchRecipeListData);
};
export default SearchItem;
