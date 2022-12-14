import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DispatchContext } from "../../App";
import * as Api from "../utils/Api";
import styled from "styled-components";
import SocialLoginBox from "./SocialLogin";

const PageNameDiv = styled.div`
  background: linear-gradient(135deg, #342a97, #9d95da);
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center; // 상하 정렬
  justify-content: center; // 좌우 정렬
`;
const InnerDiv = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  align-items: center; // 상하 정렬
`;
const PageNameLeftDiv = styled.div`
  width: 50%;
  height: 100%;
  padding-left: 40px;
  display: flex;
  align-items: center;
  justify-content: left;
  // background-color: blue; // 영역확인용

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    padding-left: 20px;
`;
const PageNameTitle = styled.span`
  font-weight: 100;
  color: #ffffff;
  font-size: 24px;
  display: flex;
  justify-content: center; // 좌우 정렬
  // background-color: pink; // 영역확인용
`;

const LoginBoxDiv = styled.div`
  width: 100%;
  margin: auto 0px;
  display: flex;
  text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  justify-content: center; // 좌우 정렬
  padding: 120px 0;
  @media screen and (max-width: 500px) {
    padding: 30px 0;
  }
`;
const LoginBox = styled.div`
  width: 80%;
  max-width: 500px;
  text-align: center;
  display: inline-block;
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: 400;
  color: black;
`;

const LoginInput = styled.input`
  width: 95%;
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

const ValidationP = styled.p`
  width: 95%;
  max-width: 500px;
  height: 22px;
  text-indent: 1em;
  text-align: left;
  font-size: 15px;
  font-weight: 400;
  color: #ff7f7f;
  display: block;
  justify-content: center; // 좌우 정렬
`;

const LoginButton = styled.button`
  width: 95%;
  max-width: 500px;
  height: 40px;
  border-radius: 2px;
  border: 1px solid #e1e1e1;
  background-color: #835dfe;
  text-indent: 1em;
  font-size: 15px;
  font-weight: 400;
  color: white;
  &:hover {
    background-color: #7044ff;
  }
  &:disabled {
    color: gray;
    background-color: #e1e1e1;
  }
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

const DivisionLine = styled.div`
  border-top: 1px solid lightgray;
  margin: 40px auto;
  width: 100%;
`;

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const [email, setEmail] = useState("");
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
  const isPasswordValid = validatePassword(password);
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post("signin", {
        email,
        password,
      });
      if (res.data.result == false) {
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
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      alert("로그인에 실패하였습니다.\n", err);
    }
  };

  return (
    <div>
      <PageNameDiv>
        <InnerDiv>
          <PageNameLeftDiv>
            <PageNameTitle>LOGIN</PageNameTitle>
          </PageNameLeftDiv>
        </InnerDiv>
      </PageNameDiv>
      <LoginBoxDiv>
        <LoginBox>
          <Title>로그인</Title>
          <SpacerBigDiv />
          <form onSubmit={handleSubmit}>
            <LoginInput
              type="email"
              autoComplete="on"
              value={email}
              placeholder="이메일"
              onChange={(e) => setEmail(e.target.value)}
            />
            {isEmailValid || !email ? (
              <ValidationP>{null}</ValidationP>
            ) : (
              <ValidationP>이메일 형식이 올바르지 않습니다.</ValidationP>
            )}
            <LoginInput
              type="password"
              autoComplete="on"
              value={password}
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
            />
            {isPasswordValid || !password ? (
              <ValidationP>{null}</ValidationP>
            ) : (
              <ValidationP>비밀번호는 8글자 이상입니다.</ValidationP>
            )}
            <LoginButton type="submit" disabled={!isFormValid}>
              로그인
            </LoginButton>
          </form>
          <DivisionLine />
          <SocialLoginBox />
        </LoginBox>
      </LoginBoxDiv>
    </div>
  );
}

export default LoginForm;
