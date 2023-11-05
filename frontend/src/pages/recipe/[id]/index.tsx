import Styles from "./index.module.css";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { Comment, Recipe, User } from "@/types";
import { useRouter } from "next/router";
import { Divider } from "@/components";
import getComments from "@/utilities/getComments";
import ShowComment from "@/components/ShowComment";
import Modal from "@/components/Modal";
import { WantLoginModalText } from "@/components/WantLoginModalText";
import { MakeComment } from "@/components/MakeComment";
import { WantDeleteList } from "@/components/WantDeleteList";
import { ListModify } from "@/components/ListModify";
import { getPostById } from "@/api/getPostById";
import AniButton from "@/components/AniButton";
import GetUser from "@/utilities/GetUser";
import { EditDeleteBtn } from "@/components/EditDeleteBtn";
import NoData from "@/components/NoData";
import { PostDetailWithComments } from "@/components/PostDetailWithComments";
import { PostHeader } from "@/components/PostHeader";

const RecipeDetail = () => {
  const [post, setPost] = useState<Recipe>();
  const [comments, setComments] = useState<Comment[]>();
  const [user, setUser] = useState<null | User>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [inputComment, setInputComment] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [modify, setModify] = useState<boolean>(false);
  const router = useRouter();

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };
  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    if (!router.isReady || router.query.id === undefined) return;
    const id = router.query.id;
    const result = id as string;
    const getP = async () => {
      const getPost = await getPostById(result, "recipe");
      setPost(getPost as Recipe | undefined);
    };
    getP();
    const getC = async () => {
      const comments = await getComments(result, "recipe");
      setComments(comments);
    };
    getC();

    GetUser(setUser);
  }, [router.isReady, router.query]);

  return (
    <div>
      {modal ? (
        <Modal
          closeModal={closeModal}
          content={<WantLoginModalText closeModal={setModal} />}
        />
      ) : (
        ""
      )}
      {post && !modify ? (
        <div className={Styles.recipe_itemdetail}>
          {deleteModal ? (
            <Modal
              closeModal={closeDeleteModal}
              content={
                <WantDeleteList
                  closeModal={setDeleteModal}
                  id={post.id}
                  type="recipe"
                />
              }
            />
          ) : (
            ""
          )}
          <PostHeader
            user={user}
            post={post}
            setDeleteModal={setDeleteModal}
            setModify={setModify}
          />
          <PostDetailWithComments
            post={post}
            setInputComment={setInputComment}
            inputComment={inputComment}
            router={router}
            user={user}
            setModal={setModal}
            comments={comments}
            type="recipe"
          />
        </div>
      ) : post && modify ? (
        <div>
          <ListModify modifyType="recipe" post={post} />
        </div>
      ) : (
        <NoData paddingLeft="50rem" fontSize="2rem" />
      )}
    </div>
  );
};
export default RecipeDetail;
