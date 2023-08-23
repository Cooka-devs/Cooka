import { NewItem } from "@/components/NewsPagination";
import { CsItem } from "@/pages/counseling";
import { PlaceProps } from "@/pages/place";
import { Recipe } from "@/pages/recipe";
import Search from "@/utilities/search";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useSearchItems = () => {
  const router = useRouter();
  const [searchCounselingData, setSearchCounselingData] = useState<CsItem[]>(
    []
  );
  const [searchNewsData, setSearchNewsData] = useState<NewItem[]>([]);
  const [searchPlaceListData, setSearchPlaceListData] = useState<PlaceProps[]>(
    []
  );
  const [searchRecipeListData, setSearchRecipeListData] = useState<Recipe[]>(
    []
  );

  useEffect(() => {
    if (!router.isReady || router.query["keyword"] === undefined) return;
    const {
      searchCounselingData,
      searchNewsData,
      searchPlaceListData,
      searchRecipeListData,
    } = Search(router.query["keyword"].toString());
    setSearchCounselingData(searchCounselingData);
    setSearchNewsData(searchNewsData);
    setSearchPlaceListData(searchPlaceListData);
    setSearchRecipeListData(searchRecipeListData);
  }, [router.query]);

  return {
    searchCounselingData,
    searchNewsData,
    searchPlaceListData,
    searchRecipeListData,
  };
};

export default useSearchItems;
