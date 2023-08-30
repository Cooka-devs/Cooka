import Styles from "./index.module.css";
import { useEffect, useState } from "react";
import { Recipe } from "..";
import { useRouter } from "next/router";
import { RECIPELIST } from "..";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { Divider } from "@/components";
import { ST } from "next/dist/shared/lib/utils";
const RecipeDetail = () => {
  const router = useRouter();
  const [post, setPost] = useState<Recipe>();
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
