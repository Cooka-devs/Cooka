import DefaultAxiosService from "@/service/DefaultAxiosService";
import { CsItem, PlaceProps, Recipe } from "@/types";
import { useState, useEffect, useMemo } from "react";
interface ContentsByChefProps {
  rPage: number;
  pPage: number;
  cPage: number;
  size: number;
  writer: string;
  setR: React.Dispatch<React.SetStateAction<Recipe[] | undefined>>;
  setP: React.Dispatch<React.SetStateAction<PlaceProps[] | undefined>>;
  setC: React.Dispatch<React.SetStateAction<CsItem[] | undefined>>;
}
export const ContentsByChef = ({
  rPage,
  pPage,
  cPage,
  size,
  writer,
  setR,
  setP,
  setC,
}: ContentsByChefProps) => {
  const getRecipeListByChef = async () => {
    const result = await DefaultAxiosService.instance.get(`/list/recipe`, {
      params: { page: rPage, size: size, nickname: writer },
    });
    setR(result.data.data);
  };
  const getPlaceListByChef = async () => {
    const result = await DefaultAxiosService.instance.get(`/list/place`, {
      params: { page: pPage, size: size, nickname: writer },
    });
    setP(result.data.data);
  };
  const getCounselingListByChef = async () => {
    const result = await DefaultAxiosService.instance.get(`/list/counseling`, {
      params: { page: cPage, size: size, nickname: writer },
    });
    setC(result.data.data);
  };
  getCounselingListByChef();
  getPlaceListByChef();
  getRecipeListByChef();
};
