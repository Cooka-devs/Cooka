import Styles from "./index.module.css";
import { useState, useEffect } from "react";
import PlaceList from "@/components/PlaceList";
import PlacePageMove from "@/components/PlacePageMove";
import MakePlaceButton from "@/components/MakePlaceButton";
import CreateList from "@/components/CreateList";
import { PlaceProps } from "@/types";
import { PLACELIST } from "@/data";
import Modal from "@/components/Modal";
import { WantLoginModalText } from "@/components/WantLoginModalText";

const Place = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [user, setUser] = useState();
  const [onplace, setOnPlace] = useState<boolean>(false);
  const [list, setList] = useState<PlaceProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const itemnum = 9; //페이지당 출력될 item 수
  const indexOfLast = currentPage * itemnum; //slice할때 마지막item 순서
  const indexOfFirst = indexOfLast - itemnum; // slice할때 첫item순서
  const CurrentPost = (post: PlaceProps[]) => {
    let currentPosts: PlaceProps[] = [];
    if (post != undefined) {
      currentPosts = post.slice(indexOfFirst, indexOfLast);
    }
    return currentPosts;
  };
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
    setList(PLACELIST);
  }, []);
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
              <PlaceList items={CurrentPost(list)} />
              <PlacePageMove
                totalPosts={list.length}
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
