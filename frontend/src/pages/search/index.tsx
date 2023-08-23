import { useEffect, useState } from "react";
import Styles from "./index.module.css";

const search = () => {
  const [searchCounselingData, setSearchCounselingData] = useState();
  const [searchNewsData, setSearchNewsData] = useState();
  const [searchPlaceListData, setSearchPlaceListData] = useState();
  const [searchRecipeListData, setSearchRecipeListData] = useState();

  useEffect(() => {
    const searchCounselingData = localStorage.getItem("searchCounselingData");
    const searchNewsData = localStorage.getItem("searchNewsData");
    const searchPlaceListData = localStorage.getItem("searchPlaceListData");
    const searchRecipeListData = localStorage.getItem("searchRecipeListData");

    if (searchCounselingData) {
      setSearchCounselingData(JSON.parse(searchCounselingData));
    }
    if (searchNewsData) {
      setSearchNewsData(JSON.parse(searchNewsData));
    }
    if (searchPlaceListData) {
      setSearchPlaceListData(JSON.parse(searchPlaceListData));
    }
    if (searchRecipeListData) {
      setSearchRecipeListData(JSON.parse(searchRecipeListData));
    }
  }, []);

  console.log(searchCounselingData);
  console.log(searchNewsData);
  console.log(searchPlaceListData);
  console.log(searchRecipeListData);

  return (
    <div className={Styles.searchpage}>
      <div>text</div>
    </div>
  );
};
export default search;
