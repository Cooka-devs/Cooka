import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PlaceProps, Recipe, Table } from "@/types";
import { getReipce } from "@/api/getRecipe";
import { getPlace } from "@/api/getPlace";

export const useGetPost = async (id: string, type: string) => {
  const number = Number(id);
  const data: PlaceProps[] | Recipe[] =
    type === "place" ? await getPlace() : await getReipce();
  try {
    const post = data.find((post) => post.id === +number);
    console.log("post in useGetPost:", post);
    return post;
  } catch (err) {
    console.log("getR error:", err);
    throw err;
  }
};
