import { Express, Request, Response } from "express";
import { Pool } from "mysql2/promise";
import { isIncludeUndefined } from "../utils/request";
import { BAD_REQUEST } from "../constants/response";
import multer, { Multer } from "multer";
import randomstring from "randomstring";
import path from "path";
import { returnBadRequest } from "../utils/response";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const uniqueKey = Date.now() + "-" + randomstring.generate(15);
    cb(null, file.fieldname + "-" + uniqueKey + extension);
  },
});

const upload: Multer = multer({ storage: storage });
export const setImageRoutes = (app: Express) => {
  app.post("/image", upload.single("image"), async (req, res) => {
    if (!req.file || isIncludeUndefined(req.file)) {
      return returnBadRequest(res);
    }
    const imgUrl = `http://${process.env.DB_HOST}:${process.env.DB_PORT}/uploads/${req.file.filename}`;
    console.log(imgUrl);
    res.json({ imgSrc: imgUrl });
  });
};
