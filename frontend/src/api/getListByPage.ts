import DefaultAxiosService from "@/service/DefaultAxiosService";
import { CsItem, PlaceProps, Recipe } from "@/types";

interface GetListByPageProps {
  page: number; //현재페이지
  size: number; //페이지당 보여줄 data 수
  setList: React.Dispatch<React.SetStateAction<any>>; //리스트를변경/저장함수
  //recipe[]|placeprops[]|csitem[] 로 하고싶지만 type error 떄문에 제네릭도 안되길래
  //일단 이대로놔둠
  type: string; //list의 종류
}
export const getListByPage = async ({
  page,
  size,
  setList,
  type,
}: GetListByPageProps) => {
  try {
    const result = await DefaultAxiosService.instance.get(
      `/list/${type}?page=${page}&size=${size}`
    );
    setList(result.data.data);
  } catch (err) {
    console.log(err);
  }
};
