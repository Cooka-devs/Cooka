import DefaultAxiosService from "@/service/DefaultAxiosService";

export const getCounseling = async () => {
  try {
    const result = await DefaultAxiosService.instance.get("/counseling");
    return result.data.data;
  } catch (err) {
    console.log(err);
  }
};
