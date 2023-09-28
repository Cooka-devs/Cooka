import Styles from "./index.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Comment, CsItem, User } from "@/types";
import useGetComments from "@/utilities/getComments";
import ShowComment from "@/components/ShowComment";
import { useGetPost } from "@/utilities/getPost";
import { MakeComment } from "@/components/MakeComment";
import Modal from "@/components/Modal";
import { WantLoginModalText } from "@/components/WantLoginModalText";
import { searchUser } from "@/api/getCurrentUser";
import DefaultAxiosService from "@/service/DefaultAxiosService";
import { WantDeleteList } from "@/components/WantDeleteList";
import { ListModify } from "@/components/ListModify";
const CounselingDetail = () => {
  const [post, setPost] = useState<CsItem>();
  const [modal, setModal] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>();
  const [inputComment, setInputComment] = useState<string>("");
  const [user, setUser] = useState<undefined | User>();
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
    const id = router.query.id;
    const result = id as string;

    const getP = async () => {
      const getPost = await useGetPost(result, "counseling");
      setPost(getPost as CsItem | undefined);
    };
    getP();

    const getC = async () => {
      const getComments = await useGetComments(result, "counseling");
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
        <div className={Styles.cs_itemdetail}>
          {deleteModal ? (
            <Modal
              closeModal={closeDeleteModal}
              content={
                <WantDeleteList
                  closeModal={setDeleteModal}
                  id={post.id}
                  type="counseling"
                />
              }
            />
          ) : (
            ""
          )}
          <h1>{post.title}</h1>
          <div className={Styles.detail_name}>
            <div>{post.writer}</div>
            <div>|</div>
            <div>
              <span>{post.created_at}</span>
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
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className={Styles.detail_content}
          />
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
                    type: "counseling",
                    text: inputComment,
                    postId: post.id,
                    nickName: user.nickname,
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
          {comments ? <ShowComment comments={comments} /> : ""}
        </div>
      ) : post && modify ? (
        <div>
          <ListModify modifyType="counseling" post={post} />
        </div>
      ) : (
        <div className={Styles.cs_itemdetail}>
          이미 삭제된 글이거나, 글을 찾을 수 없습니다.
        </div>
      )}
    </div>
  );
};
export default CounselingDetail;
