import React, { useCallback, useState } from "react";
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

const ValidationP = styled.p`
  width: 400px;
  width: 95%;
  max-width: 500px;
  padding: 0px 0 0 0px;
  margin: 0px 0px 0 0;
  text-indent: 0.5em;
  font-size: 14px;
  font-weight: 400;
  color: #ff7f7f;
  display: inline-block;
  text-align: left;
`;

const CheckButton = styled.button`
  width: 95%;
  min-width: 100px;
  max-width: 500px;
  height: 40px;
  border-radius: 2px;
  border: 1px solid #e1e1e1;
  font-size: 15px;
  font-weight: 400;
  color: gray;
  &:hover {
    background-color: #e5e5e5;
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

// google
const GOOGLE_client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const GOOGLE_redirectURI = process.env.REACT_APP_GOOGLE_REDIRECT_URL;
const GOOGLE_encoded = encodeURIComponent(GOOGLE_redirectURI);
const GOOGLE_state = process.env.REACT_APP_GOOGLE_STATE;
// const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${client_id}&scope=openid%20email&redirect_uri=${encoded}&state=${state}&nonce=${nonce}&hd=${hd}`;
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${GOOGLE_encoded}&client_id=${GOOGLE_client_id}&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&state=${GOOGLE_state}`;

// naver
const NAVER_client_id = process.env.REACT_APP_NAVER_CLIENT_ID;
const NAVER_redirectURI = process.env.REACT_APP_NAVER_REDIRECT_URL;
const NAVER_encoded = encodeURIComponent(NAVER_redirectURI);
const NAVER_state = process.env.REACT_APP_NAVER_STATE;
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_client_id}&redirect_uri=${NAVER_encoded}&state=${NAVER_state}`;
// console.log("네이버 링크크크크: ", NAVER_AUTH_URL);

// kakao
const KAKAO_client_id = process.env.REACT_APP_KAKAO_REST_API_KEY;
const KAKAO_redirectURI = process.env.REACT_APP_KAKAO_REDIRECT_URL;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_client_id}&redirect_uri=${KAKAO_redirectURI}&response_type=code`;

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
      <SignupBoxDiv>
        <SignupBox>
          <Title>회원가입</Title>
          <ValidationP className={isEmailValid ? "success" : "error"}>
            {emailMsg}
          </ValidationP>
          <SignupInput
            name="email"
            type="text"
            placeholder="이메일"
            onChange={onChangeEmail}
          />
          <SpacerSmallDiv />
          <CheckButton
            className={checkMail ? "checked" : "not-checked"}
            onClick={onCheckEmail}
          >
            중복 확인
          </CheckButton>
          <SpacerDiv />
          <ValidationP className={isNicknameValid ? "success" : "error"}>
            {nicknameMsg}
          </ValidationP>
          <SignupInput
            name="nickname"
            type="text"
            placeholder="닉네임"
            onChange={onChangeNickname}
          />
          <SpacerSmallDiv />
          <CheckButton
            onClick={onCheckNickname}
            className={checkNickname ? "checked" : "not-checked"}
          >
            중복 확인
          </CheckButton>
          <SpacerDiv />

          <ValidationP className={isPwdValid ? "success" : "error"}>
            {pwdMsg}
          </ValidationP>
          <SignupInput
            name="password"
            type="password"
            placeholder="비밀번호"
            onChange={onChangePwd}
          />
          <SpacerSmallDiv />
          <SignupInput
            name="confirmPassword"
            type="password"
            placeholder="비밀번호 확인"
            onChange={onChangeConfirmPwd}
          />
          <ValidationP className={isConfirmPwd ? "success" : "error"}>
            {confirmPwdMsg}
          </ValidationP>
          <SpacerDiv />

          <SignupButton onClick={onSubmit} type="submit" disabled={!isAllValid}>
            가입하기
          </SignupButton>
          <DivisionLine />
          <SocialLoginBox />
        </SignupBox>
      </SignupBoxDiv>
    </>
  );
}

export default Register;
