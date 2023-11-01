import { getSearchData } from "@/api/getSearchData";
import { NextRouter } from "next/router";
import { useEffect } from "react";
interface useGetSearchDataProps {
  router: NextRouter;
  type: string;
  page: number;
  size: number;
  set: React.Dispatch<React.SetStateAction<any>>;
}
function useGetSearchData({
  router,
  type,
  page,
  size,
  set,
}: useGetSearchDataProps) {
  useEffect(() => {
    if (!router.isReady || router.query["keyword"] === undefined) return;
    const keyword = router.query["keyword"].toString();
    getSearchData({
      type,
      keyword,
      page,
      size,
      setList: set,
    });
  }, [page, router.isReady, router.query, set, size, type]);
}
export default useGetSearchData;
