import Styles from "./index.module.css";
import { Divider } from "@/components";
import getComments from "@/utilities/getComments";
import ShowComment from "@/components/ShowComment";
import { useEffect, useState } from "react";
import { Comment, PlaceProps, User } from "@/types";
import { useRouter } from "next/router";
import { searchUser } from "@/api/getCurrentUser";
import { MakeComment } from "@/components/MakeComment";
import Modal from "@/components/Modal";
import { WantLoginModalText } from "@/components/WantLoginModalText";
import { WantDeleteList } from "@/components/WantDeleteList";
import CreateList from "@/components/CreateList";
import { ListModify } from "@/components/ListModify";
import { getPostById } from "@/api/getPostById";
import AniButton from "@/components/AniButton";
import GetUser from "@/utilities/GetUser";

const PlaceDetail = () => {
  const [post, setPost] = useState<PlaceProps | undefined>();
  const [comments, setComments] = useState<Comment[]>();
  const [user, setUser] = useState<null | User>(null);
  const [inputComment, setInputComment] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
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
      const getPost = await getPostById(result, "place");
      setPost(getPost as PlaceProps | undefined);
    };
    getP();

    const getC = async () => {
      const comments = await getComments(result, "place");
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
        <div className={Styles.place_itemdetail}>
          {deleteModal ? (
            <Modal
              closeModal={closeDeleteModal}
              content={
                <WantDeleteList
                  closeModal={setDeleteModal}
                  id={post.id}
                  type="place"
                />
              }
            />
          ) : (
            ""
          )}
          <div className={Styles.title}>
            <span>{`[${post?.category}]`}</span>
            <span style={{ paddingLeft: "1rem" }}>{`${post?.title}`}</span>
            {!!user && user.nickname === post.writer ? (
              <span
                style={{
                  position: "absolute",
                  right: "0",
                  top: "1rem",
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <AniButton
                  style={{ fontSize: "1.5rem", fontFamily: "SUITE-Regular" }}
                  onClick={() => setDeleteModal(true)}
                >
                  ❌글삭제
                </AniButton>
                <AniButton
                  style={{ fontSize: "1.5rem", fontFamily: "SUITE-Regular" }}
                  onClick={() => setModify(true)}
                >
                  ❗글수정
                </AniButton>
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
          <Divider weight="1.5px" color="#7e7b7b" />
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{ marginBottom: "15rem" }}
            className={Styles.content}
          />
          <Divider weight="1.5px" color="#7e7b7b" />
          <textarea
            placeholder="댓글을 입력하세요!"
            className={Styles.comment_input_text}
            onChange={(e) => {
              setInputComment(e.target.value);
            }}
          />
          <div className={Styles.input_comment}>
            <AniButton
              className={Styles.input_commentbtn}
              onClick={async () => {
                if (!!user) {
                  await MakeComment({
                    type: "place",
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
            </AniButton>
          </div>
          {comments ? <ShowComment comments={comments} type="place" /> : ""}
        </div>
      ) : post && modify ? (
        <ListModify modifyType="place" post={post} />
      ) : (
        <div className={Styles.recipe_itemdetail}>
          이미 삭제된 글이거나, 글을 찾을 수 없습니다.
        </div>
      )}
    </div>
  );
};
export default PlaceDetail;
