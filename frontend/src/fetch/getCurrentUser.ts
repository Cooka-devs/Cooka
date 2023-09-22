import DefaultAxiosService from "@/service/DefaultAxiosService";
import { CurrentUserProps, User } from "@/types";
import { useState, useEffect } from "react";
import axios from "axios";
export const getCurrentUser = async () => {
  try {
    const response = await DefaultAxiosService.instance.get(
      `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:8000/`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const searchUser = async (): Promise<User> => {
  const getU = await getCurrentUser(); //세션을통해 user id를 알아냄
  const getUser = await axios.post(
    // user id로 해당 유저의 정보를 가져옴
    `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:8000/pw`,
    { login_id: getU.user_Id }
  );
  const userData = getUser.data[0];
  return userData;
};
