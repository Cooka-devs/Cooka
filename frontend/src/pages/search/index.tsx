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

  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  ////////////////////////////////////////getSearchData를 반복적으로 실행시키기위해 만든 객체입니다.

  const SETBYTYPE: Record<
    string,
    React.Dispatch<React.SetStateAction<any>>
  > = useMemo(
    () => ({
      recipe: setSearchRecipeList,
      place: setSearchPlaceList,
      counseling: setSearchCsList,
      news: setSearchNewsList,
    }),
    []
  );
  const NUMBYTYPE: Record<string, number> = useMemo(
    () => ({
      recipe: recipePageNum,
      place: placePageNum,
      counseling: csPageNum,
      news: newsPageNum,
    }),
    [recipePageNum, placePageNum, csPageNum, newsPageNum]
  );

  ////////////////////////////////////////////////////////////

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
    GetUser(setUser);
  }, [router.isReady, router.query]);

  useMemo(() => {
    if (!router.isReady || router.query["keyword"] === undefined) return;
    const keyword = router.query["keyword"].toString();
    getSearchData({
      type: "recipe",
      keyword: keyword,
      page: recipePageNum,
      size: ITEMNUM,
      setList: setSearchRecipeList,
    });
  }, [recipePageNum, router.isReady, router.query]);

  useMemo(() => {
    if (!router.isReady || router.query["keyword"] === undefined) return;
    const keyword = router.query["keyword"].toString();
    getSearchData({
      type: "place",
      keyword: keyword,
      page: placePageNum,
      size: ITEMNUM,
      setList: setSearchPlaceList,
    });
  }, [placePageNum, router.isReady, router.query]);

  useMemo(() => {
    if (!router.isReady || router.query["keyword"] === undefined) return;
    const keyword = router.query["keyword"].toString();
    getSearchData({
      type: "counseling",
      keyword: keyword,
      page: csPageNum,
      size: ITEMNUM,
      setList: setSearchCsList,
    });
  }, [csPageNum, router.isReady, router.query]);

  useMemo(() => {
    if (!router.isReady || router.query["keyword"] === undefined) return;
    const keyword = router.query["keyword"].toString();
    getSearchData({
      type: "news",
      keyword: keyword,
      page: newsPageNum,
      size: ITEMNUM,
      setList: setSearchNewsList,
    });
  }, [newsPageNum, router.isReady, router.query]);

  return (
    <div className={Styles.searchpage}>
      <div className={Styles.keyword}>검색결과</div>
      <div style={{ paddingLeft: "5rem", marginBottom: "5rem" }}>
        <Divider color="burlywood" weight="0.5rem" width="130rem" />
      </div>
      <div className={Styles.search_result}>
        <div className={Styles.result_category}>
          <RightButton
            listLength={recipeListNum}
            itemNum={ITEMNUM}
            pageNum={recipePageNum}
            setPageNum={setRecipePageNum}
          />
          <LeftButton pageNum={recipePageNum} setPageNum={setRecipePageNum} />
          <div className={Styles.title}>레시피</div>
          {searchRecipeList && searchRecipeList.length > 0 ? (
            <RecipeList item={searchRecipeList} />
          ) : (
            <NoData paddingLeft="1rem" />
          )}
        </div>
        <div className={Styles.result_category}>
          <RightButton
            listLength={placeListNum}
            itemNum={ITEMNUM}
            pageNum={placePageNum}
            setPageNum={setPlacePageNum}
          />
          <LeftButton pageNum={placePageNum} setPageNum={setPlacePageNum} />
          <div className={Styles.title}>맛집</div>
          {searchPlaceList && searchPlaceList.length > 0 ? (
            <PlaceList items={searchPlaceList} />
          ) : (
            <NoData paddingLeft="1rem" />
          )}
        </div>
        <div className={Styles.result_category}>
          <RightButton
            listLength={csListNum}
            itemNum={ITEMNUM}
            pageNum={csPageNum}
            setPageNum={setCsPageNum}
          />
          <LeftButton pageNum={csPageNum} setPageNum={setCsPageNum} />
          <div className={Styles.title}>질문</div>
          {searchCsList && searchCsList.length > 0 ? (
            <CounselingList items={searchCsList} user={user} />
          ) : (
            <NoData paddingLeft="1rem" />
          )}
        </div>
        <div className={Styles.result_category}>
          <RightButton
            listLength={newsListNum}
            itemNum={ITEMNUM}
            pageNum={newsPageNum}
            setPageNum={setNewsPageNum}
          />
          <LeftButton pageNum={newsPageNum} setPageNum={setNewsPageNum} />
          <div className={Styles.title}>뉴스</div>
          {searchNewsList && searchNewsList.length > 0 ? (
            <NewsPagination items={searchNewsList} />
          ) : (
            <NoData paddingLeft="1rem" />
          )}
        </div>
      </div>
    </div>
  );
};
export default Search;
