import DefaultAxiosService from "@/service/DefaultAxiosService";
import { Comment } from "@/types";

const getComments = async (id: string, type: string) => {
  const result = Number(id);
  let comment: Comment[] = [];
  switch (type) {
    case "counseling":
      comment = await DefaultAxiosService.instance
        .get(`counseling_comment/${result}`)
        .then((res) => res.data.data);
      return comment;
    case "recipe":
      comment = await DefaultAxiosService.instance
        .get(`recipe_comment/${result}`)
        .then((res) => res.data.data);
      return comment;
    case "place":
      comment = await DefaultAxiosService.instance
        .get(`place_comment/${result}`)
        .then((res) => res.data.data);
      return comment;
  }
};

export default getComments;
