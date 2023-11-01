import DefaultAxiosService from "@/service/DefaultAxiosService";
import { CsItem, PlaceProps, Recipe, User } from "@/types";
import { type } from "os";
interface GetMyLikesProps {
  user: User;
  setRecipe: React.Dispatch<React.SetStateAction<Recipe[] | undefined>>;
  setPlace: React.Dispatch<React.SetStateAction<PlaceProps[] | undefined>>;
  setCs: React.Dispatch<React.SetStateAction<CsItem[] | undefined>>;
  size: number;
  page: number;
}
interface GetMyLikedListProps {
  type: string;
  user: User;
  set: React.Dispatch<React.SetStateAction<any>>;
  size: number;
  page: number;
}
export const getMyLikes = async ({
  //댓글단 목록실행시 자세히보기를 출력할지에대한 여부
  //판단을 위해 0,4데이터만 넣어주고 길이가 3이 넘어가면 자세히보기를 출력하도록합니다.
  //최대한 데이터를 줄이기위해 0,4데이터만 넣어줬습니다.
  user,
  setRecipe,
  setPlace,
  setCs,
  size,
  page,
}: GetMyLikesProps) => {
  DefaultAxiosService.instance
    .get(`/recipe/${user.id}`, { params: { size: size, page: page } })
    .then((res) => {
      setRecipe(res.data.data);
    });
  DefaultAxiosService.instance
    .get(`/place/${user.id}`, { params: { size: size, page: page } })
    .then((res) => {
      setPlace(res.data.data);
    });
  DefaultAxiosService.instance
    .get(`/counseling/${user.id}`, { params: { size: size, page: page } })
    .then((res) => {
      setCs(res.data.data);
    });
};
export const getMyLikedList = async ({
  //자세히보기 클릭시 페이지별로 데이터를 받아오기 위한 함수입니다.
  type,
  user,
  set,
  size,
  page,
}: GetMyLikedListProps) => {
  console.log("type", type);
  console.log("user", user);
  console.log("set", set);
  console.log("size", size);
  console.log("page", page);
  DefaultAxiosService.instance
    .get(`/${type}/${user.id}`, { params: { size: size, page: page } })
    .then((res) => {
      set(res.data.data);
    });
};
