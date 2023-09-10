import { CsItem } from "@/types";
import Styles from "./index.module.css";
import { useRouter } from "next/router";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
interface CsItemProps {
  items: CsItem[];
}

const CounselingList = ({ items }: CsItemProps) => {
  const router = useRouter();
  return (
    <div className={Styles.cslist}>
      {items.map((item, index) => {
        return (
          <div
            className={Styles.csitem}
            key={index}
            onClick={() => {
              router.push({ pathname: `/counseling/${item.id}` });
            }}
          >
            <div className={Styles.item_date}>{item.date}</div>
            <div className={Styles.item_title}>{item.title}</div>
            <div className={Styles.item_likes}>
              <div className={Styles.like_span}>
                <ThumbUpOffAltIcon
                  className={Styles.like_icon}
                  fontSize={"large"}
                />
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
      })}
    </div>
  );
};
export default CounselingList;
