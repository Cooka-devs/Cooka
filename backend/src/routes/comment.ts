import { Express } from "express";
import { Pool } from "mysql2/promise";
import {
  addComment,
  deleteComment,
  getComment,
  getCommentsNum,
  getMyComments,
  updateComment,
  getMyCommentsNum,
  getCommentsByPostId,
} from "../queries/comment";
import { isIncludeUndefined } from "../utils/request";
import { BAD_REQUEST } from "../constants/response";
import { RequestGeneric } from "../types/request";
import { returnBadRequest } from "../utils/response";
interface AddCommentListParamsNoType {
  writer: string;
  content: string;
  postId: number;
}
const routeType = ["recipe_comment", "place_comment", "counseling_comment"];
export const setCommentRoutes = (app: Express, conn: Pool) => {
  routeType.map((type) => {
    app.post(
      `/${type}`,
      async (req: RequestGeneric<AddCommentListParamsNoType>, res) => {
        if (!req.body || isIncludeUndefined(req.body)) {
          return returnBadRequest(res);
        }
        const response = await addComment(conn, {
          ...req.body,
          type: type,
        });
        res.status(response.code).json(response);
      }
    );
    app.get(`/${type}/:id`, async (req, res) => {
      if (!("id" in req.params)) return returnBadRequest(res);
      const { id } = req.params;
      const response = await getCommentsByPostId(conn, { id: +id, type: type });
      res.status(response.code).json(response);
    });
    app.get(`/${type}`, async (req, res) => {
      const { nickname, size, page } = req.query;
      if (!nickname || !size || !page) {
        const response = await getComment(conn, type);
        res.status(response.code).json(response);
      } else {
        const nicknameStringType = String(nickname);
        const response = await getMyComments(conn, {
          nickname: nicknameStringType,
          size: +size,
          page: +page,
          type: type,
        });
        res.status(response.code).json(response);
      }
    });
    app.put(`/${type}/:id`, async (req, res) => {
      if (!("id" in req.params)) return returnBadRequest(res);
      if (!req.body || isIncludeUndefined(req.body))
        return returnBadRequest(res);
      const { id } = req.params;
      const response = await updateComment(conn, {
        id: +id,
        type: type,
        ...req.body,
      });
      res.status(response.code).json(response);
    });
    app.delete(`/${type}/:id`, async (req, res) => {
      if (!("id" in req.params)) return returnBadRequest(res);
      const { id } = req.params;
      const response = await deleteComment(conn, {
        id: +id,
        type: type,
      });
      res.status(response.code).json(response);
    });
    app.get(`/${type}_num/:id`, async (req, res) => {
      if (!("id" in req.params)) return returnBadRequest(res);
      const { id } = req.params;
      const response = await getCommentsNum(conn, { type: type, id: +id });
      res.status(response.code).json(response);
    });
    app.get(`/list/${type}`, async (req, res) => {
      const { nickname } = req.query;
      if (!nickname) return returnBadRequest(res);
      const nicknameStringType = String(nickname);
      const response = await getMyCommentsNum(conn, {
        type: type,
        nickname: nicknameStringType,
      });
      res.status(response.code).json(response);
    });
  });
};
