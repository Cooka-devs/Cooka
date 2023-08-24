import { DataResponse } from "../types/response";

export const DB_QUERY_ERROR: DataResponse = {
  code: 500,
  data: null,
  message: "DB Query Error",
};

export const BAD_REQUEST: DataResponse = {
  code: 400,
  data: null,
  message: "Bad Request",
};
