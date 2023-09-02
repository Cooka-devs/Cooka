import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Recipe, CsItem, PlaceProps } from "@/types";

const useGetPost = (data: (CsItem | PlaceProps | Recipe)[]) => {
  const [post, setPost] = useState<CsItem | PlaceProps | Recipe>();
  const router = useRouter();

  useEffect(() => {
    if (!router.query.id) return;
    const postId = +router.query.id;
    if (!postId) return;
    const post = data.find((post) => post.id === postId);
    if (!post) return;
    setPost(post);
  }, [router.query.id, data]);

  return post;
};
export default useGetPost;
