import DefaultAxiosService from "@/service/DefaultAxiosService";

interface getListLengthProps {
  writer: string;
  setRNum: React.Dispatch<React.SetStateAction<number>>;
  setPNum: React.Dispatch<React.SetStateAction<number>>;
  setCNum: React.Dispatch<React.SetStateAction<number>>;
}
export const getListLength = async ({
  writer,
  setRNum,
  setPNum,
  setCNum,
}: getListLengthProps) => {
  if (!writer) return;
  const recipeLength = await DefaultAxiosService.instance.get(`/recipe_num`, {
    params: { nickname: writer },
  });
  const placeLength = await DefaultAxiosService.instance.get(`/place_num`, {
    params: { nickname: writer },
  });
  const counselingLength = await DefaultAxiosService.instance.get(
    `/counseling_num`,
    {
      params: { nickname: writer },
    }
  );
  setRNum(recipeLength.data.data[0].count);
  setPNum(placeLength.data.data[0].count);
  setCNum(counselingLength.data.data[0].count);
};
