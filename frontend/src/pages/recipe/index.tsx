import { getListByPage } from "@/api/getListByPage";
import { getListLength } from "@/api/getListLength";
import CreateList from "@/components/CreateList";
import MakeRecipeButton from "@/components/MakeRecipeButton";
import Modal from "@/components/Modal";
import { WantLoginModalText } from "@/components/WantLoginModalText";
import { Recipe, User } from "@/types";
import { useCallback, useEffect, useState } from "react";
import Styles from "./index.module.css";
import GetUser from "@/utilities/GetUser";
import { DivDataByLength } from "@/components/DivDataByLength";
import { CancelPostButton } from "@/components/CancelPostButton";
const ITEMNUM = 9; //페이지당 출력될 item 수

export default function RecipePage() {
  const [listLength, setListLength] = useState(0); //리스트 길이
  const [modal, setModal] = useState(false);
  const [onRecipe, setOnRecipe] = useState(false);
  const [list, setList] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const [user, setUser] = useState<User | null>(null);

  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

  const makeRecipe = () => {
    if (!!user) {
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
      size: ITEMNUM,
      setList: setList,
      type: "recipe",
    });
  }, [currentPage]);

  useEffect(() => {
    GetUser(setUser);
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
            <DivDataByLength
              list={list}
              listLength={listLength}
              size={ITEMNUM}
              pageMove={setCurrentPage}
              currentPage={currentPage}
              type="recipe"
            />
          )}
        </div>
        <div className={Styles.recipe_right}>
          <div className={Styles.recipe_right_make}>
            {onRecipe ? (
              <CancelPostButton set={setOnRecipe} text="레시피공유" />
            ) : (
              <MakeRecipeButton onClick={makeRecipe} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
