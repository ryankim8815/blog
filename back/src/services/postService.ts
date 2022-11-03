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
      delete allPostsObject[i].post_id;
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
    const user = await User.findByEmail(email);
    const userString = JSON.stringify(user);
    const userObject = JSON.parse(userString);
    const user_id = userObject.user_id;
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
    console.log("post_id: ", post_id);
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
}
export = postService;
