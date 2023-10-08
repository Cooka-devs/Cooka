import RecipeList from "@/components/RecipeList";
import RecipePageMove from "@/components/RecipePageMove";
import CreateList from "@/components/CreateList";
import { useEffect, useState } from "react";
import Styles from "./index.module.css";
import MakeRecipeButton from "@/components/MakeRecipeButton";
import { Recipe, User } from "@/types";
import { searchUser } from "@/api/getCurrentUser";
import Modal from "@/components/Modal";
import { WantLoginModalText } from "@/components/WantLoginModalText";
import { getReipce } from "@/api/getRecipe";
import { getListLength } from "@/api/getListLength";
export default function RecipePage() {
  const [listLength, setListLength] = useState<number>(0); //레시피 리스트 길이
  const [modal, setModal] = useState<boolean>(false);
  const [onRecipe, setOnRecipe] = useState(false);
  const [list, setList] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const [user, setUser] = useState<undefined | User>();
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
  const closeModal = () => {
    setModal(false);
  };

  const makeRecipe = () => {
    if (user != undefined) {
      setOnRecipe(true);
    } else {
      setModal(true);
    }
  };
  const listRecipe = () => {
    setOnRecipe(false);
  };
  useEffect(() => {}, [currentPage]);
  useEffect(() => {
    const getRecipeList = async () => {
      const getList = await getReipce();
      console.log("getRecipe Result:", getList);
      await setList(getList);
    };
    getRecipeList();

    const fetch = async () => {
      const getU = await searchUser();
      setUser(getU);
    };
    fetch();
    const getRecipeListLength = async () => {
      const recipeListLength = await getListLength("recipe"); //데이터의 갯수를 받아옴
      setListLength(recipeListLength);
    };
    getRecipeListLength();
  }, []);

  return (
    <div>
      {modal ? (
        <Modal
          closeModal={closeModal}
          content={<WantLoginModalText closeModal={setModal} />}
        />
      ) : (
        ""
      )}
      <div className={Styles.recipe_container}>
        <div className={Styles.recipe_left}>
          {onRecipe ? (
            <CreateList textType="recipe" />
          ) : (
            <>
              <RecipeList item={CurrentPost(list)} />
              <RecipePageMove
                totalPosts={listLength}
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
