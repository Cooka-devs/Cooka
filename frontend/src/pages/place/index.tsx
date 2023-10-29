import { searchUser } from "@/api/getCurrentUser";
import { getListByPage } from "@/api/getListByPage";
import { getListLength } from "@/api/getListLength";
import AniButton from "@/components/AniButton";
import CreateList from "@/components/CreateList";
import ListPageMove from "@/components/ListPageMove";
import MakePlaceButton from "@/components/MakePlaceButton";
import Modal from "@/components/Modal";
import PlaceList from "@/components/PlaceList";
import { WantLoginModalText } from "@/components/WantLoginModalText";
import { PlaceProps, User } from "@/types";
import { useCallback, useEffect, useState } from "react";
import Styles from "./index.module.css";

const itemnum = 9; //페이지당 출력될 item 수

const Place = () => {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState<User>();
  const [onplace, setOnPlace] = useState(false);
  const [listLength, setListLength] = useState<number>(0); //리스트 길이
  const [list, setList] = useState<PlaceProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1); //현재페이지

  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

  const makePlace = () => {
    if (user != undefined) {
      setOnPlace(true);
    } else {
      setModal(true);
    }
  };

  const listPlace = useCallback(() => {
    setOnPlace(false);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const getU = await searchUser();
      console.log(getU);
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
    getListByPage({
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
              <AniButton
                onClick={() => listPlace()}
                className={Styles.goback_btn}
              >
                <div style={{ fontSize: "2rem", fontWeight: "700" }}>
                  돌아가기
                </div>
                <div style={{ fontSize: "1.5rem", paddingTop: "1rem" }}>
                  맛집공유 페이지로
                  <br />
                  돌아갈께요.
                </div>
              </AniButton>
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
