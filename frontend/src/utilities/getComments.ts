import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Comment } from "@/types";
import DefaultAxiosService from "@/service/DefaultAxiosService";
const useGetComments = async (id: string, type: string) => {
  const result = Number(id);
  let comment: Comment[] = [];
  switch (type) {
    case "counseling":
      comment = await DefaultAxiosService.instance
        .get("counseling_comment")
        .then((res) => res.data.data);
      break;
    case "recipe":
      comment = await DefaultAxiosService.instance
        .get("recipe_comment")
        .then((res) => res.data.data);
      break;
    case "place":
      comment = await DefaultAxiosService.instance
        .get("place_comment")
        .then((res) => res.data.data);
      break;
  }
  // if (type === "counseling") {
  //   comment = await DefaultAxiosService.instance
  //     .get("counseling_comment")
  //     .then((res) => res.data.data);
  // } else if (type === "recipe") {
  //   comment = await DefaultAxiosService.instance
  //     .get("recipe_comment")
  //     .then((res) => res.data.data);
  // } else if (type === "place") {
  //   comment = await DefaultAxiosService.instance
  //     .get("place_comment")
  //     .then((res) => res.data.data);
  // }
  try {
    const comments = comment.filter((comment) => comment.postId === result);
    console.log("comments", comments);
    return comments;
  } catch (err) {
    throw err;
  }
};
export default useGetComments;
