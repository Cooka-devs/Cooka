import Styles from "./index.module.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Recipe, User } from "@/types";
import DefaultAxiosService from "@/service/DefaultAxiosService";
import { searchUser } from "@/api/getCurrentUser";
import { DisplayLikes } from "@/components/DisplayLikes";
export interface RecipeItemProps {
  item: Recipe;
  user: User | undefined;
}

const RecipeItem = ({ item, user }: RecipeItemProps) => {
  const [likes, setLikes] = useState<number | string>("최초실행방지");
  const [comments, setComments] = useState<number | string>(0); //댓글의 갯수
  const [onLike, setOnLike] = useState<boolean>(false); // 내가좋아요를 눌렀는지 여부
  const router = useRouter();

  useEffect(() => {
    const getLikesNum = async () => {
      await DefaultAxiosService.instance
        .get(`/recipe_likes_num/${item.id}`)
        .then((res) => {
          console.log(res.data.data.count);
          setLikes(res.data.data.count);
        });
    };
    getLikesNum();
  }, [onLike]);
  useEffect(() => {
    const getCommentsNum = async () => {
      await DefaultAxiosService.instance
        .get(`/recipe_comment_num/${item.id}`)
        .then((res) => {
          setComments(res.data.data.count);
        });
    };
    getCommentsNum();
  }, []);

  return (
    <div className={Styles.list_item}>
      <img
        src={item.imgSrc}
        alt={item.imgAlt}
        onClick={() => router.push({ pathname: `/recipe/${item.id}` })}
      />
      <div className={Styles.list_date}>{item.created_at}</div>
      <div className={Styles.list_title_row}>
        <div
          className={Styles.list_title}
        >{`[${item.category}] ${item.title}`}</div>
        {item.isHot ? <div className={Styles.list_title_hot}>HOT!</div> : ""}
      </div>
      <div className={Styles.list_likes}>
        {typeof likes != "string" ? (
          <DisplayLikes
            onLike={onLike}
            likes={likes}
            setOnLike={setOnLike}
            user={user}
            item={item}
            type="recipe"
          />
        ) : (
          ""
        )}
        <div className={Styles.like_span}>
          <InsertCommentOutlinedIcon
            className={Styles.comment_icon}
            fontSize={"large"}
          />
          {comments}
        </div>
      </div>
    </div>
  );
};
export default RecipeItem;
