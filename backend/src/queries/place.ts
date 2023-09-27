import { Pool, ResultSetHeader } from "mysql2/promise";
import { QueriesFunction, QueriesFunctionWithBody } from "../types/queries";
import { makeSuccessResponse } from "../utils/response";
import { DB_QUERY_ERROR } from "../constants/response";
import { getTime } from "../utils/time";
export interface AddPlaceListParams {
  writer: string;
  imgSrc: string;
  content: string;
  imgAlt: string;
  category: string;
  title: string;
  isHot: boolean;
}
export interface UpdatePlaceListParams {
  id: number;
  writer: string;
  imgSrc: string;
  content: string;
  imgAlt: string;
  category: string;
  title: string;
  isHot: boolean;
}
export interface DeletePlaceListParams {
  id: number;
}

export const getPlace: QueriesFunction = async (conn: Pool) => {
  try {
    const result = await conn.execute("SELECT * FROM place");
    return makeSuccessResponse(result[0]);
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
export const addPlace: QueriesFunctionWithBody<AddPlaceListParams> = async (
  conn,
  params
) => {
  const { writer, imgSrc, imgAlt, content, category, title, isHot } = params;
  const time = getTime();
  try {
    const result = await conn.execute(
      "INSERT INTO place(writer, imgSrc, imgAlt, content, category, title, isHot,created_at) VALUES (?,?, ?, ?, ?, ?, ?, ?)",
      [writer, imgSrc, imgAlt, content, category, title, isHot, time]
    );
    const id = (result as ResultSetHeader[])[0].insertId;
    return makeSuccessResponse(id);
  } catch (err) {
    console.log(err);
    return DB_QUERY_ERROR;
  }
};
export const updatePlace: QueriesFunctionWithBody<
  UpdatePlaceListParams
> = async (conn, params) => {
  const { id, writer, imgSrc, imgAlt, content, category, title, isHot } =
    params;
  try {
    const result = await conn.execute(
      "UPDATE place SET writer = ?, imgSrc = ?, imgAlt = ?, content = ?, category = ?, title = ?, isHot = ? WHERE id = ?",
      [writer, imgSrc, imgAlt, content, category, title, isHot, id]
    );
    return makeSuccessResponse(result);
  } catch (err) {
    console.log(err);
    return DB_QUERY_ERROR;
  }
};
export const deletePlace: QueriesFunctionWithBody<
  DeletePlaceListParams
> = async (conn, params) => {
  const { id } = params;
  try {
    const result = await conn.execute("DELETE FROM place WHERE id = ?", [id]);
    return makeSuccessResponse(result);
  } catch (err) {
    console.log(err);
    return DB_QUERY_ERROR;
  }
};
