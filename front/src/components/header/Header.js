import React, { useState, useEffect, useContext } from "react";
import { UserStateContext, DispatchContext } from "../../App";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as FA from "react-icons/fa";
import SignupMenu from "./SignupMenu";
import LoginMenu from "./LoginMenu";
import LogoutMenu from "./LogoutMenu";

const HeaderDiv = styled.div`
  width: 100%;
  height: 60px;
  margin: auto 0px;
  left: 0;
  right: 0;
  // background-color: pink; // 영역확인용
  background-color: #ffffff;
  display: flex;
  justify-content: center; // 좌우 정렬
`;
const HeaderBox = styled.div`
  width: 100%;
  max-width: 1280px;
  height: 100%;
  // background-color: tomato; // 영역확인용
  display: flex;
  // flex-wrap: wrap;
  // text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  // align-items: top; // 상하 정렬
  // align-content: flex-start; // 상하 정렬
  // justify-content: center; // 좌우 정렬
  // justify-content: left; // 좌우 정렬
  justify-content: space-between;
  // justify-content: space-around; // 좌우 정렬
  // word-break: keep-all;
  // padding-top: 50px;
`;
const HeaderBoxLeft = styled.div`
  width: 50%;
  // max-width: 1280px;
  // min-width: 80px;
  height: 100%;
  // background-color: tomato; // 영역확인용
  display: flex;
  // flex-wrap: wrap;
  // text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  // align-items: top; // 상하 정렬
  // align-content: flex-start; // 상하 정렬
  // justify-content: center; // 좌우 정렬
  justify-content: left; // 좌우 정렬
  // justify-content: space-between;
  // justify-content: space-around; // 좌우 정렬
  // word-break: keep-all;
  // padding-top: 50px;
`;
const HeaderBoxRight = styled.div`
  width: 50%;
  // max-width: 1280px;
  // min-width: 80px;
  height: 100%;
  // background-color: tomato; // 영역확인용
  display: flex;
  // flex-wrap: wrap;
  // text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  // align-items: top; // 상하 정렬
  // align-content: flex-start; // 상하 정렬
  // justify-content: center; // 좌우 정렬
  justify-content: right; // 좌우 정렬
  // justify-content: space-between;
  // justify-content: space-around; // 좌우 정렬
  // word-break: keep-all;
  // padding-top: 50px;
`;
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
const MainText = styled.span`
  // width: 20%;
  // min-width: 256px;
  // height: 230px;
  // text-size: 2.5rem;
  // text-align: left;
  // background-color: pink; // 영역확인용
  // padding-bottom: 30px;
  font-size: 24px;
  font-weight: 900;
  color: #333333;
  display: flex;
  margin-left: 40px;
  // margin-right: 10px;
  // flex-wrap: wrap;
  // flex-direction: column; /*수직 정렬*/
  justify-content: center; // 좌우 정렬
  &:hover {
    color: #342a97;
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
  font-weight: 500;
  color: #333333;
  display: flex;
  margin-left: 20px;
  // margin-right: 20px;
  // flex-wrap: wrap;
  // flex-direction: column; /*수직 정렬*/
  justify-content: center; // 좌우 정렬
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

function Header() {
  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;
  // console.log("상태: ", userState.user.nickname);

  // 화면 크기에 따라서 버튼이 보이고 안보이도록 설정한다.
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  // SIGNUP버튼이 사이즈가 줄어들면 없어지도록 한다.
  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <HeaderDiv>
        <HeaderBox>
          <HeaderBoxLeft>
            <NavItem to="/">
              <MainText>DOG FOOT</MainText>
            </NavItem>
            <NavItem to="/about">
              <SubText>이력서</SubText>
            </NavItem>
            <NavItemA href="https://chaircoach.dogfoot.info">
              <SubText>체어코치</SubText>
            </NavItemA>
          </HeaderBoxLeft>
          <HeaderBoxRight>
            {/* <NavItem to="/editor">
              <NavItemText>
                <FA.FaEdit size="1.8rem" />
              </NavItemText>
              <NavItemText>Editor</NavItemText>
            </NavItem> */}
            {/* <SubText>{userState.user.nickname} 님</SubText> */}
            {/* {isLogin ? <LogoutMenu /> : <LoginMenu />} */}
            {isLogin ? <LogoutMenu /> : <LoginMenu />}
            {isLogin ? <></> : <SignupMenu />}
          </HeaderBoxRight>
        </HeaderBox>
      </HeaderDiv>
    </>
  );
}

export default Header;
