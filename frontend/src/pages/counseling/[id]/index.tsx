import Styles from "./index.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { COUNSELINGDATA, csItem } from "..";
import CounselingCommentsPageMove from "@/components/CounselingCommentsPageMove";

export interface Comment {
  id: number;
  postId: number;
  nickname: string;
  comment: string;
  date: string;
}

const COMMENTS: Comment[] = [
  {
    id: 0,
    postId: 1,
    nickname: "abcdfefe",
    comment: `답변테스트11답변테스트11답변테스트11답변테스트11답변테스트11답변테스트11답변테스트11답변테스트11답변테스트11답변테스트11답변테스트11`,
    date: "2023-08-15",
  },
  {
    id: 1,
    postId: 1,
    nickname: "abcdfefe",
    comment: `버리시는걸 추천합니다!`,
    date: "2023-08-15",
  },
  {
    id: 2,
    postId: 1,
    nickname: "abcdfefe",
    comment: `버리시는걸 추천합니다!`,
    date: "2023-08-15",
  },
  {
    id: 3,
    postId: 1,
    nickname: "abcdfefe",
    comment: `버리시는걸 추천합니다!`,
    date: "2023-08-15",
  },
  {
    id: 4,
    postId: 0,
    nickname: "abcdfefe",
    comment: `버리시는걸 추천합니다!`,
    date: "2023-08-15",
  },
  {
    id: 5,
    postId: 0,
    nickname: "abcdfefe",
    comment: `버리시는걸 추천합니다!`,
    date: "2023-08-15",
  },
  {
    id: 6,
    postId: 0,
    nickname: "abcdfefe",
    comment: `버리시는걸 추천합니다!test121t
    est121test121test121test121test121test121test121test121test121test121test121
    test121test121test121test121test121test121`,
    date: "2023-08-15",
  },
  {
    id: 7,
    postId: 0,
    nickname: "abcdfefe",
    comment: `버리시는걸 추천합니다!`,
    date: "2023-08-15",
  },
];

const CounselingDetail = () => {
  const router = useRouter();
  const [post, setPost] = useState<csItem>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const itemnum = 3; //페이지당 출력될 item 수
  const indexOfLast = currentPage * itemnum; //slice할때 마지막item 순서
  const indexOfFirst = indexOfLast - itemnum; // slice할때 첫item순서
  const CurrentPost = (post: Comment[]) => {
    let currentPosts: Comment[] = [];
    currentPosts = post.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
  useEffect(() => {
    const postId = router.query.id;
    if (!postId) return;
    const comments = COMMENTS.filter((comment) => comment.postId === +postId);
    setComments(comments);
    const post = COUNSELINGDATA.find((post) => post.id === +postId);
    if (!post) return;
    setPost(post);
  }, []);

  return (
    <div>
      {post ? (
        <div className={Styles.cs_itemdetail}>
          <h1>{post.title}</h1>
          <div className={Styles.detail_name}>
            <div>{post.nickname}</div>
            <div>|</div>
            <div>{post.date}</div>
          </div>
          <div className={Styles.detail_content}>{post.content}</div>
          <textarea
            placeholder="댓글을 입력하세요!"
            className={Styles.comment_input_text}
          />
          <div className={Styles.input_comment}>
            <button className={Styles.input_commentbtn}>입력완료</button>
          </div>
          {CurrentPost(comments).map((comment) => (
            <div className={Styles.detail_comments} key={comment.id}>
              <div className={Styles.comment_name}>
                <div>{comment.nickname}</div>
                <div>|</div>
                <div>{comment.date}</div>
              </div>
              <div className={Styles.comment_comment}>{comment.comment}</div>
            </div>
          ))}
          <CounselingCommentsPageMove
            totalPosts={comments.length}
            postsPerPage={itemnum}
            pageMove={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      ) : (
        <div className={Styles.cs_itemdetail}>
          이미 삭제된 글이거나, 글을 찾을 수 없습니다.
        </div>
      )}
    </div>
  );
};
export default CounselingDetail;
