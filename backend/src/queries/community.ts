import { Pool } from "mysql2/promise";
import { QueriesFunction } from "../types/queries";
import { makeSuccessResponse } from "../utils/response";
import { DB_QUERY_ERROR } from "../constants/response";

export const getCounseling: QueriesFunction = async (conn: Pool) => {
  try {
    const result = await conn.execute("SELECT * FROM counseling");
    return makeSuccessResponse(result[0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
