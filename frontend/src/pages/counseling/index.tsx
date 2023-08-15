import Styles from "./index.module.css";
import { useState, useEffect } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import CounselingPageMove from "@/components/CounselingPageMove";
export interface csItem {
  title: string;
  content: string;
  likes: number;
  comments: number;
  date: string;
}

const COUNSELINGDATA: csItem[] = [
  {
    title: "개봉한 파스타소스 유통기한?",
    content: `파스타 소스가 남으면 며칠안에 다 소진해야 할까요?
    이미 개봉한거라 늘 고민되더라구요ㅜ`,
    likes: 0,
    comments: 0,
    date: "2023-08-15",
  },
  {
    title: "개봉한 파스타소스 유통기한?",
    content: `파스타 소스가 남으면 며칠안에 다 소진해야 할까요?
    이미 개봉한거라 늘 고민되더라구요ㅜ`,
    likes: 0,
    comments: 0,
    date: "2023-08-15",
  },
  {
    title: "개봉한 파스타소스 유통기한?",
    content: `파스타 소스가 남으면 며칠안에 다 소진해야 할까요?
    이미 개봉한거라 늘 고민되더라구요ㅜ`,
    likes: 0,
    comments: 0,
    date: "2023-08-15",
  },
  {
    title: "개봉한 파스타소스 유통기한?",
    content: `파스타 소스가 남으면 며칠안에 다 소진해야 할까요?
    이미 개봉한거라 늘 고민되더라구요ㅜ`,
    likes: 0,
    comments: 0,
    date: "2023-08-15",
  },
  {
    title: "개봉한 파스타소스 유통기한?",
    content: `파스타 소스가 남으면 며칠안에 다 소진해야 할까요?
    이미 개봉한거라 늘 고민되더라구요ㅜ`,
    likes: 0,
    comments: 0,
    date: "2023-08-15",
  },
  {
    title: "개봉한 파스타소스 유통기한?",
    content: `파스타 소스가 남으면 며칠안에 다 소진해야 할까요?
    이미 개봉한거라 늘 고민되더라구요ㅜ`,
    likes: 0,
    comments: 0,
    date: "2023-08-15",
  },
  {
    title: "개봉한 파스타소스 유통기한?",
    content: `파스타 소스가 남으면 며칠안에 다 소진해야 할까요?
    이미 개봉한거라 늘 고민되더라구요ㅜ`,
    likes: 0,
    comments: 0,
    date: "2023-08-15",
  },
  {
    title: "개봉한 파스타소스 유통기한?",
    content: `파스타 소스가 남으면 며칠안에 다 소진해야 할까요?
    이미 개봉한거라 늘 고민되더라구요ㅜ`,
    likes: 0,
    comments: 0,
    date: "2023-08-15",
  },
  {
    title: "개봉한 파스타소스 유통기한?",
    content: `파스타 소스가 남으면 며칠안에 다 소진해야 할까요?
    이미 개봉한거라 늘 고민되더라구요ㅜ`,
    likes: 0,
    comments: 0,
    date: "2023-08-15",
  },
  {
    title: "개봉한 파스타소스 유통기한?",
    content: `파스타 소스가 남으면 며칠안에 다 소진해야 할까요?
    이미 개봉한거라 늘 고민되더라구요ㅜ`,
    likes: 0,
    comments: 0,
    date: "2023-08-15",
  },
  {
    title: "개봉한 파스타소스 유통기한?",
    content: `파스타 소스가 남으면 며칠안에 다 소진해야 할까요?
    이미 개봉한거라 늘 고민되더라구요ㅜ`,
    likes: 0,
    comments: 0,
    date: "2023-08-15",
  },
  {
    title: "개봉한 파스타소스 유통기한?",
    content: `파스타 소스가 남으면 며칠안에 다 소진해야 할까요?
    이미 개봉한거라 늘 고민되더라구요ㅜ`,
    likes: 0,
    comments: 0,
    date: "2023-08-15",
  },
  {
    title: "개봉한 파스타소스 유통기한?",
    content: `파스타 소스가 남으면 며칠안에 다 소진해야 할까요?
    이미 개봉한거라 늘 고민되더라구요ㅜ`,
    likes: 0,
    comments: 0,
    date: "2023-08-15",
  },
];

const Counseling = () => {
  const [list, setList] = useState<csItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const itemnum = 12; //페이지당 출력될 item 수
  const indexOfLast = currentPage * itemnum; //slice할때 마지막item 순서
  const indexOfFirst = indexOfLast - itemnum; // slice할때 첫item순서

  const CurrentPost = (post: csItem[]) => {
    let currentPosts: csItem[] = [];
    currentPosts = post.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  useEffect(() => {
    setList(COUNSELINGDATA); // TODO => 서버에서 들어오는 데이터로 바꾸기
  }, []);
  return (
    <div className={Styles.counselingpage}>
      <div className={Styles.cslist}>
        {CurrentPost(list).map((item, index) => {
          return (
            <div className={Styles.csitem} key={index}>
              <div className={Styles.item_date}>{item.date}</div>
              <div className={Styles.item_title}>{item.title}</div>
              <div className={Styles.item_likes}>
                <div className={Styles.like_span}>
                  <ThumbUpOffAltIcon
                    className={Styles.like_icon}
                    fontSize={"large"}
                  />
                  {item.likes}
                </div>
                <div className={Styles.like_span}>
                  <InsertCommentOutlinedIcon
                    className={Styles.like_icon}
                    fontSize={"large"}
                  />
                  {item.comments}
                </div>
              </div>
            </div>
          );
        })}
      </div>
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
