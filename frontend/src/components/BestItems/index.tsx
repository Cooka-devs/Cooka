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
