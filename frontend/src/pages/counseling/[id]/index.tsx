import Styles from "./index.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { COUNSELINGDATA } from "@/data";
import { CsItem } from "@/types";
import useGetComments from "@/hooks/useGetComments";
import ShowComment from "@/components/ShowComment";
import { COUNSELINGCOMMENTS } from "@/data";
import { useGetPost } from "@/hooks/useGetPost";
const CounselingDetail = () => {
  const [post, setPost] = useState<CsItem>();
  const comments = useGetComments(COUNSELINGCOMMENTS);
  const router = useRouter();
  useEffect(() => {
    const id = router.query.id;
    const result = id as string;
    const getP = async () => {
      const getPost = await useGetPost(result, "counseling");
      console.log(getPost);
      setPost(getPost);
    };
    getP();
  }, [router.query.id]);
  return (
    <div>
      {post ? (
        <div className={Styles.cs_itemdetail}>
          <h1>{post.title}</h1>
          <div className={Styles.detail_name}>
            <div>{post.writer}</div>
            <div>|</div>
            <div>{post.created_at}</div>
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
