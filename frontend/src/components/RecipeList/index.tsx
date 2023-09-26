import { Recipe } from "@/types";
import RecipeItem from "./RecipeItem";
import Styles from "./index.module.css";

export interface RecipeListProps {
  item: Recipe[];
}

const RecipeList = ({ item }: RecipeListProps) => {
  return (
    <div className={Styles.list_container}>
      {item.map((item, index) => {
        return <RecipeItem key={`${index}-${item.title}`} item={item} />;
      })}
    </div>
  );
};

export default RecipeList;
