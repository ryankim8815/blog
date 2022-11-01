import express from "express";
import promisePool from "../db/database";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler";
// import login_required from "../middlewares/login_required";
// import moment from "moment-timezone";
// moment.tz.setDefault("Asia/Seoul");
// import upload from "../middlewares/image_upload";

const userRouter = express.Router();

// GET: 유저리스트 확인 기능
const userList = async (req: any, res: JSON[], next: any) => {
  try {
    const [rows, fields] = await promisePool.query("SELECT * FROM users");
    console.log("rows: ", rows);
    console.log("typeof rows: ", typeof rows);
    // for (let i = 0; i < rows.length; i++) {
    //   delete rows[i].password;
    // }
    // res.status(200).json(results);
  } catch (err) {
    next(err);
  }
};

// api index
userRouter.get("/userlist", asyncHandler(userList));

module.exports = userRouter;
