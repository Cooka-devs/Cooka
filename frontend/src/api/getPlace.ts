import DefaultAxiosService from "@/service/DefaultAxiosService";

export const getPlace = async () => {
  try {
    const result = await DefaultAxiosService.instance.get("/place");
    return result.data.data;
  } catch (err) {
    console.log(err);
  }
};
