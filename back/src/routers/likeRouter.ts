import * as express from "express";
import likeController from "../controllers/likeController";
import authMiddleware from "../middlewares/authMiddleware";
import * as validation from "../middlewares/likeValidationMiddleware";

const likeRouter = express.Router();

// api index
likeRouter.get(
  "/post/:post_id/likes",
  validation.validateLikesByPostId,
  likeController.likeList
); // 특정 게시물의 좋아요 리스트
likeRouter.post(
  "/post/:post_id/like",
  authMiddleware,
  validation.validateLikeClick,
  likeController.likeClick
); // 좋아요 생성/삭제

export = likeRouter;

/**
 * @swagger
 * /post/{post_id}/likes:
 *   get:
 *     summary: 특정 게시물의 좋아요 리스트
 *     description: 비회원도 확인 가능합니다.(추후 비회원은 댓글을 못보게 하여 회원가입을 유도할 수도 있음)
 *     tags: ["likeRouter"]
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
 *                   example: 해당 게시물에 대한 좋아요 정보 조회가 성공적으로 이뤄졌습니다.
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
 *                   example:
 *                     - email: admin@dogfoot.info
 *                       nickname: admin
 *                     - email: admin2@dogfoot.info
 *                       nickname: admin2
 */

/**
 * @swagger
 * /post/{post_id}/like:
 *   post:
 *     summary: 좋아요 생성/삭제
 *     description: 로그인한 사용자만 가능합니다.
 *     tags: ["likeRouter"]
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
 *                   example: 좋아요 생성이 성공적으로 이뤄졌습니다.
 */
