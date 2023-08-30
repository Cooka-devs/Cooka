import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Comment } from "@/types";
const useGetComments = (commentsItem: Comment[]) => {
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>();
  useEffect(() => {
    const postId = router.query.id;
    if (!postId) return;

    const IsComments = commentsItem.filter(
      (comment) => comment.postId === +postId
    );
    setComments(IsComments);
  }, [router.query.id]);
  return comments;
};
export default useGetComments;
