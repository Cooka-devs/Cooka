import { Pool } from "mysql2/promise";
import {
  QueriesFunction,
  QueriesFunctionWithBody,
  QueriesFunctionWithType,
} from "../types/queries";
import { makeSuccessResponse } from "../utils/response";
import { DB_QUERY_ERROR } from "../constants/response";
interface GetListByPageProps {
  type: string;
  page: number;
  size: number;
}
interface GetListByPageAndUserProps {
  type: string;
  page: number;
  size: number;
  writer: any;
}
interface GetListLengthByUserProps {
  type: string;
  writer: any;
}
export const getListLength: QueriesFunctionWithType = async (conn, type) => {
  try {
    const result = await conn.execute(`SELECT COUNT(*) as count FROM ${type}`);
    return makeSuccessResponse(result[0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
export const getListLengthByUser: QueriesFunctionWithBody<
  GetListLengthByUserProps
> = async (conn, params) => {
  try {
    const { type, writer } = params;
    const result = await conn.execute(
      `SELECT COUNT(*) as count FROM ${type} WHERE writer = ?`,
      [writer]
    );
    return makeSuccessResponse(result[0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
export const getListByPage: QueriesFunctionWithBody<
  GetListByPageProps
> = async (conn, params) => {
  try {
    const { type, page, size } = params;
    const result = await conn.execute(
      `SELECT * FROM ${type} LIMIT ${size} OFFSET ${(page - 1) * size}`
    );
    return makeSuccessResponse(result[0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
export const getListByPageAndUser: QueriesFunctionWithBody<
  GetListByPageAndUserProps
> = async (conn, params) => {
  try {
    const { type, page, size, writer } = params;
    const result = await conn.execute(
      `SELECT * FROM ${type} WHERE writer = ? LIMIT ${size} OFFSET ${
        (page - 1) * size
      }`,
      [writer]
    );
    return makeSuccessResponse(result[0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
