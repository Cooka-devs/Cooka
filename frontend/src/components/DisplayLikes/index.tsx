import DefaultAxiosService from "@/service/DefaultAxiosService";
import Styles from "./index.module.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useEffect, useState } from "react";
import { CsItem, PlaceProps, Recipe, User } from "@/types";
interface DisplayLikesProps {
  onLike: boolean;
  likes: number;
  setOnLike: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | undefined;
  item: Recipe | PlaceProps | CsItem;
  type: string;
}
export const DisplayLikes = ({
  onLike,
  likes,
  setOnLike,
  user,
  item,
  type,
}: DisplayLikesProps) => {
  const [likesNum, setLikesNum] = useState<number>(likes);
  useEffect(() => {
    //해당유저가 좋아요를 눌렀는지 확인하기위함
    if (user) {
      const getLikes = async () => {
        await DefaultAxiosService.instance
          .get(`/${type}_likes`, {
            params: { userId: user.id, postId: item.id },
          })
          .then(async (res) => {
            if (res.data.data.length > 0) {
              await setOnLike(true);
            } else {
              await setOnLike(false);
            }
          });
      };
      getLikes();
    }
  }, [onLike]);
  return (
    <div
      className={Styles.like_span}
      onClick={async (e) => {
        if (user) {
          console.log(user);
          e.stopPropagation();
          if (onLike) {
            await DefaultAxiosService.instance
              .delete(`/${type}_likes`, {
                params: { userId: user.id, postId: item.id },
              })
              .then((res) => {
                console.log(res);
                setLikesNum((prev) => prev - 1);
                setOnLike(false);
              });
          } else {
            await DefaultAxiosService.instance
              .post(`/${type}_likes`, {
                userId: user.id,
                postId: item.id,
              })
              .then((res) => {
                console.log(res);
                setLikesNum((prev) => prev + 1);
                setOnLike(true);
              });
          }
        } else {
          console.log(user);
        }
      }}
    >
      {onLike ? (
        <ThumbUpOffAltIcon className={Styles.like_on} fontSize={"large"} />
      ) : (
        <ThumbUpOffAltIcon className={Styles.like_off} fontSize={"large"} />
      )}
      <div className={Styles.likes_num}>{likesNum}</div>
    </div>
  );
};
