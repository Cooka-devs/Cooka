import Styles from "./index.module.css";
import { useState, useEffect } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import CounselingPageMove from "@/components/CounselingPageMove";
import { useRouter } from "next/router";
import { COUNSELINGDATA, csItem } from "..";

export interface Comment {
  id: number;
  postId: number;
  title: string;
  content: string;
  date: string;
}

const COMMENTS: Comment[] = [
  {
    id: 0,
    postId: 0,
    title: "개봉한 파스타소스 유통기한?",
    content: `파스타 소스가 남으면 며칠안에 다 소진해야 할까요?
    이미 개봉한거라 늘 고민되더라구요ㅜ`,
    date: "2023-08-15",
  },
  {
    id: 0,
    postId: 1,
    title: "개봉한 파스타소스 유통기한?",
    content: `파스타 소스가 남으면 며칠안에 다 소진해야 할까요?
    이미 개봉한거라 늘 고민되더라구요ㅜ`,
    date: "2023-08-15",
  },
];

const CounselingDetail = () => {
  const router = useRouter();
  const [post, setPost] = useState<csItem>();
  const [comments, setComments] = useState<Comment[]>([]);

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
        <div>
          <h1>{post.title}</h1>
          <span>{post.comments}</span>
        </div>
      ) : (
        <div>이미 삭제된 글이거나, 글을 찾을 수 없습니다.</div>
      )}
      {comments.map((comment) => (
        <span key={comment.id}>{comment.title}</span>
      ))}
    </div>
  );
};
export default CounselingDetail;
