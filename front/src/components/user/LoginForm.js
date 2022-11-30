import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

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
  width: 950%;
  // max-width: 1024px;
  max-width: 500px;
  // align-items: center; // 상하 정렬
  // text-align: center;
  justify-content: space-around; // 좌우 정렬
  display: inline-block;
  // background-color: tomato; // 영역확인용
`;

// const SocialLoginBox = styled.div`
//   ${({ theme }) => theme.common.flexCenter};
//   flex-direction: column;
//   padding-top: 40px;
//   border-top: 1px solid ${({ theme }) => theme.colors.greyBorder};

//   p {
//     margin-bottom: 20px;
//     font-weight: 300;
//     color: ${({ theme }) => theme.colors.greyText};
//   }

//   ul {
//     ${({ theme }) => theme.common.flexCenter};
//     margin-bottom: 64px;

//     li {
//       text-align: center;

//       & + li {
//         margin-left: 16px;
//       }

//       &:nth-child(1) button {
//         background: url(${googleIcon}) no-repeat center;
//         background-size: contain;
//       }
//       &:nth-child(2) button {
//         background: url(${kakaoIcon}) no-repeat center;
//         background-size: contain;
//       }
//       &:nth-child(3) button {
//         background: url(${naverIcon}) no-repeat center;
//         background-size: contain;
//       }

//       button {
//         width: 64px;
//         height: 64px;
//         border-radius: 50%;
//         text-indent: -9999px;
//       }

//       span {
//         display: block;
//         margin-top: 8px;
//         font-weight: 300;
//         font-size: ${({ theme }) => theme.fontSize.text};
//         color: ${({ theme }) => theme.colors.greyText};
//       }
//     }
//   }
// `;

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

function LoginForm() {
  const navigate = useNavigate();
  //   const dispatch = useContext(DispatchContext);
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

  const isEmailValid = validateEmail(email);

  //   const isPasswordValid = password.length >= 4;
  const isPasswordValid = password.length >= 3;

  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post("signin", {
        email,
        password,
      });
      const user = res.data;
      console.log("로그인폼의 user: ", user);
      const jwtToken = user.token;
      //   console.log("jwtToken: ", jwtToken);

      sessionStorage.setItem("userToken", jwtToken);

      //////////////////////////오류발생, 꼭 필요한 코드인지 확인 중, app에서 처리 가능해보임
      //   dispatch({
      //     type: "LOGIN_SUCCESS",
      //     payload: user,
      //   });
      //   console.log("디스패치 잘 됐나?");
      //   console.log("디스페치 타입은?: ", typeof dispatch());

      // 기본 페이지로 이동함.
      //   navigate("/", { replace: true });
      navigate("/");
      console.log("네비게이트 잘 됐나?");
    } catch (err) {
      alert("로그인에 실패하였습니다.\n", err);
    }
  };

  return (
    <>
      <LoginBoxDiv>
        <LoginBox>
          <Title>로그인</Title>
          <form onSubmit={handleSubmit}>
            <LoginInput placeholder="email" />
            {!isEmailValid && (
              <ValidationP>이메일 형식이 올바르지 않습니다.</ValidationP>
            )}
            {/* <LoginInput placeholder="password" /> */}
            <LoginInput
              type="email"
              autoComplete="on"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isPasswordValid && (
              <ValidationP>비밀번호는 4글자 이상입니다.</ValidationP>
            )}
            <LoginButton type="submit" disabled={!isFormValid}>
              로그인
            </LoginButton>
          </form>
          <DivisionLine />
          <SocialLoginBox>
            <p>간편로그인</p>
            <ul>
              <li>
                <Button>구글</Button>
                <span>구글</span>
              </li>
              <li>
                {/* <a href={KAKAO_AUTH_URL}> */}
                <a href="www.daum.net">
                  <Button>카카오</Button>
                </a>
                <span>카카오</span>
              </li>
              <li>
                {/* <a href={naverUrl}> */}
                <a href="www.naver.com">
                  <Button>네이버</Button>
                </a>

                <span>네이버</span>
              </li>
            </ul>
          </SocialLoginBox>
          <></>
          {/* <Button type="submit" disabled={!isFormValid}>
            로그인
          </Button>
          <ButtonBox>
            <Button onClick={() => navigate("/signup")}>회원가입</Button>
          </ButtonBox> */}
        </LoginBox>
      </LoginBoxDiv>
      {/* <Container>
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
      </Container> */}
    </>
  );
}

export default LoginForm;
