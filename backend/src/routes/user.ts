import { Express } from "express";
import { Pool } from "mysql2/promise";
import { BAD_REQUEST } from "../constants/response";
import { AddUserParams, addUser, getUsers } from "../queries/user";
import { RequestGeneric } from "../types/request";
import { isIncludeUndefined } from "../utils/request";

export const setUserRoutes = (app: Express, conn: Pool) => {
  app.get("/users", async (req, res) => {
    const response = await getUsers(conn);
    res.status(response.code).json(response);
  });

  app.post("/users", async (req: RequestGeneric<AddUserParams>, res) => {
    if (!req.body || isIncludeUndefined(req.body)) {
      return BAD_REQUEST;
    }
    const response = await addUser(conn, req.body);
    console.log("res?", response);
    res.status(response.code).json(response);
  });
};
