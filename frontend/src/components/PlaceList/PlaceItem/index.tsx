import { DisplayLikes } from "@/components/DisplayLikes";
import ListItem from "@/components/ListItem";
import DefaultAxiosService from "@/service/DefaultAxiosService";
import { PlaceProps, User } from "@/types";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Styles from "./index.module.css";
import Modal from "@/components/Modal";
import { WantLoginModalText } from "@/components/WantLoginModalText";

interface Place {
  item: PlaceProps;
  user: User | null;
}
const PlaceItem = ({ item, user }: Place) => {
  const [likes, setLikes] = useState(0);
  const [onLike, setOnLike] = useState(false);
  const [comments, setComments] = useState(0);
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const onClickCloseModal = () => {
    setModal(false);
  };
  useEffect(() => {
    const getLikesNum = async () => {
      await DefaultAxiosService.instance
        .get(`/place_likes_num/${item.id}`)
        .then((res) => {
          setLikes(res.data.data.count);
        });
    };
    getLikesNum();
  }, [item.id, onLike]);

  useEffect(() => {
    const getCommentsNum = async () => {
      await DefaultAxiosService.instance
        .get(`/place_comment_num/${item.id}`)
        .then((res) => {
          setComments(res.data.data.count);
        });
    };
    getCommentsNum();
  }, [item.id]);

  return (
    <>
      {modal ? (
        <Modal
          closeModal={onClickCloseModal}
          content={<WantLoginModalText closeModal={setModal} />}
        />
      ) : (
        ""
      )}
      <ListItem
        imgProps={{
          src: item.imgSrc,
          alt: item.imgAlt,
          className: Styles.list_img,
          onClick: () => router.push({ pathname: `/place/${item.id}` }),
        }}
      >
        <div className={Styles.list_date}>{item.created_at}</div>
        <div className={Styles.list_title_row}>
          <div
            className={Styles.list_title}
          >{`[${item.category}] ${item.title}`}</div>
          {item.isHot ? <div className={Styles.list_title_hot}>HOT!</div> : ""}
        </div>
        <div className={Styles.list_likes}>
          <DisplayLikes
            onLike={onLike}
            likes={likes}
            setOnLike={setOnLike}
            setLikesNum={setLikes}
            user={user}
            item={item}
            type="place"
            setModal={setModal}
          />
          <div className={Styles.like_span}>
            <InsertCommentOutlinedIcon
              className={Styles.like_icon}
              fontSize={"large"}
            />
            {comments}
          </div>
        </div>
      </ListItem>
    </>
  );
};
export default PlaceItem;
