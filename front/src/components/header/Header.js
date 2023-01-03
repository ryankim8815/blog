import React, { useState, useEffect, useContext } from "react";
import { UserStateContext, DispatchContext } from "../../App";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as FA from "react-icons/fa";
import SignupMenu from "./SignupMenu";
import LoginMenu from "./LoginMenu";
import LogoutMenu from "./LogoutMenu";
import MobileMenu from "./MobileMenu";

const HeaderDiv = styled.div`
  width: 100%;
  height: 60px;
  margin: auto 0px;
  left: 0;
  right: 0;
  background-color: #ffffff;
  display: flex;
  justify-content: center; // 좌우 정렬
  // background-color: pink; // 영역확인용

  @media ${(props) => props.theme.mobile} {
    height: 50px;
  }
`;
const HeaderBox = styled.div`
  width: 100%;
  max-width: 1280px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  // background-color: tomato; // 영역확인용
`;
const HeaderBoxLeft = styled.div`
  width: 50%;
  height: 100%;
  padding-left: 40px;
  display: flex;
  justify-content: left; // 좌우 정렬
  // background-color: tomato; // 영역확인용

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    padding-left: 20px;
  }
`;
const HeaderBoxRight = styled.div`
  width: 50%;
  height: 100%;
  padding-right: 40px;
  display: flex;
  justify-content: right; // 좌우 정렬
  // background-color: green; // 영역확인용

  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;
const HeaderBoxMedia = styled.div`
  display: none;
  button {
    display: none;
    height: 100%;
    margin: auto
    background-color: blue; // 영역확인용
    @media ${(props) => props.theme.mobile} {
      display: block;
    }
  }
  @media ${(props) => props.theme.mobile} {
    display: block;
    padding-right: 15px; 
    height: 100%;
    display: flex;
    align-items: center; // 상하 정렬
    justify-content: right; // 좌우 정렬
  }
`;
const NavItem = styled(Link)`
  color: gray;
  display: flex;
  flex-direction: column; /*수직 정렬*/
  justify-content: center; // 좌우 정렬
  text-decoration-line: none;
  // background-color: yellow; // 영역확인용

  &:hover {
    color: #342a97;
  }
`;
const NavItemA = styled.a`
  min-width: 50px;
  color: gray;
  display: flex;
  flex-direction: column; /*수직 정렬*/
  justify-content: center; // 좌우 정렬
  text-decoration-line: none;
  // background-color: pink; // 영역확인용

  &:hover {
    color: #342a97;
  }
`;
const MainText = styled.span`
  font-size: 24px;
  font-weight: 900;
  color: #333333;
  display: flex;
  justify-content: center; // 좌우 정렬
  // background-color: pink; // 영역확인용

  &:hover {
    color: #342a97;
  }

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;
const SubText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  display: flex;
  margin-left: 20px;
  justify-content: center; // 좌우 정렬
  // background-color: pink; // 영역확인용

  &:hover {
    color: #342a97;
  }
  @media ${(props) => props.theme.mobile} {
    display: none;
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
            <NavItemA
              onClick={() =>
                window.open("https://chaircoach.dogfoot.info", "_blank")
              }
            >
              <SubText>체어코치</SubText>
            </NavItemA>
          </HeaderBoxLeft>
          <HeaderBoxRight>
            {isLogin ? <LogoutMenu /> : <LoginMenu />}
            {isLogin ? <></> : <SignupMenu />}
          </HeaderBoxRight>
          <HeaderBoxMedia>
            <MobileMenu />
          </HeaderBoxMedia>
        </HeaderBox>
      </HeaderDiv>
    </>
  );
}

export default Header;
