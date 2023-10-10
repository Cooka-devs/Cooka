import DefaultAxiosService from "@/service/DefaultAxiosService";
import { CsItem, PlaceProps, Recipe, User } from "@/types";
interface GetMyCommentsByTypeProps {
  type: string;
  user: User;
  set: React.Dispatch<React.SetStateAction<any>>;
  size: number;
  page: number;
}
interface GetMyCommentsProps {
  user: User;
  setRecipe: React.Dispatch<React.SetStateAction<Recipe[] | undefined>>;
  setPlace: React.Dispatch<React.SetStateAction<PlaceProps[] | undefined>>;
  setCs: React.Dispatch<React.SetStateAction<CsItem[] | undefined>>;
  size: number;
  page: number;
}
interface GetListNumByCommentsProps {
  type: string;
  user: User;
  set: React.Dispatch<React.SetStateAction<number>>;
}
export const getMyComments = async ({
  //자세히보기를 출력할지말지 판단하기위해
  //최대한 데이터를 줄이기위해 0,4데이터만 넣어줍니다.
  //checkType이 "내가 댓글단게시물"로 가면 실행되는 ContentsByUser에서 실행됩니다.
  user,
  setRecipe,
  setPlace,
  setCs,
  size,
  page,
}: GetMyCommentsProps) => {
  DefaultAxiosService.instance
    .get(`/recipe_comment`, {
      params: { nickname: user.nickname, size: size, page: page },
    })
    .then((res) => {
      setRecipe(res.data.data);
    });
  DefaultAxiosService.instance
    .get(`/place_comment`, {
      params: { nickname: user.nickname, size: size, page: page },
    })
    .then((res) => {
      setPlace(res.data.data);
    });
  DefaultAxiosService.instance
    .get(`/counseling_comment`, {
      params: { nickname: user.nickname, size: size, page: page },
    })
    .then((res) => {
      setCs(res.data.data);
    });
};
export const getMyCommentsByType = async ({
  //내가작성한 댓글의 게시물을
  //자세히보기 클릭시 페이지별로 데이터를 받아오기 위한 함수입니다.
  type,
  user,
  set,
  size,
  page,
}: GetMyCommentsByTypeProps) => {
  DefaultAxiosService.instance
    .get(`/${type}_comment`, {
      params: { nickname: user.nickname, size: size, page: page },
    })
    .then((res) => {
      set(res.data.data);
    });
};
export const getListNumByComments = ({
  type,
  user,
  set,
}: GetListNumByCommentsProps) => {
  DefaultAxiosService.instance
    .get(`/list/${type}_comment`, {
      params: { nickname: user.nickname },
    })
    .then((res) => {
      set(res.data.data.count);
    });
};
