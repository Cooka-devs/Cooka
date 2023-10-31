import { Recipe, User } from "@/types";
import RecipeItem from "./RecipeItem";
import Styles from "./index.module.css";
import { searchUser } from "@/api/getCurrentUser";
import { useEffect, useState } from "react";
export interface RecipeListProps {
  item: Recipe[];
}

const RecipeList = ({ item }: RecipeListProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const getU = await searchUser();
      await setUser(getU);
    };
    fetch();
  }, []);

  return (
    <div className={Styles.list_container}>
      {item.map((item, index) => {
        return (
          <RecipeItem key={`${index}-${item.title}`} item={item} user={user} />
        );
      })}
    </div>
  );
};

export default RecipeList;
