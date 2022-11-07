import * as express from "express";
import authMiddleware from "../middlewares/authMiddleware";
// import upload from "../middlewares/uploadMiddleware";   // 사진 업로드 기능은 resize 적용 후 사용
import postService from "../services/postService";
// import asyncHandler from "../utils/asyncHandler";
// import type { MulterFile } from "../customType/multer.d";
const postRouter = express.Router();

// GET: 전체 게시글 리스트
const postList = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const allPosts = await postService.getAllPosts();
    console.log(allPosts);
    res.status(200).json(allPosts);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "postList api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /p:
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

// POST: 게시글 생성
const postCreate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const email = req.email;
  const title = req.body.title;
  const content = req.body.content;
  const tag = req.body.tag;
  try {
    const createdPost = await postService.addPost({
      email,
      title,
      content,
      tag,
    });
    console.log(createdPost);
    res.status(200).json(createdPost);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "postCreate api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /p:
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

// PUT: 게시글 수정
const postUpdate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const email = req.email;
  const post_id = req.params.post_id;
  const title = req.body.title;
  const content = req.body.content;
  const tag = req.body.tag;
  try {
    const updatedPost = await postService.updatePost({
      email,
      post_id,
      title,
      content,
      tag,
    });
    console.log(updatedPost);
    res.status(200).json(updatedPost);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "postUpdate api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /p/{post_id}:
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

// DELETE: 게시글 삭제
const postDelete = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const email = req.email;
  const post_id = req.params.post_id;
  try {
    const deletedPost = await postService.deletePost({
      email,
      post_id,
    });
    console.log(deletedPost);
    res.status(200).json(deletedPost);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "deletedPost api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /p/{post_id}:
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

// api index
postRouter.get("/p", postList); // 전체 게시글 검섹
postRouter.post("/p", authMiddleware, postCreate); // 게시글 생성
postRouter.put("/p/:post_id", authMiddleware, postUpdate); //  게시글 수정
postRouter.delete("/p/:post_id", authMiddleware, postDelete); // 게시글 삭제

export = postRouter;
