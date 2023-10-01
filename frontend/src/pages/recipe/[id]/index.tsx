import Styles from "./index.module.css";
import { useEffect, useState } from "react";
import { Comment, Recipe, User } from "@/types";
import { useRouter } from "next/router";
import { Divider } from "@/components";
import useGetComments from "@/utilities/getComments";
import ShowComment from "@/components/ShowComment";
import { useGetPost } from "@/utilities/getPost";
import { searchUser } from "@/api/getCurrentUser";
import Modal from "@/components/Modal";
import { WantLoginModalText } from "@/components/WantLoginModalText";
import { MakeComment } from "@/components/MakeComment";
import { WantDeleteList } from "@/components/WantDeleteList";
import { ListModify } from "@/components/ListModify";
const RecipeDetail = () => {
  const [post, setPost] = useState<Recipe>();
  const [comments, setComments] = useState<Comment[]>();
  const [user, setUser] = useState<undefined | User>();
  const [modal, setModal] = useState<boolean>(false);
  const [inputComment, setInputComment] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [modify, setModify] = useState<boolean>(false);
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };
  const closeModal = () => {
    setModal(false);
  };
  const router = useRouter();
  useEffect(() => {
    const id = router.query.id;
    const result = id as string;
    const getP = async () => {
      const getPost = await useGetPost(result, "recipe");
      console.log(getPost);
      setPost(getPost as Recipe | undefined);
    };
    getP();
    const getC = async () => {
      const getComments = await useGetComments(result, "recipe");
      setComments(getComments);
    };
    getC();

    const fetch = async () => {
      const getU = await searchUser();
      setUser(getU);
    };
    fetch();
  }, [router.query.id]);
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
          <div className={Styles.title}>
            <span>{`[${post?.category}]`}</span>
            <span style={{ paddingLeft: "1rem" }}>{`${post?.title}`}</span>
            {user && user.nickname === post.writer ? (
              <span
                style={{
                  position: "absolute",
                  right: "0",
                  top: "1rem",
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <button
                  style={{ fontSize: "1.5rem", fontFamily: "SUITE-Regular" }}
                  onClick={() => setDeleteModal(true)}
                >
                  ❌글삭제
                </button>
                <button
                  style={{ fontSize: "1.5rem", fontFamily: "SUITE-Regular" }}
                  onClick={() => setModify(true)}
                >
                  ❗글수정
                </button>
              </span>
            ) : (
              ""
            )}
          </div>
          <div style={{ paddingTop: "1rem", color: "gray" }}>
            작성자 : {post.writer}
          </div>
          <div className={Styles.list_likes}>
            <div style={{ color: "gray" }}>{post.created_at}</div>
          </div>
          <Divider />
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{ marginBottom: "10rem" }}
            className={Styles.content}
          />
          <Divider />
          <textarea
            placeholder="댓글을 입력하세요!"
            className={Styles.comment_input_text}
            onChange={(e) => {
              setInputComment(e.target.value);
            }}
          />
          <div className={Styles.input_comment}>
            <button
              className={Styles.input_commentbtn}
              onClick={async () => {
                if (user) {
                  await MakeComment({
                    type: "recipe",
                    text: inputComment,
                    postId: post.id,
                    nickName: user.nickname,
                    apiRequestType: "post",
                  });
                  router.reload();
                } else {
                  setModal(true);
                }
              }}
            >
              입력완료
            </button>
          </div>
          {comments ? <ShowComment comments={comments} type="recipe" /> : ""}
        </div>
      ) : post && modify ? (
        <div>
          <ListModify modifyType="recipe" post={post} />
        </div>
      ) : (
        <div className={Styles.recipe_itemdetail}>
          이미 삭제된 글이거나, 글을 찾을 수 없습니다.
        </div>
      )}
    </div>
  );
};
export default RecipeDetail;
