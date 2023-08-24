import { DataResponse } from "../types/response";

export const makeSuccessResponse = (data: any): DataResponse => {
  return {
    code: 200,
    data: data,
    message: "Success",
  };
};
