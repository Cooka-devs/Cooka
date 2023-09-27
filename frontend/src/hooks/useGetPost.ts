import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CsItem, PlaceProps, Recipe, Table } from "@/types";
import { getReipce } from "@/api/getRecipe";
import { getPlace } from "@/api/getPlace";
import { getCounseling } from "@/api/getCounseling";

export const useGetPost = async (id: string, type: string) => {
  const number = Number(id);
  let data: PlaceProps[] | Recipe[] | CsItem[] = [];
  if (type === "recipe") {
    data = await getReipce();
  } else if (type === "place") {
    data = await getPlace();
  } else if (type === "counseling") {
    data = await getCounseling();
  }
  try {
    console.log(data);
    const post = data.find((post) => post.id === +number);
    console.log("post in useGetPost:", post);
    return post;
  } catch (err) {
    console.log("getR error:", err);
    throw err;
  }
};
