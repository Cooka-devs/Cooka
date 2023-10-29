import { searchUser } from "@/api/getCurrentUser";
import { getListByPage } from "@/api/getListByPage";
import { getListLength } from "@/api/getListLength";
import AniButton from "@/components/AniButton";
import CreateList from "@/components/CreateList";
import ListPageMove from "@/components/ListPageMove";
import MakeRecipeButton from "@/components/MakeRecipeButton";
import Modal from "@/components/Modal";
import RecipeList from "@/components/RecipeList";
import { WantLoginModalText } from "@/components/WantLoginModalText";
import { Recipe, User } from "@/types";
import { useCallback, useEffect, useState } from "react";
import Styles from "./index.module.css";

const itemnum = 9; //페이지당 출력될 item 수

export default function RecipePage() {
  const [listLength, setListLength] = useState(0); //리스트 길이
  const [modal, setModal] = useState(false);
  const [onRecipe, setOnRecipe] = useState(false);
  const [list, setList] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const [user, setUser] = useState<User>();

  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

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

  useEffect(() => {
    getListByPage({
      page: currentPage,
      size: itemnum,
      setList: setList,
      type: "recipe",
    });
  }, [currentPage]);

  useEffect(() => {
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
              <RecipeList item={list} />
              <ListPageMove
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
              <AniButton onClick={listRecipe} className={Styles.goback_btn}>
                <div style={{ fontSize: "2rem", fontWeight: "700" }}>
                  돌아가기
                </div>
                <div style={{ fontSize: "1.5rem", paddingTop: "1rem" }}>
                  레시피공유 페이지로
                  <br />
                  돌아갈께요.
                </div>
              </AniButton>
            ) : (
              <MakeRecipeButton onClick={makeRecipe} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
