import * as express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadMiddleware";
import commentService from "../services/commentService";
import likeService from "../services/likeService";
// import asyncHandler from "../utils/asyncHandler";
import type { MulterFile } from "../customType/multer.d";

const likeRouter = express.Router();

// GET: 특정 게시물의 좋아요 리스트
const likeList = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const post_id = req.params.post_id;
  try {
    const postLikes = await likeService.getPostLikes({ post_id });
    console.log(postLikes);
    res.status(200).json(postLikes);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "likeList api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    res.status(200).json(result_err);
  }
};

// POST: 좋아요 생성/삭제
const likeClick = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const email = req.email;
  const post_id = req.params.post_id;
  try {
    const clickedlike = await likeService.clickLike({
      email,
      post_id,
    });
    console.log(clickedlike);
    res.status(200).json(clickedlike);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "likeClick api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    res.status(200).json(result_err);
  }
};

// api index
likeRouter.get("/post/:post_id", likeList); // 전체 좋아요 검섹
likeRouter.post("/post/:post_id", authMiddleware, likeClick); // 좋아요 생성/삭제

export = likeRouter;
