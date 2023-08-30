import Styles from "./index.module.css";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useState } from "react";
interface PageMoveProps {
  totalPosts: number;
  postsPerPage: number;
  pageMove: any;
  currentPage: number;
}
const CommentsPageMove = ({
  totalPosts,
  postsPerPage,
  pageMove,
  currentPage,
}: PageMoveProps) => {
  const pageNumbers: number[] = [];
  const cutPageNumber = 5; // pagemove 에서 보여줄 목록페이지수
  const [cutPage, setCutPage] = useState(0); //총페이지수를 순서대로 cutPageNumber수만큼 보여주기위해 slice시 사용될 변수
  const [checkPage, setCheckPage] = useState(1); // 최대,최소 페이지를 찾기위한 변수
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const HandleClickPrev = () => {
    setCutPage((prev) => prev - cutPageNumber);
    setCheckPage((prev) => prev - 1);
    pageMove(cutPage - cutPageNumber + 5);
  };
  const HandleClickNext = () => {
    setCutPage((prev) => prev + cutPageNumber);
    setCheckPage((prev) => prev + 1);
    pageMove(cutPage + cutPageNumber + 1);
  };
  return (
    <div className={Styles.movepage}>
      <button
        onClick={() => HandleClickPrev()}
        disabled={cutPage === 0 ? true : false}
        className={cutPage === 0 ? Styles.btn_item_none : Styles.btn_item}
      >
        <KeyboardDoubleArrowLeftIcon
          style={{ width: "3rem", height: "3rem", paddingTop: "0.5rem" }}
        />
      </button>
      {pageNumbers
        .slice(cutPage, cutPage + cutPageNumber)
        .map((number, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                pageMove(number);
              }}
              className={
                number === currentPage ? Styles.btn_active : Styles.btn_item
              }
            >
              {number}
            </button>
          );
        })}
      <button
        className={
          pageNumbers.length / cutPageNumber <= checkPage
            ? Styles.btn_item_none
            : Styles.btn_item
        }
        onClick={() => HandleClickNext()}
        disabled={
          pageNumbers.length / cutPageNumber <= checkPage ? true : false
        }
      >
        <KeyboardDoubleArrowRightIcon
          style={{ width: "3rem", height: "3rem", paddingTop: "0.5rem" }}
        />
      </button>
    </div>
  );
};
export default CommentsPageMove;
