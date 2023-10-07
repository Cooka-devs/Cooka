import express from "express";
import { connectDB } from "./core/db";
import { setUserRoutes } from "./routes/user";
import bodyParser from "body-parser";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import * as expressSession from "express-session";
import mysqlSession from "express-mysql-session";
import { setRecipeRoutes } from "./routes/recipe";
import { setImageRoutes } from "./routes/image";
import path from "path";
import { setPlaceRoutes } from "./routes/place";
import { setCounselingRoutes } from "./routes/community";
import { setCommentRoutes } from "./routes/comment";
import { setLikesRoutes } from "./routes/likes";

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
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
  console.log("path.join:", path.join(__dirname, "/uploads"));
  app.use(
    session({
      secret: "cooka",
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: { maxAge: 60 * 1000 * 60 * 3 },
    })
  );

  app.get("/", (req, res) => {
    try {
      if (req.session.isLogined) {
        console.log("main req.session:", req.session);
        return res.send({
          isLogin: true,
          user_Uid: req.session.uid,
          user_Id: req.session.user_id,
          user_SocialId: req.session.social_id,
          user_loginType: req.session.login_type,
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
  setImageRoutes(app);
  setPlaceRoutes(app, pool);
  setCounselingRoutes(app, pool);
  setCommentRoutes(app, pool);
  setLikesRoutes(app, pool);
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
