import { PlaceProps, Recipe, User } from "@/types";
import Styles from "./index.module.css";
import { EditDeleteBtn } from "../EditDeleteBtn";
import { RouteUserPosts } from "../RouteUserPosts";
import { NextRouter } from "next/router";
interface PostHeaderProps {
  post: Recipe | PlaceProps;
  user: null | User;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModify: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  router: NextRouter;
}
export const PostHeader = ({
  post,
  user,
  setDeleteModal,
  setModify,
  type,
  router,
}: PostHeaderProps) => {
  return (
    <>
      <div className={Styles.title}>
        <span>{`[${post?.category}]`}</span>
        <span style={{ paddingLeft: "1rem" }}>{`${post?.title}`}</span>
        <EditDeleteBtn
          user={user}
          post={post}
          setDelete={setDeleteModal}
          setModify={setModify}
        />
      </div>
      <div
        style={{ paddingTop: "1rem", color: "gray" }}
        onClick={() => RouteUserPosts({ writer: post.writer, type, router })}
      >
        작성자 : {post.writer}
      </div>
      <div className={Styles.list_day}>
        <div style={{ color: "gray" }}>{post.created_at}</div>
      </div>
    </>
  );
};
