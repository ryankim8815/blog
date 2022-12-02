import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../components/utils/Api";
import styled from "styled-components";
import googleIcon from "../assets/img/googleIcon.png";
import kakaoIcon from "../assets/img/kakaoIcon.png";
import naverIcon from "../assets/img/naverIcon.png";

const SignupBoxDiv = styled.div`
  width: 100%;
  // background-color: green; // 영역확인용
  margin: 50px 0px;
  // display: flex;
  display: inline-block;
  text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  // align-items: center; // 상하 정렬
  justify-content: center; // 좌우 정렬
  padding: 120px 0;
`;
const SignupBox = styled.div`
  width: 80%;
  // max-width: 1024px;
  max-width: 500px;
  // align-items: center; // 상하 정렬
  text-align: center;
  justify-content: center; // 좌우 정렬
  display: inline-block;
  // background-color: tomato; // 영역확인용
`;

const Title = styled.p`
  // background-color: pink; // 영역확인용
  font-size: 50px;
  font-weight: 900;
  color: black;
`;
const InputName = styled.p`
  // background-color: skyblue; // 영역확인용
  margin: 0px 0px;
  padding: 15px 0px 0px 20px; // 상 우 하 좌
  text-align: left;
  font-size: 16px;
  font-weight: 400;
  color: black;
`;

const InputCheckBoxDiv = styled.div`
  width: 95%;
  background-color: green; // 영역확인용
  margin: 0px 0px;
  display: inline-block;
  // display: inline-block;
  // text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  align-items: center; // 상하 정렬
  // justify-content: center; // 좌우 정렬
  padding: 0;
`;

const CheckInput = styled.input`
  width: 319px;
  // width: 70%;
  min-width: 200px;
  max-width: 500px;
  height: 40px;
  // display: flex;
  border-radius: 2px;
  border: 1px solid #e1e1e1;
  // background-color: pink; // 영역확인용
  text-indent: 1em;
  font-size: 15px;
  font-weight: 400;
  color: gray;
  justify-content: center; // 좌우 정렬
  &:focus {
    outline: 2px solid purple;
    // border: 1px solid red;
  }
`;

const CheckButton = styled.button`
  width: 150px;
  // width: 30%;
  min-width: 100px;
  max-width: 500px;
  height: 44px;
  // display: flex;
  border-radius: 2px;
  border: 1px solid #e1e1e1;
  // background-color: pink; // 영역확인용
  // text-indent: 1em;
  font-size: 15px;
  font-weight: 400;
  color: gray;
  // justify-content: center;
  &:hover {
    // outline: 2px solid purple;
    background-color: pink;
    // border: 1px solid red;
  }
`;

const SignupInput = styled.input`
  width: 95%;
  min-width: 200px;
  max-width: 500px;
  height: 40px;
  // display: flex;
  border-radius: 2px;
  border: 1px solid #e1e1e1;
  // background-color: pink; // 영역확인용
  text-indent: 1em;
  font-size: 15px;
  font-weight: 400;
  color: gray;
  margin: 0 0 -5px 0;
  // padding: 0 0 -100px 0;
  // justify-content: center; // 좌우 정렬
  &:focus {
    outline: 2px solid purple;
    // border: 1px solid red;
  }
`;

const ValidationP = styled.p`
  width: 95%;
  max-width: 500px;
  height: 20px;
  // background-color: pink; // 영역확인용
  text-indent: 1em;
  text-align: left;
  font-size: 15px;
  font-weight: 400;
  color: gray;
  display: block;
  justify-content: center; // 좌우 정렬
`;

const ButtonBox = styled.div`
  width: 950%;
  // max-width: 1024px;
  max-width: 500px;
  // align-items: center; // 상하 정렬
  // text-align: center;
  justify-content: space-around; // 좌우 정렬
  display: inline-block;
  // background-color: tomato; // 영역확인용
`;

const SignupButton = styled.button`
  width: 95%;
  max-width: 500px;
  height: 40px;
  border-radius: 2px;
  border: 1px solid #e1e1e1;
  // background-color: pink; // 영역확인용
  text-indent: 1em;
  font-size: 15px;
  font-weight: 400;
  color: gray;
  margin: 15px 0px;
  padding: 0px 0px;
  &:hover {
    // outline: 2px solid purple;
    background-color: pink;
    // border: 1px solid red;
  }
`;

const DivisionLine = styled.div`
  border-top: 1px solid lightgray;
  margin: 30px auto;
  width: 100%;
`;

const SocialLoginBox = styled.div`
  width: 100%;
  // max-width: 1024px;
  max-width: 500px;
  // align-items: center; // 상하 정렬
  // text-align: center;
  justify-content: center; // 좌우 정렬
  // display: inline-block;
  display: flex;
  // background-color: tomato; // 영역확인용
`;

const SocialLogo = styled.a`
  font-size: 15px;
  font-weight: 400;
  color: gray;
  // align-items: center; // 상하 정렬
  // text-align: center;
  justify-content: center; // 좌우 정렬
  display: flex;
  // display: inline block;
  // background-image: url(${googleIcon});
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: 0px 0px;
  background-size: contain;
  vertical-align: middle;
  object-fit: cover;
  border: none;
  cursor: pointer;
  height: 70px;
  width: 70px;
  vertical-align: middle;
  margin: 0 15px;
  // background-color: tomato; // 영역확인용
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
      {/* <div>Register</div> */}
      <SignupBoxDiv>
        <SignupBox>
          <Title>회원가입</Title>

          <InputName>이메일 주소 *</InputName>
          {/* */}
          {/* <InputCheckBoxDiv> */}
          <CheckInput
            name="email"
            type="text"
            placeholder="example@example.com"
            onChange={onChangeEmail}
          />
          <CheckButton
            className={checkMail ? "checked" : "not-checked"}
            onClick={onCheckEmail}
          >
            중복 확인*
          </CheckButton>
          {/* </InputCheckBoxDiv> */}
          {/* */}
          <ValidationP className={isEmailValid ? "success" : "error"}>
            {emailMsg}
          </ValidationP>

          <InputName>비밀번호 *</InputName>
          <SignupInput
            name="password"
            type="password"
            placeholder="password"
            onChange={onChangePwd}
          />
          <h3 className={isPwdValid ? "success" : "error"}>{pwdMsg}</h3>

          {/* <InputName>비밀번호 확인 *</InputName> */}
          <SignupInput
            name="confirmPassword"
            type="password"
            placeholder="confirm password"
            onChange={onChangeConfirmPwd}
          />
          <h3 className={isConfirmPwd ? "success" : "error"}>
            {confirmPwdMsg}
          </h3>

          <InputName>닉네임 *</InputName>
          <CheckInput
            name="nickname"
            type="text"
            placeholder="nickname"
            onChange={onChangeNickname}
          />
          <CheckButton
            onClick={onCheckNickname}
            className={checkNickname ? "checked" : "not-checked"}
          >
            중복 확인*
          </CheckButton>
          <ValidationP className={isNicknameValid ? "success" : "error"}>
            {nicknameMsg}
          </ValidationP>

          {/* <CheckModal
            isAccepted={isAccepted}
            setIsAccpted={setIsAccpted}
            onCheckAccept={handleCheckAccept}
          /> */}

          {/* <div> */}
          <SignupButton onClick={onSubmit} type="submit" disabled={!isAllValid}>
            가입하기
          </SignupButton>
          {/* </div> */}
          <DivisionLine />
          <p>간편로그인</p>
          <SocialLoginBox>
            <SocialLogo
              href={GOOGLE_AUTH_URL}
              style={{
                backgroundImage: `url(${googleIcon})`,
              }}
            />
            <SocialLogo
              href={NAVER_AUTH_URL}
              style={{
                backgroundImage: `url(${naverIcon})`,
              }}
            />
            <SocialLogo
              href={KAKAO_AUTH_URL}
              style={{
                backgroundImage: `url(${kakaoIcon})`,
              }}
            />
          </SocialLoginBox>
        </SignupBox>
      </SignupBoxDiv>
    </>
  );
}

export default Register;
