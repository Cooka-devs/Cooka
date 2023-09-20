import express from "express";
import { connectDB } from "./core/db";
import { setUserRoutes } from "./routes/user";
import bodyParser from "body-parser";
import mysql from "mysql2/promise";
import { BAD_REQUEST } from "./constants/response";
import { getUsers, AddUserParams, addUser } from "./queries/user";
import { isIncludeUndefined } from "./utils/request";
import { RequestGeneric } from "./types/request";
import { makeSuccessResponse } from "./utils/response";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import * as expressSession from "express-session";
import mysqlSession from "express-mysql-session";
import { setRecipeRoutes } from "./routes/recipe";

dotenv.config();
const PORT = 8000;
export const DB_OPTIONS: mysql.PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 30,
};

connectDB((pool) => {
  const app = express();
  const MySQLStore = mysqlSession(expressSession);
  const sessionStore = new MySQLStore({}, pool as any);
  app.use(bodyParser.json());
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(
    session({
      secret: "cooka",
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
    })
  );

  app.get("/", (req, res) => {
    try {
      console.log("req.session", req.session.id);
      if (req.session.isLogined) {
        return res.send({
          isLogin: true,
          user_Uid: req.session.uid,
          user_Id: req.session.user_id,
        });
      } else {
        return res.send("nologin");
      }
    } catch (err) {
      res.status(500).json({ error: "mainpage error", message: err });
    }
  });
  setRecipeRoutes(app, pool);
  setUserRoutes(app, pool);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
