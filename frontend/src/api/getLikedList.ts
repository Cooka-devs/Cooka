import DefaultAxiosService from "@/service/DefaultAxiosService";
import { User } from "@/types";

interface GetLikedListProp {
  type: string;
  user: User;
  set: React.Dispatch<React.SetStateAction<number>>;
}
export const getLikedList = ({ type, user, set }: GetLikedListProp) => {
  DefaultAxiosService.instance
    .get(`/${type}_likes_num/${user.id}`, {
      params: { id: user.id, user: true },
    })
    .then((res) => {
      console.log(res.data.data.count);
      set(res.data.data.count);
    });
};
