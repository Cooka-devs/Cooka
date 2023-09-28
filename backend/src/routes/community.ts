import { Pool } from "mysql2/promise";
import {
  AddCounselingListParams,
  addCounseling,
  deleteCounseling,
  getCounseling,
  updateCounseling,
} from "../queries/community";
import { Express } from "express";
import { isIncludeUndefined } from "../utils/request";
import { BAD_REQUEST } from "../constants/response";
import { RequestGeneric } from "../types/request";
import { deleteCommentsByPostId } from "../queries/comment";
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
  app.delete("/counseling/:id", async (req, res) => {
    if (!("id" in req.params)) return BAD_REQUEST;
    const { id } = req.params;
    const response = await deleteCounseling(conn, { id: +id });
    await deleteCommentsByPostId(conn, { id: +id, type: "counseling_comment" });
    res.status(response.code).json({ message: "삭제되었습니다" });
  });
  app.put("/counseling/:id", async (req, res) => {
    if (!("id" in req.params)) return BAD_REQUEST;
    if (!req.body || isIncludeUndefined(req.body)) return BAD_REQUEST;
    const { id } = req.params;
    const response = await updateCounseling(conn, { id: +id, ...req.body });
    res.status(response.code).json(response);
  });
};
