import { Express } from "express";
import { Pool } from "mysql2/promise";
import {
  getListByPage,
  getListByPageAndUser,
  getListLength,
  getListLengthByUser,
  getSearchData,
  getSearchDataLength,
} from "../queries/intergrate";
import { BAD_REQUEST } from "../constants/response";
import { returnBadRequest } from "../utils/response";
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
    app.get(`/search_num/${type}`, async (req, res) => {
      if (!req.query) return returnBadRequest(res);
      const { keyword } = req.query;
      console.log(keyword);
      const params = { type: type, keyword: keyword };
      const response = await getSearchDataLength(conn, params);
      console.log(response);
      res.status(response.code).json(response);
    });
    app.get(`/search/${type}`, async (req, res) => {
      if (!req.query) return returnBadRequest(res);
      const { page, size, keyword } = req.query;
      if (page === undefined || size === undefined || keyword === undefined)
        return returnBadRequest(res);
      const params = {
        type: type,
        page: +page,
        size: +size,
        keyword: keyword,
      };
      const response = await getSearchData(conn, params);
      res.status(response.code).json(response);
    });
    app.get(`/list/${type}`, async (req, res) => {
      if (!req.query) return returnBadRequest(res);
      const { page, size, nickname } = req.query;
      if (page === undefined || size === undefined)
        return returnBadRequest(res);
      if (!nickname) {
        console.log("page:", page);
        console.log("size:", size);
        const params = { type: type, page: +page, size: +size };
        const response = await getListByPage(conn, params);
        res.status(response.code).json(response);
      } else {
        const params = {
          writer: nickname,
          type: type,
          page: +page,
          size: +size,
        };
        const response = await getListByPageAndUser(conn, params);
        res.status(response.code).json(response);
      }
    });
  });
};
