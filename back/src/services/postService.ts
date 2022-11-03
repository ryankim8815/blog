import User from "../db/models/User";
import Post from "../db/models/Post";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

class postService {
  //// 모든 사용자 조회
  static async getAllUsers() {}
}
export = postService;
