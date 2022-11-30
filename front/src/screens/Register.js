import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../components/utils/Api";

function Register() {
  //로그인 성공하면 내비게이트로 메인페이지 보내기
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [nickname, setNickname] = useState("");

  const [isAccepted, setIsAccpted] = useState(false);

  //각 항목 조건이 맞지 않을 때 띄우는 메시지
  const [emailMsg, setEmailMsg] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [confirmPwdMsg, setConfirmPwdMsg] = useState("");
  const [nicknameMsg, setNicknameMsg] = useState("");

  // 이메일, 닉네임 중복 확인
  const [checkMail, setCheckMail] = useState(false);
  const [checkNickname, setCheckNickname] = useState(false);

  // 이메일, 비밀번호, 닉네임 유효성 검사
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password) => {
    return password
      .toLowerCase()
      .match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/);
  };

  const validateNickname = (nickname) => {
    return nickname
      .toLowerCase()
      .match(/^([가-힣0-9]{2,8}|[A-Za-z0-9]{2,12})$/);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiResult = await Api.post("signup", {
        email,
        password,
        nickname,
      });
      console.log(apiResult.data);

      const { result } = apiResult.data;

      if (result) {
        navigate("/signin");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onCheckEmail = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post("signup/email", { email });

      const { result } = res.data;

      if (!result) {
        setEmailMsg("이미 등록된 메일입니다. 다시 입력해주세요.");
        setCheckMail(false);
      } else {
        setEmailMsg("사용 가능한 메일입니다.😊");
        setCheckMail(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onCheckNickname = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post(`signup/nickname${nickname}`);

      const { result } = res.data;

      if (!result) {
        setNicknameMsg("이미 등록된 닉네임입니다. 다시 입력해주세요.");
        setCheckNickname(false);
      } else {
        setNicknameMsg("사용 가능한 닉네임입니다.😊");
        setCheckNickname(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isEmailValid = validateEmail(email);
  const isPwdValid = validatePassword(password);
  const isConfirmPwd = password === confirmPwd;
  const isNicknameValid = validateNickname(nickname);

  const isAllValid =
    isEmailValid &&
    isPwdValid &&
    isConfirmPwd &&
    isNicknameValid &&
    isAccepted &&
    checkMail &&
    checkNickname;

  //이메일
  const onChangeEmail = useCallback(async (e) => {
    const currEmail = e.target.value;
    setEmail(currEmail);

    if (!validateEmail(currEmail)) {
      setEmailMsg("이메일 형식이 올바르지 않습니다.");
    } else {
      setEmailMsg("올바른 이메일 형식입니다.");
    }
  });

  //비밀번호
  const onChangePwd = useCallback((e) => {
    const currPwd = e.target.value;
    setPassword(currPwd);

    if (!validatePassword(currPwd)) {
      setPwdMsg("영문, 숫자, 특수기호 조합으로 10자리 이상 입력해주세요.");
    } else {
      setPwdMsg("안전한 비밀번호입니다.");
    }
  }, []);

  //비밀번호 확인
  const onChangeConfirmPwd = useCallback(
    (e) => {
      const currConfirmPwd = e.target.value;
      setConfirmPwd(currConfirmPwd);

      if (currConfirmPwd !== password) {
        setConfirmPwdMsg("비밀번호가 일치하지 않습니다.");
      } else {
        setConfirmPwdMsg("올바른 비밀번호 형식입니다.");
      }
    },
    [password]
  );

  //닉네임
  const onChangeNickname = useCallback((e) => {
    const currNickname = e.target.value;
    setNickname(currNickname);

    if (!validateNickname(currNickname)) {
      setNicknameMsg("1글자 이상 9글자 미만으로 입력해주세요.");
    } else {
      setNicknameMsg("올바른 닉네임 형식입니다.");
    }
  }, []);

  const handleCheckAccept = useCallback(() => {
    setIsAccpted(true);
  }, []);

  return (
    <>
      <div>Register</div>
      <div>
        <div>
          <h2>회원가입</h2>

          <botton
            className={checkMail ? "checked" : "not-checked"}
            onClick={onCheckEmail}
          >
            중복 확인*
          </botton>

          <h2>이메일 주소 *</h2>
          <input
            name="email"
            type="text"
            placeholder="dogfoot@dogfoot.infoog"
            onChange={onChangeEmail}
          />

          <outputtext className={isEmailValid ? "success" : "error"}>
            {emailMsg}
          </outputtext>

          <h2>비밀번호 *</h2>
          <input
            name="password"
            type="password"
            placeholder="**********"
            onChange={onChangePwd}
          />
          <h3 className={isPwdValid ? "success" : "error"}>{pwdMsg}</h3>

          <h2>비밀번호 확인 *</h2>
          <input
            name="confirmPassword"
            type="password"
            placeholder="**********"
            onChange={onChangeConfirmPwd}
          />
          <h3 className={isConfirmPwd ? "success" : "error"}>
            {confirmPwdMsg}
          </h3>

          <botton
            onClick={onCheckNickname}
            className={checkNickname ? "checked" : "not-checked"}
          >
            중복 확인*
          </botton>

          <h2>닉네임 *</h2>
          <h3
            name="nickname"
            type="text"
            placeholder="제로랜드"
            onChange={onChangeNickname}
          />
          <h3 className={isNicknameValid ? "success" : "error"}>
            {nicknameMsg}
          </h3>

          {/* <CheckModal
            isAccepted={isAccepted}
            setIsAccpted={setIsAccpted}
            onCheckAccept={handleCheckAccept}
          /> */}

          <div>
            <botton onClick={onSubmit} type="submit" disabled={!isAllValid}>
              가입하기
            </botton>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
