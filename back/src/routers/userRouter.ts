import * as express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import uploadMiddleware from "../middlewares/uploadMiddleware";
import * as validation from "../middlewares/userValidationMiddleware";
import userService from "../services/userService";
// import asyncHandler from "../utils/asyncHandler";
import type { MulterFile } from "../customType/multer.d";
const userRouter = express.Router();

// GET: 사용자 리스트 조회 기능
const userList = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const allUsers = await userService.getAllUsers();
    console.log(allUsers);
    return res.status(200).json(allUsers);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "userList api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    return res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /users:
 *   get:
 *     summary: 전체 사용자 조회
 *     description: 초기에는 관리자만 가능하도록 할 예정입니다.
 *     tags: ["userRouter"]
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
 *                   type: string
 *                   example: 모든 사용자 조회가 성공적으로 이뤄졌습니다.
 *                 count:
 *                   type: int
 *                   example: 10000
 *                 list:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     nickname:
 *                       type: string
 *                     provider:
 *                       type: string
 *                     created_at:
 *                       type: timstamp
 *                   example:
 *                     - email: dev1@dogfoot.info
 *                       nickname: dogfoot_1
 *                       provider: kakao
 *                       created_at: 2022-11-03T04:52:32.000Z
 *                     - email: dev2@dogfoot.info
 *                       nickname: dogfoot_2
 *                       provider: naver
 *                       created_at: 2022-11-01T01:01:01.000Z
 */

// GET: 현재 사용자 정보 조회 기능
const userCurrent = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // const email = req.email;
    const user_id = req.body.user_id;
    // console.log("라우터에서 토큰 확인: ", user_id);
    const currentUser = await userService.getCurrentUser({ user_id });
    console.log(currentUser);
    return res.status(200).json(currentUser);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "userCurrent api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    return res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /user:
 *   get:
 *     summary: 현재 사용자 조회
 *     description: 현재 로그인된 사용자 정보를 조회합니다.
 *     tags: ["userRouter"]
 *     security:
 *       - bearerAuth: []
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
 *                   type: string
 *                   example: 현재 사용자 정보 조회가 성공적으로 이뤄졌습니다.
 *                 email:
 *                   type: string
 *                 nickname:
 *                   type: string
 *                 provider:
 *                   type: string
 *                 created_at:
 *                   type: timstamp
 *                   example:
 *                     email: dev1@dogfoot.info
 *                     nickname: dogfoot_1
 *                     provider: kakao
 *                     created_at: 2022-11-03T04:52:32.000Z
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
    return res.status(200).json(newUser);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "userRegister api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    return res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: 회원가입
 *     description: email과 nickname은 중복 검사가 필요합니다.
 *     tags: ["userRouter"]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@dogfoot.info
 *               password:
 *                 type: string
 *                 example: password1234
 *               nickname:
 *                 type: string
 *                 example: userNickname
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
 *                   type: string
 *                   example: ${nickname}님의 회원가입이 성공적으로 이뤄졌습니다.
 */

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
    return res.status(200).json(logedinUser);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "userLogin api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    return res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /signin:
 *   post:
 *     summary: 로그인
 *     description: email과 password가 필요합니다.
 *     tags: ["userRouter"]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@dogfoot.info
 *               password:
 *                 type: string
 *                 example: password1234
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
 *                   type: string
 *                   example: ${nickname}님의 회원가입이 성공적으로 이뤄졌습니다.
 *                 token:
 *                   type: string
 *                   example: awj32ew86tgcvwstudggaiqa98yiqgdiqyas238ewyufdhjv29qiaedz87iyhvd
 *                 email:
 *                   type: string
 *                   example: user@dogfoot.info
 *                 nickname:
 *                   type: string
 *                   example: bowwow
 *                 profile_image:
 *                   type: string
 *                   example: file-1234405177970-416354969.png
 *                 admin:
 *                   type: int
 *                   example: 0
 *                 provider:
 *                   type: string
 *                   example: dogfoot
 *                 created_at:
 *                   type: timestamp
 *                   example: 2022-11-01T01:01:01.000Z
 */

// POST: 회원정보 수정
const userUpdate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // const email = req.email;
    const user_id = req.body.user_id;
    // console.log("user_id: ", user_id);
    const currentPassword = req.body.currentPassword;
    const password = req.body.password;
    const nickname = req.body.nickname;
    const updateUser = await userService.updateUser({
      user_id,
      currentPassword,
      password,
      nickname,
    });
    console.log(updateUser);
    return res.status(200).json(updateUser);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "userUpdate api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    return res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /user:
 *   put:
 *     summary: 회원정보 수정
 *     description: 회원정보 수정 시에도 nickname은 중복 검사가 필요합니다.
 *     tags: ["userRouter"]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: new_password
 *               currentPassword:
 *                 type: string
 *                 example: current_password
 *               nickname:
 *                 type: string
 *                 example: new_nickname
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
 *                   type: string
 *                   example: ${nickname}님의 회원정보 수정이 성공적으로 이뤄졌습니다.
 */

// DELETE: 회원정보 삭제
const userDelete = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // const email = req.email;
    const user_id = req.body.user_id;
    const password = req.body.password;
    const deleteUser = await userService.deleteUser({
      user_id,
      password,
    });
    console.log(deleteUser);
    return res.status(200).json(deleteUser);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "userDelete api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    return res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /user:
 *   delete:
 *     summary: 회원정보 삭제
 *     description: 한번 삭제한 사용자는 복구할 수 없습니다.
 *     tags: ["userRouter"]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: password1234
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
 *                   type: string
 *                   example: ${nickname}님의 회원정보 삭제가 성공적으로 이뤄졌습니다.
 */

//// POST: 프로필 사진 업로드
const userUploadImage = async (
  req: express.Request & { files: MulterFile[] },
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // const email = req.email;
    const user_id = req.body.user_id;
    // const old_filename = req.filename;
    const new_filename = req.file.filename;
    // console.log("new_filename: ", new_filename);
    const uploadUserImage = await userService.uploadUserImage({
      user_id,
      new_filename,
    });
    console.log(uploadUserImage);
    return res.status(200).json(uploadUserImage);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "uploadUserImage api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    return res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /user:
 *   post:
 *     summary: 프로필 사진 업로드
 *     description: 확장자, 사이즈, 용량 제한에 대한 사항은 아직 미정입니다.
 *     tags: ["userRouter"]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *        multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                type: string
 *                format: binary
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
 *                   type: string
 *                   example: ${nickname}님의 프로필 사진 업데이트가 성공적으로 이뤄졌습니다.
 */

// api index
userRouter.get("/users", userList); // 전체 사용자 검섹
userRouter.get(
  "/user",
  authMiddleware,
  validation.validateUserCurrent,
  userCurrent
); // 현재 사용자 정보 조회
userRouter.post("/signup", validation.validateUserCreate, userRegister); // 자체 회원가입
userRouter.post("/signin", validation.validateUserLogin, userLogin); // 로그인
userRouter.put(
  "/user",
  authMiddleware,
  validation.validateUserUpdate,
  userUpdate
); // 유저 정보 업데이트(pw & nickname)
userRouter.delete(
  "/user",
  authMiddleware,
  validation.validateUserDelete,
  userDelete
); // 유저 삭제
userRouter.post(
  "/user",
  uploadMiddleware,
  authMiddleware,
  validation.validateUserUploadImage,
  userUploadImage
); // 프로필 사진 업로드(기존 사진 자동 삭제)

export = userRouter;
