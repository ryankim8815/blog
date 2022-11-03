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

// api index
postRouter.get("/post/list", postList); // 전체 유저 검섹
postRouter.post("/post/create", authMiddleware, postCreate); // 자체 회원가입
// userRouter.post("/user/login", userLogin); // 로그인
// userRouter.put("/user/update", authMiddleware, userUpdate); // 유저 정보 업데이트(pw & nickname)
// userRouter.delete("/user/delete", authMiddleware, userDelete); // 유저 삭제
// userRouter.post(
//   "/user/upload_image",
//   authMiddleware,
//   upload.single("file"),
//   userUploadImage
// ); // 프로필 사진 업로드(기존 사진 자동 삭제)

export = postRouter;
