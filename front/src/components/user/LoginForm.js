import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DispatchContext } from "../../App";
import * as Api from "../utils/Api";
import styled from "styled-components";
import SocialLoginBox from "./SocialLogin";

const LoginBoxDiv = styled.div`
  width: 100%;
  // background-color: green; // 영역확인용
  // margin: 50px 0px;
  margin: auto 0px;
  display: flex;
  // display: inline-block;
  text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  // align-items: center; // 상하 정렬
  justify-content: center; // 좌우 정렬
  padding: 120px 0;
  @media screen and (max-width: 500px) {
    padding: 30px 0;
    // background-color: green; // 영역확인용
  }
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
  // background-color: pink; // 영역확인용
  text-indent: 1em;
  font-size: 15px;
  font-weight: 400;
  color: gray;
  margin: 0px 0px 0px 0;
  padding: 0 0 0 0;
  // justify-content: center; // 좌우 정렬
  &:focus {
    outline: 2px solid #daadff;
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
  // color: gray;
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
    // outline: 2px solid purple;
    background-color: #7044ff;
    // border: 1px solid red;
  }
`;
// 상하간격 스페이서
const SpacerSmallDiv = styled.div`
  width: 100%;
  // max-width: 1024px;
  // max-width: 500px;
  // hight: 20px
  padding: 2px 0;
  margin: 0 auto;
  // display: inline-block;
  display: flex;
  // background-color: tomato; // 영역확인용
`;
const SpacerDiv = styled.div`
  width: 100%;
  // max-width: 1024px;
  // max-width: 500px;
  // hight: 20px
  padding: 5px 0;
  margin: 0 auto;
  // display: inline-block;
  display: flex;
  // background-color: tomato; // 영역확인용
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
          <SpacerSmallDiv />
          <SpacerDiv />
          <SpacerDiv />
          <form onSubmit={handleSubmit}>
            <LoginInput
              type="email"
              autoComplete="on"
              value={email}
              placeholder="이메일"
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isEmailValid && (
              <ValidationP>이메일 형식이 올바르지 않습니다.</ValidationP>
            )}
            {isEmailValid && <ValidationP>이메일 형식 부합</ValidationP>}
            <LoginInput
              type="password"
              autoComplete="on"
              value={password}
              placeholder="비밀번호"
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
          <SocialLoginBox />
        </LoginBox>
      </LoginBoxDiv>
    </div>
  );
}

export default LoginForm;
