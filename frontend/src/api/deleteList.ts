import DefaultAxiosService from "@/service/DefaultAxiosService";
export const onClickDeleteList = async (id: number, type: string) => {
  try {
    await DefaultAxiosService.instance.delete(`/${type}/${id}`).then((res) => {
      console.log(res);
    });
  } catch (e) {
    console.log("err:", e);
  }
};
