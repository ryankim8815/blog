import * as express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadMiddleware";
import userService from "../services/userService";
// import asyncHandler from "../utils/asyncHandler";
import type { MulterFile } from "../customType/multer.d";
const userRouter = express.Router();

/**
 * @swagger
 * /user/list:
 *   get:
 *     summary: 전체 사용자 리스트 조회
 *     description: 요청 시 보내야 하는 값이 없습니다.
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: boolean
 *                   example: 모든 사용자 조회가 성공적으로 이뤄졌습니다.
 *                 count:
 *                   type: int
 *                   example: 10000
 *                 list:
 *                   type: array
 *                   items:
 *                        type: object
 *                        properties:
 *                          email:
 *                            type: string
 *                          nickname:
 *                            type: string
 *                          provider:
 *                            type: string
 *                          created_at:
 *                            type: string
 *                        example:
 *                          - email: dev1@dogfoot.info
 *                            nickname: dogfoot_1
 *                            provider: kakao
 *                            created_at: 2022-11-03T04:52:32.000Z
 *                          - email: dev2@dogfoot.info
 *                            nickname: dogfoot_2
 *                            provider: naver
 *                            created_at: 2022-11-03T05:47:45.000Z
 */
// GET: 사용자 리스트 조회 기능
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

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: 전체 사용자 리스트를 반환 합니다.
 *     description: 요청 시 보내야 하는 값들은 아래와 같습니다.
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: boolean
 *                   example: 모든 사용자 조회가 성공적으로 이뤄졌습니다.
 *                 count:
 *                   type: int
 *                   example: 10000
 *                 list:
 *                   type: array
 *                   items:
 *                        type: object
 *                        properties:
 *                          email:
 *                            type: string
 *                          nickname:
 *                            type: string
 *                          provider:
 *                            type: string
 *                          created_at:
 *                            type: string
 *                        example:
 *                          - email: dev1@dogfoot.info
 *                            nickname: dogfoot_1
 *                            provider: kakao
 *                            created_at: 2022-11-03T04:52:32.000Z
 *                          - email: dev2@dogfoot.info
 *                            nickname: dogfoot_2
 *                            provider: naver
 *                            created_at: 2022-11-03T05:47:45.000Z
 */
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
//// POST: 프로필 사진 업로드
const userUploadImage = async (
  req: express.Request & { files: MulterFile[] },
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const email = req.email;
    // const old_filename = req.filename;
    const new_filename = req.file.filename;
    console.log("new_filename: ", new_filename);
    const uploadUserImage = await userService.uploadUserImage({
      email,
      new_filename,
    });
    console.log(uploadUserImage);
    res.status(200).json(uploadUserImage);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "uploadUserImage api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    res.status(200).json(result_err);
  }
};

// api index
userRouter.get("/user/list", userList); // 전체 유저 검섹
userRouter.post("/user/register", userRegister); // 자체 회원가입
userRouter.post("/user/login", userLogin); // 로그인
userRouter.put("/user/update", authMiddleware, userUpdate); // 유저 정보 업데이트(pw & nickname)
userRouter.delete("/user/delete", authMiddleware, userDelete); // 유저 삭제
userRouter.post(
  "/user/upload_image",
  authMiddleware,
  upload.single("file"),
  userUploadImage
); // 프로필 사진 업로드(기존 사진 자동 삭제)

export = userRouter;
