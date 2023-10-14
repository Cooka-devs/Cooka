import DefaultAxiosService from "@/service/DefaultAxiosService";
import { CsItem, PlaceProps, Recipe } from "@/types";

export const getPostById = async (id: string, type: string) => {
  const number = Number(id);
  if (type === "recipe") {
    const data = await DefaultAxiosService.instance.get(`/recipe/${number}`);
    return data.data.data[0];
  } else if (type === "place") {
    const data = await DefaultAxiosService.instance.get(`/place/${number}`);
    return data.data.data[0];
  } else if (type === "counseling") {
    const data = await DefaultAxiosService.instance.get(
      `/counseling/${number}`
    );
    return data.data.data[0];
  }
};
