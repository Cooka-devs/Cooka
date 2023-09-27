import { Pool } from "mysql2/promise";
import { QueriesFunction } from "../types/queries";
import { makeSuccessResponse } from "../utils/response";
import { DB_QUERY_ERROR } from "../constants/response";

export const getPlace: QueriesFunction = async (conn: Pool) => {
  try {
    const result = await conn.execute("SELECT * FROM place");
    return makeSuccessResponse(result[0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
