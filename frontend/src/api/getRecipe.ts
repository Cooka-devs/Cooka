import DefaultAxiosService from "@/service/DefaultAxiosService";

export const getReipce = async () => {
  try {
    const result = await DefaultAxiosService.instance.get("/recipe");
    return result.data.data;
  } catch (err) {
    console.log(err);
  }
};
