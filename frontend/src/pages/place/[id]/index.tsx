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
import { EditDeleteBtn } from "@/components/EditDeleteBtn";
import NoData from "@/components/NoData";
import { PostDetailWithComments } from "@/components/PostDetailWithComments";
import { PostHeader } from "@/components/PostHeader";

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
          <PostHeader
            post={post}
            user={user}
            setDeleteModal={setDeleteModal}
            setModify={setModify}
            type="place"
            router={router}
          />
          <PostDetailWithComments
            post={post}
            setInputComment={setInputComment}
            inputComment={inputComment}
            router={router}
            user={user}
            setModal={setModal}
            comments={comments}
            type="place"
          />
        </div>
      ) : post && modify ? (
        <ListModify modifyType="place" post={post} />
      ) : (
        <NoData paddingLeft="50rem" fontSize="2rem" />
      )}
    </div>
  );
};
export default PlaceDetail;
