import RecipeList from "@/components/RecipeList";
import { CreateRecipe } from "@/components";
import { useEffect, useState } from "react";
import Styles from "./index.module.css";
import MakeRecipeButton from "./MakeRecipeButton";
const RECIPELIST = [
  {
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "한우 된장찌개!",
    category: "한식",
    likes: 0,
    comments: 0,
    isHot: true,
  },
  {
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
  },
  {
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
    isHot: true,
  },
  {
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
    isHot: false,
  },
  {
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
    isHot: true,
  },
  {
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
  },
  {
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
  },
  {
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
  },
  {
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
  },
];

interface Recipe {
  imgSrc: string;
  imgAlt: string;
  title: string;
  likes: number;
  comments: number;
  category: string;
}
console.log(RECIPELIST[0]);
export default function RecipePage() {
  const [onRecipe, setOnRecipe] = useState(false);
  const [list, setList] = useState<Recipe[]>([]);

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
    <div className={Styles.recipe_container}>
      <div className={Styles.recipe_left}>
        {onRecipe ? <CreateRecipe /> : <RecipeList items={list} />}
      </div>
      <div className={Styles.recipe_right}>
        <div className={Styles.recipe_right_make}>
          {onRecipe ? (
            <div onClick={() => listRecipe()}>돌아가기</div>
          ) : (
            <MakeRecipeButton onClick={makeRecipe} />
          )}
        </div>
      </div>
    </div>
  );
}
