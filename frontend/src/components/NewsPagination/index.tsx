import Styles from "./index.module.css";
import { NewItem } from "@/types";

interface NewsItemsProps {
  items: NewItem[];
}
export const NewsItem = (item: NewItem) => {
  return (
    <a
      href={item.url}
      className={Styles.flex_column}
      key={`${item.date} ${item.title}`}
    >
      <div className={Styles.column_img}>
        <img src={item.imgSrc} alt={item.imgArt} />
      </div>
      <div className={Styles.column_title}>
        <div>{item.title}</div>
        <div style={{ fontSize: "1.2rem", marginTop: "1rem" }}>{item.date}</div>
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
        items.map((newsitem) => {
          return NewsItem(newsitem);
        })}
    </div>
  );
};
export default NewsPagination;
