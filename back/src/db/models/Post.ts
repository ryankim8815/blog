import promisePool from "../database";
class Post {
  // 전체 게시글 검색
  static async findAll() {
    const [rows, fields] = await promisePool.query({
      //   sql: "SELECT * FROM posts",
      sql: "SELECT * FROM posts INNER JOIN (SELECT user_id, email, nickname, profile_image, admin FROM users) AS users ON posts.user_id = users.user_id ORDER BY posts.created_at DESC",
    });
    return rows;
  }
  // 전체 게시글 개수 파악
  static async countAll() {
    const [rows, fields] = await promisePool.query({
      //   sql: "SELECT * FROM posts",
      sql: "SELECT count(post_id) AS cnt FROM posts",
    });
    return rows;
  }

  // post_id로 검색
  static async findByPostId({ post_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM posts INNER JOIN (SELECT user_id, email, nickname, profile_image, admin FROM users) AS users ON posts.user_id = users.user_id WHERE `post_id` = ?",
      values: [post_id],
    });
    return rows;
  }
  // user_id로 검색
  static async findByUserId({ user_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM posts WHERE `user_id` = ?",
      values: [user_id],
    });
    return rows;
  }
  // post_id와 user_id로 검색
  static async findByPostIdUserId({ post_id, user_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM posts WHERE `post_id` = ? AND `user_id` = ?",
      values: [post_id, user_id],
    });
    return rows;
  }
  // // user_id와 status로 검색
  // static async findByUserIdStatus({ user_id, status }) {
  //   const [rows, fields] = await promisePool.query({
  //     sql: "SELECT * FROM posts WHERE `user_id` = ? AND `status` = ?",
  //     values: [user_id, status],
  //   });
  //   return rows;
  // }
  // title로 검색
  static async findByTitle({ title }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM posts WHERE `title` = ?",
      values: [title],
    });
    return rows;
  }
  // tag로 검색
  static async findByTag({ tag }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM posts INNER JOIN (SELECT user_id, email, nickname, profile_image, admin FROM users) AS users ON posts.user_id = users.user_id WHERE `tag` = ? ORDER BY posts.created_at DESC",
      values: [tag],
    });
    return rows;
  }
  // tag로 검색한 결과 개수 파악
  static async countByTag({ tag }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT count(post_id) AS cnt FROM posts WHERE `tag` = ?",
      values: [tag],
    });
    return rows;
  }
  ///// POST LIST
  // status와 페이지로 검색한 결과 리스트
  static async findByStatus({ status, start, end }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM posts INNER JOIN (SELECT user_id, email, nickname, profile_image, admin FROM users) AS users ON posts.user_id = users.user_id WHERE `status` = ? ORDER BY posts.created_at DESC LIMIT ?, ?",
      values: [status, start, end],
    });
    return rows;
  }
  // status로 검색한 결과 개수 파악
  static async countByStatus({ status }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT count(post_id) AS cnt FROM posts WHERE `status` = ?",
      values: [status],
    });
    return rows;
  }
  ///// PAGINATION START /////
  // status와 tag 그리고 페이지로 검색한 결과 리스트
  static async findByStatusTag({ status, tag, start, end }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM posts INNER JOIN (SELECT user_id, email, nickname, profile_image, admin FROM users) AS users ON posts.user_id = users.user_id WHERE `status` = ? AND `tag` = ? ORDER BY posts.created_at DESC LIMIT ?, ?",
      values: [status, tag, start, end],
    });
    return rows;
  }

  // status와 tag로 검색한 결과 개수 파악
  static async countByStatusTag({ status, tag }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT count(post_id) AS cnt FROM posts WHERE `status` = ? AND `tag` = ?",
      values: [status, tag],
    });
    return rows;
  }
  ///////////////////
  // user_id와 status로 검색
  static async findByUserIdStatus({ user_id, status, start, end }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM posts WHERE `user_id` = ? AND `status` = ? ORDER BY posts.created_at DESC LIMIT ?, ?",
      values: [user_id, status, start, end],
    });
    return rows;
  }
  static async countByUserIdStatus({ user_id, status }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT count(post_id) AS cnt FROM posts WHERE `user_id` = ? AND `status` = ?",
      values: [user_id, status],
    });
    return rows;
  }
  ///// PAGINATION END /////

  // 게시일로 검색
  static async findByCreatedAtDate({ created_at_date }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM posts WHERE DATE_FORMAT(`created_at`, `$Y-%m-%d`) = DATE_FORMAT(?, `%Y-$m-$d`)",
      values: [created_at_date],
    });
    return rows;
  }
  // 게시기간으로 검색
  static async findByCreatedAtDuration({ created_at_from, created_at_to }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM posts WHERE `created_at` BETWEEN ? AND ?",
      values: [created_at_from, created_at_to],
    });
    return rows;
  }
  // 게시글 등록 - 용량 우려로 이미지 업로드 기능 제외
  static async create({
    post_id,
    user_id,
    title,
    sub_title,
    content,
    tag,
    status,
    created_at,
    updated_at,
  }) {
    const [rows, fields] = await promisePool.query({
      sql: "INSERT INTO posts (post_id, user_id, title, sub_title, content, tag, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values: [
        post_id,
        user_id,
        title,
        sub_title,
        content,
        tag,
        status,
        created_at,
        updated_at,
      ],
    });
    return rows;
  }
  // 게시글 수정  - 용량 우려로 이미지 업로드 기능 제외
  static async update({
    post_id,
    title,
    sub_title,
    content,
    tag,
    status,
    updated_at,
  }) {
    const [rows, fields] = await promisePool.query({
      sql: "UPDATE posts SET `title` = ?, `sub_title` = ?, `content` = ?, `tag` = ?, `status` = ?, `updated_at` = ? WHERE `post_id` = ?",
      values: [title, sub_title, content, tag, status, updated_at, post_id],
    });
    return rows;
  }
  // 이미지 업로드 - 게시글 등록&수정과 통합 가능성 유
  static async updateFilename({ post_id, image }) {
    const [rows, fields] = await promisePool.query({
      sql: "UPDATE posts SET `image` = ? WHERE `post_id` = ?",
      values: [image, post_id],
    });
    return rows;
  }
  // 게시글 삭제
  static async delete({ post_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "DELETE FROM posts WHERE `post_id` = ?",
      values: [post_id],
    });
    return rows;
  }
}
export = Post;
