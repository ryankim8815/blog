import User from "../db/models/User";
import Post from "../db/models/Post";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

class postService {
  //// 모든 게시글 조회
  static async getAllPosts() {
    const allPosts = await Post.findAll();
    const allPostsString = JSON.stringify(allPosts);
    const allPostsObject = JSON.parse(allPostsString);
    for (let i = 0; i < allPostsObject.length; i++) {
      //   delete allPostsObject[i].post_id;
      delete allPostsObject[i].user_id;
    }
    const result_success = Object.assign(
      {
        result: true,
        cause: "success",
        message: `모든 게시글 조회가 성공적으로 이뤄졌습니다.`,
      },
      allPostsObject
    );
    return result_success;
  }
  //// 게시글 생성
  static async addPost({ email, title, content, tag }) {
    const created_at = moment().format("YYYY-MM-DD HH:mm:ss");
    const updated_at = created_at;
    const user = await User.findByEmail({ email });
    const userString = JSON.stringify(user);
    const userObject = JSON.parse(userString);
    const user_id = userObject[0].user_id; // 예외처리 필요
    const post = await Post.create({
      user_id,
      title,
      content,
      tag,
      created_at,
      updated_at,
    });
    const postString = JSON.stringify(post);
    const postObject = JSON.parse(postString);
    const post_id = postObject.insertId;
    const checkNewPost = await Post.findByPostId({ post_id });
    const checkNewPostString = JSON.stringify(checkNewPost);
    const checkNewPostObject = JSON.parse(checkNewPostString);
    if (postObject.affectedRows == 1 && checkNewPostObject.length == 1) {
      const result_success = {
        result: true,
        cause: "success",
        message: `게시글 생성이 성공적으로 이뤄졌습니다.`,
      };
      return result_success;
    }
  }
  //// 게시글 수정
  static async updatePost({ email, post_id, title, content, tag }) {
    const updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
    const user = await User.findByEmail({ email });
    const userString = JSON.stringify(user);
    const userObject = JSON.parse(userString);
    const user_id = userObject[0].user_id; // 예외처리 필요
    const oldPost = await Post.findByPostIdUerId({ post_id, user_id });
    const oldPostString = JSON.stringify(oldPost);
    const oldPostObject = JSON.parse(oldPostString);
    if (oldPostObject.length !== 1) {
      const result_errPost = {
        result: false,
        cause: "post",
        message:
          "수정하려는 게시글을 찾지 못했습니다. 수정자가 작성자가 아닐 수 있습니다.",
      };
      return result_errPost;
    } else {
      const post = await Post.update({
        post_id,
        title,
        content,
        tag,
        updated_at,
      });
      const postString = JSON.stringify(post);
      const postObject = JSON.parse(postString);
      const affectedRows = postObject.affectedRows;
      if (affectedRows !== 1) {
        const result_errUpdate = {
          result: false,
          cause: "update",
          message: `게시글 업데이트 중에 문제가 발생했습니다.`,
        };
        return result_errUpdate;
      } else {
        const result_success = {
          result: true,
          cause: "success",
          message: `게시글 생성이 성공적으로 이뤄졌습니다.`,
        };
        return result_success;
      }
    }
  }
}
export = postService;
