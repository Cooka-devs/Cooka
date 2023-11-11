import DefaultAxiosService from "@/service/DefaultAxiosService";

export const deleteCommentList = async (type: string, id: number) => {
  try {
    await DefaultAxiosService.instance.delete(`/${type}/${id}`);
  } catch (e) {
    console.log("err:", e);
  }
};
