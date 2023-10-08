import DefaultAxiosService from "@/service/DefaultAxiosService";

export const getListLength = async (type: string) => {
  try {
    const result = await DefaultAxiosService.instance.get(`/${type}_num`);
    return result.data.data;
  } catch (err) {
    console.log(err);
  }
};
