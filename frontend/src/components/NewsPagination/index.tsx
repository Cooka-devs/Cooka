import Styles from "./index.module.css";
import { NewItem } from "@/types";

interface NewsItemsProps {
  items: NewItem[];
}
interface NewsItemProps {
  item: NewItem;
}
export const NewsItem = ({ item }: NewsItemProps) => {
  return (
    <a
      href={item.url}
      className={Styles.flex_column}
      key={`${item.created_at} ${item.title}`}
    >
      <div className={Styles.column_img}>
        <img src={item.imgSrc} alt={item.imgAlt} />
      </div>
      <div className={Styles.column_title}>
        <div>{item.title}</div>
        <div style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
          {item.created_at}
        </div>
      </div>
    </a>
  );
};
const NewsPagination = ({ items }: NewsItemsProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "2rem",
        flexWrap: "wrap",
        padding: "1rem",
      }}
    >
      {items &&
        items.map((newsitem, index) => {
          return <NewsItem item={newsitem} key={index} />;
        })}
    </div>
  );
};
export default NewsPagination;
