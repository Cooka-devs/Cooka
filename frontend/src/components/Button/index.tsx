import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Styles from "./index.module.css";
interface RightButtonProps {
  listLength: number;
  itemNum: number;
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
}
interface LeftButtonProps {
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
}
export const RightButton = ({
  listLength,
  itemNum,
  pageNum,
  setPageNum,
}: RightButtonProps) => {
  return (
    <button
      style={{
        display: listLength / itemNum <= pageNum ? "none" : "inline-block",
      }}
      onClick={() => {
        setPageNum((prev) => prev + 1);
      }}
      className={Styles.arrow_right}
    >
      <ArrowForwardIosIcon className={Styles.arrowbtn} />
    </button>
  );
};
export const LeftButton = ({ pageNum, setPageNum }: LeftButtonProps) => {
  return (
    <button
      style={{
        display: pageNum === 1 ? "none" : "inline-block",
      }}
      className={Styles.arrow_left}
      onClick={() => {
        setPageNum((prev) => prev - 1);
      }}
    >
      <ArrowBackIosNewIcon className={Styles.arrowbtn} />
    </button>
  );
};
