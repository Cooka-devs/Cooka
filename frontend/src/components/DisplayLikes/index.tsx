import DefaultAxiosService from "@/service/DefaultAxiosService";
import { CsItem, PlaceProps, Recipe, User } from "@/types";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useEffect } from "react";
import Styles from "./index.module.css";

interface DisplayLikesProps {
  onLike: boolean;
  likes: number;
  setOnLike: React.Dispatch<React.SetStateAction<boolean>>;
  setLikesNum: React.Dispatch<React.SetStateAction<number>>;
  user: User | null;
  item: Recipe | PlaceProps | CsItem;
  type: string;
}

export const DisplayLikes = ({
  onLike,
  likes,
  setOnLike,
  setLikesNum,
  user,
  item,
  type,
}: DisplayLikesProps) => {
  useEffect(() => {
    //해당유저가 좋아요를 눌렀는지 확인하기위함
    console.log("좋아요에서의 바깥user:", user);
    if (user) {
      console.log("좋아요에서의 안user:", user);
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
  }, [item.id, setOnLike, type, user]);

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
      <div className={Styles.likes_num}>{likes}</div>
    </div>
  );
};
