import DefaultAxiosService from "@/service/DefaultAxiosService";
import { CsItem, PlaceProps, Recipe, User } from "@/types";
interface GetMyLikesProps {
  user: User;
  setRecipe: React.Dispatch<React.SetStateAction<Recipe[] | undefined>>;
  setPlace: React.Dispatch<React.SetStateAction<PlaceProps[] | undefined>>;
  setCs: React.Dispatch<React.SetStateAction<CsItem[] | undefined>>;
}
export const getMyLikes = async ({
  user,
  setRecipe,
  setPlace,
  setCs,
}: GetMyLikesProps) => {
  DefaultAxiosService.instance.get(`/recipe/${user.id}`).then((res) => {
    setRecipe(res.data.data);
  });
  DefaultAxiosService.instance.get(`/place/${user.id}`).then((res) => {
    setPlace(res.data.data);
  });
  DefaultAxiosService.instance.get(`/counseling/${user.id}`).then((res) => {
    setCs(res.data.data);
  });
};