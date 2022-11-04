import * as express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import commentService from "../services/commentService";

const commentRouter = express.Router();

// GET: 특정 게시글의 댓글 리스트
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

// POST: 댓글 생성
const commentCreate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const email = req.email;
  const post_id = req.body.post_id;
  const content = req.body.content;
  console.log("email: ", email); // good
  console.log("post_id: ", post_id); // good
  console.log("content: ", content); //good
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

// PUT: 댓글 수정
const commentUpdate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const email = req.email;
  const comment_id = req.body.comment_id;
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

// DELETE: 댓글 삭제
const commentDelete = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const email = req.email;
  const comment_id = req.body.comment_id;
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

// api index
commentRouter.get("/post/:post_id/comment", commentList); // 특정 게시글의 댓글 검섹
commentRouter.post("/comment/create", authMiddleware, commentCreate); // 댓글 생성
commentRouter.put("/comment/update", authMiddleware, commentUpdate); //  댓글 수정
commentRouter.delete("/comment/delete", authMiddleware, commentDelete); // 댓글 삭제

export = commentRouter;
