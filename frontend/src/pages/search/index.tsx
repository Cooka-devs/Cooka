import { useEffect, useMemo, useState } from "react";
import Styles from "./index.module.css";
import { RecipeList } from "@/components";
import useSearchItems from "@/hooks/useSearchItems";
import PlaceList from "@/components/PlaceList";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import NewsPagination from "@/components/NewsPagination";
import CounselingList from "@/components/CounselingList";
const search = () => {
  const itemNum = 4;
  const [recipeNum, setRecipeNum] = useState(0);
  const [placeNum, setPlaceNum] = useState(0);
  const [newsNum, setNewsNum] = useState(0);
  const [counselingNum, setCounselingNum] = useState(0);
  let recipeNum2 = 0;
  const {
    searchCounselingData,
    searchNewsData,
    searchPlaceListData,
    searchRecipeListData,
  } = useSearchItems();
  const Lists = useMemo(() => {
    return [
      {
        title: "레시피",
        component: (
          <RecipeList
            items={searchRecipeListData.slice(recipeNum, recipeNum + itemNum)}
          />
        ),
        data: searchRecipeListData,
      },
      {
        title: "맛집",
        component: (
          <PlaceList
            items={searchPlaceListData.slice(placeNum, placeNum + itemNum)}
          />
        ),
        data: searchPlaceListData,
      },
      {
        title: "뉴스",
        component: (
          <NewsPagination
            items={searchNewsData.slice(newsNum, newsNum + itemNum)}
          />
        ),
        data: searchNewsData,
      },
      {
        title: "질문",
        component: (
          <CounselingList
            items={searchCounselingData.slice(
              counselingNum,
              counselingNum + itemNum
            )}
          />
        ),
        data: searchCounselingData,
      },
    ];
  }, [
    searchRecipeListData,
    searchPlaceListData,
    searchCounselingData,
    searchNewsData,
    placeNum,
    recipeNum2,
    counselingNum,
    newsNum,
  ]);
  const onClickLeftHandler = (title: string) => {
    if (title === "레시피") {
      recipeNum2 != 0 ? (recipeNum2 -= itemNum) : "";
    }
    if (title === "맛집") {
      placeNum != 0 ? setPlaceNum((prev) => prev - itemNum) : "";
    }
    if (title === "뉴스") {
      newsNum != 0 ? setNewsNum((prev) => prev - itemNum) : "";
    }
    if (title === "질문") {
      counselingNum != 0 ? setCounselingNum((prev) => prev - itemNum) : "";
    }
  };

  const onClickRightHandler = (title: string) => {
    if (title === "레시피") {
      recipeNum2 + itemNum < searchRecipeListData.length
        ? (recipeNum2 += itemNum)
        : "";
    }
    if (title === "맛집") {
      placeNum + itemNum < searchPlaceListData.length
        ? setPlaceNum((prev) => prev + itemNum)
        : "";
    }
    if (title === "뉴스") {
      newsNum + itemNum < searchNewsData.length
        ? setNewsNum((prev) => prev + itemNum)
        : "";
    }
    if (title === "질문") {
      counselingNum + itemNum < searchCounselingData.length
        ? setCounselingNum((prev) => prev + itemNum)
        : "";
    }
  };
  return (
    <div className={Styles.searchpage}>
      <div className={Styles.main_container}>
        {Lists.map((list) => {
          return (
            <div key={list.title} className={Styles.container_item}>
              <div className={Styles.item_title}>{list.title}</div>
              <div className={Styles.item_content}>{list.component}</div>
              <button
                className={
                  list.title === "뉴스"
                    ? Styles.news_arrowleft_btn
                    : list.title === "질문"
                    ? Styles.counseling_arrowleft_btn
                    : Styles.arrowleft_btn
                }
                onClick={() => onClickLeftHandler(list.title)}
                style={{
                  display: list.data.length === 0 ? "none" : "inline-block",
                }}
              >
                <ArrowBackIosNewIcon className={Styles.arrowbtn} />
              </button>
              <button
                className={
                  list.title === "뉴스"
                    ? Styles.news_arrowright_btn
                    : list.title === "질문"
                    ? Styles.counseling_arrowright_btn
                    : Styles.arrowright_btn
                }
                onClick={() => onClickRightHandler(list.title)}
                style={{
                  display: list.data.length === 0 ? "none" : "inline-block",
                }}
              >
                <ArrowForwardIosIcon className={Styles.arrowbtn} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default search;
