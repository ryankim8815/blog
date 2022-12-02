import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DispatchContext } from "../../App";
import * as Api from "../utils/Api";
import styled from "styled-components";
import googleIcon from "../../assets/img/googleIcon.png";
import kakaoIcon from "../../assets/img/kakaoIcon.png";
import naverIcon from "../../assets/img/naverIcon.png";

const LoginBoxDiv = styled.div`
  width: 100%;
  // background-color: green; // 영역확인용
  margin: 50px 0px;
  display: flex;
  // display: inline-block;
  text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  // align-items: center; // 상하 정렬
  justify-content: center; // 좌우 정렬
  padding: 120px 0;
`;
const LoginBox = styled.div`
  width: 80%;
  // max-width: 1024px;
  max-width: 500px;
  // align-items: center; // 상하 정렬
  text-align: center;
  // justify-content: center; // 좌우 정렬
  display: inline-block;
  // background-color: tomato; // 영역확인용
`;

const Title = styled.p`
  // background-color: pink; // 영역확인용
  font-size: 50px;
  font-weight: 900;
  color: black;
`;

const LoginInput = styled.input`
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

const LoginButton = styled.button`
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
`;
const Button = styled.button`
  font-size: 15px;
  font-weight: 400;
  color: gray;
  // align-items: center; // 상하 정렬
  // text-align: center;
  justify-content: center; // 좌우 정렬
  display: flex;
  background-image: url(${googleIcon});
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
  margin: 0 10px;
`;

// posts list
const PostBoxDiv = styled.div`
  width: 100%;
  // background-color: pink; // 영역확인용
  margin: 50px 0px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column; /*수직 정렬*/
  align-items: center; // 상하 정렬
  justify-content: center; // 좌우 정렬
`;
const PostBox = styled.div`
  width: 90%;
  // min-width: 360px;
  max-width: 1024px;
  // background-color: tomato; // 영역확인용
  // font-family: Elice Digital Baeum;
  margin: 50px 0px;
  text-align: left; // display를 inline으로 했기 때문에 정렬 가능
  display: flex-column;
`;
const StyledA = styled.a`
  text-decoration-line: none;
  color: black;
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

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  //   console.log(typeof dispatch); //function 왜???
  // console.log(typeof dispatch()); //

  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const validatePassword = (password) => {
    return password.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    );
  };

  const isEmailValid = validateEmail(email);

  //   const isPasswordValid = password.length >= 4;
  const isPasswordValid = validatePassword(password);

  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post("signin", {
        email,
        password,
      });
      console.log("결과: ", res.data);
      if (res.data.result == false) {
        console.log("실패패패패패패");
        // navigate("/login");
        alert("로그인에 실패하였습니다.\n");
      } else {
        const user = res.data;
        const jwtToken = user.token;
        sessionStorage.setItem("userToken", jwtToken);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: user,
        });
        console.log("디스패치 잘 됐나?");
        console.log("디스페치 타입은?: ", typeof dispatch());

        // 기본 페이지로 이동함.
        //   navigate("/", { replace: true });
        navigate("/");
        window.location.reload();
        console.log("네비게이트 잘 됐나?");
      }
    } catch (err) {
      alert("로그인에 실패하였습니다.\n", err);
    }
  };

  return (
    <div>
      <LoginBoxDiv>
        <LoginBox>
          <Title>로그인</Title>
          <form onSubmit={handleSubmit}>
            <LoginInput
              type="email"
              autoComplete="on"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isEmailValid && (
              <ValidationP>이메일 형식이 올바르지 않습니다.</ValidationP>
            )}
            {isEmailValid && <ValidationP>이메일 형식 부합</ValidationP>}
            {/* <LoginInput placeholder="password" /> */}
            <LoginInput
              type="password"
              autoComplete="on"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isPasswordValid && (
              <ValidationP>비밀번호는 8글자 이상입니다.</ValidationP>
            )}
            {isPasswordValid && <ValidationP>비밀번호 글자수 부합</ValidationP>}
            <LoginButton type="submit" disabled={!isFormValid}>
              로그인
            </LoginButton>
          </form>
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
        </LoginBox>
      </LoginBoxDiv>
    </div>
  );
}

export default LoginForm;

{
  /* <Container>
        <div className="content"></div>
        <Row className="justify-content-md-center mt-5">
          <Col lg={8}>
            <Form onSubmit={handleSubmit}>
              <div className="form-login">
                <Form.Group controlId="loginEmail">
                  <Form.Control
                    type="email"
                    autoComplete="on"
                    value={email}
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {!isEmailValid && (
                    <div className="message">
                      이메일 형식이 올바르지 않습니다.
                    </div>
                  )}
                </Form.Group>

                <Form.Group controlId="loginPassword" className="mt-3">
                  <Form.Control
                    type="password"
                    autoComplete="on"
                    value={password}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {!isPasswordValid && (
                    <div className="message">비밀번호는 4글자 이상입니다.</div>
                  )}
                </Form.Group>

                <Form.Group as={Row} className="mt-3 text-center">
                  <Col sm={{ span: 20 }}>
                    <button
                      className="sign-in"
                      type="submit"
                      disabled={!isFormValid}
                    >
                      로그인
                    </button>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mt-3 text-center">
                  <Col sm={{ span: 20 }}>
                    <button
                      className="sign-up"
                      onClick={() => navigate("/register")}
                    >
                      회원가입하기
                    </button>
                  </Col>
                </Form.Group>
              </div>
            </Form>
          </Col>
        </Row>
      </Container> */
}
