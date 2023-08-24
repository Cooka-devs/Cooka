import express from "express";
import { connectDB } from "./core/db";
import { setUserRoutes } from "./routes/user";
import bodyParser from "body-parser";

const PORT = 8000;

connectDB((pool) => {
  const app = express();
  app.use(bodyParser.json());

  // api endpoint -> "/"
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  setUserRoutes(app, pool);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
