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
export interface DeleteCommentListParams {
  id: number;
  type: string;
}
export interface UpdateCommentListParams {
  id: number;
  content: string;
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
export const deleteCommentsByPostId: QueriesFunctionWithBody<
  DeleteCommentListParams
> = async (conn, params) => {
  const { id, type } = params;
  try {
    const result = await conn.execute(`DELETE FROM ${type} WHERE postId = ?`, [
      id,
    ]);
    return makeSuccessResponse(result);
  } catch (err) {
    console.log(err);
    return DB_QUERY_ERROR;
  }
};
export const updateComment: QueriesFunctionWithBody<
  UpdateCommentListParams
> = async (conn, params) => {
  const { id, content, type } = params;
  try {
    const result = await conn.execute(
      `UPDATE ${type} SET content = ? WHERE id = ?`,
      [content, id]
    );
    return makeSuccessResponse(result);
  } catch (err) {
    console.log(err);
    return DB_QUERY_ERROR;
  }
};
export const deleteComment: QueriesFunctionWithBody<
  DeleteCommentListParams
> = async (conn, params) => {
  const { id, type } = params;
  try {
    const result = await conn.execute(`DELETE FROM ${type} WHERE id = ?`, [id]);
    return makeSuccessResponse(result);
  } catch (err) {
    console.log(err);
    return DB_QUERY_ERROR;
  }
};
export const getCommentsNum: QueriesFunctionWithBody<
  DeleteCommentListParams
> = async (conn, params) => {
  const { type, id } = params;
  try {
    const result = await conn.execute(
      `SELECT COUNT(*) as count FROM ${type} WHERE postId = ?`,
      [id]
    );
    return makeSuccessResponse(result[0][0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
