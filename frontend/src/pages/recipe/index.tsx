import RecipeList from "@/components/RecipeList";
import CreateRecipe from "../createRecipe";
import { useState } from "react";
import Styles from "./index.module.css";

export default function RecipePage() {
  const [onRecipe, setOnRecipe] = useState(false);

  const makeRecipe = () => {
    setOnRecipe(true);
  };
  const listRecipe = () => {
    setOnRecipe(false);
  };
  return (
    <div className={Styles.recipe_container}>
      <div className={Styles.recipe_left}>
        {onRecipe ? <CreateRecipe ondelete={listRecipe} /> : <RecipeList />}
      </div>
      <div className={Styles.recipe_right}>
        <div className={Styles.recipe_right_make}>
          <div onClick={() => makeRecipe()}>작성하기</div>
          <div style={{ fontSize: "1.5rem" }}>레시피를 작성해보세요!</div>
        </div>
      </div>
    </div>
  );
}
