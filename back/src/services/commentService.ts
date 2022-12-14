import User from "../db/models/User";
import Comment from "../db/models/Comment";
import { v4 as uuidv4 } from "uuid";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

class commentService {
  //// 모든 댓글 조회
  static async getPostComments({ post_id }) {
    const postComments = await Comment.findByComment({ post_id });
    const postCommentsString = JSON.stringify(postComments);
    const postCommentsObject = JSON.parse(postCommentsString);
    // db에 많이 쌓이면 쿼리문과 속도 비교해보기
    for (let i = 0; i < postCommentsObject.length; i++) {
      delete postCommentsObject[i].user_id;
    }
    const countComments = await Comment.countByComment({ post_id });
    const result_success = Object.assign(
      {
        result: true,
        cause: "success",
        message: `해당 게시물에 대한 모든 댓글 조회가 성공적으로 이뤄졌습니다.`,
      },
      { count: countComments[0].cnt, list: postCommentsObject }
    );
    return result_success;
  }

  //// 특정 사용자의 댓글 조회
  static async getCommentsByUserId({ user_id }) {
    const postComments = await Comment.findByUserId({ user_id });
    const postCommentsString = JSON.stringify(postComments);
    const postCommentsObject = JSON.parse(postCommentsString);
    const result_success = Object.assign(
      {
        result: true,
        cause: "success",
        message: `해당 사용자에 대한 모든 댓글 조회가 성공적으로 이뤄졌습니다.`,
      },
      { list: postCommentsObject }
    );
    return result_success;
  }

  //// 댓글 생성
  static async addComment({ user_id, post_id, content }) {
    const created_at = moment().format("YYYY-MM-DD HH:mm:ss");
    const updated_at = created_at;
    // 생략 가능 여부 확인 필요
    const user = await User.findByUserId({ user_id });
    const userString = JSON.stringify(user);
    const userObject = JSON.parse(userString);
    // const user_id = userObject[0].user_id; // 예외처리 필요
    if (userObject.length === 0) {
      const result_errUserId = {
        result: false,
        cause: "token",
        message:
          "제출하신 token 정보와 일치하는 사용자가 없습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errUserId;
    }
    const comment_id = uuidv4();
    const newComment = await Comment.create({
      comment_id,
      user_id,
      post_id,
      content,
      created_at,
      updated_at,
    });
    const newCommentString = JSON.stringify(newComment);
    const newCommentObject = JSON.parse(newCommentString);
    const affectedRows = newCommentObject.affectedRows;
    const checkNewComment = await Comment.findByCommentId({ comment_id });
    const checkNewCommentString = JSON.stringify(checkNewComment);
    const checkNewCommentObject = JSON.parse(checkNewCommentString);
    if (affectedRows == 1 && checkNewCommentObject.length == 1) {
      const result_success = {
        result: true,
        cause: "success",
        message: `댓글 생성이 성공적으로 이뤄졌습니다.`,
      };
      return result_success;
    } else {
      const result_errCreate = {
        result: false,
        cause: "create",
        message: `댓글 생성 중에 문제가 발생했습니다.`,
      };
      return result_errCreate;
    }
  }
  //// 댓글 수정
  static async updateComment({ user_id, comment_id, content }) {
    const updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
    const user = await User.findByUserId({ user_id });
    const userString = JSON.stringify(user);
    const userObject = JSON.parse(userString);
    // const user_id = userObject[0].user_id; // 예외처리 필요
    if (userObject.length === 0) {
      const result_errUserId = {
        result: false,
        cause: "token",
        message:
          "제출하신 token 정보와 일치하는 사용자가 없습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errUserId;
    }
    // 수정권한이 있는 작성자인지 확인
    const checkComment = await Comment.findByCommentIdUserId({
      comment_id,
      user_id,
    });
    const checkCommentString = JSON.stringify(checkComment);
    const checkCommentObject = JSON.parse(checkCommentString);
    if (checkCommentObject.length !== 1) {
      const result_errPost = {
        result: false,
        cause: "authority",
        message:
          "댓글 수정은 작성자만 할 수 있습니다. 수정 요청자가 작성자인지 확인해주세요.",
      };
      return result_errPost;
    } else {
      const updatedComment = await Comment.update({
        comment_id,
        content,
        updated_at,
      });
      const updatedCommentString = JSON.stringify(updatedComment);
      const updatedCommentObject = JSON.parse(updatedCommentString);
      const affectedRows = updatedCommentObject.affectedRows;
      if (affectedRows !== 1) {
        const result_errUpdate = {
          result: false,
          cause: "update",
          message: `댓글 업데이트 중에 문제가 발생했습니다.`,
        };
        return result_errUpdate;
      } else {
        const result_success = {
          result: true,
          cause: "success",
          message: `댓글 업데이트가 성공적으로 이뤄졌습니다.`,
        };
        return result_success;
      }
    }
  }
  //// 댓글 삭제
  static async deleteComment({ user_id, comment_id }) {
    const user = await User.findByUserId({ user_id });
    const userString = JSON.stringify(user);
    const userObject = JSON.parse(userString);
    // const user_id = userObject[0].user_id; // 예외처리 필요
    if (userObject.length === 0) {
      const result_errUserId = {
        result: false,
        cause: "token",
        message:
          "제출하신 token 정보와 일치하는 사용자가 없습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errUserId;
    }
    const checkComment = await Comment.findByCommentIdUserId({
      comment_id,
      user_id,
    });
    const checkPostString = JSON.stringify(checkComment);
    const checkPostObject = JSON.parse(checkPostString);
    if (checkPostObject.length !== 1) {
      const result_errPost = {
        result: false,
        cause: "authority|db",
        message:
          "댓글 삭제 중에 문제가 발생했습니다. 댓글 작성자가 아니거나 댓글이 존재하지 않습니다.",
      };
      return result_errPost;
    } else {
      const deletedComment = await Comment.delete({
        comment_id,
      });
      const deletedCommentString = JSON.stringify(deletedComment);
      const deletedCommentObject = JSON.parse(deletedCommentString);
      const affectedRows = deletedCommentObject.affectedRows;
      if (affectedRows !== 1) {
        const result_errUpdate = {
          result: false,
          cause: "delete",
          message: `댓글 삭제 중에 문제가 발생했습니다.`,
        };
        return result_errUpdate;
      } else {
        const result_success = {
          result: true,
          cause: "success",
          message: `댓글 삭제가 성공적으로 이뤄졌습니다.`,
        };
        return result_success;
      }
    }
  }
}
export = commentService;
