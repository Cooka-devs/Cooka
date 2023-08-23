import { Recipe } from "@/pages/recipe";
import RecipeItem from "./RecipeItem";
import Styles from "./index.module.css";

interface RecipeListProps {
  items: Recipe[];
}

const RecipeList = ({ items }: RecipeListProps) => {
  return (
    <div className={Styles.list_container}>
      {items.map((item, index) => {
        return <RecipeItem key={`${index}-${item.title}`} item={item} />;
      })}
    </div>
  );
};

export default RecipeList;
