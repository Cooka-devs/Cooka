import DefaultAxiosService from "@/service/DefaultAxiosService";
import { NextRouter, Router, useRouter } from "next/router";

interface RouteUserPostsProps {
  writer: string;
  type: string;
  router: NextRouter;
}
export const RouteUserPosts = async ({
  writer,
  type,
  router,
}: RouteUserPostsProps) => {
  const result = await DefaultAxiosService.instance
    .get(`/${type}/writer`, {
      params: {
        writer,
      },
    })
    .then((res) => res.data.data[0].id);
  router.push({ pathname: `/chef/${result}` });
};
