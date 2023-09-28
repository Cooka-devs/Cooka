import { Pool } from "mysql2/promise";
import {
  AddCounselingListParams,
  addCounseling,
  getCounseling,
} from "../queries/community";
import { Express } from "express";
import { isIncludeUndefined } from "../utils/request";
import { BAD_REQUEST } from "../constants/response";
import { RequestGeneric } from "../types/request";
export const setCounselingRoutes = (app: Express, conn: Pool) => {
  app.get("/counseling", async (req, res) => {
    const response = await getCounseling(conn);
    res.status(response.code).json(response);
  });
  app.post(
    "/counseling",
    async (req: RequestGeneric<AddCounselingListParams>, res) => {
      if (!req.body || isIncludeUndefined(req.body)) {
        return BAD_REQUEST;
      }
      const response = await addCounseling(conn, req.body);
      res.status(response.code).json(response);
    }
  );
};
