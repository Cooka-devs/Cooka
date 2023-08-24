import mysql, { Pool } from "mysql2/promise";

export const connectDB = async (cb: (connection: Pool) => void) => {
  const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "cooka",
  });

  try {
    await pool.query("SELECT * from user");
    console.log("DB Connection Success: ");
    cb(pool);
  } catch (err) {
    console.log("DB Connection Error: ", err);
  }
};
