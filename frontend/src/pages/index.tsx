import { Button, Divider } from "@/components";
import Styles from "./index.module.css";
import BestItems from "@/components/BestItems";

const CONTAINERS = [
  [
    {
      title: "화제의 레시피",
      items: [
        {
          id: 1,
          imgSrc:
            "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
          imgAlt: "bestcontent",
          itemTitle: "한우 된장찌개!",
          likes: 0,
          views: 0,
          recipe: "",
        },
        {
          id: 2,
          imgSrc:
            "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
          imgAlt: "bestcontent",
          itemTitle: "한우 된장찌개!",
          likes: 0,
          views: 0,
          recipe: "",
        },
        {
          id: 3,
          imgSrc:
            "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
          imgAlt: "bestcontent",
          itemTitle: "한우 된장찌개!",
          likes: 0,
          views: 0,
          recipe: "",
        },
        {
          id: 4,
          imgSrc:
            "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
          imgAlt: "bestcontent",
          itemTitle: "한우 된장찌개!",
          likes: 0,
          views: 0,
          recipe: "",
        },
      ],
    },
  ],
  [
    {
      title: "인기 쉐프",
      items: [
        {
          id: 0,
          imgSrc: "nonuser.webp",
          imgAlt: "bestcontent",
          itemTitle: "쉐프",
        },
        {
          id: 0,
          imgSrc: "nonuser.webp",
          imgAlt: "bestcontent",
          itemTitle: "쉐프",
        },
        {
          id: 0,
          imgSrc: "nonuser.webp",
          imgAlt: "bestcontent",
          itemTitle: "쉐프",
        },
        {
          id: 0,
          imgSrc: "nonuser.webp",
          imgAlt: "bestcontent",
          itemTitle: "쉐프",
        },
      ],
    },
  ],
  [
    {
      title: "화제의 고민",
      items: [
        {
          id: 0,
          content: "개봉한 파스타소스 유통기한?",
        },
        {
          id: 1,
          content: "개봉한 파스타소스 유통기한?",
        },
      ],
    },
    {
      title: "화제의 맛집",
      items: [
        {
          id: 0,
          imgSrc:
            "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220216_86%2F16450062673229pD9x_JPEG%2FScreenshot_20220216-184157_NAVER.jpg",
          imgAlt: "bestcontent",
          itemTitle: "오늘 와인한잔",
        },
        {
          id: 1,
          imgSrc:
            "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230428_91%2F1682638709082udtMM_JPEG%2FIMG_20230423_234810_923.jpg",
          imgAlt: "bestcontent",
          itemTitle: "정육점 김씨",
        },
      ],
    },
  ],
];

export default function Home() {
  return (
    <div className={Styles.main}>
      <div className={Styles.main_container}>
        <div className={Styles.main_item}>
          <div className={Styles.main_ad}>
            <div className={Styles.main_ad_item}>ad1</div>
            <div className={Styles.main_ad_item}>ad2</div>
            <div className={Styles.main_ad_item}>ad3</div>
          </div>
        </div>
        <div className={Styles.best_container}>
          {CONTAINERS.map((bestItem, index) => {
            return (
              <div className={Styles.flex_row} key={index}>
                {bestItem.map((item, index) => {
                  return (
                    <BestItems
                      title={item.title}
                      items={item.items}
                      key={index}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
