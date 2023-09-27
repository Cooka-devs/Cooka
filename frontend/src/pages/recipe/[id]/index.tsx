import Styles from "./index.module.css";
import { useEffect, useState } from "react";
import { Recipe } from "@/types";
import { useRouter } from "next/router";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Divider } from "@/components";
import useGetComments from "@/hooks/useGetComments";
import ShowComment from "@/components/ShowComment";
import { RECIPECOMMENTS } from "@/data";
import { useGetPost } from "@/hooks/useGetPost";
const RecipeDetail = () => {
  const [post, setPost] = useState<Recipe>();
  const comments = useGetComments(RECIPECOMMENTS);
  const router = useRouter();
  useEffect(() => {
    const id = router.query.id;
    const result = id as string;
    const getP = async () => {
      const getPost = await useGetPost(result, "recipe");
      console.log(getPost);
      setPost(getPost);
    };
    getP();
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
            {/* <div className={Styles.like_span}>
              <ThumbUpOffAltIcon
                className={Styles.like_icon}
                fontSize={"large"}
              />
              {post.likes}
            </div>| */}
            <div style={{ color: "gray" }}>{post.created_at}</div>
          </div>
          <Divider />
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
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
