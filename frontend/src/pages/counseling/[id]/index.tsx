import Styles from "./index.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { COUNSELINGDATA } from "@/data";
import { CsItem } from "@/types";
import useGetComments from "@/hooks/useGetComments";
import ShowComment from "@/components/ShowComment";
import { COUNSELINGCOMMENTS } from "@/data";

const CounselingDetail = () => {
  const router = useRouter();
  const [post, setPost] = useState<CsItem>();

  const comments = useGetComments(COUNSELINGCOMMENTS);
  //const post = useGetPost(COUNSELINGDATA)
  useEffect(() => {
    const postId = router.query.id;
    if (!postId) return;
    const post = COUNSELINGDATA.find((post) => post.id === +postId);
    if (!post) return;
    setPost(post);
  }, [router.query.id]);

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
          {comments ? <ShowComment comments={comments} /> : ""}
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
