import RecipeList from "@/components/RecipeList";
import RecipePageMove from "@/components/RecipePageMove";
import CreateList from "@/components/CreateList";
import { useEffect, useState } from "react";
import Styles from "./index.module.css";
import MakeRecipeButton from "@/components/MakeRecipeButton";
export const RECIPELIST = [
  {
    id: 1,
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "한우 된장찌개!",
    category: "한식",
    likes: 0,
    comments: 0,
    isHot: true,
    recipe: "<p>만드는법 : 잘</p> ",
    date: "2023-08-30",
    writer: "승휘",
  },
  {
    id: 2,
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
    recipe: "",
    date: "2023-08-30",
    writer: "승휘",
  },
  {
    id: 3,
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
    isHot: true,
    recipe: "",
    date: "2023-08-30",
    writer: "승휘",
  },
  {
    id: 4,
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
    isHot: false,
    recipe: "",
    date: "2023-08-30",
    writer: "승휘",
  },
  {
    id: 5,
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
    isHot: true,
    recipe: "",
    date: "2023-08-30",
    writer: "승휘",
  },
  {
    id: 6,
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
    recipe: "",
    date: "2023-08-30",
    writer: "승휘",
  },
  {
    id: 7,
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
    recipe: "",
    date: "2023-08-30",
    writer: "승휘",
  },
  {
    id: 8,
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
    recipe: "",
    date: "2023-08-30",
    writer: "승휘",
  },
  {
    id: 9,
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
    recipe: "",
    date: "2023-08-30",
    writer: "승휘",
  },
  {
    id: 10,
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
    recipe: "",
    date: "2023-08-30",
    writer: "승휘",
  },
  {
    id: 11,
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
    recipe: "",
    date: "2023-08-30",
    writer: "승휘",
  },
  {
    id: 12,
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
    recipe: "",
    date: "2023-08-30",
    writer: "승휘",
  },
  {
    id: 13,
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
    recipe: "",
    date: "2023-08-30",
    writer: "승휘",
  },
  {
    id: 14,
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
    recipe: "",
    date: "2023-08-30",
    writer: "승휘",
  },
  {
    id: 15,
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
    recipe: "",
    date: "2023-08-30",
    writer: "승휘",
  },
  {
    id: 16,
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
    recipe: "",
    date: "2023-08-30",
    writer: "승휘",
  },
  {
    id: 17,
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
    recipe: "",
    date: "2023-08-30",
    writer: "승휘",
  },
  {
    id: 18,
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
    recipe: "",
    date: "2023-08-30",
    writer: "승휘",
  },
  {
    id: 19,
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
    recipe: "",
    date: "2023-08-30",
    writer: "승휘",
  },
  {
    id: 20,
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
    imgAlt: "recipelist",
    title: "김치볶음밥!",
    category: "한식",
    likes: 0,
    comments: 0,
    recipe: "",
    date: "2023-08-30",
    writer: "승휘",
  },
];

export interface Recipe {
  id: number;
  imgSrc: string;
  imgAlt: string;
  title: string;
  likes: number;
  comments: number;
  category: string;
  recipe: string;
  date: string;
  writer: string;
}
console.log(RECIPELIST[0]);
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
