import { Express } from "express";
import { Pool } from "mysql2/promise";
import { addComment, getComment } from "../queries/comment";
import { isIncludeUndefined } from "../utils/request";
import { BAD_REQUEST } from "../constants/response";
import { RequestGeneric } from "../types/request";
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
          return BAD_REQUEST;
        }
        const response = await addComment(conn, {
          ...req.body,
          type: type,
        });
        res.status(response.code).json(response);
      }
    );
    app.get(`/${type}`, async (req, res) => {
      const response = await getComment(conn, type);
      res.status(response.code).json(response);
    });
  });
};
