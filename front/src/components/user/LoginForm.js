import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form } from "react-bootstrap";

import * as Api from "../utils/Api";
import { DispatchContext } from "../../App";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  console.log(typeof dispatch); //function 왜???
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

  const isPasswordValid = password.length >= 4;

  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post("user/login", {
        email,
        password,
      });
      const user = res.data;

      const jwtToken = user.token;

      sessionStorage.setItem("userToken", jwtToken);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });
      // console.log(typeof dispatch());

      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
    } catch (err) {
      alert("로그인에 실패하였습니다.\n", err);
    }
  };

  return (
    <Container>
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
    </Container>
  );
}

export default LoginForm;
