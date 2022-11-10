import User from "../db/models/User";
import Post from "../db/models/Post";
import { v4 as uuidv4 } from "uuid";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

class postService {
  //// 모든 게시글 조회
  static async getAllPosts() {
    const allPosts = await Post.findAll();
    const allPostsString = JSON.stringify(allPosts);
    const allPostsObject = JSON.parse(allPostsString);
    for (let i = 0; i < allPostsObject.length; i++) {
      delete allPostsObject[i].user_id;
      delete allPostsObject[i].password;
    }
    const countPosts = await Post.countAll();
    const result_success = Object.assign(
      {
        result: true,
        cause: "success",
        message: `모든 게시글 조회가 성공적으로 이뤄졌습니다.`,
      },
      { count: countPosts[0].cnt, list: allPostsObject }
    );
    return result_success;
  }
  //// tag로 게시글 조회
  static async getPostsByTag({ tag }) {
    const posts = await Post.findByTag({ tag });
    const postsString = JSON.stringify(posts);
    const postsObject = JSON.parse(postsString);
    for (let i = 0; i < postsObject.length; i++) {
      delete postsObject[i].user_id;
      delete postsObject[i].password;
    }
    const countPosts = await Post.countByTag({ tag });
    const result_success = Object.assign(
      {
        result: true,
        cause: "success",
        message: `tag로 게시글 조회가 성공적으로 이뤄졌습니다.`,
      },
      { count: countPosts[0].cnt, list: postsObject }
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
    const post_id = uuidv4();
    const newPost = await Post.create({
      post_id,
      user_id,
      title,
      content,
      tag,
      created_at,
      updated_at,
    });
    const newpostString = JSON.stringify(newPost);
    const newpostObject = JSON.parse(newpostString);
    const affectedRows = newpostObject.affectedRows;
    const checkNewPost = await Post.findByPostId({ post_id });
    const checkNewPostString = JSON.stringify(checkNewPost);
    const checkNewPostObject = JSON.parse(checkNewPostString);
    if (affectedRows == 1 && checkNewPostObject.length == 1) {
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
    // 수정 권한 여부 확인
    const checkPost = await Post.findByPostIdUserId({ post_id, user_id });
    const checkPostString = JSON.stringify(checkPost);
    const checkPostObject = JSON.parse(checkPostString);
    if (checkPostObject.length !== 1) {
      const result_errPost = {
        result: false,
        cause: "authority",
        message:
          "게시글 수정은 작성자만 할 수 있습니다. 수정 요청자가 작성자인지 확인해주세요.",
      };
      return result_errPost;
    } else {
      const updatedPost = await Post.update({
        post_id,
        title,
        content,
        tag,
        updated_at,
      });
      const updatedPostString = JSON.stringify(updatedPost);
      const updatedPostObject = JSON.parse(updatedPostString);
      const affectedRows = updatedPostObject.affectedRows;
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
          message: `게시글 수정이 성공적으로 이뤄졌습니다.`,
        };
        return result_success;
      }
    }
  }
  //// 게시글 삭제
  static async deletePost({ email, post_id }) {
    const user = await User.findByEmail({ email });
    const userString = JSON.stringify(user);
    const userObject = JSON.parse(userString);
    const user_id = userObject[0].user_id; // 예외처리 필요
    // 수정 권한 여부 확인
    const checkPost = await Post.findByPostIdUserId({ post_id, user_id });
    const checkPostString = JSON.stringify(checkPost);
    const checkPostObject = JSON.parse(checkPostString);
    if (checkPostObject.length !== 1) {
      const result_errPost = {
        result: false,
        cause: "authority",
        message:
          "게시글 삭제는 작성자만 할 수 있습니다. 삭제 요청자가 작성자인지 확인해주세요.",
      };
      return result_errPost;
    } else {
      const deletedPost = await Post.delete({
        post_id,
      });
      const deletedPostString = JSON.stringify(deletedPost);
      const deletedPostObject = JSON.parse(deletedPostString);
      const affectedRows = deletedPostObject.affectedRows;
      if (affectedRows !== 1) {
        const result_errUpdate = {
          result: false,
          cause: "delete",
          message: `게시글 삭제 중에 문제가 발생했습니다.`,
        };
        return result_errUpdate;
      } else {
        const result_success = {
          result: true,
          cause: "success",
          message: `게시글 삭제가 성공적으로 이뤄졌습니다.`,
        };
        return result_success;
      }
    }
  }
}
export = postService;
