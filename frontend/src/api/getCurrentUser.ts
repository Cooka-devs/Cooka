import DefaultAxiosService from "@/service/DefaultAxiosService";
import { User } from "@/types";
import axios from "axios";

export const getCurrentUser = async () => {
  try {
    const response = await DefaultAxiosService.instance.get("/");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const searchUser = async (): Promise<User> => {
  const getU = await getCurrentUser(); //세션을통해 user id를 알아냄
  const getUser = await DefaultAxiosService.instance.post(
    // user id로 해당 유저의 정보를 가져옴
    "/pw",
    { login_id: getU.user_Id, social_id: getU.user_SocialId }
  );
  const userData = getUser.data[0];
  return userData;
};
