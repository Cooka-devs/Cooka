import { Express } from "express";
import { Pool } from "mysql2/promise";
import { BAD_REQUEST } from "../constants/response";
import { AddUserParams, addUser, getUsers } from "../queries/user";
import { RequestGeneric } from "../types/request";
import { isIncludeUndefined } from "../utils/request";
import { request } from "http";
import { getPw } from "../queries/user";

export const setUserRoutes = (app: Express, conn: Pool) => {
  app.get("/users", async (req, res) => {
    console.log();
    const response = await getUsers(conn);
    res.status(response.code).json(response); //성공시 code=200 실패시code=500
  });
  app.post("/pw", async (req, res) => {
    const response = await getPw(conn, req.body);
    res.status(response.code).json(response.data);
  });
  app.post("/users", async (req: RequestGeneric<AddUserParams>, res) => {
    if (!req.body || isIncludeUndefined(req.body)) {
      return BAD_REQUEST;
    }
    const response = await addUser(conn, req.body);
    res.status(response.code).json(response);
  });

  app.post("/login", async (req, res) => {
    try {
      const userId = req.body.userId;
      const userPw = req.body.userPw;
      const isUser = (await conn.query(
        "SELECT * FROM user WHERE login_id = ? AND login_password = ?",
        [userId, userPw]
      )) as any;
      const result = isUser[0];
      if (Array.isArray(result) && result.length > 0) {
        if (req.session) {
          req.session.uid = result[0].id;
          req.session.user_id = result[0].login_id;
          req.session.isLogined = true;
          console.log("OK");
          req.session.save((err) => {
            if (err) {
              res.status(400).json({ message: err });
            }
            console.log("세션이 저장되었습니다.");
            res.header("Access-Control-Expose-Headers", "Set-Cookie");
            res.status(200).json({ message: req.sessionID });
          });
        } else {
          console.log("no session");
        }
      } else {
        console.log("result no id");
      }
    } catch (err) {
      res.status(500).json({ error: "post login error", message: err });
    }
  });
  app.get("/logout", async (req, res) => {
    try {
      req.session.destroy((err) => {
        req.session;
        if (err) {
          console.log("logout 400");
          res.status(400).json({ message: err });
        }
        console.log("logout 200");
        res.status(200).json({ message: req.sessionID });
      });
    } catch (err) {
      console.log("logout 500");
      res.status(500).json({ error: "get logout error", message: err });
    }
  });
};
