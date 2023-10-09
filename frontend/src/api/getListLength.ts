import DefaultAxiosService from "@/service/DefaultAxiosService";

export const getListLength = async (type: string, nickname?: string) => {
  try {
    const result = await DefaultAxiosService.instance.get(`/${type}_num`, {
      params: { nickname },
    });
    return result.data.data[0].count;
  } catch (err) {
    console.log(err);
  }
};
