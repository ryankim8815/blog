import React, { useState, useRef, useEffect, useContext } from "react";
import { UserStateContext, DispatchContext } from "../../../src/App";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const LogoutDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center; // 상하 정렬
  justify-content: right;
  color: #333333;
  position: relative;
  // background-color: tomato; // 영역확인용
  span {
    font-size: 16px;
    font-weight: 400;
    color: #835dfe;
    // background-color: tomato; // 영역확인용

    @media ${(props) => props.theme.mobile} {
      //   font-size: 16px;
    }
  }

  ul {
    position: absolute;
    right: 0;
    top: 47px;
    padding: 8px 0;
    margin-right: 10px;
    width: 140px;
    list-style: none;
    border: 1px solid gray;
    border-radius: 2px;
    background: #fff;
    relative; z-index: 1;
    // background-color: blue; // 영역확인용

    @media ${(props) => props.theme.mobile} {
      margin-right: 40px;
    }

    li {
      padding: 8px 12px;
      button {
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

const NicknameButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  justify-content: center; // 좌우 정렬
  cursor: pointer;
  //   background-color: pink; // 영역확인용

  &:hover {
    color: #342a97;
  }
`;

function MemberMenu() {
  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);
  const location = useLocation();
  const menuRef = useRef(null);
  // const nickname = userState.user.nickname;
  const newNickname = location.state?.nicknameRef;
  const nickname = () => {
    if (newNickname == undefined) {
      return userState.user.nickname;
    } else {
      userState.user.nickname = newNickname;
      return newNickname;
    }
  };

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  let navigate = useNavigate();

  // 메뉴 열린 상태를 자동으로 닫아주는 상태 관리
  const handleCloseModal = (e) => {
    if (menuRef.current) {
      const target = menuRef.current.contains(e.target);

      if (!target) {
        setIsMenuVisible(false);
      }
    }
  };

  const onEditorClick = () => {
    // 메뉴 닫기
    setIsMenuVisible(!isMenuVisible);
    // 글쓰기 페이지로 돌아감.
    navigate("/editor");
  };
  const onMyPageClick = () => {
    // 메뉴 닫기
    setIsMenuVisible(!isMenuVisible);
    // 페이지 이동
    navigate(`/users/${userState.user.user_id}/mypage`);
  };
  const onUpdateClick = () => {
    // 메뉴 닫기
    setIsMenuVisible(!isMenuVisible);
    // 페이지 이동
    navigate(`/users/${userState.user.user_id}/updateuserinfo`);
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
        <NicknameButton
          ref={menuRef}
          onClick={() => setIsMenuVisible(!isMenuVisible)}
        >
          <span>{nickname()}</span>님
        </NicknameButton>
        {isMenuVisible && (
          <ul>
            <li>
              <button onClick={onEditorClick}>글쓰기</button>
            </li>

            <li>
              <button onClick={onMyPageClick}>마이페이지</button>
            </li>

            <li>
              <button onClick={onUpdateClick}>회원정보 변경</button>
            </li>
            <li>
              <button onClick={onLogOutClick}>로그아웃</button>
            </li>
          </ul>
        )}
      </LogoutDiv>
    </>
  );
}

export default MemberMenu;
