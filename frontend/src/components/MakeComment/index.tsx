import DefaultAxiosService from "@/service/DefaultAxiosService";
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
  if (apiRequestType === "post") {
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
  } else if (apiRequestType === "put") {
    if (type === "counseling") {
      DefaultAxiosService.instance
        .put(`counseling_comment/${id}`, {
          content: textReplace,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else if (type === "recipe") {
      DefaultAxiosService.instance
        .put(`recipe_comment/${id}`, {
          content: textReplace,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else if (type === "place") {
      DefaultAxiosService.instance
        .put(`place_comment/${id}`, {
          content: textReplace,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }
};
