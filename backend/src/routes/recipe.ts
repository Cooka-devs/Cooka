import { Express } from "express";
import { Pool } from "mysql2/promise";
import { AddRecipeListParams, addRecipe } from "../queries/recipe";
import { RequestGeneric } from "../types/request";
import { isIncludeUndefined } from "../utils/request";
import { BAD_REQUEST } from "../constants/response";
export const setRecipeRoutes = (app: Express, conn: Pool) => {
  app.post("/recipe", async (req: RequestGeneric<AddRecipeListParams>, res) => {
    console.log(req.body);
    if (!req.body || isIncludeUndefined(req.body)) {
      console.log("1");
      return BAD_REQUEST;
    }
    const response = await addRecipe(conn, req.body);
    res.status(response.code).json(response);
  });
};
