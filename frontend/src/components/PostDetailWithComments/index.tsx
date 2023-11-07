import { Comment, CsItem, PlaceProps, Recipe, User } from "@/types";
import Styles from "./index.module.css";
import AniButton from "../AniButton";
import { MakeComment } from "../MakeComment";
import { NextRouter } from "next/router";
import ShowComment from "../ShowComment";
import { Divider } from "..";
import parse from "html-react-parser";
import { replaceImage } from "@/utilities/replaceImage";

interface PostDetailWithCommentsProps {
  post: CsItem | Recipe | PlaceProps;
  setInputComment: React.Dispatch<React.SetStateAction<string>>;
  inputComment: string;
  user: User | null;
  router: NextRouter;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  comments: Comment[] | undefined;
  type: string;
}
export const PostDetailWithComments = ({
  post,
  setInputComment,
  inputComment,
  user,
  router,
  setModal,
  comments,
  type,
}: PostDetailWithCommentsProps) => {
  return (
    <>
      <Divider weight="1.5px" color="#7e7b7b" />
      <div className={Styles.content}>
        <div
          dangerouslySetInnerHTML={{
            __html: parse(post.content, replaceImage),
          }}
          style={{ padding: "0", marginBottom: "15rem" }}
          className="ql-editor"
        />
      </div>
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
                type,
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
      {comments ? <ShowComment comments={comments} type={type} /> : ""}
    </>
  );
};
