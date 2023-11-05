import { getListByPage } from "@/api/getListByPage";
import { getListLength } from "@/api/getListLength";
import CreateList from "@/components/CreateList";
import MakePlaceButton from "@/components/MakePlaceButton";
import Modal from "@/components/Modal";
import { WantLoginModalText } from "@/components/WantLoginModalText";
import { PlaceProps, User } from "@/types";
import { useCallback, useEffect, useState } from "react";
import Styles from "./index.module.css";
import GetUser from "@/utilities/GetUser";
import { DivDataByLength } from "@/components/DivDataByLength";
import { CancelPostButton } from "@/components/CancelPostButton";
const ITEMNUM = 9; //페이지당 출력될 item 수

const Place = () => {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
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
    GetUser(setUser);
    const getPlaceListLength = async () => {
      const placeListLength = await getListLength("place"); //데이터의 갯수를 받아옴
      setListLength(placeListLength);
    };
    getPlaceListLength();
  }, []);

  useEffect(() => {
    getListByPage({
      page: currentPage,
      size: ITEMNUM,
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
            <DivDataByLength
              list={list}
              listLength={listLength}
              size={ITEMNUM}
              pageMove={setCurrentPage}
              currentPage={currentPage}
              type="place"
            />
          )}
        </div>
        <div className={Styles.place_right}>
          <div className={Styles.place_right_make}>
            {onplace ? (
              <CancelPostButton set={setOnPlace} text="맛집공유" />
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
