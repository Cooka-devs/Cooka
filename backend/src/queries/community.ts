import { Pool } from "mysql2/promise";
import { QueriesFunction, QueriesFunctionWithBody } from "../types/queries";
import { makeSuccessResponse } from "../utils/response";
import { DB_QUERY_ERROR } from "../constants/response";
import { getTime } from "../utils/time";

export interface AddCounselingListParams {
  writer: string;
  content: string;
  title: string;
}
export interface UpdateCounselingListParams {
  id: number;
  writer: string;
  content: string;
  title: string;
}
export interface DeleteCounselingListParams {
  id: number;
}
export const getCounseling: QueriesFunction = async (conn: Pool) => {
  try {
    const result = await conn.execute("SELECT * FROM counseling");
    return makeSuccessResponse(result[0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
export const addCounseling: QueriesFunctionWithBody<
  AddCounselingListParams
> = async (conn, params) => {
  const { writer, content, title } = params;
  const time = getTime();
  try {
    const result = await conn.execute(
      "INSERT INTO counseling(writer, content, title,created_at) VALUES (?, ?, ?, ?)",
      [writer, content, title, time]
    );
    return makeSuccessResponse(result);
  } catch (err) {
    console.log(err);
    return DB_QUERY_ERROR;
  }
};
export const deleteCounseling: QueriesFunctionWithBody<
  DeleteCounselingListParams
> = async (conn, params) => {
  const { id } = params;
  try {
    const result = await conn.execute("DELETE FROM counseling WHERE id = ?", [
      id,
    ]);
    return makeSuccessResponse(result);
  } catch (err) {
    console.log(err);
    return DB_QUERY_ERROR;
  }
};
export const updateCounseling: QueriesFunctionWithBody<
  UpdateCounselingListParams
> = async (conn, params) => {
  const { id, writer, content, title } = params;
  try {
    const result = await conn.execute(
      "UPDATE counseling SET writer = ?, content = ?, title = ? WHERE id = ?",
      [writer, content, title, id]
    );
    return makeSuccessResponse(result);
  } catch (err) {
    console.log(err);
    return DB_QUERY_ERROR;
  }
};
export const getLikedCounseling: QueriesFunctionWithBody<
  DeleteCounselingListParams
> = async (conn, params) => {
  const { id } = params;
  try {
    const result = await conn.execute(
      "SELECT counseling.*FROM counseling INNER JOIN counseling_likes ON counseling.id = counseling_likes.counseling_id and user_id= ?",
      [id]
    );
    return makeSuccessResponse(result[0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
