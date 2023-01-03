import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as FA from "react-icons/fa";

const NavItem = styled(Link)`
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
const SubText = styled.span`
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
  margin-right: 20px;
  // margin-right: 20px;
  // flex-wrap: wrap;
  // flex-direction: column; /*수직 정렬*/
  justify-content: center; // 좌우 정렬
  &:hover {
    color: #342a97;
  }
`;

function LoginMenu() {
  return (
    <>
      <NavItem to="/login">
        {/* <NavItemText>
          <FA.FaSignInAlt size="1.8rem" />
        </NavItemText> */}
        <SubText>로그인</SubText>
      </NavItem>
    </>
  );
}

export default LoginMenu;
