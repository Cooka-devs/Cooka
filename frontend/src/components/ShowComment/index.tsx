import { useState } from "react";
import { Comment } from "@/types";
import Styles from "./index.module.css";
import CommentsPageMove from "../CommentsPageMove";
interface ShowCommentProp {
  comments: Comment[];
}
const ShowComment = ({ comments }: ShowCommentProp) => {
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const itemnum = 3; //페이지당 출력될 item 수
  const indexOfLast = currentPage * itemnum; //slice할때 마지막item 순서
  const indexOfFirst = indexOfLast - itemnum; // slice할때 첫item순서

  const CurrentPost = (post: Comment[]) => {
    let currentPosts: Comment[] = [];
    currentPosts = post.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
  return (
    <>
      {CurrentPost(comments).map((comment) => (
        <div className={Styles.detail_comments} key={comment.id}>
          <div className={Styles.comment_name}>
            <div>{comment.nickname}</div>
            <div>|</div>
            <div>{comment.date}</div>
          </div>
          <div className={Styles.comment_comment}>{comment.comment}</div>
        </div>
      ))}
      <CommentsPageMove
        totalPosts={comments.length}
        postsPerPage={itemnum}
        pageMove={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
};
export default ShowComment;
