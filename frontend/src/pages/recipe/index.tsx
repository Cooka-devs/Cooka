import RecipeList from "@/components/RecipeList";
import RecipePageMove from "@/components/RecipePageMove";
import CreateList from "@/components/CreateList";
import { useEffect, useState } from "react";
import Styles from "./index.module.css";
import MakeRecipeButton from "@/components/MakeRecipeButton";
import { Recipe } from "@/types";
import { RECIPELIST } from "@/data";
export default function RecipePage() {
  const [onRecipe, setOnRecipe] = useState(false);
  const [list, setList] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const itemnum = 9; //페이지당 출력될 item 수
  const indexOfLast = currentPage * itemnum; //slice할때 마지막item 순서
  const indexOfFirst = indexOfLast - itemnum; // slice할때 첫item순서

  const CurrentPost = (post: Recipe[]) => {
    let currentPosts: Recipe[] = [];
    if (post != undefined) {
      currentPosts = post.slice(indexOfFirst, indexOfLast);
    }
    return currentPosts;
  };
  const makeRecipe = () => {
    setOnRecipe(true);
  };
  const listRecipe = () => {
    setOnRecipe(false);
  };

  useEffect(() => {
    setList(RECIPELIST); // TODO => 서버에서 들어오는 데이터로 바꾸기
  }, []);

  return (
    <div>
      <div className={Styles.recipe_container}>
        <div className={Styles.recipe_left}>
          {onRecipe ? (
            <CreateList textType="recipe" />
          ) : (
            <>
              <RecipeList items={CurrentPost(list)} />
              <RecipePageMove
                totalPosts={list.length}
                postsPerPage={itemnum}
                pageMove={setCurrentPage}
                currentPage={currentPage}
              />
            </>
          )}
        </div>
        <div className={Styles.recipe_right}>
          <div className={Styles.recipe_right_make}>
            {onRecipe ? (
              <button
                onClick={() => listRecipe()}
                className={Styles.goback_btn}
              >
                <div style={{ fontSize: "2rem", fontWeight: "700" }}>
                  돌아가기
                </div>
                <div style={{ fontSize: "1.5rem", paddingTop: "1rem" }}>
                  레시피공유 페이지로
                  <br />
                  돌아갈께요.
                </div>
              </button>
            ) : (
              <MakeRecipeButton onClick={makeRecipe} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
