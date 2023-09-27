import Styles from "./index.module.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { PlaceProps } from "@/types";
import { useRouter } from "next/router";
interface Place {
  item: PlaceProps;
}
const PlaceItem = ({ item }: Place) => {
  const router = useRouter();
  return (
    <div
      className={Styles.list_item}
      onClick={() => router.push({ pathname: `/place/${item.id}` })}
    >
      <img src={item.imgSrc} alt={item.imgAlt} />
      <div className={Styles.list_date}>{item.created_at}</div>
      <div className={Styles.list_title_row}>
        <div
          className={Styles.list_title}
        >{`[${item.category}] ${item.title}`}</div>
        {item.isHot ? <div className={Styles.list_title_hot}>HOT!</div> : ""}
      </div>
      <div className={Styles.list_likes}>
        <div className={Styles.like_span}>
          <ThumbUpOffAltIcon className={Styles.like_icon} fontSize={"large"} />
          {item.likes}
        </div>
        <div className={Styles.like_span}>
          <InsertCommentOutlinedIcon
            className={Styles.like_icon}
            fontSize={"large"}
          />
        </div>
      </div>
    </div>
  );
};
export default PlaceItem;
