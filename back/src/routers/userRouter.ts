// import express from "express";
import express, { Request, Response, NextFunction } from "express";
import { RequestHandler } from "express";
import promisePool from "../db/database";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler";
// import login_required from "../middlewares/login_required";
// import moment from "moment-timezone";
// moment.tz.setDefault("Asia/Seoul");
// import upload from "../middlewares/image_upload";
// import { Response } from "express";

const userRouter = express.Router();

// GET: 유저리스트 확인 기능
const userList = async (
  req: Request<{}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const [rows, fields] = await promisePool.query("SELECT * FROM users");
    const rowsString = JSON.stringify(rows);
    const rowsObject = JSON.parse(rowsString);
    for (let i = 0; i < rowsObject.length; i++) {
      delete rows[i].password;
    }
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

// POST: 회원가입 기능
const userRegister = async (
  req: Request<{}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const nickname = req.body.nickname;
    // 이메일 중복 확인
    const duplicatedEmail = await promisePool
      .query({
        sql: "SELECT * FROM users WHERE `email` = ? ",
        values: [email],
      })
      .then(([rows, fields]) => {
        if (JSON.stringify(rows) !== "[]") {
          const result_errMail = {
            result: false,
            cause: "email",
            message:
              "입력하신 email로 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.",
          };
          console.log(result_errMail);
          res.status(200).json(result_errMail);
          return false;
        } else {
          const addUser = promisePool
            .query({
              sql: "INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)",
              values: [email, password, nickname],
            })
            .then(([rows, fields]) => {
              const result_success = {
                result: true,
                cause: "success",
                message: "회원가입이 성공적으로 이뤄졌습니다.",
              };
              console.log(result_success);
              res.status(200).json(result_success);
            });
        }
      });
  } catch (err) {
    next(err);
  }
};

// api index
userRouter.get("/userlist", userList);
// userRouter.post("/userRegister", asyncHandler(userRegister));
userRouter.post("/userRegister", userRegister);

export = userRouter;
