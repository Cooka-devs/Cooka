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
    switch (type) {
      case "counseling":
        DefaultAxiosService.instance
          .post("counseling_comment", {
            content: textReplace,
            writer: nickName,
            postId: postId,
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        break;
      case "recipe":
        DefaultAxiosService.instance
          .post("recipe_comment", {
            content: textReplace,
            writer: nickName,
            postId: postId,
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        break;
      case "place":
        DefaultAxiosService.instance
          .post("place_comment", {
            content: textReplace,
            writer: nickName,
            postId: postId,
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        break;
    }
  } else if (apiRequestType === "put") {
    switch (type) {
      case "counseling":
        DefaultAxiosService.instance
          .put(`counseling_comment/${id}`, {
            content: textReplace,
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        break;
      case "recipe":
        DefaultAxiosService.instance
          .put(`recipe_comment/${id}`, {
            content: textReplace,
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        break;
      case "place":
        DefaultAxiosService.instance
          .put(`place_comment/${id}`, {
            content: textReplace,
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        break;
    }
  }
};
