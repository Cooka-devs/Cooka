import Styles from "./index.module.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { PlaceProps } from "@/pages/place";
interface Place {
  item: PlaceProps;
}
const PlaceItem = ({ item }: Place) => {
  return (
    <div className={Styles.list_item}>
      <img src={item.imgSrc} alt={item.imgAlt} />
      <div className={Styles.list_date}>{item.date}</div>
      <div className={Styles.list_title_row}>
        <div className={Styles.list_title}>{item.title}</div>
        {item.isHot && <div className={Styles.list_title_hot}>HOT!</div>}
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
          {item.comments}
        </div>
      </div>
    </div>
  );
};
export default PlaceItem;
