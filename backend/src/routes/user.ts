import { Express } from "express";
import { Pool } from "mysql2/promise";
import { BAD_REQUEST } from "../constants/response";
import {
  AddUserParams,
  GetPwParams,
  addUser,
  checkLoginId,
  checkNickname,
  checkPhone,
  getUserById,
  getUsers,
  updateUserImage,
  updateUserText,
} from "../queries/user";
import { RequestGeneric } from "../types/request";
import { isIncludeUndefined } from "../utils/request";
import { getPw } from "../queries/user";
import { returnBadRequest } from "../utils/response";
interface SocialLoginProps {
  id: number;
  login_id: string;
  login_type: string;
  social_id: number;
  token: string;
}
export const setUserRoutes = (app: Express, conn: Pool) => {
  app.get("/users", async (req, res) => {
    const response = await getUsers(conn);
    res.status(response.code).json(response);
  });

  app.get("/users/loginId", async (req, res) => {
    if (!req.query) return returnBadRequest(res);
    const { login_id } = req.query;
    const response = await checkLoginId(conn, login_id);
    res.status(response.code).json(response);
  });

  app.get("/users/phone", async (req, res) => {
    if (!req.query) return returnBadRequest(res);
    const { phone_number } = req.query;
    const response = await checkPhone(conn, phone_number);
    res.status(response.code).json(response);
  });

  app.get("/users/nickname", async (req, res) => {
    if (!req.query) return returnBadRequest(res);
    const { nickname } = req.query;
    console.log(nickname);
    const response = await checkNickname(conn, nickname);
    res.status(response.code).json(response);
  });

  app.get("/users/:id", async (req, res) => {
    if (!("id" in req.params)) return returnBadRequest(res);
    const { id } = req.params;
    const response = await getUserById(conn, +id);
    res.status(response.code).json(response);
  });

  app.post("/pw", async (req: RequestGeneric<GetPwParams>, res) => {
    const response = await getPw(conn, req.body);
    res.status(response.code).json(response.data);
  });

  app.post("/users", async (req: RequestGeneric<AddUserParams>, res) => {
    if (!req.body || isIncludeUndefined(req.body)) {
      return returnBadRequest(res);
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
          req.session.login_type = result[0].login_type;
          req.session.social_id = result[0].social_id;
          console.log("OK");
          req.session.save((err) => {
            if (err) {
              console.log("3");
              res.status(400).json({ message: err });
            }
            console.log("세션이 저장되었습니다.");
            res.header("Access-Control-Expose-Headers", "Set-Cookie");
            res.status(200).json({ message: req.sessionID });
          });
        } else {
          console.log("session error");
        }
      } else {
        res.status(202).json({ message: "no id" });
      }
    } catch (err) {
      res.status(500).json({ error: "post login error", message: err });
    }
  });

  app.post(
    "/login/social",
    async (req: RequestGeneric<SocialLoginProps>, res) => {
      try {
        console.log("req.body:", req.body);
        if (req.session) {
          req.session.uid = req.body.id;
          req.session.user_id = req.body.login_id;
          req.session.isLogined = true;
          req.session.login_type = req.body.login_type;
          req.session.social_id = req.body.social_id;
          req.session.token = req.body.token;
          console.log("OK");
          req.session.save((err) => {
            if (err) {
              console.log("session save error");
              res.status(400).json({ message: err });
            }
            console.log("세션이 저장되었습니다.");
            console.log("session:", req.session);
            res.header("Access-Control-Expose-Headers", "Set-Cookie");
            res.status(200).json({ message: req.sessionID });
          });
        } else {
          console.log("session error");
        }
      } catch (err) {
        res.status(500).json({ error: "post login error", message: err });
      }
    }
  );

  app.get("/logout", async (req, res) => {
    try {
      if (req.session.social_id === 1) {
        console.log("kakaologout");
        fetch("https://kapi.kakao.com/v1/user/unlink", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${req.session.token}`,
          },
        });
      }
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

  app.put(`/user/image/:id`, async (req, res) => {
    if (!("id" in req.params)) return returnBadRequest(res);
    const { id } = req.params;
    const { profile_img } = req.body;
    const response = await updateUserImage(conn, {
      id: +id,
      profile_img,
    });
    res.status(response.code).json(response);
  });

  app.put(`/user/text/:id`, async (req, res) => {
    if (!("id" in req.params)) return returnBadRequest(res);
    const { id } = req.params;
    const { profile_text } = req.body;
    const response = await updateUserText(conn, {
      id: +id,
      profile_text,
    });
    res.status(response.code).json(response);
  });
};
