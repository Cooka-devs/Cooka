import DefaultAxiosService from "@/service/DefaultAxiosService";

interface GetSearchData {
  type: string;
  keyword: string;
  page: number;
  size: number;
  setList: React.Dispatch<React.SetStateAction<any>>; //타입이 recipe[] / news[]/ place[] / counseling[]
}
export const getSearchData = async ({
  type,
  keyword,
  page,
  size,
  setList,
}: GetSearchData) => {
  DefaultAxiosService.instance
    .get(`/search/${type}`, {
      params: { keyword: keyword, page: page, size: size },
    })
    .then((res) => {
      console.log(res.data.data);
      setList(() => {
        return [...res.data.data];
      });
    });
};
