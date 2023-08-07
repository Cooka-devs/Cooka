import { Button, Divider } from "@/components";
import Styles from "./index.module.css";
import BestItems from "@/components/BestItems";

const CONTAINERS = [
  [
    {
      title: "화제의 레시피",
      items: [
        {
          imgSrc:
            "https://cdn.pixabay.com/photo/2023/06/15/17/07/sun-8066051_640.jpg",
          imgAlt: "bestcontent",
          itemTitle: "요리제목",
          likes: 0,
          views: 0,
        },
        {
          imgSrc:
            "https://cdn.pixabay.com/photo/2023/06/15/17/07/sun-8066051_640.jpg",
          imgAlt: "bestcontent",
          itemTitle: "요리제목",
          likes: 0,
          views: 0,
        },
        {
          imgSrc:
            "https://cdn.pixabay.com/photo/2023/06/15/17/07/sun-8066051_640.jpg",
          imgAlt: "bestcontent",
          itemTitle: "요리제목",
          likes: 0,
          views: 0,
        },
        {
          imgSrc:
            "https://cdn.pixabay.com/photo/2023/06/15/17/07/sun-8066051_640.jpg",
          imgAlt: "bestcontent",
          itemTitle: "요리제목",
          likes: 0,
          views: 0,
        },
      ],
    },
  ],
  [
    {
      title: "인기 쉐프",
      items: [
        {
          imgSrc:
            "https://cdn.pixabay.com/photo/2023/06/15/17/07/sun-8066051_640.jpg",
          imgAlt: "bestcontent",
          itemTitle: "쉐프",
        },
        {
          imgSrc:
            "https://cdn.pixabay.com/photo/2023/06/15/17/07/sun-8066051_640.jpg",
          imgAlt: "bestcontent",
          itemTitle: "쉐프",
        },
        {
          imgSrc:
            "https://cdn.pixabay.com/photo/2023/06/15/17/07/sun-8066051_640.jpg",
          imgAlt: "bestcontent",
          itemTitle: "쉐프",
        },
        {
          imgSrc:
            "https://cdn.pixabay.com/photo/2023/06/15/17/07/sun-8066051_640.jpg",
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
          imgSrc:
            "https://cdn.pixabay.com/photo/2023/06/15/17/07/sun-8066051_640.jpg",
          imgAlt: "bestcontent",
          itemTitle: "고민",
        },
        {
          imgSrc:
            "https://cdn.pixabay.com/photo/2023/06/15/17/07/sun-8066051_640.jpg",
          imgAlt: "bestcontent",
          itemTitle: "고민",
        },
      ],
    },
    {
      title: "화제의 맛집",
      items: [
        {
          imgSrc:
            "https://cdn.pixabay.com/photo/2023/06/15/17/07/sun-8066051_640.jpg",
          imgAlt: "bestcontent",
          itemTitle: "맛집",
        },
        {
          imgSrc:
            "https://cdn.pixabay.com/photo/2023/06/15/17/07/sun-8066051_640.jpg",
          imgAlt: "bestcontent",
          itemTitle: "맛집",
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
            {/* <img
          src="https://img.etnews.com/photonews/2007/1321919_20200721151233_568_0001.jpg"
          className={Styles.main_ad_item}
          alt="ad1"
        /> */}
            <div className={Styles.main_ad_item}>ad2</div>
            <div className={Styles.main_ad_item}>ad3</div>
            <Button>하이</Button>
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
