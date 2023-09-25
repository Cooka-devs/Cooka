import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Recipe, Table } from "@/types";
import { getReipce } from "@/fetch/getRecipe";

export const useGetPost = async (id: string) => {
  const number = Number(id);
  const data: Recipe[] = await getReipce();
  try {
    const post = data.find((post) => post.id === +number);
    console.log("post in useGetPost:", post);
    return post;
  } catch (err) {
    console.log("getR error:", err);
    throw err;
  }
};
