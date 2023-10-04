import { DB_QUERY_ERROR } from "../constants/response";
import { QueriesFunctionWithBody } from "../types/queries";
import { makeSuccessResponse } from "../utils/response";
interface GetLikesNumParams {
  type: string;
  id: number;
}
interface GetLikesParams {
  type: string;
  postId: any;
  userId: any;
}
export const getLikesNum: QueriesFunctionWithBody<GetLikesNumParams> = async (
  conn,
  params
) => {
  const { type, id } = params;
  try {
    const result = await conn.execute(
      `SELECT COUNT(*) as count FROM ${type}_likes where ${type}_id = ?`,
      [id]
    );
    return makeSuccessResponse(result[0][0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
export const getLikes: QueriesFunctionWithBody<GetLikesParams> = async (
  conn,
  params
) => {
  const { type, userId, postId } = params;
  try {
    const result = await conn.execute(
      `SELECT * FROM ${type}_likes WHERE ${type}_id = ? AND user_id = ?`,
      [postId, userId]
    );
    return makeSuccessResponse(result[0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
export const deleteLikes: QueriesFunctionWithBody<GetLikesParams> = async (
  conn,
  params
) => {
  const { type, userId, postId } = params;
  try {
    const result = await conn.execute(
      `DELETE FROM ${type}_likes WHERE ${type}_id = ? AND user_id = ?`,
      [postId, userId]
    );
    return makeSuccessResponse(result[0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
export const addLikes: QueriesFunctionWithBody<GetLikesParams> = async (
  conn,
  params
) => {
  const { type, userId, postId } = params;
  try {
    const result = await conn.execute(
      `INSERT INTO ${type}_likes (${type}_id, user_id) VALUES (?, ?)`,
      [postId, userId]
    );
    return makeSuccessResponse(result[0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
