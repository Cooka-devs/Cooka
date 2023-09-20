import { DB_QUERY_ERROR } from "../constants/response";
import { QueriesFunctionWithBody } from "../types/queries";
import { makeSuccessResponse } from "../utils/response";
import { ResultSetHeader } from "mysql2";
export interface AddRecipeListParams {
  nickname: string;
  login_id: string;
  img: string;
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
  const { nickname, login_id, img, imgAlt, content, category, title, isHot } =
    params;
  try {
    const result = await conn.execute(
      "INSERT INTO recipe (nickname, login_id, img, imgAlt, content, category, title, isHot) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [nickname, login_id, img, imgAlt, content, category, title, isHot]
    );
    const id = (result as ResultSetHeader[])[0].insertId;
    return makeSuccessResponse(id);
  } catch (err) {
    console.log(err);
    return DB_QUERY_ERROR;
  }
};
