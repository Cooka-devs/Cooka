import { Pool } from "mysql2/promise";
import { QueriesFunction, QueriesFunctionWithType } from "../types/queries";
import { makeSuccessResponse } from "../utils/response";
import { DB_QUERY_ERROR } from "../constants/response";

export const getListLength: QueriesFunctionWithType = async (conn, type) => {
  try {
    const result = await conn.execute(`SELECT COUNT(*) FROM ${type}`);
    return makeSuccessResponse(result[0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
