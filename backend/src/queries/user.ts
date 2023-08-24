import { OkPacketParams, ResultSetHeader } from "mysql2/promise";
import { DB_QUERY_ERROR } from "../constants/response";
import { QueriesFunction, QueriesFunctionWithBody } from "../types/queries";
import { makeSuccessResponse } from "../utils/response";

export const getUsers: QueriesFunction = async (conn) => {
  try {
    const result = await conn.query("SELECT * from user");
    return makeSuccessResponse(result[0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};

export interface AddUserParams {
  name: string;
  nickname: string;
  phone_number: string;
  login_type: string;
  social_id: number;
}

export const addUser: QueriesFunctionWithBody<AddUserParams> = async (
  conn,
  params
) => {
  const { name, nickname, phone_number, login_type, social_id } = params;
  try {
    const result = await conn.execute(
      "INSERT INTO user (name, nickname, phone_number, login_type, social_id) VALUES (?, ?, ?, ?, ?)",
      [name, nickname, phone_number, login_type, social_id]
    );
    const id = (result as ResultSetHeader[])[0].insertId;
    return makeSuccessResponse(id);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
