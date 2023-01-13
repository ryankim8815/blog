import * as express from "express";
import postService from "../services/postService";

class postController {
  // GET: 전체 게시글 리스트
  static async postList(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const allPosts = await postService.getAllPosts();
      // console.log(allPosts);
      return res.status(200).json(allPosts);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "postList api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }

  // // GET: 테그로 검색한 게시글 리스트
  // static async postListByTag(
  //   req: express.Request,
  //   res: express.Response,
  //   next: express.NextFunction
  // ) {
  //   const tag = req.params.tag;
  //   try {
  //     const Posts = await postService.getPostsByTag({ tag });
  //     // console.log(Posts);
  //     return res.status(200).json(Posts);
  //   } catch (err) {
  //     const result_err = {
  //       result: false,
  //       cause: "api",
  //       message: "postListByTag api에서 오류가 발생했습니다.",
  //     };
  //     console.log(result_err);
  //     return res.status(200).json(result_err);
  //   }
  // }
  // GET: 테그로 검색한 게시글 리스트
  static async postsByStatusTag(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const status = req.params.status;
    const tag = req.params.tag;
    const start = req.params.start;
    const end = req.params.end;
    try {
      const Posts = await postService.getPostsByStatusTag({
        status,
        tag,
        start,
        end,
      });
      // console.log(Posts);
      return res.status(200).json(Posts);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "postsByStatusTag api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }

  // GET: post_id로 검색한 게시글 리스트
  static async postByPostId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const post_id = req.params.post_id;
    try {
      const Post = await postService.getPostByPostId({ post_id });
      // console.log(Post);
      return res.status(200).json(Post);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "postByPostId api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }

  // GET: user_id와 status로 검색한 게시글 리스트
  static async postByUserIdStatus(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user_id = req.params.user_id;
    const status = req.params.status;
    const start = req.params.start;
    const end = req.params.end;
    try {
      const Post = await postService.getPostByUserIdStatus({
        user_id,
        status,
        start,
        end,
      });
      return res.status(200).json(Post);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "PostByUserIdStatus api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }

  // POST: 게시글 생성
  static async postCreate(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    // const email = req.email;
    const user_id = req.body.user_id;
    const title = req.body.title;
    const sub_title = req.body.sub_title;
    const content = req.body.content;
    const tag = req.body.tag;
    const status = req.body.status;
    try {
      const createdPost = await postService.addPost({
        user_id,
        title,
        sub_title,
        content,
        tag,
        status,
      });
      return res.status(200).json(createdPost);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "postCreate api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }

  // PUT: 게시글 수정
  static async postUpdate(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    // const email = req.email;
    const user_id = req.body.user_id;
    const post_id = req.params.post_id;
    const title = req.body.title;
    const sub_title = req.body.sub_title;
    const content = req.body.content;
    const tag = req.body.tag;
    const status = req.body.status;
    try {
      const updatedPost = await postService.updatePost({
        user_id,
        post_id,
        title,
        sub_title,
        content,
        tag,
        status,
      });
      // console.log(updatedPost);
      return res.status(200).json(updatedPost);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "postUpdate api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }

  // DELETE: 게시글 삭제
  static async postDelete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    // const email = req.email;
    const user_id = req.body.user_id;
    const post_id = req.params.post_id;
    try {
      const deletedPost = await postService.deletePost({
        user_id,
        post_id,
      });
      // console.log(deletedPost);
      return res.status(200).json(deletedPost);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "deletedPost api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }
}
export = postController;
