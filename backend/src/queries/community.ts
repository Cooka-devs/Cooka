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
