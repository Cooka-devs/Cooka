import { Pool } from "mysql2/promise";
import { DB_QUERY_ERROR } from "../constants/response";
import { QueriesFunctionWithBody } from "../types/queries";
import { makeSuccessResponse } from "../utils/response";
import { ResultSetHeader } from "mysql2";
import { QueriesFunction } from "../types/queries";
export interface AddRecipeListParams {
  writer: string;
  imgSrc: string;
  content: string;
  imgAlt: string;
  category: string;
  title: string;
  isHot: boolean;
}

export const addRecipe: QueriesFunctionWithBody<AddRecipeListParams> = async (
  conn,
  params
) => {
  const { writer, imgSrc, imgAlt, content, category, title, isHot } = params;
  try {
    const result = await conn.execute(
      "INSERT INTO recipe (writer, imgSrc, imgAlt, content, category, title, isHot) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [writer, imgSrc, imgAlt, content, category, title, isHot]
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
