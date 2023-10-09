import Styles from "./index.module.css";
import { useState, useEffect } from "react";
import PlaceList from "@/components/PlaceList";
import ListPageMove from "@/components/ListPageMove";
import MakePlaceButton from "@/components/MakePlaceButton";
import CreateList from "@/components/CreateList";
import { PlaceProps } from "@/types";
import Modal from "@/components/Modal";
import { WantLoginModalText } from "@/components/WantLoginModalText";
import { searchUser } from "@/api/getCurrentUser";
import { User } from "@/types";
import { getListLength } from "@/api/getListLength";
import { getListByPage } from "@/api/getListByPage";
const Place = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [user, setUser] = useState<undefined | User>();
  const [onplace, setOnPlace] = useState<boolean>(false);
  const [listLength, setListLength] = useState<number>(0); //리스트 길이
  const [list, setList] = useState<PlaceProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const itemnum = 9; //페이지당 출력될 item 수

  const closeModal = () => {
    setModal(false);
  };
  const makePlace = () => {
    if (user != undefined) {
      setOnPlace(true);
    } else {
      setModal(true);
    }
  };
  const listPlace = () => {
    setOnPlace(false);
  };
  useEffect(() => {
    const fetch = async () => {
      const getU = await searchUser();
      setUser(getU);
    };
    fetch();
    const getPlaceListLength = async () => {
      const placeListLength = await getListLength("place"); //데이터의 갯수를 받아옴
      setListLength(placeListLength);
    };
    getPlaceListLength();
  }, []);
  useEffect(() => {
    const getList = getListByPage({
      page: currentPage,
      size: itemnum,
      setList: setList,
      type: "place",
    });
  }, [currentPage]);
  return (
    <div>
      {modal ? (
        <Modal
          closeModal={closeModal}
          content={<WantLoginModalText closeModal={setModal} />}
        />
      ) : (
        ""
      )}
      <div className={Styles.place_container}>
        <div className={Styles.place_left}>
          {onplace ? (
            <CreateList textType="place" />
          ) : (
            <>
              <PlaceList items={list} />
              <ListPageMove
                totalPosts={listLength}
                postsPerPage={itemnum}
                pageMove={setCurrentPage}
                currentPage={currentPage}
              />
            </>
          )}
        </div>
        <div className={Styles.place_right}>
          <div className={Styles.place_right_make}>
            {onplace ? (
              <button onClick={() => listPlace()} className={Styles.goback_btn}>
                <div style={{ fontSize: "2rem", fontWeight: "700" }}>
                  돌아가기
                </div>
                <div style={{ fontSize: "1.5rem", paddingTop: "1rem" }}>
                  맛집공유 페이지로
                  <br />
                  돌아갈께요.
                </div>
              </button>
            ) : (
              <MakePlaceButton onClick={makePlace} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Place;
