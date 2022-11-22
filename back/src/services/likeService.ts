import User from "../db/models/User";
import Like from "../db/models/Like";
import { v4 as uuidv4 } from "uuid";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

class likeService {
  //// 모든 좋아요 조회
  static async getPostLikes({ post_id }) {
    // 좋아요한 사람 확인
    const postLikes = await Like.findByPostId({ post_id });
    const postLikesString = JSON.stringify(postLikes);
    const postLikesObject = JSON.parse(postLikesString);
    // 좋아요 개수
    const countLikes = await Like.countByPostId({ post_id });
    const countLikesString = JSON.stringify(countLikes);
    const countLikesObject = JSON.parse(countLikesString);
    const result_success = Object.assign(
      {
        result: true,
        cause: "success",
        message: `해당 게시물에 대한 좋아요 정보 조회가 성공적으로 이뤄졌습니다.`,
      },
      { count: countLikesObject[0].cnt, list: postLikesObject }
    );
    return result_success;
  }
  //// 좋아요 생성/삭제
  static async clickLike({ user_id, post_id }) {
    const created_at = moment().format("YYYY-MM-DD HH:mm:ss");
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
    const checkLike = await Like.findByPostIdUserId({ post_id, user_id });
    const checkLikeString = JSON.stringify(checkLike);
    const checkLikeObject = JSON.parse(checkLikeString);
    // 좋아요 기록이 있는 경우 삭제
    if (checkLikeObject.length == 1) {
      const like_id = checkLikeObject[0].like_id;
      const deletedLike = await Like.delete({
        like_id,
      });
      const deletedLikeString = JSON.stringify(deletedLike);
      const deletedLikeObject = JSON.parse(deletedLikeString);
      const affectedRows = deletedLikeObject.affectedRows;
      if (affectedRows !== 1) {
        const result_errUpdate = {
          result: false,
          cause: "delete",
          message: `좋아요 취소 중에 문제가 발생했습니다.`,
        };
        return result_errUpdate;
      } else {
        const result_success = {
          result: true,
          cause: "success",
          message: `좋아요 취소가 성공적으로 이뤄졌습니다.`,
        };
        return result_success;
      }
    } else if (checkLikeObject.length == 0) {
      const like_id = uuidv4();
      const newLike = await Like.create({
        like_id,
        user_id,
        post_id,
        created_at,
      });
      const newLikeString = JSON.stringify(newLike);
      const newLikeObject = JSON.parse(newLikeString);
      const affectedRows = newLikeObject.affectedRows;
      const checkNewLike = await Like.findByLikeId({ like_id });
      const checkNewLikeString = JSON.stringify(checkNewLike);
      const checkNewLikeObject = JSON.parse(checkNewLikeString);
      if (affectedRows == 1 && checkNewLikeObject.length == 1) {
        const result_success = {
          result: true,
          cause: "success",
          message: `좋아요 생성이 성공적으로 이뤄졌습니다.`,
        };
        return result_success;
      } else {
        const result_errCreate = {
          result: false,
          cause: "create",
          message: `좋아요 생성 중에 문제가 발생했습니다.`,
        };
        return result_errCreate;
      }
    } else {
      const result_errDB = {
        result: false,
        cause: "db",
        message: `[확인요망]: DB에 동일한 좋아요가 2개 이상 존재합니다.`,
      };
      return result_errDB;
    }
  }
}
export = likeService;
