import { Pool } from "mysql2/promise";
import { DB_QUERY_ERROR } from "../constants/response";
import { QueriesFunctionWithBody } from "../types/queries";
import { makeSuccessResponse } from "../utils/response";
import { ResultSetHeader } from "mysql2";
import { QueriesFunction } from "../types/queries";
import { getTime } from "../utils/time";

export interface AddRecipeListParams {
  writer: string;
  imgSrc: string;
  content: string;
  imgAlt: string;
  category: string;
  title: string;
  isHot: boolean;
}

export interface UpdateRecipeListParams {
  id: number;
  writer: string;
  imgSrc: string;
  content: string;
  imgAlt: string;
  category: string;
  title: string;
  isHot: boolean;
}
export interface GetRecipeListParam {
  id: number;
}
export interface DeleteRecipeListParams {
  id: number;
}
export interface GetLikedListParams {
  id: number;
  size: number;
  page: number;
}
export const deleteRecipe: QueriesFunctionWithBody<
  DeleteRecipeListParams
> = async (conn, params) => {
  const { id } = params;
  try {
    const result = await conn.execute("DELETE FROM recipe WHERE id = ?", [id]);
    return makeSuccessResponse(result);
  } catch (err) {
    console.log(err);
    return DB_QUERY_ERROR;
  }
};

export const updateRecipe: QueriesFunctionWithBody<
  UpdateRecipeListParams
> = async (conn, params) => {
  const { id, writer, imgSrc, imgAlt, content, category, title, isHot } =
    params;
  try {
    const result = await conn.execute(
      "UPDATE recipe SET writer = ?, imgSrc = ?, imgAlt = ?, content = ?, category = ?, title = ?, isHot = ? WHERE id = ?",
      [writer, imgSrc, imgAlt, content, category, title, isHot, id]
    );
    return makeSuccessResponse(result);
  } catch (err) {
    console.log(err);
    return DB_QUERY_ERROR;
  }
};

export const addRecipe: QueriesFunctionWithBody<AddRecipeListParams> = async (
  conn,
  params
) => {
  const { writer, imgSrc, imgAlt, content, category, title, isHot } = params;
  const time = getTime();
  try {
    const result = await conn.execute(
      "INSERT INTO recipe (writer, imgSrc, imgAlt, content, category, title, isHot,created_at) VALUES (?, ?, ?, ?, ?, ?, ?,?)",
      [writer, imgSrc, imgAlt, content, category, title, isHot, time]
    );
    const id = (result as ResultSetHeader[])[0].insertId;
    return makeSuccessResponse(id);
  } catch (err) {
    console.log(err);
    return DB_QUERY_ERROR;
  }
};
export const getRecipe: QueriesFunction = async (conn: Pool) => {
  try {
    const result = await conn.query("SELECT * from recipe");
    return makeSuccessResponse(result[0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
export const getRecipeById: QueriesFunctionWithBody<
  GetRecipeListParam
> = async (conn, params) => {
  const { id } = params;
  try {
    const result = await conn.execute(`SELECT * from recipe WHERE id = ${id}`);
    return makeSuccessResponse(result[0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
export const getLikedRecipes: QueriesFunctionWithBody<
  GetLikedListParams
> = async (conn, params) => {
  const { id, size, page } = params;
  console.log("id", id);
  console.log("size", size);
  console.log("page", page);
  const offset = (page - 1) * size;
  try {
    const result = await conn.execute(
      `SELECT recipe.* FROM recipe INNER JOIN recipe_likes ON recipe.id = recipe_likes.recipe_id where user_id= ${id} Limit ${size} OFFSET ${offset}`
    );
    return makeSuccessResponse(result[0]);
  } catch (err) {
    console.log(err);
    return DB_QUERY_ERROR;
  }
};
