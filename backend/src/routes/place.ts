import { Express } from "express";
import { Pool } from "mysql2/promise";
import { getPlace } from "../queries/place";

export const setPlaceRoutes = (app: Express, conn: Pool) => {
  app.get("/place", async (req, res) => {
    const response = await getPlace(conn);
    res.status(response.code).json(response);
  });
};
