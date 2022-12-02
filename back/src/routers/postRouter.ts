import * as express from "express";
import postController from "../controllers/postController";
import authMiddleware from "../middlewares/authMiddleware";
import * as validation from "../middlewares/postValidationMiddleware";

const postRouter = express.Router();
// api index
postRouter.get("/posts", postController.postList); // 전체 게시글 검섹
postRouter.get(
  "/posts/tag/:tag",
  validation.validatePostByTag,
  postController.postListByTag
); // tag로 게시글 검섹
postRouter.get(
  "/post/:post_id",
  validation.validatePostByPostId,
  postController.postByPostId
); // post_id로 게시글 검섹
postRouter.post(
  "/post",
  authMiddleware,
  validation.validatePostCreate,
  postController.postCreate
); // 게시글 생성
postRouter.put(
  "/post/:post_id",
  authMiddleware,
  validation.validatePostUpdate,
  postController.postUpdate
); //  게시글 수정
postRouter.delete(
  "/post/:post_id",
  authMiddleware,
  validation.validatePostDelete,
  postController.postDelete
); // 게시글 삭제

export = postRouter;

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: 전체 게시글 조회
 *     description: 요청 시 보내야 하는 값이 없습니다.
 *     tags: ["postRouter"]
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
 *                   example: 모든 게시글 조회가 성공적으로 이뤄졌습니다.
 *                 count:
 *                   type: int
 *                   example: 10000
 *                 list:
 *                   type: object
 *                   properties:
 *                     post_id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     image:
 *                       type: string
 *                     tag:
 *                       type: string
 *                     created_at:
 *                       type: timstamp
 *                     updated_at:
 *                       type: timstamp
 *                     email:
 *                       type: string
 *                     nickname:
 *                       type: string
 *                     profile_image:
 *                       type: string
 *                     admin:
 *                       type: int
 *                     provider:
 *                       type: string
 *                   example:
 *                     - post_id: sdbhf2w9eiubr24we9iurg2w
 *                       title: 공지사항
 *                       content: 회원가입을 축하합니다~!!
 *                       image: file-12344051798734-416354969.png
 *                       tag: announcement
 *                       created_at: 2022-11-03T04:52:32.000Z
 *                       updated_at: 2022-11-03T04:52:32.000Z
 *                       email: admin@dogfoot.info
 *                       nickname: admin
 *                       profile_image: file-1234405177970-416354969.png
 *                       admin: 1
 *                       provider: dogfoot
 *                     - post_id: sdbhf2w9eiubr24aeerhr5s4w3e
 *                       title: 블로그 개발기 1화
 *                       content: 내가 왜 TS를 한다고 해서 이 고생을..
 *                       image: file-123443126434-123354969.png
 *                       tag: announcement
 *                       created_at: 2022-11-03T04:52:32.000Z
 *                       updated_at: 2022-11-03T04:52:32.000Z
 *                       email: admin@dogfoot.info
 *                       nickname: admin
 *                       profile_image: file-1234405177970-416354969.png
 *                       admin: 1
 *                       provider: dogfoot
 */

/**
 * @swagger
 * /posts/tag/{tag}:
 *   get:
 *     summary: tag로 게시글 조회
 *     description: 요청 시 보내야 하는 값이 없습니다.
 *     tags: ["postRouter"]
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
 *                   example: tag로 게시글 조회가 성공적으로 이뤄졌습니다.
 *                 count:
 *                   type: int
 *                   example: 10000
 *                 list:
 *                   type: object
 *                   properties:
 *                     post_id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     image:
 *                       type: string
 *                     tag:
 *                       type: string
 *                     created_at:
 *                       type: timstamp
 *                     updated_at:
 *                       type: timstamp
 *                     email:
 *                       type: string
 *                     nickname:
 *                       type: string
 *                     profile_image:
 *                       type: string
 *                     admin:
 *                       type: int
 *                     provider:
 *                       type: string
 *                   example:
 *                     - post_id: sdbhf2w9eiubr24we9iurg2w
 *                       title: 공지사항
 *                       content: 회원가입을 축하합니다~!!
 *                       image: file-12344051798734-416354969.png
 *                       tag: announcement
 *                       created_at: 2022-11-03T04:52:32.000Z
 *                       updated_at: 2022-11-03T04:52:32.000Z
 *                       email: admin@dogfoot.info
 *                       nickname: admin
 *                       profile_image: file-1234405177970-416354969.png
 *                       admin: 1
 *                       provider: dogfoot
 *                     - post_id: sdbhf2w9eiubr24aeerhr5s4w3e
 *                       title: 블로그 개발기 1화
 *                       content: 내가 왜 TS를 한다고 해서 이 고생을..
 *                       image: file-123443126434-123354969.png
 *                       tag: announcement
 *                       created_at: 2022-11-03T04:52:32.000Z
 *                       updated_at: 2022-11-03T04:52:32.000Z
 *                       email: admin@dogfoot.info
 *                       nickname: admin
 *                       profile_image: file-1234405177970-416354969.png
 *                       admin: 1
 *                       provider: dogfoot
 */

/**
 * @swagger
 * /post/{post_id}:
 *   get:
 *     summary: post_id로 게시글 조회
 *     description: 요청 시 보내야 하는 값이 없습니다.
 *     tags: ["postRouter"]
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
 *                   example: post_id로 게시글 조회가 성공적으로 이뤄졌습니다.
 *                 post_id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 image:
 *                   type: string
 *                 tag:
 *                   type: string
 *                 created_at:
 *                   type: timstamp
 *                 updated_at:
 *                   type: timstamp
 *                 email:
 *                   type: string
 *                 nickname:
 *                   type: string
 *                 profile_image:
 *                   type: string
 *                 admin:
 *                   type: int
 *                 provider:
 *                   type: string
 *               example:
 *                     - post_id: sdbhf2w9eiubr24we9iurg2w
 *                       title: 공지사항
 *                       content: 회원가입을 축하합니다~!!
 *                       image: file-12344051798734-416354969.png
 *                       tag: announcement
 *                       created_at: 2022-11-03T04:52:32.000Z
 *                       updated_at: 2022-11-03T04:52:32.000Z
 *                       email: admin@dogfoot.info
 *                       nickname: admin
 *                       profile_image: file-1234405177970-416354969.png
 *                       admin: 1
 *                       provider: dogfoot
 */

/**
 * @swagger
 * /post:
 *   post:
 *     summary: 게시글 작성
 *     description: 초기에는 관리자만 가능하도록 할 예정입니다.
 *     tags: ["postRouter"]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: title
 *               content:
 *                 type: string
 *                 example: content
 *               tag:
 *                 type: string
 *                 example: tag
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
 *                   example: 게시글 생성이 성공적으로 이뤄졌습니다.
 */

/**
 * @swagger
 * /post/{post_id}:
 *   put:
 *     summary: 게시글 수정
 *     description: 작성자만 게시글을 수정할 수 있습니다.
 *     tags: ["postRouter"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: title
 *               content:
 *                 type: string
 *                 example: content
 *               tag:
 *                 type: string
 *                 example: tag
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
 *                   example: 게시글 수정이 성공적으로 이뤄졌습니다.
 */

/**
 * @swagger
 * /post/{post_id}:
 *   delete:
 *     summary: 게시글 삭제
 *     description: 작성자만 게시글을 삭제할 수 있습니다.
 *     tags: ["postRouter"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
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
 *                   example: 게시글 삭제가 성공적으로 이뤄졌습니다.
 */
