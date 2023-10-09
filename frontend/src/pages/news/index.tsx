import Styles from "./index.module.css";
import NewsPagination from "@/components/NewsPagination";
import { NewItem, User } from "@/types";
import { useEffect, useState } from "react";
import ListPageMove from "@/components/ListPageMove";
import { getListByPage } from "@/api/getListByPage";
import { getListLength } from "@/api/getListLength";
import { searchUser } from "@/api/getCurrentUser";

const News = () => {
  const [list, setList] = useState<NewItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const [listLength, setListLength] = useState<number>(0); //리스트 길이
  const [user, setUser] = useState<undefined | User>();
  const itemnum = 12;

  useEffect(() => {
    const getRecipeListLength = async () => {
      const newsListLength = await getListLength("news"); //데이터의 갯수를 받아옴
      setListLength(newsListLength);
    };
    getRecipeListLength();
    const fetch = async () => {
      const getU = await searchUser();
      setUser(getU);
    };
    fetch();
  }, []);
  useEffect(() => {
    const getList = getListByPage({
      page: currentPage,
      size: itemnum,
      setList: setList,
      type: "news",
    });
    console.log(list);
  }, [currentPage]);
  return (
    <div className={Styles.news}>
      {user?.login_type === "admin" ? (
        <button className={Styles.news_make_btn}>작성하기</button>
      ) : (
        ""
      )}
      <NewsPagination items={list} />
      <ListPageMove
        totalPosts={listLength}
        postsPerPage={itemnum}
        pageMove={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};
export default News;
