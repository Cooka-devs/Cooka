import mysql, { Pool } from "mysql2/promise";

export const connectDB = async (cb: (connection: Pool) => void) => {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    await pool.query("SELECT * from user");
    console.log("DB Connection Success: ");
    cb(pool);
  } catch (err) {
    console.log("DB Connection Error: ", err);
  }
};
