import { CsItem, User } from "@/types";
import Styles from "./index.module.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import DefaultAxiosService from "@/service/DefaultAxiosService";
import { DisplayLikes } from "@/components/DisplayLikes";
interface CounselingItemProp {
  item: CsItem;
  user: User | undefined;
}
export const CounselingItem = ({ item, user }: CounselingItemProp) => {
  const [likes, setLikes] = useState<number | string>("최초실행방지");
  const [onLike, setOnLike] = useState<boolean>(false);
  const [comments, setComments] = useState<number>(0);
  const router = useRouter();
  useEffect(() => {
    const getLikesNum = async () => {
      await DefaultAxiosService.instance
        .get(`/counseling_likes_num/${item.id}`)
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
        .get(`/counseling_comment_num/${item.id}`)
        .then((res) => {
          setComments(res.data.data.count);
        });
    };
    getCommentsNum();
  }, []);
  return (
    <div
      className={Styles.csitem}
      onClick={() => {
        router.push({ pathname: `/counseling/${item.id}` });
      }}
    >
      <div className={Styles.item_date}>{item.created_at}</div>
      <div className={Styles.item_title}>{item.title}</div>
      <div className={Styles.item_likes}>
        {typeof likes != "string" ? (
          <DisplayLikes
            onLike={onLike}
            likes={likes}
            setOnLike={setOnLike}
            user={user}
            item={item}
            type="counseling"
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
