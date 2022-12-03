import React from "react";
import styled from "styled-components";
import * as FA from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
const NavItemText = styled.text`
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
export default function Logout() {
  let navigate = useNavigate();

  //     navigate('/');
  const onLogOutClick = () => {
    // signOut(auth);   // api로 세션 만료하도록 처리
    // 모달창으로 더블책
    sessionStorage.removeItem("userToken");
    navigate("/");
  };

  return (
    <NavItemA onClick={onLogOutClick}>
      <NavItemText>
        <FA.FaSignOutAlt size="1.8rem" />
      </NavItemText>
      <NavItemText>Logout</NavItemText>
    </NavItemA>
  );
}
