import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Table } from "@/types";

<<<<<<< HEAD
const useGetPost = <T extends Table>(data: T): T[number] | undefined => {
  const [post, setPost] = useState<T[number]>();
=======
const useGetPost = (data: (CsItem | PlaceProps | Recipe)[]) => {
  const [post, setPost] = useState<CsItem | PlaceProps | Recipe>();
>>>>>>> 3cbacf492285b56c5642efdbe2f6edb4bdde4559
  const router = useRouter();

  useEffect(() => {
    if (!router.query.id) return;
    const postId = +router.query.id;
<<<<<<< HEAD
    const post = data.find((post) => post.id === +postId);
=======
    if (!postId) return;
    const post = data.find((post) => post.id === postId);
>>>>>>> 3cbacf492285b56c5642efdbe2f6edb4bdde4559
    if (!post) return;
    setPost(post);
  }, [router.query.id, data]);

  return post;
};
export default useGetPost;
