// import React from "react";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import * as FA from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserStateContext, DispatchContext } from "../../App";

const NavItemA = styled.a`
  // width: 20%;
  min-width: 50px;
  // height: 230px;
  // text-align: left;
  // background-color: pink; // 영역확인용
  // padding-bottom: 30px;
  color: gray;
  display: flex;
  // flex-wrap: wrap;
  flex-direction: column; /*수직 정렬*/
  justify-content: center; // 좌우 정렬
  text-decoration-line: none;
  &:hover {
    color: #342a97;
  }
`;
const NavItemText = styled.span`
  // width: 20%;
  // min-width: 256px;
  // height: 230px;
  // text-size: 2.5rem;
  // text-align: left;
  // background-color: pink; // 영역확인용
  // padding-bottom: 30px;
  font-size: 12px;
  display: flex;
  // flex-wrap: wrap;
  // flex-direction: column; /*수직 정렬*/
  justify-content: center; // 좌우 정렬

  .icon {
    size: 2.5rem;
  }
`;
const MainSubText = styled.span`
  // width: 20%;
  // min-width: 256px;
  // height: 230px;
  // text-size: 2.5rem;
  // text-align: left;
  // background-color: pink; // 영역확인용
  // padding-bottom: 30px;
  font-size: 16px;
  font-weight: 400;
  color: gray;
  display: flex;
  margin-right: 40px;
  // margin-right: 20px;
  // flex-wrap: wrap;
  // flex-direction: column; /*수직 정렬*/
  justify-content: center; // 좌우 정렬
  &:hover {
    color: #342a97;
  }
`;

export default function Logout() {
  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);
  let navigate = useNavigate();

  //     navigate('/');
  const onLogOutClick = () => {
    // signOut(auth);   // api로 세션 만료하도록 처리
    // 모달창으로 더블책
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    <NavItemA onClick={onLogOutClick}>
      {/* <NavItemText>
        <FA.FaSignOutAlt size="1.8rem" />
      </NavItemText> */}
      <MainSubText>로그아웃</MainSubText>
    </NavItemA>
  );
}
