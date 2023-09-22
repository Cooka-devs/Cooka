import { ResultSetHeader } from "mysql2/promise";
import { DB_QUERY_ERROR } from "../constants/response";
import { QueriesFunction, QueriesFunctionWithBody } from "../types/queries";
import { makeSuccessResponse } from "../utils/response";
import { Pool } from "mysql2";
export const getUsers: QueriesFunction = async (conn) => {
  try {
    const result = await conn.query("SELECT * from user");
    return makeSuccessResponse(result[0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
export interface GetPwParams {
  login_id: string;
}
export const getPw: QueriesFunctionWithBody<GetPwParams> = async (
  conn,
  req
) => {
  try {
    const result = await conn.query("SELECT * FROM user WHERE login_id = ?", [
      req.login_id,
    ]);
    return makeSuccessResponse(result[0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
export interface AddUserParams {
  name: string;
  nickname: string;
  phone_number: string;
  login_id: string;
  login_password: string;
  login_type: string;
  profile_img: string;
  profile_text: string;
  social_id: number;
  salt: string;
}
export const addUser: QueriesFunctionWithBody<AddUserParams> = async (
  conn,
  params
) => {
  const {
    name,
    nickname,
    phone_number,
    login_type,
    social_id,
    login_id,
    login_password,
    profile_img,
    profile_text,
    salt,
  } = params;
  try {
    const result = await conn.execute(
      "INSERT INTO user (name, nickname, phone_number, login_type, social_id, login_id, login_password, profile_img, profile_text, salt) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        nickname,
        phone_number,
        login_type,
        social_id,
        login_id,
        login_password,
        profile_img,
        profile_text,
        salt,
      ]
    );
    const id = (result as ResultSetHeader[])[0].insertId;
    return makeSuccessResponse(id);
  } catch (err) {
    console.log(`err`, err);
    return DB_QUERY_ERROR;
  }
};

export const deleteUser = async (conn: Pool, id: number) => {
  try {
    const result = await conn.execute(`DELETE user WHERE id=${id}`);
    return makeSuccessResponse("delete");
  } catch (err) {
    console.log(err);
    return DB_QUERY_ERROR;
  }
};
