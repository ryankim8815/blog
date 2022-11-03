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
    const aallPostsString = JSON.stringify(allPosts);
    const allPostsObject = JSON.parse(aallPostsString);
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
}
export = postService;
