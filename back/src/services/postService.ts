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
  //// post_id로 게시글 조회
  static async getPostByPostId({ post_id }) {
    const post = await Post.findByPostId({ post_id });
    const postString = JSON.stringify(post);
    const postObject = JSON.parse(postString);
    if (postObject.length == 0) {
      const result_errUpdate = {
        result: false,
        cause: "db",
        message: `요청하신 게시물을 찾을 수 없습니다.`,
      };
      return result_errUpdate;
    } else if (postObject.length > 1) {
      const result_errUpdate = {
        result: false,
        cause: "db",
        message: `[확인요망]: 요청하신 post_id로 저장된 게시물이 두 개 이상입니다.`,
      };
      return result_errUpdate;
    } else {
      delete postObject[0].user_id;
      delete postObject[0].password;
      const result_success = Object.assign(
        {
          result: true,
          cause: "success",
          message: `post_id로 게시글 조회가 성공적으로 이뤄졌습니다.`,
        },
        postObject[0]
      );
      return result_success;
    }
  }
  //// user_id와 status로 게시글 조회
  static async getPostByUserIdStatus({ user_id, status }) {
    const posts = await Post.findByUserIdStatus({ user_id, status });
    const result_success = Object.assign(
      {
        result: true,
        cause: "success",
        message: `모든 게시글 조회가 성공적으로 이뤄졌습니다.`,
      },
      { list: posts }
    );
    return result_success;
  }

  //// 게시글 생성
  static async addPost({ user_id, title, sub_title, content, tag, status }) {
    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const created_at = currentTime;
    // const updated_at = created_at;
    const updated_at = currentTime;
    // db 쿼리를 날려서 user_id 확인이 필요할까?
    const user = await User.findByUserId({ user_id });
    const userString = JSON.stringify(user);
    const userObject = JSON.parse(userString);
    if (userObject.length === 0) {
      const result_errUserId = {
        result: false,
        cause: "token",
        message:
          "제출하신 token 정보와 일치하는 사용자가 없습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errUserId;
    }
    const post_id = uuidv4();
    const newPost = await Post.create({
      post_id,
      user_id,
      title,
      sub_title,
      content,
      tag,
      status,
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
        post_id: post_id,
      };
      return result_success;
    }
  }
  //// 게시글 수정
  static async updatePost({
    user_id,
    post_id,
    title,
    sub_title,
    content,
    tag,
    status,
  }) {
    const updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
    // 필요할까?
    const user = await User.findByUserId({ user_id });
    const userString = JSON.stringify(user);
    const userObject = JSON.parse(userString);
    if (userObject.length === 0) {
      const result_errUserId = {
        result: false,
        cause: "token",
        message:
          "제출하신 token 정보와 일치하는 사용자가 없습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errUserId;
    }
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
        sub_title,
        content,
        tag,
        status,
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
  static async deletePost({ user_id, post_id }) {
    // db 쿼리를 날려서 user_id 확인이 필요할까?
    const user = await User.findByUserId({ user_id });
    const userString = JSON.stringify(user);
    const userObject = JSON.parse(userString);
    if (userObject.length === 0) {
      const result_errUserId = {
        result: false,
        cause: "token",
        message:
          "제출하신 token 정보와 일치하는 사용자가 없습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errUserId;
    }
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
