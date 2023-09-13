import mysql, { Pool } from "mysql2/promise";

export const connectDB = async (cb: (connection: Pool) => void) => {
  const pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
  });

  try {
    await pool.query("SELECT * from user");
    console.log("DB Connection Success: ");
    cb(pool);
  } catch (err) {
    console.log("DB Connection Error: ", err);
  }
};
