import { Pool } from "mysql2/promise";
import { DB_QUERY_ERROR } from "../constants/response";
import {
  QueriesFunction,
  QueriesFunctionWithBody,
  QueriesFunctionWithType,
} from "../types/queries";
import { makeSuccessResponse } from "../utils/response";
import { getTime } from "../utils/time";

export interface AddCommentListParams {
  writer: string;
  content: string;
  postId: number;
  type: string;
}
export const addComment: QueriesFunctionWithBody<AddCommentListParams> = async (
  conn,
  params
) => {
  const { writer, content, postId, type } = params;
  const time = getTime();
  try {
    const result = await conn.execute(
      `INSERT INTO ${type}(writer, content, postId, created_at) VALUES (?, ?, ?, ?)`,
      [writer, content, postId, time]
    );
    return makeSuccessResponse(result);
  } catch (err) {
    console.log(err);
    return DB_QUERY_ERROR;
  }
};
export const getComment: QueriesFunctionWithType = async (conn, type) => {
  try {
    const result = await conn.execute(`SELECT * FROM ${type}`);
    return makeSuccessResponse(result[0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
