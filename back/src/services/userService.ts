import User from "../db/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

class userService {
  //// 모든 사용자 조회
  static async getAllUsers() {
    const allUsers = await User.findAll();
    const allUsersString = JSON.stringify(allUsers);
    const allUsersObject = JSON.parse(allUsersString);
    for (let i = 0; i < allUsersObject.length; i++) {
      delete allUsersObject[i].password;
      delete allUsersObject[i].user_id;
    }
    return allUsersObject;
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
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ email: email }, secretKey);
    delete thisUser.password;
    delete thisUser.user_id;
    const result_success = Object.assign(
      {
        result: true,
        cause: "success",
        message: `${thisUser.nickname}님의 로그인이 성공적으로 이뤄졌습니다.`,
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

    // 비밀번호 해쉬화
    password = await bcrypt.hash(password, 10);

    // created_time
    const created_at = moment().format("YYYY-MM-DD HH:mm:ss");
    // 사용자 추가
    const newUser = await User.create({
      email,
      password,
      nickname,
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
  static async updateUser({ email, currentPassword, password, nickname }) {
    // email 확인
    const checkEmail = await User.findByEmail({ email });
    const checkEmailString = JSON.stringify(checkEmail);
    const checkEmailObject = JSON.parse(checkEmailString);
    if (checkEmailObject.length === 0) {
      const result_errEmail = {
        result: false,
        cause: "email",
        message:
          "입력하신 email로 가입된 사용자가 없습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errEmail;
    }
    // 기존 비밀번호 확인
    const thisUser = checkEmailObject[0];
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
      checkNicknameObject[0].email == email
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
      email,
      password,
      nickname,
    });
    const updatedUserString = JSON.stringify(updatedUser);
    const updatedUserObject = JSON.parse(updatedUserString);
    const checkUpdatedUser = await User.findByEmail({ email });
    const checkUpdatedUserString = JSON.stringify(checkUpdatedUser);
    const checkUpdatedUserObject = JSON.parse(checkUpdatedUserString);
    if (
      updatedUserObject.affectedRows == 1 &&
      checkUpdatedUserObject.length == 1
    ) {
      const result_success = {
        result: true,
        cause: "success",
        message: `${nickname}님의 회원정보 수정이 성공적으로 이뤄졌습니다.`,
      };
      return result_success;
    }
  }

  //// 회원정보 삭제
  static async deleteUser({ email, password }) {
    // email 확인
    const checkEmail = await User.findByEmail({ email });
    const checkEmailString = JSON.stringify(checkEmail);
    const checkEmailObject = JSON.parse(checkEmailString);
    if (checkEmailObject.length === 0) {
      const result_errEmail = {
        result: false,
        cause: "email",
        message:
          "요청하신 email로 가입된 사용자가 없습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errEmail;
    }
    // 기존 비밀번호 확인
    const thisUser = checkEmailObject[0];
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
    // 사용자 삭제
    const updatedUser = await User.delete({
      email,
    });
    const updatedUserString = JSON.stringify(updatedUser);
    const updatedUserObject = JSON.parse(updatedUserString);
    const checkUpdatedUser = await User.findByEmail({ email });
    const checkUpdatedUserString = JSON.stringify(checkUpdatedUser);
    const checkUpdatedUserObject = JSON.parse(checkUpdatedUserString);
    if (
      updatedUserObject.affectedRows !== 1 &&
      checkUpdatedUserObject.length !== 0
    ) {
      const result_errDelete = {
        result: true,
        cause: "delete",
        message: `${checkEmailObject[0].nickname}님의 회원정보 삭제를 실패했습니다.`,
      };
      return result_errDelete;
    } else if (
      updatedUserObject.affectedRows == 1 &&
      checkUpdatedUserObject.length == 0
    ) {
      const result_success = {
        result: true,
        cause: "success",
        message: `${checkEmailObject[0].nickname}님의 회원정보 삭제가 성공적으로 이뤄졌습니다.`,
      };
      return result_success;
    }
  }
}
export = userService;
