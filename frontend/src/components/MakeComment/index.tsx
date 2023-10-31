import { postComment } from "@/api/postComment";
import { updateComment } from "@/api/updateComment";
import { COMMENTTYPE } from "@/constants";

interface MakeCommentProps {
  type: string;
  text: string;
  postId?: number;
  nickName?: string;
  apiRequestType: string;
  id?: number;
}

export const MakeComment = async ({
  type,
  text,
  postId,
  nickName,
  apiRequestType,
  id,
}: MakeCommentProps) => {
  const textReplace = text.replace(/(?:\r\n|\r|\n)/g, "<br />");
  COMMENTTYPE.map((item) => {
    if (item === type && apiRequestType === "post") {
      postComment({
        type,
        content: textReplace,
        writer: nickName,
        postId: postId,
      });
    } else if (item === type && apiRequestType === "put") {
      updateComment({
        type,
        content: textReplace,
        id: id,
      });
    }
  });
};
