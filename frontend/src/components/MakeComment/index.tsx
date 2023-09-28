import DefaultAxiosService from "@/service/DefaultAxiosService";
interface MakeCommentProps {
  type: string;
  text: string;
  postId: number;
  nickName: string;
}
export const MakeComment = async ({
  type,
  text,
  postId,
  nickName,
}: MakeCommentProps) => {
  const textReplace = text.replace(/(?:\r\n|\r|\n)/g, "<br />");
  if (type === "counseling") {
    DefaultAxiosService.instance
      .post("counseling_comment", {
        content: textReplace,
        writer: nickName,
        postId: postId,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  } else if (type === "recipe") {
    DefaultAxiosService.instance
      .post("recipe_comment", {
        content: textReplace,
        writer: nickName,
        postId: postId,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  } else if (type === "place") {
    DefaultAxiosService.instance
      .post("place_comment", {
        content: textReplace,
        writer: nickName,
        postId: postId,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
};
