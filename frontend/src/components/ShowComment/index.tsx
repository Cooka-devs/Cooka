import { useState, useEffect } from "react";
import { Comment, User } from "@/types";
import Styles from "./index.module.css";
import CommentsPageMove from "../CommentsPageMove";
import { searchUser } from "@/api/getCurrentUser";
interface ShowCommentProp {
  comments: Comment[];
}
const ShowComment = ({ comments }: ShowCommentProp) => {
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const [user, setUser] = useState<undefined | User>();
  const [deleteComment, setDeleteComment] = useState<boolean>(false);
  const itemnum = 3; //페이지당 출력될 item 수
  const indexOfLast = currentPage * itemnum; //slice할때 마지막item 순서
  const indexOfFirst = indexOfLast - itemnum; // slice할때 첫item순서

  const CurrentPost = (post: Comment[]) => {
    let currentPosts: Comment[] = [];
    currentPosts = post.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
  useEffect(() => {
    const fetch = async () => {
      const getU = await searchUser();
      setUser(getU);
    };
    fetch();
  }, []);
  return (
    <>
      {CurrentPost(comments).map((comment) => (
        <div className={Styles.detail_comments} key={comment.id}>
          <div className={Styles.comment_name}>
            <div>{comment.writer}</div>
            <div>|</div>
            <div>{comment.created_at}</div>
            {user && user?.nickname === comment.writer ? (
              <>
                <div>
                  <button className={Styles.modify_btn}>삭제</button>
                </div>
                <div>
                  <button className={Styles.modify_btn}>수정</button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <div
            className={Styles.comment_comment}
            dangerouslySetInnerHTML={{ __html: comment.content }}
          />
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
