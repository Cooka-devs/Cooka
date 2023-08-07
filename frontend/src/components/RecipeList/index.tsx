import RecipeItem from "./RecipeItem";
import Styles from "./index.module.css";
interface RecipeListProps {
  items: {
    imgSrc: string;
    imgAlt: string;
    title: string;
    likes: number;
    comments: number;
    category: string;
  }[];
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
