import Styles from "./index.module.css";
import { useState, useEffect } from "react";
import PlaceList from "@/components/PlaceList";
import PlacePageMove from "@/components/PlacePageMove";
import MakePlaceButton from "@/components/MakePlaceButton";
import CreateList from "@/components/CreateList";
import { PlaceProps } from "@/types";
import { PLACELIST } from "@/data";

// interface A {
//   type: "A";
//   hello: "Hello";
// }

// interface B {
//   type: "b";
//   world: "World";
// }

// const printMessage = (type: A) => {
//   console.log(type.hello);
// };

// const getType = (): A | B => {
//   const rand = Math.random();

//   if (rand % 2 === 0) {
//     return {
//       type: "A",
//       hello: "Hello",
//     };
//   } else {
//     return {
//       type: "b",
//       world: "World",
//     };
//   }
// };

// runtime에 동작하는 코드야 (이게 무슨말이냐??)
// compile 타임과, runtime
// ide에서 작성을하고 그걸 컴파일
// const type = getType();
// if ("type" in type && type["type"] === "A") {
//   printMessage(type);
// }

// generic type

const Place = () => {
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
  const makePlace = () => {
    setOnPlace(true);
  };
  const listPlace = () => {
    setOnPlace(false);
  };
  useEffect(() => {
    setList(PLACELIST);
  }, []);
  return (
    <div>
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
