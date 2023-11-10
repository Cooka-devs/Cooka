import { Pool } from "mysql2/promise";
import {
  QueriesFunction,
  QueriesFunctionWithBody,
  QueriesFunctionWithType,
} from "../types/queries";
import { makeSuccessResponse } from "../utils/response";
import { DB_QUERY_ERROR } from "../constants/response";
import { type } from "os";
interface GetSearchDataProps {
  type: string;
  page: number;
  size: number;
  keyword: any;
}
interface GetSearchDataLengthProps {
  type: string;
  keyword: any;
}
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
interface getUserIdByPostWriterProps {
  writer: any;
}
export const getUserIdByPostWriter: QueriesFunctionWithBody<
  getUserIdByPostWriterProps
> = async (conn, params) => {
  try {
    const { writer } = params;
    const result = await conn.execute(
      `SELECT id
      FROM user
      WHERE nickname = '${writer}'`
    );
    return makeSuccessResponse(result[0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
export const getSearchData: QueriesFunctionWithBody<
  GetSearchDataProps
> = async (conn, params) => {
  try {
    const { type, page, size, keyword } = params;
    const offset = (page - 1) * size;
    const result = await conn.execute(
      `SELECT * FROM ${type} WHERE title LIKE '%${keyword}%' ORDER BY id DESC LIMIT ${size} OFFSET ${offset}`
    );
    return makeSuccessResponse(result[0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
export const getSearchDataLength: QueriesFunctionWithBody<
  GetSearchDataLengthProps
> = async (conn, params) => {
  try {
    const { type, keyword } = params;
    const result = await conn.execute(
      `SELECT COUNT(*) as count FROM ${type} WHERE title LIKE '%${keyword}%'`
    );
    return makeSuccessResponse(result[0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
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
      `SELECT * FROM ${type} ORDER BY id DESC LIMIT ${size} OFFSET ${
        (page - 1) * size
      }`
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
