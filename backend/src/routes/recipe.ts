import { Express } from "express";
import { Pool } from "mysql2/promise";
import { BAD_REQUEST } from "../constants/response";
import {
  AddRecipeListParams,
  addRecipe,
  deleteRecipe,
  getLikedRecipes,
  getRecipe,
  getRecipeById,
  updateRecipe,
} from "../queries/recipe";
import { RequestGeneric } from "../types/request";
import { isIncludeUndefined } from "../utils/request";
import { deleteCommentsByPostId } from "../queries/comment";
import { returnBadRequest } from "../utils/response";

export const setRecipeRoutes = (app: Express, conn: Pool) => {
  app.post("/recipe", async (req: RequestGeneric<AddRecipeListParams>, res) => {
    if (!req.body || isIncludeUndefined(req.body)) {
      console.log("1");
      return returnBadRequest(res);
    }
    const response = await addRecipe(conn, req.body);
    res.status(response.code).json(response);
  });
  app.get("/recipe", async (req, res) => {
    const response = await getRecipe(conn);
    res.status(response.code).json(response);
  });

  app.delete("/recipe/:id", async (req, res) => {
    if (!("id" in req.params)) return returnBadRequest(res);
    const { id } = req.params;
    const response = await deleteRecipe(conn, { id: +id });
    await deleteCommentsByPostId(conn, { id: +id, type: "recipe_comment" });
    res.status(response.code).json({ message: "삭제되었습니다" });
  });

  app.put("/recipe/:id", async (req, res) => {
    if (!("id" in req.params)) return returnBadRequest(res);
    if (!req.body || isIncludeUndefined(req.body)) return returnBadRequest(res);
    const { id } = req.params;
    const response = await updateRecipe(conn, { id: +id, ...req.body });
    res.status(response.code).json(response);
  });
  app.get("/recipe/:id", async (req, res) => {
    if (!("id" in req.params)) return returnBadRequest(res);
    const { id } = req.params;
    const { size, page } = req.query;
    if (!size || !page) {
      const response = await getRecipeById(conn, { id: +id });
      res.status(response.code).json(response);
    } else {
      console.log("size:", size);
      console.log("page:", page);
      const response = await getLikedRecipes(conn, {
        id: +id,
        size: +size,
        page: +page,
      });
      res.status(response.code).json(response);
    }
  });
};
