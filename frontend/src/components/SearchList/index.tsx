import CounselingList from "../CounselingList";
import NewsPagination, { NewsItem } from "../NewsPagination";
import NoData from "../NoData";
import PlaceList from "../PlaceList";
import RecipeList from "../RecipeList";

interface SearchListProps {
  type: string;
  list: any;
}
const SearchList = ({ type, list }: SearchListProps) => {
  switch (type) {
    case "recipe":
      if (list && list.length) {
        return <RecipeList item={list} />;
      } else {
        return <NoData paddingLeft="1rem" />;
      }
    case "place":
      if (list && list.length) {
        return <PlaceList items={list} />;
      } else {
        return <NoData paddingLeft="1rem" />;
      }
    case "counseling":
      if (list && list.length) {
        return <CounselingList items={list} />;
      } else {
        return <NoData paddingLeft="1rem" />;
      }
    case "news":
      if (list && list.length) {
        return <NewsPagination items={list} />;
      } else {
        return <NoData paddingLeft="1rem" />;
      }
  }
};
export default SearchList;
