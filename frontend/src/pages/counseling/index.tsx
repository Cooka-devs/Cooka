import Styles from "./index.module.css";
import { useState, useEffect } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import CounselingPageMove from "@/components/CounselingPageMove";
import { useRouter } from "next/router";
import CounselingList from "@/components/CounselingList";
export interface CsItem {
  id: number;
  title: string;
  nickname: string;
  content: string;
  likes: number;
  comments: number;
  date: string;
}

export const COUNSELINGDATA: CsItem[] = [
  {
    id: 0,
    title: "개봉한 파스타소스 유통기한?",
    nickname: "advsdv",
    content: `파스타 소스가 남으면 며칠안에 다 소진해야 할까요?
    이미 개봉한거라 늘 고민되더라구요ㅜ`,
    likes: 0,
    comments: 0,
    date: "2023-08-15",
  },
  {
    id: 1,
    title: "개봉한 파스타소스 유통기한?",
    nickname: "advsdv",
    content: `파스타 소스가 남으면 며칠안에 다 소진해야 할까요?
    이미 개봉한거라 늘 고민되더라구요ㅜ`,
    likes: 0,
    comments: 0,
    date: "2023-08-15",
  },
  {
    id: 2,
    title: "개봉한 파스타소스 유통기한?",
    nickname: "advsdv",
    content: `파스타 소스가 남으면 며칠안에 다 소진해야 할까요?
    이미 개봉한거라 늘 고민되더라구요ㅜ`,
    likes: 0,
    comments: 0,
    date: "2023-08-15",
  },
  {
    id: 3,
    title: "개봉한 파스타소스 유통기한?",
    nickname: "advsdv",
    content: `파스타 소스가 남으면 며칠안에 다 소진해야 할까요?
    이미 개봉한거라 늘 고민되더라구요ㅜ`,
    likes: 0,
    comments: 0,
    date: "2023-08-15",
  },
  {
    id: 4,
    title: "개봉한 파스타소스 유통기한?",
    nickname: "advsdv",
    content: `파스타 소스가 남으면 며칠안에 다 소진해야 할까요?
    이미 개봉한거라 늘 고민되더라구요ㅜ`,
    likes: 0,
    comments: 0,
    date: "2023-08-15",
  },
  {
    id: 5,
    title: "개봉한 파스타소스 유통기한?",
    nickname: "advsdv",
    content: `파스타 소스가 남으면 며칠안에 다 소진해야 할까요?
    이미 개봉한거라 늘 고민되더라구요ㅜ`,
    likes: 0,
    comments: 0,
    date: "2023-08-15",
  },
];

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
