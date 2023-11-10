import Styles from "./index.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Comment, CsItem, User } from "@/types";
import getComments from "@/utilities/getComments";
import ShowComment from "@/components/ShowComment";
import { MakeComment } from "@/components/MakeComment";
import Modal from "@/components/Modal";
import { WantLoginModalText } from "@/components/WantLoginModalText";
import { searchUser } from "@/api/getCurrentUser";
import DefaultAxiosService from "@/service/DefaultAxiosService";
import { WantDeleteList } from "@/components/WantDeleteList";
import { ListModify } from "@/components/ListModify";
import { getPostById } from "@/api/getPostById";
import AniButton from "@/components/AniButton";
import GetUser from "@/utilities/GetUser";
import { EditDeleteBtn } from "@/components/EditDeleteBtn";
import NoData from "@/components/NoData";
import { PostDetailWithComments } from "@/components/PostDetailWithComments";
import { RouteUserPosts } from "@/components/RouteUserPosts";
const CounselingDetail = () => {
  const [post, setPost] = useState<CsItem>();
  const [modal, setModal] = useState(false);
  const [comments, setComments] = useState<Comment[]>();
  const [inputComment, setInputComment] = useState("");
  const [user, setUser] = useState<null | User>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modify, setModify] = useState(false);
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
      const getPost = await getPostById(result, "counseling");
      setPost(getPost as CsItem | undefined);
    };
    getP();

    const getC = async () => {
      const comments = await getComments(result, "counseling");
      setComments(comments);
    };
    getC();

    GetUser(setUser);
  }, [router.isReady, router.query.id]);

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
            <div
              onClick={() =>
                RouteUserPosts({
                  writer: post.writer,
                  type: "counseling",
                  router,
                })
              }
            >
              {post.writer}
            </div>
            <div>|</div>
            <div>
              <span>{post.created_at}</span>
              <EditDeleteBtn
                user={user}
                post={post}
                setDelete={setDeleteModal}
                setModify={setModify}
              />
            </div>
          </div>
          <PostDetailWithComments
            post={post}
            setInputComment={setInputComment}
            inputComment={inputComment}
            router={router}
            user={user}
            setModal={setModal}
            comments={comments}
            type="counseling"
          />
        </div>
      ) : post && modify ? (
        <div>
          <ListModify modifyType="counseling" post={post} />
        </div>
      ) : (
        <NoData paddingLeft="50rem" fontSize="2rem" />
      )}
    </div>
  );
};
export default CounselingDetail;
