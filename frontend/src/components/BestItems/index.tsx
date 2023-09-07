import { Divider } from "..";
import Styles from "./index.module.css";

interface BestItemsProps {
  title: string;
  items: {
    imgSrc: string;
    imgAlt: string;
    itemTitle: string;
    likes?: number;
    views?: number;
  }[];
}
//title이 화제의 레시피일때 , 인기쉐프, 화제의고민, 화제의맛집일때를
//나눠서 if (title==="??") => 클릭시 content detail 까지 연결
//인기쉐프 이미지는 해당user 프로필img를 등록시 나오게 없을시 지정이미지 출력
const BestItems = ({ title, items }: BestItemsProps) => {
  return (
    <div className={Styles.main_item}>
      <div style={{ fontWeight: "700" }}>{title}</div>
      <Divider />
      <div className={Styles.bestcontainer}>
        {items.map((item, index) => {
          return (
            <div className={Styles.bestcontainer_item} key={index}>
              <img src={item.imgSrc} alt={item.imgAlt} />
              <div>{item.itemTitle}</div>
              {item?.likes && item?.views && (
                <div>{`${item.likes}/${item.views}`}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BestItems;
