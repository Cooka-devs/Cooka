import { User } from "@/types";
import { ChefItem } from "../ChefItem";
import { CounselingItem } from "../CounselingList/CounselingItem";
import PlaceItem from "../PlaceList/PlaceItem";
import RecipeItem from "../RecipeList/RecipeItem";
import Styles from "./index.module.css";

interface BestItemsProps {
  title: string;
  items: any[];
  user?: User;
}

const BestItems = ({ title, items, user }: BestItemsProps) => {
  return (
    <div className={Styles.main_item}>
      <div style={{ fontWeight: "700" }}>{title}</div>
      <div className={Styles.bestcontainer}>
        {items.map((item, index) => {
          switch (title) {
            case "화제의 레시피":
              return <RecipeItem item={item} user={user} key={index} />;
            case "인기 쉐프":
              return <ChefItem item={item} key={index} />;
            case "화제의 고민":
              return <CounselingItem item={item} user={user} key={index} />;
            case "화제의 맛집":
              return <PlaceItem item={item} user={user} key={index} />;
          }
        })}
      </div>
    </div>
  );
};

export default BestItems;
