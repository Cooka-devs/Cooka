import { CsItem, User } from "@/types";
import Styles from "./index.module.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import DefaultAxiosService from "@/service/DefaultAxiosService";
import { DisplayLikes } from "@/components/DisplayLikes";
import ListItem from "@/components/ListItem";
import { set } from "lodash";
import Modal from "@/components/Modal";
import { WantLoginModalText } from "@/components/WantLoginModalText";

interface CounselingItemProp {
  item: CsItem;
  user: User | null;
}

export const CounselingItem = ({ item, user }: CounselingItemProp) => {
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
        .get(`/counseling_likes_num/${item.id}`)
        .then((res) => {
          setLikes(res.data.data.count);
        });
    };
    getLikesNum();
  }, [item.id, onLike]);

  useEffect(() => {
    const getCommentsNum = async () => {
      await DefaultAxiosService.instance
        .get(`/counseling_comment_num/${item.id}`)
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
        onClick={() => router.push({ pathname: `/counseling/${item.id}` })}
      >
        <div className={Styles.csitem}>
          <div className={Styles.item_date}>{item.created_at}</div>
          <div className={Styles.item_title}>{item.title}</div>
          <div className={Styles.item_likes}>
            <DisplayLikes
              onLike={onLike}
              likes={likes}
              setOnLike={setOnLike}
              setLikesNum={setLikes}
              user={user}
              item={item}
              type="counseling"
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
        </div>
      </ListItem>
    </>
  );
};
