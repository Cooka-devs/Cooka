import { searchUser } from "@/api/getCurrentUser";
import { User } from "@/types";

const GetUser = async (
  set: React.Dispatch<React.SetStateAction<User | null>>
) => {
  const getU = await searchUser();
  set(getU);
};
export default GetUser;
