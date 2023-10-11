import { Express } from "express";
import { Pool } from "mysql2/promise";
import { getBest } from "../queries/best";
const routeType = ["chef", "recipe", "place", "counseling"];
export const setBestRoutes = (app: Express, conn: Pool) => {
  routeType.map((type) => {
    app.get(`/best/${type}`, async (req, res) => {
      const response = await getBest(conn, type);
      res.status(response.code).json(response);
    });
  });
};
