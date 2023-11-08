import { CsItem, News, PlaceProps, Recipe, User } from "@/types";
import Styles from "./index.module.css";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { getSearchDataLength } from "@/api/getSearchDataLength";
import { getSearchData } from "@/api/getSearchData";
import { Divider, RecipeList } from "@/components";
import NoData from "@/components/NoData";
import { LeftButton, RightButton } from "@/components/Button";
import PlaceList from "@/components/PlaceList";
import CounselingList from "@/components/CounselingList";
import { searchUser } from "@/api/getCurrentUser";
import NewsPagination from "@/components/NewsPagination";
import GetUser from "@/utilities/GetUser";
import { SEARCHTYPE } from "@/constants";
import useGetSearchData from "@/hooks/useGetSearchData";
import SearchList from "@/components/SearchList";
import DivSearchData from "@/components/DivSearchData";

const ITEMNUM = 4;

const Search = () => {
  const [searchRecipeList, setSearchRecipeList] = useState<
    //검색어, 페이지에따라 상태변경됩니다.
    Recipe[]
  >([]);
  const [searchPlaceList, setSearchPlaceList] = useState<PlaceProps[]>([]);
  const [searchCsList, setSearchCsList] = useState<CsItem[]>([]);
  const [searchNewsList, setSearchNewsList] = useState<News[]>([]);

  const [recipeListNum, setRecipeListNum] = useState(0); //데이터를 다불러오지않고 길이만 가져옴
  //그 길이로 화살표를 출력할지 안할지를 결정합니다.
  const [placeListNum, setPlaceListNum] = useState(0);
  const [csListNum, setCsListNum] = useState(0);
  const [newsListNum, setNewsListNum] = useState(0);

  const [newsPageNum, setNewsPageNum] = useState(1);
  const [recipePageNum, setRecipePageNum] = useState(1); //
  const [placePageNum, setPlacePageNum] = useState(1);
  const [csPageNum, setCsPageNum] = useState(1);

  const router = useRouter();

  const DIVSEARCHDATA = [
    {
      title: "레시피",
      type: "recipe",
      page: recipePageNum,
      set: setRecipePageNum,
      itemNum: ITEMNUM,
      list: searchRecipeList,
      listNum: recipeListNum,
    },
    {
      title: "맛집",
      type: "place",
      page: placePageNum,
      set: setPlacePageNum,
      itemNum: ITEMNUM,
      list: searchPlaceList,
      listNum: placeListNum,
    },
    {
      title: "질문",
      type: "counseling",
      page: csPageNum,
      set: setCsPageNum,
      itemNum: ITEMNUM,
      list: searchCsList,
      listNum: csListNum,
    },
    {
      title: "뉴스",
      type: "news",
      page: newsPageNum,
      set: setNewsPageNum,
      itemNum: ITEMNUM,
      list: searchNewsList,
      listNum: newsListNum,
    },
  ];

  useEffect(() => {
    if (!router.isReady || router.query["keyword"] === undefined) return;
    const keyword = router.query["keyword"].toString();
    getSearchDataLength({
      keyword: keyword,
      setP: setPlaceListNum,
      setR: setRecipeListNum,
      setC: setCsListNum,
      setN: setNewsListNum,
    });
  }, [router.isReady, router.query]);

  useGetSearchData({
    router: router,
    type: "recipe",
    page: recipePageNum,
    size: ITEMNUM,
    set: setSearchRecipeList,
  });

  useGetSearchData({
    router: router,
    type: "place",
    page: placePageNum,
    size: ITEMNUM,
    set: setSearchPlaceList,
  });

  useGetSearchData({
    router: router,
    type: "counseling",
    page: csPageNum,
    size: ITEMNUM,
    set: setSearchCsList,
  });

  useGetSearchData({
    router: router,
    type: "news",
    page: newsPageNum,
    size: ITEMNUM,
    set: setSearchNewsList,
  });

  return (
    <div className={Styles.searchpage}>
      <div className={Styles.keyword}>검색결과</div>
      <div style={{ paddingLeft: "5rem", marginBottom: "5rem" }}>
        <Divider color="burlywood" weight="0.5rem" width="130rem" />
      </div>
      <div className={Styles.search_result}>
        {DIVSEARCHDATA.map((data, index) => {
          return (
            <DivSearchData
              listNum={data.listNum}
              size={ITEMNUM}
              pageNum={data.page}
              setPageNum={data.set}
              type={data.type}
              title={data.title}
              list={data.list}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Search;
