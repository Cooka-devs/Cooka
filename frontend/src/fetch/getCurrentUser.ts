import DefaultAxiosService from "@/service/DefaultAxiosService";
import { CurrentUserProps } from "@/types";
import { useState, useEffect } from "react";
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
