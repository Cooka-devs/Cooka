import { Pool } from "mysql2/promise";
import { BAD_REQUEST } from "../constants/response";
import { Express } from "express";
import {
  addLikes,
  deleteLikes,
  getLikes,
  getLikesNum,
  getLikesNumByUser,
} from "../queries/likes";
import { RequestGeneric } from "../types/request";
import { Request } from "express";
import { isIncludeUndefined } from "../utils/request";
import { returnBadRequest } from "../utils/response";
interface GetLikesParam {
  userId: number;
}
const routeType = ["recipe", "place", "counseling"];
export const setLikesRoutes = (app: Express, conn: Pool) => {
  routeType.map((type) => {
    app.get(`/${type}_likes_num/:id`, async (req, res) => {
      if (!("id" in req.params)) return returnBadRequest(res);
      const { user } = req.query;
      if (!user) {
        const { id } = req.params;
        const params = { type: type, id: +id };
        const response = await getLikesNum(conn, params);
        res.status(response.code).json(response);
      } else {
        const { id } = req.params;
        const params = { type: type, id: +id };
        const response = await getLikesNumByUser(conn, params);
        res.status(response.code).json(response);
      }
    });
    app.get(`/${type}_likes`, async (req, res) => {
      console.log("query:", req.query);
      if (!req.query) return returnBadRequest(res);
      const { userId, postId } = req.query;
      const params = { type: type, postId: postId, userId: userId };
      const response = await getLikes(conn, params);
      res.status(response.code).json(response);
    });
    app.delete(`/${type}_likes`, async (req, res) => {
      if (!("userId" in req.query)) return returnBadRequest(res);
      const { userId, postId } = req.query;
      const params = { type: type, postId: postId, userId: userId };
      const response = await deleteLikes(conn, params);
      res.status(response.code).json(response);
    });
    app.post(`/${type}_likes`, async (req, res) => {
      if (!req.body || isIncludeUndefined(req.body)) {
        return returnBadRequest(res);
      }

      const response = await addLikes(conn, { type: type, ...req.body });
      res.status(response.code).json(response);
    });
  });
};
