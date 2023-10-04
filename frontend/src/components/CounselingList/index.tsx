import { CsItem, User } from "@/types";
import Styles from "./index.module.css";
import { CounselingItem } from "./CounselingItem";
interface CsItemProps {
  items: CsItem[];
  user: User | undefined;
}

const CounselingList = ({ items, user }: CsItemProps) => {
  return (
    <div className={Styles.cslist}>
      {items.map((item, index) => {
        return <CounselingItem item={item} user={user} key={index} />;
      })}
    </div>
  );
};
export default CounselingList;
