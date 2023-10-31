import DefaultAxiosService from "@/service/DefaultAxiosService";

interface PostCommentProps {
  type: string;
  content: string;
  writer?: string;
  postId?: number;
}
export const postComment = ({
  type,
  content,
  writer,
  postId,
}: PostCommentProps) => {
  DefaultAxiosService.instance
    .post(`${type}_comment`, {
      content,
      writer,
      postId,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
