import DefaultAxiosService from "@/service/DefaultAxiosService";

interface GetSearchDataProps {
  type: string;
  keyword: string;
  page: number;
  size: number;
  setList: React.Dispatch<React.SetStateAction<any>>;
}
export const getSearchData = async ({
  type,
  keyword,
  page,
  size,
  setList,
}: GetSearchDataProps) => {
  DefaultAxiosService.instance
    .get(`/search/${type}`, {
      params: { keyword: keyword, page: page, size: size },
    })
    .then((res) => {
      console.log(`${type}Search : `, res.data.data);
      setList(() => {
        return [...res.data.data];
      });
    });
};
