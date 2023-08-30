import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Recipe, CsItem, PlaceProps } from "@/types";

const useGetPost = (data: CsItem[] | PlaceProps[] | Recipe[]) => {
  const [post, setPost] = useState<CsItem[] | PlaceProps[] | Recipe[]>();
  const router = useRouter();
  useEffect(() => {
    const postId = router.query.id;
    if (!postId) return;
    if (data) {
      // const post = data.find(
      //   (item: CsItem | PlaceProps | Recipe) => item.id === +postId
      // );
    }
    if (!post) return;
    setPost(post);
  }, [router.query.id]);
  return post;
};
export default useGetPost;
