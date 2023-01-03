import React, { useState, useEffect, useContext } from "react";
import { UserStateContext, DispatchContext } from "../../App";
import styled from "styled-components";
import * as FA from "react-icons/fa";
import Logout from "../logout/Logout";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LogoutDiv = styled.div`
  width: 100%;
  //   max-width: 1280px;
  height: 100%;
  //   background-color: tomato; // 영역확인용
  display: flex;
  // flex-wrap: wrap;
  // text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  align-items: center; // 상하 정렬
  // align-content: flex-start; // 상하 정렬
  // justify-content: center; // 좌우 정렬
  // justify-content: left; // 좌우 정렬
  //   justify-content: space-between;
  justify-content: right;
  // justify-content: space-around; // 좌우 정렬
  // word-break: keep-all;
  // padding-top: 50px;
  color: #333333;
  position: relative;
  span {
    font-weight: 400;
    color: #835dfe;
  }

  ul {
    position: absolute;
    right: 0;
    top: 47px;
    padding: 8px 0;
    margin-right: 40px;
    width: 140px;
    list-style: none;
    border: 1px solid gray;
    border-radius: 2px;
    background: #fff;
    // background-color: gray;
    // border: none;
    // background-color: blue; // 영역확인용

    li {
      padding: 8px 12px;
      button {
        font-weight: 300;
        font-size: 16px;
        // color: yello;
        background-color: transparent;
        border: none;
        // background-color: pink; // 영역확인용
        &:hover {
          font-weight: 500;
          color: #342a97;
        }
      }
    }
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
const NicknameButton = styled.button`
  // width: 20%;
  // min-width: 256px;
  // height: 230px;
  // text-size: 2.5rem;
  // text-align: left;
  //   background-color: pink; // 영역확인용
  background-color: transparent;
  border: none;
  // padding-bottom: 30px;
  font-size: 16px;
  font-weight: 400;
  //   color: gray;
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
const SubText = styled.span`
  // width: 20%;
  // min-width: 256px;
  // height: 230px;
  // text-size: 2.5rem;
  //   text-align: left;
  // background-color: pink; // 영역확인용
  // padding-bottom: 30px;
  font-size: 16px;
  font-weight: 500;
  color: gray;
  display: flex;
  // margin-left: 20px;
  margin-right: 20px;
  // flex-wrap: wrap;
  // flex-direction: column; /*수직 정렬*/
  justify-content: center; // 좌우 정렬
  &:hover {
    color: #342a97;
  }
`;

function LogoutMenu() {
  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  let navigate = useNavigate();

  const onEditorClick = () => {
    // 메뉴 닫기
    setIsMenuVisible(!isMenuVisible);
    // 글쓰기 페이지로 돌아감.
    navigate("/editor");
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
  return (
    <>
      {/* <LogoutDiv>
        <SubText>{userState.user.nickname} 님</SubText>
        <Logout />
      </LogoutDiv> */}

      <LogoutDiv>
        {/* <button ref={menuRef} onClick={() => setIsMenuVisible(!isMenuVisible)}> */}
        <NicknameButton onClick={() => setIsMenuVisible(!isMenuVisible)}>
          <span>{userState.user?.nickname}</span>님
          {/* {isMenuVisible ? <AiFillCaretUp /> : <AiFillCaretDown />} */}
        </NicknameButton>
        {isMenuVisible && (
          <ul>
            <li>
              <button onClick={onEditorClick}>글쓰기</button>
            </li>

            <li>
              <button>마이페이지</button>
            </li>

            <li>
              <button>회원정보 변경</button>
            </li>
            <li>
              <button onClick={onLogOutClick}>로그아웃</button>
            </li>
            {/* <li>
              <button>회원 탈퇴</button>
            </li> */}
          </ul>
        )}

        {/* {isResignMembership && (
          <ResignMembership
            isResignMembership={isResignMembership}
            setIsResignMembership={setIsResignMembership}
          />
        )} */}
      </LogoutDiv>
    </>
  );
}

export default LogoutMenu;
