import * as express from "express";
import userController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";
import uploadMiddleware from "../middlewares/uploadMiddleware";
import nodemailerMiddleware from "../middlewares/nodemailerMiddleware";
import * as validation from "../middlewares/userValidationMiddleware";

const userRouter = express.Router();
// api index
userRouter.get("/users", userController.userList); // 전체 사용자 검섹
userRouter.get(
  "/user",
  authMiddleware,
  validation.validateUserCurrent,
  userController.userCurrent
); // 현재 사용자 정보 조회
userRouter.post(
  "/signup",
  validation.validateUserCreate,
  userController.userRegister
); // 자체 회원가입
userRouter.post(
  "/signin",
  validation.validateUserLogin,
  userController.userLogin
); // 로그인
userRouter.put(
  "/user",
  authMiddleware,
  validation.validateUserUpdate,
  userController.userUpdate
); // 유저 정보 업데이트(pw & nickname)
userRouter.delete(
  "/user",
  authMiddleware,
  validation.validateUserDelete,
  userController.userDelete
); // 유저 삭제
userRouter.post(
  "/user",
  uploadMiddleware,
  authMiddleware,
  validation.validateUserUploadImage,
  userController.userUploadImage
); // 프로필 사진 업로드(기존 사진 자동 삭제)
userRouter.post(
  "/signup/email",
  validation.validateSignupEmail,
  nodemailerMiddleware,
  userController.signupEmail
); // email로 코드 발송
userRouter.get(
  "/signup/email/:email/code/:code",
  validation.validateVerifyEmail,
  userController.signupVerifyEmail
); // email 인증
userRouter.get(
  "/signup/nickname/:nickname",
  validation.validateSignupNickname,
  userController.signupNickname
); // nickname 중복확인

export = userRouter;

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

/**
 * @swagger
 * /signup/email:
 *   post:
 *     summary: email 인증을 위한 코드 발송
 *     description:  재발급 가능하며, 회원 가입시 코드는 폐기됩니다.
 *     tags: ["userRouter"]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@gmail.com
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
 *                   example: 메일 인증을 위한 코드 발송이 성공적으로 이뤄졌습니다.
 *                 code:
 *                   type: int
 *                   example: 0000
 */

/**
 * @swagger
 * /signup/email/{email}/code/{code}:
 *   get:
 *     summary: email 인증 코드 확인
 *     description: 인증 완료시 code는 삭제됩니다.
 *     tags: ["userRouter"]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
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
 *                   example: email 인증을 위한 코드 인증
 */

/**
 * @swagger
 * /signup/nickname/{nickname}:
 *   get:
 *     summary: nickname 중복확인
 *     description:  nickname 중복확인
 *     tags: ["userRouter"]
 *     parameters:
 *       - in: path
 *         name: nickname
 *         schema:
 *           type: string
 *         required: true
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
 *                   example: 중복된 nickname이 없습니다. 가입을 진행해주세요.
 */
