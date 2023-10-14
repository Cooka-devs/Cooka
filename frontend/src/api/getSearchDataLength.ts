import DefaultAxiosService from "@/service/DefaultAxiosService";
import { SEARCHTYPE } from "@/constants";
interface GetSearchDataLength {
  keyword: string;
  setR: React.Dispatch<React.SetStateAction<number>>;
  setP: React.Dispatch<React.SetStateAction<number>>;
  setC: React.Dispatch<React.SetStateAction<number>>;
  setN: React.Dispatch<React.SetStateAction<number>>;
}

export const getSearchDataLength = async ({
  keyword,
  setR,
  setP,
  setC,
  setN,
}: GetSearchDataLength) => {
  SEARCHTYPE.map((searchType) => {
    DefaultAxiosService.instance
      .get(`/search_num/${searchType}?keyword=${keyword}`)
      .then((res) => {
        if (searchType === "recipe") {
          setR(res.data.data[0].count);
        } else if (searchType === "place") {
          setP(res.data.data[0].count);
        } else if (searchType === "counseling") {
          setC(res.data.data[0].count);
        } else if (searchType === "news") {
          setN(res.data.data[0].count);
        }
      });
  });
};
