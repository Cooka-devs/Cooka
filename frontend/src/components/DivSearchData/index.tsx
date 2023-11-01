import { LeftButton, RightButton } from "../Button";
import SearchList from "../SearchList";
import Styles from "./index.module.css";
interface DivSearchDataProps {
  listNum: number;
  size: number;
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  list: any;
  title: string;
  type: string;
}
const DivSearchData = ({
  listNum,
  size,
  pageNum,
  setPageNum,
  list,
  title,
  type,
}: DivSearchDataProps) => {
  return (
    <div className={Styles.result_category}>
      <RightButton
        listLength={listNum}
        itemNum={size}
        pageNum={pageNum}
        setPageNum={setPageNum}
      />
      <LeftButton pageNum={pageNum} setPageNum={setPageNum} />
      <div className={Styles.title}>{title}</div>
      <SearchList type={type} list={list} />
    </div>
  );
};
export default DivSearchData;
