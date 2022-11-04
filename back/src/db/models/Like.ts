import promisePool from "../database";
class Like {
  // like_id로 검색
  static async findByLikeId({ like_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM likes  WHERE `like_id` = ?",
      values: [like_id],
    });
    return rows;
  }
  // post_id로 검색
  static async findByPostId({ post_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT email, nickname FROM likes INNER JOIN users ON likes.user_id = users.user_id WHERE `post_id` = ?",
      values: [post_id],
    });
    return rows;
  }
  // post_id로 like 개수 파악
  static async countByPostId({ post_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT count(user_id) AS cnt FROM likes WHERE `post_id` = ?",
      values: [post_id],
    });
    return rows;
  }
  // user_id로 검색
  static async findByUserId({ user_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM likes WHERE `user_id` = ?",
      values: [user_id],
    });
    return rows;
  }
  // like_id와 post_id로 검색
  static async findByLikeIdPostId({ like_id, post_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM likes WHERE `like_id` = ? AND `post_id` = ?",
      values: [like_id, post_id],
    });
    return rows;
  }
  // like_id와 user_id로 검색
  static async findByLikeIdUserId({ like_id, user_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM likes WHERE `like_id` = ? AND `user_id` = ?",
      values: [like_id, user_id],
    });
    return rows;
  }
  // post_id와 user_id로 검색
  static async findByPostIdUserId({ post_id, user_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM likes WHERE `post_id` = ? AND `user_id` = ?",
      values: [post_id, user_id],
    });
    return rows;
  }
  // 좋아요 등록일로 검색
  static async findByCreatedAtDate({ created_at_date }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM likes WHERE DATE_FORMAT(`created_at`, `$Y-%m-%d`) = DATE_FORMAT(?, `%Y-$m-$d`)",
      values: [created_at_date],
    });
    return rows;
  }
  // 좋아요 등록기간으로 검색
  static async findByCreatedAtDuration({ created_at_from, created_at_to }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM likes WHERE `created_at` BETWEEN ? AND ?",
      values: [created_at_from, created_at_to],
    });
    return rows;
  }
  // 좋아요 등록
  static async create({ like_id, user_id, post_id, created_at }) {
    const [rows, fields] = await promisePool.query({
      sql: "INSERT INTO likes (like_id, user_id, post_id, created_at) VALUES (?, ?, ?, ?)",
      values: [like_id, user_id, post_id, created_at],
    });
    return rows;
  }
  // 좋아요 취소
  static async delete({ like_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "DELETE FROM likes WHERE `like_id` = ?",
      values: [like_id],
    });
    return rows;
  }
}
export = Like;
