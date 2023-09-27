import { Express } from "express";
import { Pool } from "mysql2/promise";
import { AddPlaceListParams, addPlace, getPlace } from "../queries/place";
import { isIncludeUndefined } from "../utils/request";
import { BAD_REQUEST } from "../constants/response";
import { RequestGeneric } from "../types/request";

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
};
