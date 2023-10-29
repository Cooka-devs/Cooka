import DefaultAxiosService from "@/service/DefaultAxiosService";
import { User } from "@/types";

interface SearchUserDataProps {
  user: User;
  set: React.Dispatch<React.SetStateAction<any>>;
  page: number;
  size: number;
  type: string;
}

const SearchUserData = async ({
  user,
  set,
  page,
  size,
  type,
}: SearchUserDataProps) => {
  try {
    const result = await DefaultAxiosService.instance.get(
      `/list/${type}?page=${page}&size=${size}`,
      { params: { nickname: user.nickname } }
    );
    console.log(result);
    set(result.data.data);
  } catch (err) {
    console.log(err);
  }
};
export default SearchUserData;
