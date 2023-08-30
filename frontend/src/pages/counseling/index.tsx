import Styles from "./index.module.css";
import { useState, useEffect } from "react";
import CounselingPageMove from "@/components/CounselingPageMove";
import CounselingList from "@/components/CounselingList";
import { CsItem } from "@/types";
import { COUNSELINGDATA } from "@/data";

const Counseling = () => {
  const [list, setList] = useState<CsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const itemnum = 12; //페이지당 출력될 item 수
  const indexOfLast = currentPage * itemnum; //slice할때 마지막item 순서
  const indexOfFirst = indexOfLast - itemnum; // slice할때 첫item순서

  const CurrentPost = (post: CsItem[]) => {
    let currentPosts: CsItem[] = [];
    currentPosts = post.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  useEffect(() => {
    setList(COUNSELINGDATA); // TODO => 서버에서 들어오는 데이터로 바꾸기
  }, []);

  return (
    <div className={Styles.counselingpage}>
      <CounselingList items={CurrentPost(list)} />
      <CounselingPageMove
        totalPosts={list.length}
        postsPerPage={itemnum}
        pageMove={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};
export default Counseling;
