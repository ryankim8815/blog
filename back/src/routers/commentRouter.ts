import * as express from "express";
import commentController from "../controllers/commentController";
import authMiddleware from "../middlewares/authMiddleware";
import * as validation from "../middlewares/commentValidationMiddleware";

const commentRouter = express.Router();

// api index
commentRouter.get(
  "/post/:post_id/comments",
  validation.validateCommentByPostId,
  commentController.commentList
); // 특정 게시글의 댓글 검섹
commentRouter.post(
  "/post/:post_id/comment",
  authMiddleware,
  validation.validateCommentCreate,
  commentController.commentCreate
); // 댓글 생성
commentRouter.put(
  "/post/:post_id/comment/:comment_id",
  authMiddleware,
  validation.validateCommentUpdate,
  commentController.commentUpdate
); //  댓글 수정
commentRouter.delete(
  "/post/:post_id/comment/:comment_id",
  authMiddleware,
  validation.validateCommentDelete,
  commentController.commentDelete
); // 댓글 삭제

export = commentRouter;

/**
 * @swagger
 * /post/{post_id}/comments:
 *   get:
 *     summary: 특정 게시글의 댓글 조회
 *     description: 비회원도 확인 가능합니다.(추후 비회원은 댓글을 못보게 하여 회원가입을 유도할 수도 있음)
 *     tags: ["commentRouter"]
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
 *                   example: 해당 게시물에 대한 모든 댓글 조회가 성공적으로 이뤄졌습니다.
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
 *                     content:
 *                       type: string
 *                     created_at:
 *                       type: timstamp
 *                     updated_at:
 *                       type: timstamp
 *                   example:
 *                     - email: admin@dogfoot.info
 *                       nickname: admin
 *                       content: 댓글1
 *                       created_at: 2022-11-03T04:52:32.000Z
 *                       updated_at: 2022-11-03T04:52:32.000Z
 *                     - email: admin2@dogfoot.info
 *                       nickname: admin2
 *                       content: 댓글2
 *                       created_at: 2022-11-03T04:52:32.000Z
 *                       updated_at: 2022-11-03T04:52:32.000Z
 */

/**
 * @swagger
 * /post/{post_id}/comment:
 *   post:
 *     summary: 댓글 생성
 *     description: 로그인한 사용자만 가능합니다.
 *     tags: ["commentRouter"]
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
 *               content:
 *                 type: string
 *                 example: content
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
 *                   example: 댓글 생성이 성공적으로 이뤄졌습니다.
 */

/**
 * @swagger
 * /post/{post_id}/comment/{comment_id}:
 *   put:
 *     summary: 댓글 수정
 *     description: 로그인한 사용자만 가능합니다.
 *     tags: ["commentRouter"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: content
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
 *                   example: 댓글 수정이 성공적으로 이뤄졌습니다.
 */

/**
 * @swagger
 * /post/{post_id}/comment/{comment_id}:
 *   delete:
 *     summary: 댓글 삭제
 *     description: 로그인한 사용자만 가능합니다.
 *     tags: ["commentRouter"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: comment_id
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
 *                   example: 댓글 삭제가 성공적으로 이뤄졌습니다.
 */
