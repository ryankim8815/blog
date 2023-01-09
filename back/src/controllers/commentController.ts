import * as express from "express";
import commentService from "../services/commentService";

class commentController {
  // GET: 특정 게시글의 댓글 조회
  static async commentList(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const post_id = req.params.post_id;
      const postComments = await commentService.getPostComments({ post_id });
      console.log(postComments);
      return res.status(200).json(postComments);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "commentList api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }
  // GET: 특정 사용자의 댓글 조회
  static async commentsByUserId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const user_id = req.params.user_id;
      const comments = await commentService.getCommentsByUserId({
        user_id,
      });
      console.log(comments);
      return res.status(200).json(comments);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "commensByUserId api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }

  // POST: 댓글 생성
  static async commentCreate(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    // const email = req.email;
    const user_id = req.body.user_id;
    const post_id = req.params.post_id;
    const content = req.body.content;
    try {
      const createdComment = await commentService.addComment({
        user_id,
        post_id,
        content,
      });
      console.log(createdComment);
      return res.status(200).json(createdComment);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "commentCreate api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }

  // PUT: 댓글 수정
  static async commentUpdate(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user_id = req.body.user_id;
    const post_id = req.params.post_id;
    const comment_id = req.params.comment_id;
    const content = req.body.content;
    try {
      const updatedComment = await commentService.updateComment({
        user_id,
        comment_id,
        content,
      });
      console.log(updatedComment);
      return res.status(200).json(updatedComment);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "commentUpdate api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }

  // DELETE: 댓글 삭제
  static async commentDelete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user_id = req.body.user_id;
    const comment_id = req.params.comment_id;
    try {
      const deletedComment = await commentService.deleteComment({
        user_id,
        comment_id,
      });
      console.log(deletedComment);
      return res.status(200).json(deletedComment);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "commentDelete api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }
}

export = commentController;
