import React, { useState, useRef, useEffect, useContext } from "react";
import { UserStateContext, DispatchContext } from "../../App";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import * as FA from "react-icons/fa";

const LogoutDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center; // 상하 정렬
  justify-content: right;
  color: #333333;
  position: relative;
  //   background-color: green; // 영역확인용

  button {
    margin: auto;
    display: flex;
    align-items: center; // 상하 정렬
    // background-color: yellow; // 영역확인용
  }

  ul {
    position: absolute;
    right: 0;
    top: 40px;
    padding: 8px 0;
    margin-right: 8px;
    width: 160px;
    list-style: none;
    border: 1px solid gray;
    border-radius: 2px;
    background: #fff;
    // background-color: blue; // 영역확인용

    li {
      padding: 8px 12px;
      button {
        color: #333333;
        font-weight: 300;
        font-size: 16px;
        background-color: transparent;
        border: none;
        cursor: pointer;
        // background-color: pink; // 영역확인용
        &:hover {
          font-weight: 500;
          color: #342a97;
        }
      }
    }
  }
`;

const MenuButton = styled.button`
  background-color: transparent;
  border: none;
  color: #333333;
  font-weight: 400;
  display: flex;
  margin-right: 40px;
  justify-content: center; // 좌우 정렬
  cursor: pointer;
  //   background-color: pink; // 영역확인용

  &:hover {
    color: #342a97;
  }
`;
const DivisionLine = styled.div`
  border-top: 1px solid #e2e2e2;
  margin: 10px auto;
  width: 90%;
`;

function MobileMenu() {
  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);
  const menuRef = useRef(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  let navigate = useNavigate();

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 메뉴 열린 상태를 자동으로 닫아주는 상태 관리
  const handleCloseModal = (e) => {
    if (menuRef.current) {
      const target = menuRef.current.contains(e.target);

      if (!target) {
        setIsMenuVisible(false);
      }
    }
  };

  const onResumeClick = () => {
    // 메뉴 닫기
    setIsMenuVisible(!isMenuVisible);
    // 페이지 이동
    navigate("/about");
  };
  const onChaircoachClick = () => {
    // 메뉴 닫기
    setIsMenuVisible(!isMenuVisible);
    // 페이지 이동
    navigate("/editor");
  };
  const onEditorClick = () => {
    // 메뉴 닫기
    setIsMenuVisible(!isMenuVisible);
    // 페이지 이동
    navigate("/editor");
  };

  const onSignupClick = () => {
    // 메뉴 닫기
    setIsMenuVisible(!isMenuVisible);
    // 페이지 이동
    navigate("/register");
  };
  const onLoginClick = () => {
    // 메뉴 닫기
    setIsMenuVisible(!isMenuVisible);
    // 페이지 이동
    navigate("/login");
  };
  const onLogOutClick = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 메뉴 닫기
    setIsMenuVisible(!isMenuVisible);
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  useEffect(() => {
    window.addEventListener("click", handleCloseModal);

    return () => {
      window.removeEventListener("click", handleCloseModal);
    };
  }, []);

  return (
    <>
      <LogoutDiv>
        <MenuButton
          ref={menuRef}
          onClick={() => setIsMenuVisible(!isMenuVisible)}
        >
          <FA.FaBars size="26px" />
        </MenuButton>
        {isMenuVisible && (
          <ul>
            <li>
              <button onClick={onResumeClick}>이력서</button>
            </li>
            <li>
              <button
                onClick={() =>
                  window.open("https://chaircoach.dogfoot.info", "_blank")
                }
              >
                체어코치
              </button>
            </li>
            <li>
              <DivisionLine />
            </li>
            {isLogin ? (
              <li>
                <button onClick={onEditorClick}>글쓰기</button>
              </li>
            ) : (
              <></>
            )}
            {isLogin ? (
              <li>
                <button>마이페이지</button>{" "}
              </li>
            ) : (
              <></>
            )}

            <li>
              {isLogin ? (
                <button>회원정보 변경</button>
              ) : (
                <button onClick={onLoginClick}>로그인</button>
              )}
            </li>
            <li>
              {isLogin ? (
                <button onClick={onLogOutClick}>로그아웃</button>
              ) : (
                <button onClick={onSignupClick}>회원가입</button>
              )}
            </li>
          </ul>
        )}
      </LogoutDiv>
    </>
  );
}

export default MobileMenu;
