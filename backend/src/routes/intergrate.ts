import { Express } from "express";
import { Pool } from "mysql2/promise";
import { getListLength } from "../queries/intergrate";
export const setIntergratedRoutes = (app: Express, conn: Pool) => {
  const queryType = ["recipe", "place", "counseling"];
  queryType.map((type) => {
    app.get(`/${type}_num`, async (req, res) => {
      const response = await getListLength(conn, type);
      res.status(response.code).json(response);
    });
  });
};
