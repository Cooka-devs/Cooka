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
      const result = await conn.execute(`WITH UserLikes AS (
        SELECT
          u.nickname AS user_nickname,
          r.id AS recipe_id,
          COUNT(DISTINCT rl.user_id) AS recipe_likes_count,
          p.id AS place_id,
          COUNT(DISTINCT pl.user_id) AS place_likes_count,
          c.id AS counseling_id,
          COUNT(DISTINCT cl.user_id) AS counseling_likes_count
        FROM user u
        LEFT JOIN recipe r ON u.nickname = r.writer
        LEFT JOIN recipe_likes rl ON r.id = rl.recipe_id
        LEFT JOIN place p ON u.nickname = p.writer
        LEFT JOIN place_likes pl ON p.id = pl.place_id
        LEFT JOIN counseling c ON u.nickname = c.writer
        LEFT JOIN counseling_likes cl ON c.id = cl.counseling_id
        GROUP BY u.nickname, r.id, p.id, c.id
      ),
      UserTotalLikes AS (
        SELECT
          user_nickname,
          SUM(recipe_likes_count + place_likes_count + counseling_likes_count) AS total_likes
        FROM UserLikes
        GROUP BY user_nickname
      )SELECT
        u.*
      FROM UserTotalLikes utl
      JOIN user u ON utl.user_nickname = u.nickname
      ORDER BY utl.total_likes DESC
      LIMIT 4`);
      return makeSuccessResponse(result[0]);
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
