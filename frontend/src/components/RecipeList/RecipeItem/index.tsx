import { DisplayLikes } from "@/components/DisplayLikes";
import ListItem from "@/components/ListItem";
import DefaultAxiosService from "@/service/DefaultAxiosService";
import { Recipe, User } from "@/types";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Styles from "./index.module.css";
import Modal from "@/components/Modal";
import { WantLoginModalText } from "@/components/WantLoginModalText";
export interface RecipeItemProps {
  item: Recipe;
  user: User | null;
}

const RecipeItem = ({ item, user }: RecipeItemProps) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0); //댓글의 갯수
  const [onLike, setOnLike] = useState(false); // 내가좋아요를 눌렀는지 여부
  const [modal, setModal] = useState(false);
  const onClickCloseModal = () => {
    setModal(false);
  };
  const router = useRouter();

  useEffect(() => {
    const getLikesNum = async () => {
      await DefaultAxiosService.instance
        .get(`/recipe_likes_num/${item.id}`)
        .then((res) => {
          setLikes(res.data.data.count);
        });
    };
    getLikesNum();
  }, [item.id, onLike]);

  useEffect(() => {
    const getCommentsNum = async () => {
      await DefaultAxiosService.instance
        .get(`/recipe_comment_num/${item.id}`)
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
          onClick: () => router.push({ pathname: `/recipe/${item.id}` }),
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
            type="recipe"
            setModal={setModal}
          />
          <div className={Styles.like_span}>
            <InsertCommentOutlinedIcon
              className={Styles.comment_icon}
              fontSize={"large"}
            />
            {comments}
          </div>
        </div>
      </ListItem>
    </>
  );
};
export default RecipeItem;
