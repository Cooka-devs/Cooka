import { Express } from "express";
import { Pool } from "mysql2/promise";
import {
  AddPlaceListParams,
  addPlace,
  deletePlace,
  getPlace,
  updatePlace,
} from "../queries/place";
import { isIncludeUndefined } from "../utils/request";
import { BAD_REQUEST } from "../constants/response";
import { RequestGeneric } from "../types/request";
import { deleteCommentsByPostId } from "../queries/comment";

export const setPlaceRoutes = (app: Express, conn: Pool) => {
  app.get("/place", async (req, res) => {
    const response = await getPlace(conn);
    res.status(response.code).json(response);
  });
  app.post("/place", async (req: RequestGeneric<AddPlaceListParams>, res) => {
    if (!req.body || isIncludeUndefined(req.body)) {
      return BAD_REQUEST;
    }
    const response = await addPlace(conn, req.body);
    res.status(response.code).json(response);
  });
  app.delete("/place/:id", async (req, res) => {
    if (!("id" in req.params)) return BAD_REQUEST;
    const { id } = req.params;
    const response = await deletePlace(conn, { id: +id });
    await deleteCommentsByPostId(conn, { id: +id, type: "place_comment" });
    res.status(response.code).json({ message: "삭제되었습니다" });
  });
  app.put("/place/:id", async (req, res) => {
    if (!("id" in req.params)) return BAD_REQUEST;
    if (!req.body || isIncludeUndefined(req.body)) return BAD_REQUEST;
    const { id } = req.params;
    const response = await updatePlace(conn, { id: +id, ...req.body });
    res.status(response.code).json(response);
  });
};
