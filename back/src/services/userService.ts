import User from "../db/models/User";
import Code from "../db/models/Code";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

class userService {
  //// 모든 사용자 조회
  static async getAllUsers() {
    const allUsers = await User.findAll();
    const allUsersString = JSON.stringify(allUsers);
    const allUsersObject = JSON.parse(allUsersString);
    // 쿼리문의 SELECT로 대체
    // for (let i = 0; i < allUsersObject.length; i++) {
    //   delete allUsersObject[i].password;
    //   delete allUsersObject[i].user_id;
    // }
    const countUsers = await User.countAll();
    const countUsersString = JSON.stringify(countUsers);
    const countUsersObject = JSON.parse(countUsersString);
    const result_success = Object.assign(
      {
        result: true,
        cause: "success",
        message: `모든 사용자 조회가 성공적으로 이뤄졌습니다.`,
      },
      { count: countUsersObject[0].cnt, list: allUsersObject }
    );
    return result_success;
  }
  //// 현재 사용자 조회
  static async getCurrentUser({ user_id }) {
    const currentUser = await User.findByUserId({ user_id });
    // console.log("user_id: ", user_id);
    // console.log("currentUser: ", currentUser);
    const currentUserString = JSON.stringify(currentUser);
    const currentUserObject = JSON.parse(currentUserString);
    // 쿼리문의 SELECT로 대체
    for (let i = 0; i < currentUserObject.length; i++) {
      delete currentUserObject[i].password;
      // delete currentUserObject[i].user_id;
    }
    // const countUsers = await User.countAll();
    // const countUsersString = JSON.stringify(countUsers);
    // const countUsersObject = JSON.parse(countUsersString);
    if (currentUserObject.length === 0) {
      const result_errUserId = {
        result: false,
        cause: "token",
        message:
          "제출하신 token 내 정보와 일치하는 사용자가 없습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errUserId;
    } else if (currentUserObject.length > 1) {
      const result_errUserId = {
        result: false,
        cause: "dbl",
        message:
          "[확인요망]: 해당 user_id로 저장된 계정이 DB상 두개 이상입니다. 확인해 주세요.",
      };
      return result_errUserId;
    }
    const thisUser = currentUserObject[0];
    const result_success = Object.assign(
      {
        result: true,
        cause: "success",
        message: `해당 사용자 조회가 성공적으로 이뤄졌습니다.`,
      },
      thisUser
    );
    return result_success;
  }
  //// 로그인용 사용자 조회
  static async getUser({ email, password }) {
    const user = await User.findByEmail({ email });
    const userString = JSON.stringify(user);
    const userObject = JSON.parse(userString);
    if (userObject.length === 0) {
      const result_errEmail = {
        result: false,
        cause: "email",
        message:
          "입력하신 email로 가입된 사용자가 없습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errEmail;
    }
    const thisUser = userObject[0];
    const hashedCorrectPassword = thisUser.password;

    const isPasswordCorrect = await bcrypt.compare(
      password,
      hashedCorrectPassword
    );
    if (!isPasswordCorrect) {
      const result_errPassword = {
        result: false,
        cause: "password",
        message:
          "입력하신 password가 일치하지 않습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errPassword;
    }
    // 탈퇴한 사용자가 30일 이내 로그인 시도 시
    if (userObject[0].status == "pending") {
      const user_id = thisUser.user_id;
      const withdrawnUser = await User.undoWithdraw({ user_id });
      const withdrawnUserString = JSON.stringify(withdrawnUser);
      const withdrawnUserObject = JSON.parse(withdrawnUserString);
      if (withdrawnUserObject.affectedRows === 0) {
        const result_err = {
          result: false,
          cause: "status",
          message: "탈퇴한 사용자 계정 복구 과정에서 오류가 발생했습니다.",
        };
        return result_err;
      } else {
        thisUser.status = null;
      }
    }
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    // const token = jwt.sign({ email: email }, secretKey);
    const token = jwt.sign({ user_id: thisUser.user_id }, secretKey);
    delete thisUser.password;
    // delete thisUser.user_id;
    const result_success = Object.assign(
      {
        result: true,
        cause: "success",
        message: `${thisUser.nickname}님의 로그인이 성공적으로 이뤄졌습니다.`,
        token: token,
      },
      { token: token },
      thisUser
    );
    return result_success;
  }

  //// 자체 회원가입
  static async addUser({ email, password, nickname }) {
    const checkEmail = await User.findByEmail({ email });
    const checkEmailString = JSON.stringify(checkEmail);
    const checkEmailObject = JSON.parse(checkEmailString);
    if (checkEmailObject.length !== 0) {
      const result_errEmail = {
        result: false,
        cause: "email",
        message:
          "입력하신 email로 이미 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errEmail;
    }
    const checkNickname = await User.findByNickname({ nickname });
    const checkNicknameString = JSON.stringify(checkNickname);
    const checkNicknameObject = JSON.parse(checkNicknameString);
    if (checkNicknameObject.length !== 0) {
      const result_errNickname = {
        result: false,
        cause: "nickname",
        message:
          "입력하신 nickname로 이미 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errNickname;
    }
    // UUID 생성
    const user_id = uuidv4();
    // 비밀번호 해쉬화
    password = await bcrypt.hash(password, 10);
    // provider
    const provider = "dogfoot";
    // created_time
    const created_at = moment().format("YYYY-MM-DD HH:mm:ss");
    // 사용자 추가
    const newUser = await User.create({
      user_id,
      email,
      password,
      nickname,
      provider,
      created_at,
    });
    const newUserString = JSON.stringify(newUser);
    const newUserObject = JSON.parse(newUserString);
    const checkNewUser = await User.findByEmail({ email });
    const checkNewUserString = JSON.stringify(checkNewUser);
    const checkNewUserObject = JSON.parse(checkNewUserString);
    if (newUserObject.affectedRows == 1 && checkNewUserObject.length == 1) {
      const result_success = {
        result: true,
        cause: "success",
        message: `${nickname}님의 회원가입이 성공적으로 이뤄졌습니다.`,
      };
      return result_success;
    }
  }

  //// 회원 정보 수정
  static async updateUser({ user_id, currentPassword, password, nickname }) {
    // email 확인
    const checkUserId = await User.findByUserId({ user_id });
    // console.log("checkUserId: ", checkUserId);
    const checkUserIdString = JSON.stringify(checkUserId);
    const checkUserIdObject = JSON.parse(checkUserIdString);
    if (checkUserIdObject.length === 0) {
      const result_errUserId = {
        result: false,
        cause: "token",
        message:
          "제출한 token 정보와 일치하는 사용자가 없습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errUserId;
    }
    // 기존 비밀번호 확인
    const thisUser = checkUserIdObject[0];
    const hashedCorrectPassword = thisUser.password;

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      hashedCorrectPassword
    );
    if (!isPasswordCorrect) {
      const result_errPassword = {
        result: false,
        cause: "password",
        message:
          "입력하신 password가 일치하지 않습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errPassword;
    }
    // nickname 중복 확인
    const checkNickname = await User.findByNickname({ nickname });
    const checkNicknameString = JSON.stringify(checkNickname);
    const checkNicknameObject = JSON.parse(checkNicknameString);
    if (
      checkNicknameObject.length == 1 &&
      checkNicknameObject[0].user_id == user_id
    ) {
      console.log(
        "안내: 입력된 nickname은 기존 nickname과 동일하며, 회원정보 수정이 계속 진행됩니다."
      );
    } else if (checkNicknameObject.length !== 0) {
      const result_errNickname = {
        result: false,
        cause: "nickname",
        message:
          "입력하신 nickname으로 이미 가입된 사용자가 있습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errNickname;
    }
    // 비밀번호 해쉬화
    password = await bcrypt.hash(password, 10);
    // 사용자 수정
    const updatedUser = await User.update({
      user_id,
      password,
      nickname,
    });
    const updatedUserString = JSON.stringify(updatedUser);
    const updatedUserObject = JSON.parse(updatedUserString);
    // const checkUpdatedUser = await User.findByEmail({ email });
    // const checkUpdatedUserString = JSON.stringify(checkUpdatedUser);
    // const checkUpdatedUserObject = JSON.parse(checkUpdatedUserString);
    if (
      updatedUserObject.affectedRows == 1 // &&
      // checkUpdatedUserObject.length == 1
    ) {
      const result_success = {
        result: true,
        cause: "success",
        message: `${nickname}님의 회원정보 수정이 성공적으로 이뤄졌습니다.`,
      };
      return result_success;
    }
  }
  //// 회원 정보 수정 - Nickname Only for 간편로그인
  static async updateUserNickname({ user_id, provider, nickname }) {
    // 사용자 수정
    const updatedUser = await User.updateNickname({
      user_id,
      provider,
      nickname,
    });
    const updatedUserString = JSON.stringify(updatedUser);
    const updatedUserObject = JSON.parse(updatedUserString);
    // const checkUpdatedUser = await User.findByEmail({ email });
    // const checkUpdatedUserString = JSON.stringify(checkUpdatedUser);
    // const checkUpdatedUserObject = JSON.parse(checkUpdatedUserString);
    if (
      updatedUserObject.affectedRows == 1 // &&
      // checkUpdatedUserObject.length == 1
    ) {
      const result_success = {
        result: true,
        cause: "success",
        message: `${nickname}님의 회원정보 수정이 성공적으로 이뤄졌습니다.`,
      };
      return result_success;
    }
  }
  //// 프로필 사진 업로드
  static async uploadUserImage({ user_id, new_filename }) {
    // email 확인
    const checkUserId = await User.findByUserId({ user_id });
    const checkUserIdString = JSON.stringify(checkUserId);
    const checkUserIdObject = JSON.parse(checkUserIdString);
    if (checkUserIdObject.length === 0) {
      const result_errEmail = {
        result: false,
        cause: "token",
        message:
          "제출하신 token 정보와 일치하는 사용자가 없습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errEmail;
    }
    // db에 파일 경로 갱신
    const updateFilename = User.updateFilename({ user_id, new_filename });
    // 파일 삭제
    // console.log("파일명 확인: ", checkUserIdObject[0].profile_image);
    const old_filename = checkUserIdObject[0].profile_image;
    //Directory 존재 여부 체크
    if (checkUserIdObject[0].profile_image == null) {
      // 추후 null을 ./default.jpg로 변경 필요
      console.log(
        "기존 프로필 사진이 없습니다. 기존 사진 삭제 절차는 생략됩니다."
      );
    } else {
      const directory = fs.existsSync(`./uploads/${old_filename}`); //디렉토리 경로 입력
      // console.log("삭제할 파일 경로: ", directory);
      //Directory가 존재 한다면 true 없다면 false
      // console.log("Boolan : ", directory);
      if (!directory) {
        console.log(
          `[확인요망]: 기존 프로필 사진(파일명: ${old_filename})이 존재하지 않습니다.`
        );
      }
      fs.rm(`./uploads/${old_filename}`, { recursive: true }, (err) => {
        if (err != null) {
          console.log(
            `[확인요망]: 기존 프로필 사진(파일명: ${old_filename})을 삭제하던 중 오류가 발생했습니다. (에러 메시지: ${err})`
          );
        }
      });
    }
    const result_success = {
      result: true,
      cause: "success",
      message: `${checkUserIdObject[0].nickname}님의 프로필 사진 업데이트가 성공적으로 이뤄졌습니다.`,
    };
    return result_success;
  }

  //// 회원정보 삭제 -> 탈퇴
  static async deleteUser({ user_id, password }) {
    // email 확인
    const checkUserId = await User.findByUserId({ user_id });
    const checkUserIdString = JSON.stringify(checkUserId);
    const checkUserIdObject = JSON.parse(checkUserIdString);
    if (checkUserIdObject.length === 0) {
      const result_errUserId = {
        result: false,
        cause: "token",
        message:
          "제출하신 token 정보와 일치하는 사용자가 없습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errUserId;
    }
    // 기존 비밀번호 확인
    const thisUser = checkUserIdObject[0];
    const hashedCorrectPassword = thisUser.password;

    const isPasswordCorrect = await bcrypt.compare(
      password,
      hashedCorrectPassword
    );
    if (!isPasswordCorrect) {
      const result_errPassword = {
        result: false,
        cause: "password",
        message:
          "입력하신 password가 일치하지 않습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errPassword;
    }
    // 사용자 삭제 -> 탈퇴 신청(status: pending)  상태로 바꾸기
    const updatedUser = await User.withdraw({
      user_id,
    });
    const updatedUserString = JSON.stringify(updatedUser);
    const updatedUserObject = JSON.parse(updatedUserString);
    if (updatedUserObject.affectedRows == 1) {
      const result_success = {
        result: true,
        cause: "success",
        message: `${checkUserIdObject[0].nickname}님의 탈퇴가 성공적으로 이뤄졌습니다. 30일 후 회원 정보가 삭제됩니다.`,
      };
      return result_success;
    }
  }

  //// 회원가입 전 이메일 인증
  static async sendCode({ email, code }) {
    const saveCode = await Code.create({
      email,
      code,
    });
    const saveCodeString = JSON.stringify(saveCode);
    const saveCodeObject = JSON.parse(saveCodeString);
    if (saveCodeObject.affectedRows == 1) {
      const result_success = {
        result: true,
        cause: "success",
        message: `code 발급이 성공적으로 이뤄졌습니다.`,
        code: code,
      };
      return result_success;
    } else if (saveCodeObject.affectedRows == 2) {
      const result_success = {
        result: true,
        cause: "success",
        message: `code 재발급이 성공적으로 이뤄졌습니다.`,
        code: code,
      };
      return result_success;
    }
  }

  //// 이메일 인증 코드 확인 절차
  static async verifyCode({ email, code }) {
    const checkCode = await Code.findByEmail({
      email,
    });
    const checkCodeString = JSON.stringify(checkCode);
    const checkCodeObject = JSON.parse(checkCodeString);
    if (checkCodeObject.length !== 1) {
      const result_err = {
        result: false,
        cause: "code",
        message: `email 인증에 실패했습니다.`,
      };
      return result_err;
    } else {
      const correctCode = checkCodeObject[0];
      if (code == correctCode.code) {
        const deleteCode = await Code.delete({
          email,
        });
        const deleteCodeString = JSON.stringify(deleteCode);
        const deleteCodeObject = JSON.parse(deleteCodeString);
        if (deleteCodeObject.affectedRows !== 1) {
          const result_err = {
            result: false,
            cause: "code",
            message: `email 인증에 실패했습니다.`,
          };
          return result_err;
        }
        const result_success = {
          result: true,
          cause: "success",
          message: `email 인증에 성공했습니다.`,
        };
        return result_success;
      } else {
        const result_err = {
          result: false,
          cause: "code",
          message: `email 인증에 실패했습니다.`,
        };
        return result_err;
      }
    }
  }

  //// 회원가입 전 nickname 중복확인
  static async nicknameDuplicateCheck({ nickname }) {
    const checkNickname = await User.findByNickname({ nickname });
    const checkNicknameString = JSON.stringify(checkNickname);
    const checkNicknameObject = JSON.parse(checkNicknameString);
    if (checkNicknameObject.length !== 0) {
      const result_errNickname = {
        result: false,
        cause: "nickname",
        message:
          "입력하신 nickname로 이미 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errNickname;
    } else {
      const result_success = {
        result: true,
        cause: "success",
        message: `중복된 nickname이 없습니다. 가입을 진행해주세요.`,
      };
      return result_success;
    }
  }
}
export = userService;
