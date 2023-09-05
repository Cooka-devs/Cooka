import express from "express";
import { connectDB } from "./core/db";
import { setUserRoutes } from "./routes/user";
import bodyParser from "body-parser";
import mysql from "mysql2/promise";
import { BAD_REQUEST } from "./constants/response";
import { getUsers, AddUserParams, addUser } from "./queries/user";
import { isIncludeUndefined } from "./utils/request";
import { RequestGeneric } from "./types/request";
import { makeSuccessResponse } from "./utils/response";
//package.json에서 "main": "src/index.ts"이므로 여기서부터 시작
const PORT = 8000; // port를 8000번으로

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

const testconnect = async () => {
  //connection이란 클라이언트(애플리케이션)측에서 데이터베이스에 접속해서 질의를 수행한 후,
  //결과를 받고 접속을 종료하는 일련의 과정을 의미한다.

  // 사용자의 요청에 따라 Connection을 생성하다 보면 많은 수의 연결이 발생했을 때 서버에 과부하가 걸리게 된다.
  // 이러한 상황을 방지하기 위해 미리 일정수의 Connection을 만들어 Pool에 담아뒀다가
  // 사용자의 요청이 발생하면 연결을 해주고 연결 종료 시 Pool에 다시 반환하여 보관하는 것이 바로 Connection Pool이다.
  // 이러한 Connection Pool은 Connection을 미리 생성해두고 관리함으로써
  // 데이터베이스에 과부하를 방지하고 유동적으로 Connection을 관리할 수 있다는 장점이 있다.
  const pool = mysql.createPool({
    //새로운 pool생성
    host: "localhost",
    user: "root",
    password: "",
    database: "cooka",
  }); //creatPool의 형식에 맞춰서

  try {
    await pool.query("SELECT * from user");
    //query란 데이터베이스로부터 데이터를 요청하는 방법을 의미.
    //생성한 pool에 get user 요청
    console.log("DB Connection Success: ");
    const app = express(); //앱생성
    app.use(bodyParser.json()); //json방식의 content-Type 데이터를받아준다 <=> bodyParser.text() 는text/xml 방식의 content_Type 데이터를 받아줌.

    // api endpoint -> "/"
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.get("/users", async (req, res) => {
      //" get users" 요청시
      const response = await getUsers(pool); //makeSuccessResponse 형태로 response에 저장됨 (code,data,message)
      res.status(response.code).json(response); //status 성공시 code200과 getUser로 리턴받은 첫번째 user정보로 응답
    });

    app.post("/users", async (req: RequestGeneric<AddUserParams>, res) => {
      //"post users" 요청시
      if (!req.body || isIncludeUndefined(req.body)) {
        //req.body가 없거나 undefined 일시
        return BAD_REQUEST;
      }
      const response = await addUser(pool, req.body);
      console.log("res?", response);
      res.status(response.code).json(response);
    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("DB Connection Error: ", err);
  }
};
