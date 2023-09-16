import { ResultSetHeader } from "mysql2/promise";
import { DB_QUERY_ERROR } from "../constants/response";
import { QueriesFunction, QueriesFunctionWithBody } from "../types/queries";
import { makeSuccessResponse } from "../utils/response";
import { Pool } from "mysql2";
export const getUsers: QueriesFunction = async (conn) => {
  try {
    const result = await conn.query("SELECT * from user");
    return makeSuccessResponse(result[0]); //pool.query로 user를 get후 result로저장후 첫번째 데이터를 리턴 makeSuccessResponse 형태로
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
  profile_text?: string;
  social_id: number;
}
export interface CurrentUserParams {
  id: number;
  user_index: number;
  login_type: string;
  nickname: string;
  social_id: number;
}
export const setCurrentUser: QueriesFunctionWithBody<
  CurrentUserParams
> = async (conn, params) => {
  const { id, user_index, login_type, nickname, social_id } = params;
  try {
    const result = await conn.execute(
      "UPDATE currentUser SET (id,user_index,login_type,nickname,social_id) VALUES (?, ?, ?, ?, ?) WHERE id=0",
      [id, user_index, login_type, nickname, social_id]
    );
    const resultId = (result as ResultSetHeader[])[0].insertId;
    return makeSuccessResponse(resultId);
  } catch (err) {
    console.log(`err`, err);
    return DB_QUERY_ERROR;
  }
};
export const addUser: QueriesFunctionWithBody<AddUserParams> = async (
  conn,
  params
) => {
  //conn에 pool, params에 요청된body
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
  } = params;
  try {
    const result = await conn.execute(
      //pool.execute
      //execute()란 작업 처리 결과를 반환하지 않는다.
      //작업 처리 도중 예외가 발생하면 스레드가 종료되고 해당 스레드는 스레드 풀에서 제거된다.
      //다른 작업을 처리하기 위해 새로운 스레드를 생성한다.

      //<=>submit()
      //작업 처리 결과를 반환한다.
      //작업 처리 도중 예외가 발생하더라도 스레드는 종료되지 않고 다음 작업을 위해 재사용
      //스레드의 생성 오버헤드를 방지하기 위해서라도 submit() 을 가급적 사용한다.
      "INSERT INTO user (name, nickname, phone_number, login_type, social_id, login_id, login_password, profile_img, profile_text) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
      ]
    ); //INSERT INTO user (res.body)
    const id = (result as ResultSetHeader[])[0].insertId; // ?? 잘모르겠음
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
