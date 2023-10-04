import { Express } from "express";
import { Pool } from "mysql2/promise";
import { BAD_REQUEST } from "../constants/response";
import {
  AddRecipeListParams,
  addRecipe,
  deleteRecipe,
  getLikedRecipes,
  getRecipe,
  updateRecipe,
} from "../queries/recipe";
import { RequestGeneric } from "../types/request";
import { isIncludeUndefined } from "../utils/request";
import { deleteCommentsByPostId } from "../queries/comment";

export const setRecipeRoutes = (app: Express, conn: Pool) => {
  app.post("/recipe", async (req: RequestGeneric<AddRecipeListParams>, res) => {
    if (!req.body || isIncludeUndefined(req.body)) {
      console.log("1");
      return BAD_REQUEST;
    }
    const response = await addRecipe(conn, req.body);
    res.status(response.code).json(response);
  });
  app.get("/recipe", async (req, res) => {
    const response = await getRecipe(conn);
    res.status(response.code).json(response);
  });

  app.delete("/recipe/:id", async (req, res) => {
    if (!("id" in req.params)) return BAD_REQUEST;
    const { id } = req.params;
    const response = await deleteRecipe(conn, { id: +id });
    await deleteCommentsByPostId(conn, { id: +id, type: "recipe_comment" });
    res.status(response.code).json({ message: "삭제되었습니다" });
  });

  app.put("/recipe/:id", async (req, res) => {
    if (!("id" in req.params)) return BAD_REQUEST;
    if (!req.body || isIncludeUndefined(req.body)) return BAD_REQUEST;
    const { id } = req.params;
    const response = await updateRecipe(conn, { id: +id, ...req.body });
    res.status(response.code).json(response);
  });
  app.get("/recipe/:id", async (req, res) => {
    if (!("id" in req.params)) return BAD_REQUEST;
    const { id } = req.params;
    const response = await getLikedRecipes(conn, { id: +id });
    res.status(response.code).json(response);
  });
};
