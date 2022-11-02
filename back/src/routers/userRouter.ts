import * as express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import userService from "../services/userService";

const userRouter = express.Router();

// GET: 유저리스트 확인 기능
const userList = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const allUsers = await userService.getAllUsers();
    console.log(allUsers);
    res.status(200).json(allUsers);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "userList api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    res.status(200).json(result_err);
  }
};

// POST: 회원가입 기능
const userRegister = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const nickname = req.body.nickname;
    const newUser = await userService.addUser({ email, password, nickname });
    console.log(newUser);
    res.status(200).json(newUser);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "userRegister api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    res.status(200).json(result_err);
  }
};
// POST: 로그인
const userLogin = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const logedinUser = await userService.getUser({ email, password });
    console.log(logedinUser);
    res.status(200).json(logedinUser);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "userLogin api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    res.status(200).json(result_err);
  }
};
// POST: 회원정보 수정
const userUpdate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const email = req.email;
    const currentPassword = req.body.currentPassword;
    const password = req.body.password;
    const nickname = req.body.nickname;
    const updateUser = await userService.updateUser({
      email,
      currentPassword,
      password,
      nickname,
    });
    console.log(updateUser);
    res.status(200).json(updateUser);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "userUpdate api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    res.status(200).json(result_err);
  }
};
// DELETE: 회원정보 삭제
const userDelete = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const email = req.email;
    const password = req.body.password;
    const deleteUser = await userService.deleteUser({
      email,
      password,
    });
    console.log(deleteUser);
    res.status(200).json(deleteUser);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "userDelete api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    res.status(200).json(result_err);
  }
};

// api index
userRouter.get("/user_list", userList);
userRouter.post("/user_register", userRegister);
userRouter.post("/user_login", userLogin);
userRouter.put("/user_update", authMiddleware, userUpdate);
userRouter.delete("/user_delete", authMiddleware, userDelete);

export = userRouter;
