import * as express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadMiddleware";
import postService from "../services/postService";
// import asyncHandler from "../utils/asyncHandler";
import type { MulterFile } from "../customType/multer.d";
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

// PUT: 게시글 수정
const postUpdate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const email = req.email;
  const post_id = req.body.post_id;
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

// DELETE: 게시글 삭제
const postDelete = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const email = req.email;
  const post_id = req.body.post_id;
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

// api index
postRouter.get("/post/list", postList); // 전체 게시글 검섹
postRouter.post("/post/create", authMiddleware, postCreate); // 게시글 생성
postRouter.put("/post/update", authMiddleware, postUpdate); //  게시글 수정
postRouter.delete("/post/delete", authMiddleware, postDelete); // 게시글 삭제

export = postRouter;