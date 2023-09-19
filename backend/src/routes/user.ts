import { Express } from "express";
import { Pool } from "mysql2/promise";
import { BAD_REQUEST } from "../constants/response";
import { AddUserParams, addUser, getUsers } from "../queries/user";
import { RequestGeneric } from "../types/request";
import { isIncludeUndefined } from "../utils/request";
import { request } from "http";

export const setUserRoutes = (app: Express, conn: Pool) => {
  app.get("/users", async (req, res) => {
    const response = await getUsers(conn);
    res.status(response.code).json(response); //성공시 code=200 실패시code=500
  });

  app.post("/users", async (req: RequestGeneric<AddUserParams>, res) => {
    if (!req.body || isIncludeUndefined(req.body)) {
      return BAD_REQUEST;
    }
    const response = await addUser(conn, req.body);
    console.log("res?", response);
    res.status(response.code).json(response);
  });
  app.post("/login", async (req, res) => {
    const userId = req.body.userId;
    const userPw = req.body.userPw;
    const isUser = (await conn.query(
      "SELECT * FROM user WHERE login_id = ? AND login_password = ?",
      [userId, userPw]
    )) as any;
    const result = isUser[0];
    console.log("isUser:", isUser);
    console.log("result:", result);
    if (Array.isArray(result) && result.length > 0) {
      if (req.session) {
        req.session.uid = result[0].id;
        req.session.user_id = result[0].login_id;
        req.session.isLogined = true;
        req.session.save(function () {
          res.redirect("/");
        });
        console.log("req.session:", req.session);
        console.log("result:", result[0]);
      } else {
        console.log("3");
      }
    } else {
      console.log("result no id");
    }
  });
};
