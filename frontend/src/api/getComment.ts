import DefaultAxiosService from "@/service/DefaultAxiosService";
interface GetCommentProp {
  type: string;
}
export const getComment = async ({ type }: GetCommentProp) => {
  if (type === "recipe") {
    try {
      const result = await DefaultAxiosService.instance.get("/recipe_comment");
      return result.data.data;
    } catch (err) {
      console.log(err);
    }
  } else if (type === "place") {
    try {
      const result = await DefaultAxiosService.instance.get("/place_comment");
      return result.data.data;
    } catch (err) {
      console.log(err);
    }
  } else if (type === "counseling") {
    try {
      const result = await DefaultAxiosService.instance.get(
        "/counseling_comment"
      );
      return result.data.data;
    } catch (err) {
      console.log(err);
    }
  }
};
