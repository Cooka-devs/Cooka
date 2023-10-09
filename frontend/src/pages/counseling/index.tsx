import Styles from "./index.module.css";
import { useState, useEffect } from "react";
import CounselingList from "@/components/CounselingList";
import { CsItem, User } from "@/types";
import { getCounseling } from "@/api/getCounseling";
import { searchUser } from "@/api/getCurrentUser";
import CreateList from "@/components/CreateList";
import Modal from "@/components/Modal";
import { WantLoginModalText } from "@/components/WantLoginModalText";
import ListPageMove from "@/components/ListPageMove";
import { getListLength } from "@/api/getListLength";
import { getListByPage } from "@/api/getListByPage";

const Counseling = () => {
  const [list, setList] = useState<CsItem[]>([]);
  const [listLength, setListLength] = useState<number>(0); //리스트 길이
  const [user, setUser] = useState<undefined | User | string>("최초실행방지");
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const itemnum = 12; //페이지당 출력될 item 수
  const [onCounsel, setOnCounsel] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const closeModal = () => {
    setModal(false);
  };
  const makeCounsel = () => {
    if (user != undefined) {
      setOnCounsel(true);
    } else {
      setModal(true);
    }
  };
  useEffect(() => {
    const getList = getListByPage({
      page: currentPage,
      size: itemnum,
      setList: setList,
      type: "counseling",
    });
  }, [currentPage]);
  useEffect(() => {
    const fetch = async () => {
      const getU = await searchUser();
      setUser(getU);
    };
    fetch();
    const getCounselingListLength = async () => {
      const counselingListLength = await getListLength("counseling"); //데이터의 갯수를 받아옴
      setListLength(counselingListLength);
    };
    getCounselingListLength();
  }, []);
  if (onCounsel) {
    return (
      <div className={Styles.counseling_makepage}>
        <div className={Styles.counseling_makeleft}>
          <CreateList textType="counseling" />
        </div>
        <div className={Styles.counseling_makeright}>
          <div className={Styles.counseling_right_make}>
            <button
              className={Styles.goback_btn}
              onClick={() => setOnCounsel(false)}
            >
              <div style={{ fontSize: "2rem", fontWeight: "700" }}>
                돌아가기
              </div>
              <div style={{ fontSize: "1.5rem", paddingTop: "1rem" }}>
                고민공유 페이지로
                <br />
                돌아갈께요.
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={Styles.counselingpage}>
        {modal ? (
          <Modal
            closeModal={closeModal}
            content={<WantLoginModalText closeModal={setModal} />}
          />
        ) : (
          ""
        )}
        {typeof user != "string" ? (
          <CounselingList items={list} user={user} />
        ) : (
          ""
        )}
        <div className={Styles.pagemove}>
          <ListPageMove
            totalPosts={listLength}
            postsPerPage={itemnum}
            pageMove={setCurrentPage}
            currentPage={currentPage}
          />
          <div className={Styles.cs_maker}>
            <button className={Styles.btn_maker} onClick={() => makeCounsel()}>
              작성하기
            </button>
          </div>
        </div>
      </div>
    );
  }
};
export default Counseling;
