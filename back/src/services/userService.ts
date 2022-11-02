import User from "../db/models/User";
import bcrypt from "bcrypt";
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
    }
    return allUsersObject;
  }

  //// 자체 회원가입
  static async addUser({ email, password, nickname }) {
    const checkEmail = await User.findById({ email });
    const checkEmailString = JSON.stringify(checkEmail);
    const checkEmailObject = JSON.parse(checkEmailString);
    if (checkEmailObject.length !== 0) {
      const result_errMail = {
        result: false,
        cause: "email",
        message:
          "입력하신 email로 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errMail;
    }
    const checkNickname = await User.findByNickname({ nickname });
    const checkNicknameString = JSON.stringify(checkNickname);
    const checkNicknameObject = JSON.parse(checkNicknameString);
    if (checkNicknameObject.length !== 0) {
      const result_errNickname = {
        result: false,
        cause: "nickname",
        message:
          "입력하신 nickname로 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.",
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
    const checkNewUser = await User.findById({ email });
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
}
export = userService;
