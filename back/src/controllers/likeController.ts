import * as express from "express";
import likeService from "../services/likeService";

class likeController {
  // GET: 특정 게시물의 좋아요 리스트
  static async likeList(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const post_id = req.params.post_id;
    try {
      const postLikes = await likeService.getPostLikes({ post_id });
      console.log(postLikes);
      return res.status(200).json(postLikes);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "likeList api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }

  // POST: 좋아요 생성/삭제
  static async likeClick(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user_id = req.body.user_id;
    const post_id = req.params.post_id;
    try {
      const clickedlike = await likeService.clickLike({
        user_id,
        post_id,
      });
      console.log(clickedlike);
      return res.status(200).json(clickedlike);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "likeClick api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }
}
export = likeController;
