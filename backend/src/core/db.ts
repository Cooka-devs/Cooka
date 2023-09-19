import mysql, { Pool } from "mysql2/promise";
import { DB_OPTIONS } from "..";

export const connectDB = async (cb: (connection: Pool) => void) => {
  const pool = mysql.createPool(DB_OPTIONS);

  try {
    await pool.query("SELECT * from user");
    console.log("DB Connection Success: ");
    cb(pool);
  } catch (err) {
    console.log("DB Connection Error: ", err);
  }
};
