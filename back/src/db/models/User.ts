import promisePool from "../database";
class User {
  static async findAll() {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM users",
    });
    return rows;
  }

  static async findByEmail({ email }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM users WHERE `email` = ?",
      values: [email],
    });
    return rows;
  }

  static async findByNickname({ nickname }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM users WHERE `nickname` = ?",
      values: [nickname],
    });
    return rows;
  }

  static async create({ email, password, nickname, created_at }) {
    const [rows, fields] = await promisePool.query({
      sql: "INSERT INTO users (email, password, nickname, created_at) VALUES (?, ?, ?, ?)",
      values: [email, password, nickname, created_at],
    });
    return rows;
  }

  static async update({ email, password, nickname }) {
    const [rows, fields] = await promisePool.query({
      sql: "UPDATE users SET `password` = ?, `nickname` = ? WHERE `email` = ?",
      values: [password, nickname, email],
    });
    return rows;
  }

  static async delete({ email }) {
    const [rows, fields] = await promisePool.query({
      sql: "DELETE FROM users WHERE `email` = ?",
      values: [email],
    });
    return rows;
  }
}
export = User;
