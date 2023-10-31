import DefaultAxiosService from "@/service/DefaultAxiosService";

interface UpdateCommentProps {
  id?: number;
  content: string;
  type: string;
}
export const updateComment = ({ id, content, type }: UpdateCommentProps) => {
  DefaultAxiosService.instance
    .put(`${type}_comment/${id}`, {
      content,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
