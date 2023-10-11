import { Express } from "express";
import { Pool } from "mysql2/promise";
import {
  getListByPage,
  getListByPageAndUser,
  getListLength,
  getListLengthByUser,
} from "../queries/intergrate";
import { BAD_REQUEST } from "../constants/response";
export const setIntergratedRoutes = (app: Express, conn: Pool) => {
  const queryType = ["recipe", "place", "counseling", "news"];
  queryType.map((type) => {
    app.get(`/${type}_num`, async (req, res) => {
      const { nickname } = req.query;
      if (!nickname) {
        const response = await getListLength(conn, type);
        res.status(response.code).json(response);
      } else {
        const params = { type: type, writer: nickname };
        const response = await getListLengthByUser(conn, params);
        res.status(response.code).json(response);
      }
    });
    app.get(`/list/${type}`, async (req, res) => {
      console.log("1");
      if (!req.query) return BAD_REQUEST;
      const { page, size, nickname } = req.query;
      if (page === undefined || size === undefined) return BAD_REQUEST;
      if (!nickname) {
        console.log("page:", page);
        console.log("size:", size);
        const params = { type: type, page: +page, size: +size };
        const response = await getListByPage(conn, params);
        res.status(response.code).json(response);
        console.log("1");
      } else {
        const params = {
          writer: nickname,
          type: type,
          page: +page,
          size: +size,
        };
        const response = await getListByPageAndUser(conn, params);
        res.status(response.code).json(response);
        console.log("2");
      }
    });
  });
};
