import * as express from "express";
import userService from "../services/userService";
import type { MulterFile } from "../customType/multer.d";
const logger = require("../../config/logger");

class userController {
  // GET: 사용자 리스트 조회 기능
  static async userList(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const allUsers = await userService.getAllUsers();
      logger.info(allUsers); // logger test
      console.log(allUsers);
      return res.status(200).json(allUsers);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "userList api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }

  // GET: 현재 사용자 정보 조회 기능
  static async userCurrent(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      // const email = req.email;
      const user_id = req.body.user_id;
      // console.log("라우터에서 토큰 확인: ", user_id);
      const currentUser = await userService.getCurrentUser({ user_id });
      console.log(currentUser);
      return res.status(200).json(currentUser);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "userCurrent api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }

  // POST: 회원가입 기능
  static async userRegister(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const nickname = req.body.nickname;
      const newUser = await userService.addUser({ email, password, nickname });
      console.log(newUser);
      return res.status(200).json(newUser);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "userRegister api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }

  // POST: 로그인
  static async userLogin(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const logedinUser = await userService.getUser({ email, password });
      console.log(logedinUser);
      return res.status(200).json(logedinUser);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "userLogin api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }

  // PUT: 회원정보 수정
  static async userUpdate(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      // const email = req.email;
      const user_id = req.body.user_id;
      // console.log("user_id: ", user_id);
      const currentPassword = req.body.currentPassword;
      const password = req.body.password;
      const nickname = req.body.nickname;
      const updateUser = await userService.updateUser({
        user_id,
        currentPassword,
        password,
        nickname,
      });
      console.log(updateUser);
      return res.status(200).json(updateUser);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "userUpdate api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }

  // PATCH: 회원정보 수정 - Nickname Only for 간편로그인
  static async userUpdateNickname(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      // const email = req.email;
      const user_id = req.body.user_id;
      // console.log("user_id: ", user_id);
      // const currentPassword = req.body.currentPassword;
      const provider = req.body.provider;
      const nickname = req.body.nickname;
      const updateUser = await userService.updateUserNickname({
        user_id,
        // currentPassword,
        provider,
        nickname,
      });
      console.log(updateUser);
      return res.status(200).json(updateUser);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "userUpdate api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }

  // DELETE: 회원정보 삭제
  static async userDelete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      // const email = req.email;
      const user_id = req.body.user_id;
      const password = req.body.password;
      const deleteUser = await userService.deleteUser({
        user_id,
        password,
      });
      console.log(deleteUser);
      return res.status(200).json(deleteUser);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "userDelete api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }

  //// POST: 프로필 사진 업로드
  static async userUploadImage(
    req: express.Request & { files: MulterFile[] },
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      // const email = req.email;
      const user_id = req.body.user_id;
      // const old_filename = req.filename;
      const new_filename = req.file.filename;
      // console.log("new_filename: ", new_filename);
      const uploadUserImage = await userService.uploadUserImage({
        user_id,
        new_filename,
      });
      console.log(uploadUserImage);
      return res.status(200).json(uploadUserImage);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "uploadUserImage api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }

  /// POST: email 인증을 위한 코드 발송
  static async signupEmail(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const email = req.body.email;
      const code = req.body.code;
      const sendCodeToEmail = await userService.sendCode({
        // redis 활용 고려
        email,
        code,
      });
      console.log(sendCodeToEmail);
      return res.status(200).json(sendCodeToEmail);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "signupEmail api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }

  /// GET: email 인증 코드 확인
  static async signupVerifyEmail(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const email = req.params.email;
      const code = req.params.code;
      const verifyEmailCode = await userService.verifyCode({
        email,
        code,
      });
      return res.status(200).json(verifyEmailCode);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "signupVerifyEmail api에서 오류가 발생했습니다.",
      };
      return res.status(200).json(result_err);
    }
  }

  /// GET: 회원가입 단계에서 nickname 중복확인
  static async signupNickname(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const nickname = req.params.nickname;
      const checkNickname = await userService.nicknameDuplicateCheck({
        nickname,
      });
      console.log(checkNickname);
      return res.status(200).json(checkNickname);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "signupNickname api에서 오류가 발생했습니다.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
  }
}

export = userController;
