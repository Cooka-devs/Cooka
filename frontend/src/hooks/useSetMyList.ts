import { CsItem, PlaceProps, Recipe, User } from "@/types";
import { useEffect, useMemo } from "react";
import SearchUserData from "../utilities/SearchUserData";
import { getListLength } from "@/api/getListLength";
import { MYCOMMENTLIST, MYLIKEDLIST, MYLIST } from "@/constants";
import { getMyLikedList } from "@/utilities/getMyLikes";
import { getLikedList } from "@/api/getLikedList";
import { getListNumByComments, getMyCommentsByType } from "@/api/getMyComments";

interface ContentsByCheckTypeProps {
  user: User | null;
  setMyRecipe: React.Dispatch<React.SetStateAction<Recipe[] | undefined>>;
  setMyPlace: React.Dispatch<React.SetStateAction<PlaceProps[] | undefined>>;
  setMyCs: React.Dispatch<React.SetStateAction<CsItem[] | undefined>>;
  setMyRecipeLength: React.Dispatch<React.SetStateAction<number>>;
  setMyPlaceLength: React.Dispatch<React.SetStateAction<number>>;
  setMyCsLength: React.Dispatch<React.SetStateAction<number>>;
  ITEMNUM: number;
  currentPage: number;
  checkType: string;
}

function useSetDataByType({
  user,
  setMyRecipe,
  setMyRecipeLength,
  setMyPlace,
  setMyPlaceLength,
  setMyCs,
  setMyCsLength,
  ITEMNUM,
  currentPage,
  checkType,
}: ContentsByCheckTypeProps) {
  const dataType = useMemo(() => {
    return [
      {
        type: "recipe",
        setLength: setMyRecipeLength,
        setList: setMyRecipe,
      },
      {
        type: "place",
        setLength: setMyPlaceLength,
        setList: setMyPlace,
      },
      {
        type: "counseling",
        setLength: setMyCsLength,
        setList: setMyCs,
      },
    ];
  }, [
    setMyCs,
    setMyCsLength,
    setMyPlace,
    setMyPlaceLength,
    setMyRecipe,
    setMyRecipeLength,
  ]);

  useEffect(() => {
    if (!user) return;
    if (MYLIST.includes(checkType)) {
      Promise.all(
        dataType.map(async (item) => {
          const length = await getListLength(item.type, user.nickname);
          item.setLength(length);
          SearchUserData({
            user,
            set: item.setList,
            page: currentPage,
            size: ITEMNUM,
            type: item.type,
          });
        })
      );
    } else if (MYLIKEDLIST.includes(checkType)) {
      dataType.map((item) => {
        getMyLikedList({
          type: item.type,
          user,
          set: item.setList,
          size: ITEMNUM,
          page: currentPage,
        });
        getLikedList({ type: item.type, user, set: item.setLength });
      });
    } else if (MYCOMMENTLIST.includes(checkType)) {
      dataType.map((item) => {
        getMyCommentsByType({
          type: item.type,
          user,
          set: item.setList,
          page: currentPage,
          size: ITEMNUM,
        });
        getListNumByComments({
          user,
          type: item.type,
          set: item.setLength,
        });
      });
    }
  }, [ITEMNUM, checkType, currentPage, dataType, setMyCs, user]);
}
export default useSetDataByType;
