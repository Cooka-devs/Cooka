import { Response } from "express";
import { DataResponse } from "../types/response";

export const makeSuccessResponse = (data: any): DataResponse => {
  return {
    code: 200,
    data: data,
    message: "Success",
  };
};

export const returnBadRequest = (res: Response) => {
  res.status(400).json({
    code: 400,
    data: null,
    message: "Bad Request",
  });
};
