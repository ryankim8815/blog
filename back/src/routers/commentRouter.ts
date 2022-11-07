import * as express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import commentService from "../services/commentService";

const commentRouter = express.Router();

// GET: 특정 게시글의 댓글 조회
const commentList = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const post_id = req.params.post_id;
    const postComments = await commentService.getPostComments({ post_id });
    console.log(postComments);
    res.status(200).json(postComments);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "commentList api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /p/{post_id}/c:
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

// POST: 댓글 생성
const commentCreate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const email = req.email;
  const post_id = req.params.post_id;
  const content = req.body.content;
  try {
    const createdComment = await commentService.addComment({
      email,
      post_id,
      content,
    });
    console.log(createdComment);
    res.status(200).json(createdComment);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "commentCreate api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /p/{post_id}/c:
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

// PUT: 댓글 수정
const commentUpdate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const email = req.email;
  const comment_id = req.params.comment_id;
  const content = req.body.content;
  try {
    const updatedComment = await commentService.updateComment({
      email,
      comment_id,
      content,
    });
    console.log(updatedComment);
    res.status(200).json(updatedComment);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "commentUpdate api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /p/{post_id}/c/{comment_id}:
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

// DELETE: 댓글 삭제
const commentDelete = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const email = req.email;
  const comment_id = req.params.comment_id;
  try {
    const deletedComment = await commentService.deleteComment({
      email,
      comment_id,
    });
    console.log(deletedComment);
    res.status(200).json(deletedComment);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "commentDelete api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /p/{post_id}/c/{comment_id}:
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

// api index
commentRouter.get("/p/:post_id/c", commentList); // 특정 게시글의 댓글 검섹
commentRouter.post("/p/:post_id/c", authMiddleware, commentCreate); // 댓글 생성
commentRouter.put("/p/:post_id/c/:comment_id", authMiddleware, commentUpdate); //  댓글 수정
commentRouter.delete(
  "/p/:post_id/c/:comment_id",
  authMiddleware,
  commentDelete
); // 댓글 삭제

export = commentRouter;
