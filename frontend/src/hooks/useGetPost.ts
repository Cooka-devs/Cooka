import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Table } from "@/types";

const useGetPost = <T extends Table>(data: T): T[number] | undefined => {
  const [post, setPost] = useState<T[number]>();
  const router = useRouter();

  useEffect(() => {
    if (!router.query.id) return;
    const postId = +router.query.id;
    const post = data.find((post) => post.id === +postId);
    if (!post) return;
    setPost(post);
  }, [router.query.id, data]);

  return post;
};
export default useGetPost;
