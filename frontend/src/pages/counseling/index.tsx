import Styles from "./index.module.css";
import { useState, useEffect, useCallback } from "react";
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
import AniButton from "@/components/AniButton";

const Counseling = () => {
  const [list, setList] = useState<CsItem[]>([]);
  const [listLength, setListLength] = useState(0); //리스트 길이
  const [user, setUser] = useState<null | User>(null);
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const itemnum = 12; //페이지당 출력될 item 수
  const [onCounsel, setOnCounsel] = useState(false);
  const [modal, setModal] = useState(false);

  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

  const makeCounsel = useCallback(() => {
    if (!!user) {
      setOnCounsel(true);
    } else {
      setModal(true);
    }
  }, [user]);

  useEffect(() => {
    getListByPage({
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
            <AniButton
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
            </AniButton>
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
        {!!user ? <CounselingList items={list} user={user} /> : ""}
        <div className={Styles.pagemove}>
          <ListPageMove
            totalPosts={listLength}
            postsPerPage={itemnum}
            pageMove={setCurrentPage}
            currentPage={currentPage}
          />
          <div className={Styles.cs_maker}>
            <AniButton
              className={Styles.btn_maker}
              onClick={() => makeCounsel()}
            >
              작성하기
            </AniButton>
          </div>
        </div>
      </div>
    );
  }
};
export default Counseling;
