import Styles from "./index.module.css";
import { useState, useEffect } from "react";
import CounselingPageMove from "@/components/CounselingPageMove";
import CounselingList from "@/components/CounselingList";
import { CsItem, User } from "@/types";
import { COUNSELINGDATA } from "@/data";
import { getCounseling } from "@/api/getCounseling";
import { searchUser } from "@/api/getCurrentUser";

const Counseling = () => {
  const [list, setList] = useState<CsItem[]>([]);
  const [user, setUser] = useState<undefined | User>();
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
    const getPlaceList = async () => {
      const getList = await getCounseling();
      console.log("getPlace Result:", getList);
      await setList(getList);
    };
    getPlaceList();

    const fetch = async () => {
      const getU = await searchUser();
      setUser(getU);
    };
    fetch();
  }, []);

  return (
    <div className={Styles.counselingpage}>
      <CounselingList items={CurrentPost(list)} />
      <div className={Styles.pagemove}>
        <CounselingPageMove
          totalPosts={list.length}
          postsPerPage={itemnum}
          pageMove={setCurrentPage}
          currentPage={currentPage}
        />
        <div className={Styles.cs_maker}>
          <button className={Styles.btn_maker}>작성하기</button>
        </div>
      </div>
    </div>
  );
};
export default Counseling;
