import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as FA from "react-icons/fa";
// import { FaHome } from "react-icons/fa";
import * as FI from "react-icons/fi";

const NavDiv = styled.div`
  width: 100%;
  // height: 300px;
  height: 70px;
  position: fixed;
  bottom: 0;
  /* width: 100% */
  left: 0;
  right: 0;
  // background-color: pink; // 영역확인용
  background-color: #ffffff;
  opacity: 0.9;
  // backdrop-filter: blur(10px); // 작동안함
  display: flex;
  flex-direction: column; /*수직 정렬*/
  // text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  align-items: center; // 상하 정렬
  // justify-content: center; // 좌우 정렬
  justify-content: flex-start; // 좌우 정렬
  // border-top: 1px solid #dbdbdb;
`;
const NavBox = styled.div`
  width: 100%;
  max-width: 1280px;
  height: 100%;
  // background-color: tomato; // 영역확인용
  // margin: 50px 0px;
  // padding-right: 15%;
  // padding-left: 15%;
  // padding-bottom: 70px;
  display: flex;
  // flex-wrap: wrap;
  // text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  // align-items: top; // 상하 정렬
  // align-content: flex-start; // 상하 정렬
  // justify-content: center; // 좌우 정렬
  // justify-content: left; // 좌우 정렬
  justify-content: space-around; // 좌우 정렬
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
//   const NavItemIcon = styled(FA)`
//     // width: 20%;
//     // min-width: 256px;
//     // height: 230px;
//     // text-size: 2.5rem;
//     size: 2.5rem;
//     // text-align: left;
//     // background-color: pink; // 영역확인용
//     // padding-bottom: 30px;
//     display: flex;
//     // flex-wrap: wrap;
//     // flex-direction: column; /*수직 정렬*/
//     justify-content: center; // 좌우 정렬

//     .icon {
//       size: 2.5rem;
//     }
//   `;

function NavBar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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
      <NavDiv>
        <NavBox>
          <NavItem to="/">
            <NavItemText>
              <FA.FaHome size="1.8rem" />
            </NavItemText>
            <NavItemText>DogFoot</NavItemText>
          </NavItem>
          <NavItem to="/about">
            <NavItemText>
              <FA.FaInfoCircle size="1.8rem" />
            </NavItemText>
            <NavItemText>About</NavItemText>
          </NavItem>
          <NavItem to="/editor">
            <NavItemText>
              <FA.FaEdit size="1.8rem" />
            </NavItemText>
            <NavItemText>Editor</NavItemText>
          </NavItem>
          <NavItem to="/register">
            <NavItemText>
              <FA.FaUserPlus size="1.8rem" />
            </NavItemText>
            <NavItemText>Signup</NavItemText>
          </NavItem>
          <NavItem to="/login">
            <NavItemText>
              <FA.FaSignInAlt size="1.8rem" />
            </NavItemText>
            <NavItemText>Login</NavItemText>
          </NavItem>
          <NavItem to="/logout">
            <NavItemText>
              <FA.FaSignOutAlt size="1.8rem" />
            </NavItemText>
            <NavItemText>Logout</NavItemText>
          </NavItem>
          {/* <NavItem>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
          </NavItem>
          {/* <ul className={click ? "nav-menu active" : "nav-menu"}> */}
          {/* <NavItem>
            <li className="nav-item">
              <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                About
              </Link>
            </li>
          </NavItem> */}
          {/* <NavItem>
            <li className="nav-item">
              <Link
                to="/projects"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Projects
              </Link>
            </li>
          </NavItem> */}
          {/* <li className="nav-item">
              <Link to="/admin" className="nav-links" onClick={closeMobileMenu}>
                Admin
              </Link>
            </li> */}
          {/* <li className="nav-item">
              <Link
                to="/editor"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Editor
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                login
              </Link>
            </li> */}
          {/* <li className="nav-item">
              <Link
                to="/sign-up"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li> */}
          {/* </ul>
          {button && <button buttonStyle="btn--outline">SIGN UP</button>} */}
          {/* <Button buttonStyle="btn--outline">SIGN UP</Button> */}
        </NavBox>
      </NavDiv>
    </>
  );
}

export default NavBar;
