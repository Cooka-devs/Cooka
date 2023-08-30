import Styles from "./index.module.css";
import { useEffect, useState } from "react";
import { Recipe } from "@/types";
import { useRouter } from "next/router";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { Divider } from "@/components";
import useGetComments from "@/hooks/useGetComments";
import ShowComment from "@/components/ShowComment";
import { RECIPECOMMENTS, RECIPELIST } from "@/data";
const RecipeDetail = () => {
  const router = useRouter();
  const [post, setPost] = useState<Recipe>();

  const comments = useGetComments(RECIPECOMMENTS);
  useEffect(() => {
    const postId = router.query.id;
    if (!postId) return;
    const post = RECIPELIST.find((post) => post.id === +postId);
    if (!post) return;
    setPost(post);
  }, [router.query.id]);
  return (
    <div>
      {post ? (
        <div className={Styles.recipe_itemdetail}>
          <div className={Styles.title}>
            <span>{`[${post?.category}]`}</span>
            <span style={{ paddingLeft: "1rem" }}>{`${post?.title}`}</span>
          </div>
          <div style={{ paddingTop: "1rem", color: "gray" }}>
            작성자 : {post.writer}
          </div>
          <div className={Styles.list_likes}>
            <div className={Styles.like_span}>
              <ThumbUpOffAltIcon
                className={Styles.like_icon}
                fontSize={"large"}
              />
              {post.likes}
            </div>
            <div className={Styles.like_span}>
              <InsertCommentOutlinedIcon
                className={Styles.like_icon}
                fontSize={"large"}
              />
              {post.comments}
            </div>
            |<div style={{ color: "gray" }}>{post.date}</div>
          </div>
          <Divider />
          <img src={post.imgSrc} alt={post.imgAlt} className={Styles.img} />
          <div
            dangerouslySetInnerHTML={{ __html: post.recipe }}
            style={{ marginBottom: "10rem" }}
          />
          <Divider />
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
        <div className={Styles.recipe_itemdetail}>
          이미 삭제된 글이거나, 글을 찾을 수 없습니다.
        </div>
      )}
    </div>
  );
};
export default RecipeDetail;
