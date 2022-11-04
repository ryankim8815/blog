import promisePool from "../database";
class Comment {
  // 전체 댓글 검색
  static async findAll() {
    const [rows, fields] = await promisePool.query({
      //   sql: "SELECT * FROM comments",
      sql: "SELECT * FROM comments INNER JOIN users ON comments.user_id = users.user_id",
    });
    return rows;
  }
  // comment_id로 검색
  static async findByCommentId({ comment_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM comments WHERE `comment_id` = ?",
      values: [comment_id],
    });
    return rows;
  }
  // user_id로 검색
  static async findByUserId({ user_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM comments WHERE `user_id` = ?",
      values: [user_id],
    });
    return rows;
  }
  // comment_id와 user_id로 검색
  static async findByCommentIdUserId({ comment_id, user_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM comments WHERE `comment_id` = ? AND `user_id` = ?",
      values: [comment_id, user_id],
    });
    return rows;
  }
  // post_id로 검색
  static async findByComment({ post_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT email, nickname, content, comments.created_at, comments.updated_at FROM comments INNER JOIN users ON comments.user_id = users.user_id WHERE `post_id` = ?",
      values: [post_id],
    });
    return rows;
  }
  // post_id로 댓글 개수 파악
  static async countByComment({ post_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT count(user_id) AS cnt FROM comments WHERE `post_id` = ?",
      values: [post_id],
    });
    return rows;
  }
  // 댓글 작성일로 검색
  static async findByCreatedAtDate({ created_at_date }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM comments WHERE DATE_FORMAT(`created_at`, `$Y-%m-%d`) = DATE_FORMAT(?, `%Y-$m-$d`)",
      values: [created_at_date],
    });
    return rows;
  }
  // 댓글 작성기간으로 검색
  static async findByCreatedAtDuration({ created_at_from, created_at_to }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM comments WHERE `created_at` BETWEEN ? AND ?",
      values: [created_at_from, created_at_to],
    });
    return rows;
  }
  // 댓글 등록
  static async create({
    comment_id,
    user_id,
    post_id,
    content,
    created_at,
    updated_at,
  }) {
    const [rows, fields] = await promisePool.query({
      sql: "INSERT INTO comments (comment_id, user_id, post_id, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
      values: [comment_id, user_id, post_id, content, created_at, updated_at],
    });
    return rows;
  }
  // 댓글 수정
  static async update({ comment_id, content, updated_at }) {
    const [rows, fields] = await promisePool.query({
      sql: "UPDATE comments SET `content` = ?, `updated_at` = ? WHERE `comment_id` = ?",
      values: [content, updated_at, comment_id],
    });
    return rows;
  }
  // 게시글 삭제
  static async delete({ comment_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "DELETE FROM comments WHERE `comment_id` = ?",
      values: [comment_id],
    });
    return rows;
  }
}
export = Comment;
