import { Pool } from "mysql2/promise";
import { getCounseling } from "../queries/community";
import { Express } from "express";
export const setCounselingRoutes = (app: Express, conn: Pool) => {
  app.get("/counseling", async (req, res) => {
    const response = await getCounseling(conn);
    res.status(response.code).json(response);
  });
};
