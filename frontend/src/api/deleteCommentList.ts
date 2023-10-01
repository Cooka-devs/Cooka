import DefaultAxiosService from "@/service/DefaultAxiosService";

export const deleteCommentList = async (type: string, id: number) => {
  console.log("id in deletecommentList:", id);
  try {
    await DefaultAxiosService.instance
      .delete(`/${type}/${id}`)
      .then((res) => console.log(res));
  } catch (e) {
    console.log("err:", e);
  }
};
