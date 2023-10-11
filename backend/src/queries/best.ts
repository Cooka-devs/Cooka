import { DB_QUERY_ERROR } from "../constants/response";
import { QueriesFunctionWithType } from "../types/queries";
import { makeSuccessResponse } from "../utils/response";

export const getBest: QueriesFunctionWithType = async (conn, type) => {
  try {
    if (type === "recipe") {
      const result = await conn.execute(`SELECT r.* FROM recipe AS r INNER JOIN
        ( SELECT recipe_id FROM recipe_likes AS rl GROUP BY recipe_id ORDER BY COUNT(*) DESC LIMIT 4 )
         rl ON r.id = rl.recipe_id`);
      return makeSuccessResponse(result[0]);
    } else if (type === "chef") {
      return makeSuccessResponse([]);
    } else if (type === "place") {
      const result = await conn.execute(`SELECT p.* FROM place AS p INNER JOIN
        ( SELECT place_id FROM place_likes AS pl GROUP BY place_id ORDER BY COUNT(*) DESC LIMIT 4 )
         pl ON p.id = pl.place_id`);
      return makeSuccessResponse(result[0]);
    } else if (type === "counseling") {
      const result = await conn.execute(
        `SELECT c.* FROM counseling AS c INNER JOIN 
        ( SELECT counseling_id FROM counseling_likes AS cl GROUP BY counseling_id ORDER BY COUNT(*) DESC LIMIT 4 )
         cl ON c.id = cl.counseling_id`
      );
      return makeSuccessResponse(result[0]);
    } else {
      return DB_QUERY_ERROR;
    }
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};
