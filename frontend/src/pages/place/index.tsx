import Styles from "./index.module.css";
import { useState, useEffect } from "react";
import PlaceList from "@/components/PlaceList";
import PlacePageMove from "@/components/PlacePageMove";
import MakePlaceButton from "@/components/MakePlaceButton";
import CreateList from "@/components/CreateList";
const PLACELIST = [
  {
    imgSrc:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230428_91%2F1682638709082udtMM_JPEG%2FIMG_20230423_234810_923.jpg",
    imgAlt: "맛집이미지",
    title: "정육점 김씨",
    content: "",
    likes: 0,
    comments: 0,
    isHot: false,
    date: "2023-08-17",
  },
  {
    imgSrc:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220727_74%2F16589128997317OHF6_PNG%2F%25BC%25BA%25BB%25EA%25B8%25ED%25B0%25A1_%25BB%25FD%25B0%25A5%25BA%25F1.png",
    imgAlt: "맛집이미지",
    title: "성산명가",
    content: "",
    likes: 0,
    comments: 0,
    isHot: false,
    date: "2023-08-17",
  },
  {
    imgSrc:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230428_91%2F1682638709082udtMM_JPEG%2FIMG_20230423_234810_923.jpg",
    imgAlt: "맛집이미지",
    title: "정육점 김씨",
    content: "",
    likes: 0,
    comments: 0,
    isHot: false,
    date: "2023-08-17",
  },
  {
    imgSrc:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220216_86%2F16450062673229pD9x_JPEG%2FScreenshot_20220216-184157_NAVER.jpg",
    imgAlt: "맛집이미지",
    title: "오늘 와인한잔",
    content: "",
    likes: 0,
    comments: 0,
    isHot: true,
    date: "2023-08-17",
  },
  {
    imgSrc:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230428_91%2F1682638709082udtMM_JPEG%2FIMG_20230423_234810_923.jpg",
    imgAlt: "맛집이미지",
    title: "정육점 김씨",
    content: "",
    likes: 0,
    comments: 0,
    isHot: false,
    date: "2023-08-17",
  },
  {
    imgSrc:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230428_91%2F1682638709082udtMM_JPEG%2FIMG_20230423_234810_923.jpg",
    imgAlt: "맛집이미지",
    title: "정육점 김씨",
    content: "",
    likes: 0,
    comments: 0,
    isHot: false,
    date: "2023-08-17",
  },
  {
    imgSrc:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230428_91%2F1682638709082udtMM_JPEG%2FIMG_20230423_234810_923.jpg",
    imgAlt: "맛집이미지",
    title: "정육점 김씨",
    content: "",
    likes: 0,
    comments: 0,
    isHot: false,
    date: "2023-08-17",
  },
  {
    imgSrc:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220727_74%2F16589128997317OHF6_PNG%2F%25BC%25BA%25BB%25EA%25B8%25ED%25B0%25A1_%25BB%25FD%25B0%25A5%25BA%25F1.png",
    imgAlt: "맛집이미지",
    title: "성산명가",
    content: "",
    likes: 0,
    comments: 0,
    isHot: false,
    date: "2023-08-17",
  },
  {
    imgSrc:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230428_91%2F1682638709082udtMM_JPEG%2FIMG_20230423_234810_923.jpg",
    imgAlt: "맛집이미지",
    title: "정육점 김씨",
    content: "",
    likes: 0,
    comments: 0,
    isHot: false,
    date: "2023-08-17",
  },
  {
    imgSrc:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220216_86%2F16450062673229pD9x_JPEG%2FScreenshot_20220216-184157_NAVER.jpg",
    imgAlt: "맛집이미지",
    title: "오늘 와인한잔",
    content: "",
    likes: 0,
    comments: 0,
    isHot: true,
    date: "2023-08-17",
  },
  {
    imgSrc:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230428_91%2F1682638709082udtMM_JPEG%2FIMG_20230423_234810_923.jpg",
    imgAlt: "맛집이미지",
    title: "정육점 김씨",
    content: "",
    likes: 0,
    comments: 0,
    isHot: false,
    date: "2023-08-17",
  },
  {
    imgSrc:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230428_91%2F1682638709082udtMM_JPEG%2FIMG_20230423_234810_923.jpg",
    imgAlt: "맛집이미지",
    title: "정육점 김씨",
    content: "",
    likes: 0,
    comments: 0,
    isHot: false,
    date: "2023-08-17",
  },
  {
    imgSrc:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220216_86%2F16450062673229pD9x_JPEG%2FScreenshot_20220216-184157_NAVER.jpg",
    imgAlt: "맛집이미지",
    title: "오늘 와인한잔",
    content: "",
    likes: 0,
    comments: 0,
    isHot: true,
    date: "2023-08-17",
  },
  {
    imgSrc:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220727_74%2F16589128997317OHF6_PNG%2F%25BC%25BA%25BB%25EA%25B8%25ED%25B0%25A1_%25BB%25FD%25B0%25A5%25BA%25F1.png",
    imgAlt: "맛집이미지",
    title: "성산명가",
    content: "",
    likes: 0,
    comments: 0,
    isHot: false,
    date: "2023-08-17",
  },
];
export interface PlaceProps {
  imgSrc: string;
  imgAlt: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  isHot: boolean;
  date: string;
}
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
