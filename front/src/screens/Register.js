import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../components/utils/Api";
import styled from "styled-components";
import SocialLoginBox from "../components/user/SocialLogin";

const SignupBoxDiv = styled.div`
  width: 100%;
  margin: auto 0px;
  display: inline-block;
  text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  justify-content: center; // 좌우 정렬
  padding: 120px 0;
  @media screen and (max-width: 500px) {
    padding: 30px 0;
  }
`;
const SignupBox = styled.div`
  width: 80%;
  max-width: 500px;
  text-align: center;
  justify-content: center; // 좌우 정렬
  display: inline-block;
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: 400;
  color: black;
`;

// 상하간격 스페이서
const SpacerSmallDiv = styled.div`
  width: 100%;
  padding: 2px 0;
  margin: 0 auto;
  display: flex;
`;
const SpacerDiv = styled.div`
  width: 100%;
  padding: 5px 0;
  margin: 0 auto;
  display: flex;
`;
const SpacerBigDiv = styled.div`
  width: 100%;
  padding: 10px 0;
  margin: 0 auto;
  display: flex;
`;

const ValidationP = styled.p`
  width: 400px;
  width: 95%;
  max-width: 500px;
  padding: 0px 0 0 0px;
  margin: 0px;
  text-indent: 1em;
  font-size: 14px;
  font-weight: 400;
  color: #ff7f7f;
  // display: inline-block;
  // display: block;
  text-align: left;
`;

const CheckButton = styled.button`
  width: 95%;
  min-width: 100px;
  max-width: 500px;
  height: 40px;
  border-radius: 2px;
  border: 1px solid #e1e1e1;
  background-color: #835dfe;
  font-size: 15px;
  font-weight: 400;
  color: white;
  margin: 0px auto;
  // display: block;
  &:hover {
    // background-color: #e5e5e5;
    background-color: #7044ff;
  }
  &:disabled {
    color: gray;
    background-color: #e1e1e1;
  }
`;

const SignupInput = styled.input`
  width: 95%;
  min-width: 200px;
  max-width: 500px;
  height: 40px;
  border-radius: 2px;
  border: 1px solid #e1e1e1;
  text-indent: 1em;
  font-size: 15px;
  font-weight: 400;
  color: gray;
  margin: 0px 0px 0px 0;
  padding: 0 0 0 0;
  &:focus {
    outline: 2px solid #daadff;
  }
`;

const SignupButton = styled.button`
  width: 95%;
  max-width: 500px;
  height: 40px;
  border-radius: 2px;
  border: 1px solid #e1e1e1;
  background-color: #835dfe;
  font-size: 15px;
  font-weight: 400;
  color: white;
  margin: 30px 0px 0 0;
  padding: 0px 0px;
  &:hover {
    background-color: #7044ff;
  }
`;

const DivisionLine = styled.div`
  border-top: 1px solid lightgray;
  margin: 40px auto;
  width: 100%;
`;

function Register() {
  //로그인 성공하면 내비게이트로 메인페이지 보내기
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAccepted, setIsAccpted] = useState(false); // 정책 동의 만들면

  //각 항목 조건이 맞지 않을 때 띄우는 메시지
  const [emailMsg, setEmailMsg] = useState("");
  const [codeMsg, setCodeMsg] = useState("");
  const [nicknameMsg, setNicknameMsg] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [confirmPwdMsg, setConfirmPwdMsg] = useState("");

  // 이메일, 닉네임 중복 확인
  const [checkMail, setCheckMail] = useState(false);
  const [checkNickname, setCheckNickname] = useState(false);
  const [checkCode, setCheckCode] = useState(false);

  // 이메일, 비밀번호, 닉네임 유효성 검사
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const validateCode = (code) => {
    return code.match(/^[0-9]{4,4}$/);
  };

  const validateNickname = (nickname) => {
    return nickname
      .toLowerCase()
      .match(/^([가-힣0-9]{2,8}|[A-Za-z0-9]{2,12})$/);
  };

  const validatePassword = (password) => {
    return password.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    );
  };

  const validateConfirmPassword = (confirmPassword) => {
    const confirmPasswordResult = password === confirmPassword;
    return confirmPasswordResult;
  };

  // validation
  const isEmailValid = validateEmail(email);
  const isCodeValid = validateCode(code);
  const isNicknameValid = validateNickname(nickname);
  const isPwdValid = validatePassword(password);
  const isConfirmPwdValid = validateConfirmPassword(confirmPassword);
  // const isConfirmPwd = password === confirmPassword;

  const isAllValid =
    isEmailValid &&
    isConfirmPwdValid &&
    isNicknameValid &&
    isPwdValid &&
    // isAccepted &&
    checkMail &&
    checkCode &&
    checkNickname;

  //  버튼 활성화
  function btnActive(idName) {
    const target = document.getElementById(idName);
    target.disabled = false;
  }

  function btnDisabled(idName) {
    const target = document.getElementById(idName);
    target.disabled = true;
  }

  // 화면에서 가리기
  function elementShow(idName) {
    const target = document.getElementById(idName);
    target.style.display = "block";
  }

  function elementHide(idName) {
    const target = document.getElementById(idName);
    target.style.display = "none";
  }

  // [1-1] 이메일 입력
  const onChangeEmail = useCallback(async (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    if (!validateEmail(currentEmail)) {
      btnDisabled("sendCodeButton");
      setEmailMsg("이메일 형식이 올바르지 않습니다.");
    } else {
      btnActive("sendCodeButton");
      setEmailMsg("올바른 이메일 형식입니다.");
    }
  });

  // [1-2] 이메일 인증코드 발송

  const onCheckEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.post("signup/email", { email });
      const { result } = res.data;
      if (!result) {
        setEmailMsg("이미 등록된 메일입니다. 다시 입력해주세요.");
        setCheckMail(false);
      } else {
        setEmailMsg("사용 가능한 메일입니다.");
        setCheckMail(true);
        elementHide("emailInputGroupDiv");
        elementShow("codeInputGroupDiv");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // [2-1] 인증코드 입력
  const onChangeCode = useCallback(async (e) => {
    const currentCode = e.target.value;
    setCode(currentCode);

    if (!validateCode(currentCode)) {
      btnDisabled("checkCodeButton");
      setCodeMsg("인증코드 형식이 올바르지 않습니다.");
    } else {
      btnActive("checkCodeButton");
      setCodeMsg("올바른 인증코드 형식입니다.");
    }
  });

  // [2-2] 인증코드 확인
  const onCheckCode = async (e) => {
    e.preventDefault();

    try {
      // if
      const res = await Api.get(`signup/email/${email}/code/${code}`);

      const { result } = res.data;

      if (!result) {
        setCodeMsg("인증코드가 일치하지 않습니다. 다시 입력해주세요.");
        setCheckCode(false);
      } else {
        setCheckCode(true);
        elementHide("codeInputGroupDiv");
        elementShow("nicknameInputGroupDiv");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // [3-1] 닉네임 입력
  const onChangeNickname = useCallback((e) => {
    const currNickname = e.target.value;
    setNickname(currNickname);

    if (!validateNickname(currNickname)) {
      btnDisabled("checkNicknameButton");
      setNicknameMsg("1글자 이상 9글자 미만으로 입력해주세요.");
    } else {
      btnActive("checkNicknameButton");
      setNicknameMsg("올바른 닉네임 형식입니다.");
    }
  }, []);

  // [3-2] 닉네임 중복확인
  const onCheckNickname = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.get(`signup/nickname/${nickname}`);

      const { result } = res.data;

      if (!result) {
        setNicknameMsg("이미 등록된 닉네임입니다. 다시 입력해주세요.");
        setCheckNickname(false);
      } else {
        // setNicknameMsg("사용 가능한 닉네임입니다.😊");
        setCheckNickname(true);
        elementHide("nicknameInputGroupDiv");
        elementShow("passwordInputGroupDiv");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // [4-1] 비밀번호 입력
  //비호번호
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
      setConfirmPassword(currConfirmPwd);

      // if (currConfirmPwd !== password) {
      if (!validateConfirmPassword(currConfirmPwd)) {
        setConfirmPwdMsg("비밀번호가 일치하지 않습니다.");
      } else {
        setConfirmPwdMsg("비밀번호가 일치합니다.");
      }
    },
    [password]
  );

  // [4-2] 회원가입
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isPwdValid && isConfirmPwdValid) {
      }
      const apiResult = await Api.post("signup", {
        email,
        password,
        nickname,
      });
      // console.log(apiResult.data);

      const { result } = apiResult.data;

      if (result) {
        navigate("/signin");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // [?] 정책확인
  // const handleCheckAccept = useCallback(() => {
  //   setIsAccpted(true);
  // }, []);

  useEffect(() => {
    elementShow("emailInputGroupDiv");
    elementHide("codeInputGroupDiv");
    elementHide("nicknameInputGroupDiv");
    elementHide("passwordInputGroupDiv");
  }, []);

  return (
    <>
      <SignupBoxDiv>
        <SignupBox>
          <Title>회원가입</Title>
          <div id="emailInputGroupDiv" display="block">
            <SignupInput
              id="emailInput"
              name="email"
              type="text"
              placeholder="이메일"
              onChange={onChangeEmail}
            />
            <ValidationP
              id="emailValidationP"
              className={isEmailValid ? "success" : "error"}
            >
              {emailMsg}
            </ValidationP>
            {/* <SpacerSmallDiv /> */}
            <SpacerBigDiv />
            <SpacerBigDiv />
            <CheckButton
              id="sendCodeButton"
              className={checkMail ? "checked" : "not-checked"}
              onClick={onCheckEmail}
            >
              인증코드 받기
            </CheckButton>
          </div>
          {/* <SpacerDiv /> */}
          <div id="codeInputGroupDiv" display="none">
            <SignupInput
              name="code"
              type="text"
              placeholder="인증코드"
              onChange={onChangeCode}
            />
            <ValidationP className={isCodeValid ? "success" : "error"}>
              {codeMsg}
            </ValidationP>
            {/* <SpacerSmallDiv /> */}
            <SpacerBigDiv />
            <SpacerBigDiv />
            <CheckButton
              id="checkCodeButton"
              className={checkCode ? "checked" : "not-checked"}
              onClick={onCheckCode}
            >
              인증코드 확인
            </CheckButton>
          </div>
          {/* <SpacerDiv /> */}
          <div id="nicknameInputGroupDiv" display="none">
            <SignupInput
              name="nickname"
              type="text"
              placeholder="닉네임"
              onChange={onChangeNickname}
            />
            <ValidationP className={isNicknameValid ? "success" : "error"}>
              {nicknameMsg}
            </ValidationP>
            {/* <SpacerSmallDiv /> */}
            <SpacerBigDiv />
            <SpacerBigDiv />
            <CheckButton
              id="checkNicknameButton"
              onClick={onCheckNickname}
              className={checkNickname ? "checked" : "not-checked"}
            >
              중복 확인
            </CheckButton>
          </div>

          {/* <SpacerDiv /> */}
          <div id="passwordInputGroupDiv" display="none">
            <SignupInput
              name="password"
              type="password"
              placeholder="비밀번호"
              onChange={onChangePwd}
            />
            <ValidationP className={isPwdValid ? "success" : "error"}>
              {pwdMsg}
            </ValidationP>
            <SpacerSmallDiv />
            <SignupInput
              name="confirmPassword"
              type="password"
              placeholder="비밀번호 확인"
              onChange={onChangeConfirmPwd}
            />
            <ValidationP className={isConfirmPwdValid ? "success" : "error"}>
              {confirmPwdMsg}
            </ValidationP>
            {/* <SpacerDiv /> */}
            <SpacerBigDiv />
            <SpacerBigDiv />
            <CheckButton
              onClick={onSubmit}
              type="submit"
              disabled={!isAllValid}
            >
              가입하기
            </CheckButton>
          </div>
          <DivisionLine />
          <SocialLoginBox />
        </SignupBox>
      </SignupBoxDiv>
    </>
  );
}

export default Register;
