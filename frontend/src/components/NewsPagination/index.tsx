import Styles from "./index.module.css";

export interface NewItem {
  imgSrc: string;
  imgArt: string;
  title: string;
  url: string;
  date: string;
}

interface NewsItemsProps {
  items: NewItem[];
}
const NewsPagination = ({ items }: NewsItemsProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "2rem",
        flexWrap: "wrap",
      }}
    >
      {items &&
        items.map((newsitem, index) => {
          return (
            <a href={newsitem.url} className={Styles.flex_column} key={index}>
              <div className={Styles.column_img}>
                <img src={newsitem.imgSrc} alt={newsitem.imgArt} />
              </div>
              <div className={Styles.column_title}>
                <div>{newsitem.title}</div>
                <div style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
                  {newsitem.date}
                </div>
              </div>
            </a>
          );
        })}
    </div>
  );
};
export default NewsPagination;
