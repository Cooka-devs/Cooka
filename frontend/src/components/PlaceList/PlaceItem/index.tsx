import Styles from "./index.module.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { PlaceProps, User } from "@/types";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import DefaultAxiosService from "@/service/DefaultAxiosService";
import { DisplayLikes } from "@/components/DisplayLikes";
interface Place {
  item: PlaceProps;
  user: User | undefined;
}
const PlaceItem = ({ item, user }: Place) => {
  const [likes, setLikes] = useState<number | string>("최초실행방지");
  const [onLike, setOnLike] = useState<boolean>(false);
  const [comments, setComments] = useState<number>(0);
  const router = useRouter();
  useEffect(() => {
    const getLikesNum = async () => {
      await DefaultAxiosService.instance
        .get(`/place_likes_num/${item.id}`)
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
        .get(`/place_comment_num/${item.id}`)
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
        onClick={() => router.push({ pathname: `/place/${item.id}` })}
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
            type="place"
          />
        ) : (
          ""
        )}
        <div className={Styles.like_span}>
          <InsertCommentOutlinedIcon
            className={Styles.like_icon}
            fontSize={"large"}
          />
          {comments}
        </div>
      </div>
    </div>
  );
};
export default PlaceItem;
