import Styles from "./index.module.css";
import NewsPageMove from "@/components/NewsPageMove";
import NewsPagination from "@/components/NewsPagination";
import { NewItem } from "@/types";
import { useEffect, useState } from "react";
import { NEWSDATA } from "@/data";
// interface newsItemsProps extends Array<newsItemsProp> {}

const News = () => {
  const [list, setList] = useState<NewItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const itemnum = 12; //페이지당 출력될 item 수
  const indexOfLast = currentPage * itemnum; //slice할때 마지막item 순서
  const indexOfFirst = indexOfLast - itemnum; // slice할때 첫item순서

  const CurrentPost = (post: NewItem[]) => {
    let currentPosts: NewItem[] = [];
    currentPosts = post.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  useEffect(() => {
    setList(NEWSDATA);
  }, []);

  return (
    <div className={Styles.news}>
      <NewsPagination items={CurrentPost(list)} />
      <NewsPageMove
        totalPosts={list.length}
        postsPerPage={itemnum}
        pageMove={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};
export default News;
