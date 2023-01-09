import React, { useState, useRef, useEffect, useContext } from "react";
import { UserStateContext, DispatchContext } from "../../App";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import * as Api from "../utils/Api";
// import Catbtn from "../components/post/Catbtn"; //테스트용
import styled from "styled-components";
import showdown from "showdown";
showdown.setOption("ghMentions", true);
showdown.setOption("emoji", true);
showdown.setOption("smoothLivePreview", true);
const converter = new showdown.Converter();

const PageNameDiv = styled.div`
  background: linear-gradient(135deg, #342a97, #9d95da);
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center; // 상하 정렬
  // justify-content: center; // 좌우 정렬
`;
const PageNameLeftDiv = styled.div`
  width: 50%;
  height: 100%;
  padding-left: 40px;
  display: flex;
  align-items: center;
  justify-content: left;
  // background-color: blue; // 영역확인용

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    padding-left: 20px;
  }
`;
const PageNameRightDiv = styled.div`
  // width: 1024px;
  width: 50%;
  height: 100%;
  // margin-left: 20px;
  margin-right: 20px;
  display: flex;
  // flex-direction: column;
  align-items: center;
  justify-content: right;
  // background-color: purple; // 영역확인용
  button {
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    align-items: center;
    justify-content: flex-end;
    padding: 6px 20px;
    border: 1px solid #fff;
    background: transparent;
    border-radius: 14px;
    display: inline-flex;
    cursor: pointer;
    margin: 10px 10px;
    &:hover {
      box-shadow: 0 0 5px 0px lightgray;
    }
  }
`;
const PageNameTitle = styled.span`
  // font-family: Elice Digital Baeum;
  font-weight: 100;
  color: #ffffff;
  font-size: 24px;
  // font-weight: 900;
  // color: #333333;
  display: flex;
  justify-content: center; // 좌우 정렬
  // background-color: pink; // 영역확인용
`;

const MenuDiv = styled.div`
  width: 95%;
  //   max-width: 1024px;
  max-width: ${(props) => props.theme.mobileSize};
  margin: 0px auto;
  display: flex;
  //   text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  //   justify-content: center; // 좌우 정렬
  justify-content: space-between;
  padding: 50px 0 50px 0;
  //   background-color: pink; // 영역확인용

  @media screen and (max-width: 500px) {
    padding: 20px 0;
  }
  div {
    width: 100%;
    height: 60px;
    margin: 0px 0px;
    display: flex;
    // border-top: 1px solid #e1e1e1;
    border-top: 1px solid ${(props) => props.theme.greyBorderColor};
    color: ${(props) => props.theme.greyTextColor};

    // text-align: center; // display를 inline으로 했기 때문에 정렬 가능
    justify-content: center; // 좌우 정렬
    // padding: 50px 0 100px 0;
    cursor: pointer;
    // background-color: skyblue; // 영역확인용

    &:hover {
      border-top: 1px solid black;
      color: black;
    }
  }
  span {
    font-weight: 200;
    // color: ${(props) => props.theme.greyTextColor};
    font-size: 16px;
    // margin: 0px auto;
    margin: auto 0px;
    // background-color: pink; // 영역확인용

    // &:hover {
    //   color: black;
    // }
  }
`;
const PostBoxDiv = styled.div`
  width: 100%;
  //   margin: 0px 0px;
  display: flex;
  //   text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  text-align: left; // display를 inline으로 했기 때문에 정렬 가능
  justify-content: center; // 좌우 정렬
  padding: 10px 0 100px 0;
  //   background-color: skyblue; // 영역확인용

  @media screen and (max-width: 500px) {
    padding: 20px 0;
  }
`;
const PostBox = styled.div`
  width: 95%;
  //   max-width: 1024px;
  max-width: ${(props) => props.theme.mobileSize};
  //   text-align: left;
  //   display: inline-block;
  //   background-color: skyblue; // 영역확인용

  //   div {
  //     margin: -1px auto;
  //     padding: 20px 0px 17px 0px;
  //     background-color: #ffffff;
  //     border: 1px solid ${(props) => props.theme.greyBorderColor};
  //     // padding: 10px 0px 10px 0px;
  //     // background-color: blue; // 영역확인용

  //     &:hover {
  //       //   cursor: pointer;
  //       background-color: ${(props) => props.theme.greyBtnBgColor};
  //     }
  //   }
`;

const PostBoxInnerDiv = styled.div`
  margin: -1px auto;
  padding: 20px 0px 17px 0px;
  background-color: #ffffff;
  border: 1px solid ${(props) => props.theme.greyBorderColor};
  display: flex;
  // padding: 10px 0px 10px 0px;
  // background-color: blue; // 영역확인용

  button {
    height: 24px;
    border: 1px solid ${(props) => props.theme.greyBorderColor};
    background-color: #fff;
    color: ${(props) => props.theme.blackTextColor};
    font-size: 14px;
    margin-left: 5px;
    display: none;
    // background: pink; // 확인용
    &:hover {
      cursor: pointer;
      border: 1px solid gray;
      // box-shadow: 0 0 2px 0px lightgray;
      background-color: ${(props) => props.theme.greyBtnBgColor};
    }
  }

  &:hover {
    background-color: ${(props) => props.theme.greyBtnBgColor};
  }
  &:hover button {
    display: block;
    display: inline-block;
  }
`;
const PostBoxInnerLeft = styled.div`
  width: 80%;
  display: inline-block;
  //   display: block;
  //   background-color: skyblue; // 영역확인용
`;
const PostBoxInnerRight = styled.div`
  width: 20%;
  min-width: 90px;
  padding-top: 7px;
  margin-right: 20px;
  display: inline-block;
  text-align: right; // 좌우 정렬
  //   justify-content: right;
  //   align-items: center; // 상하 정렬
  //   background-color: pink; // 영역확인용
`;
const TitleSpan = styled.span`
  text-align: left; // 좌우 정렬
  margin: auto 30px;
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => props.theme.blackTextColor};
  //   display: table-cell;
`;
const TitleA = styled.a`
  display: table-cell;
  text-decoration-line: none;
  //   text-align: left; // 좌우 정렬
  //   margin: auto 30px;
  //   font-size: 16px;
  //   font-weight: 400;
  //   color: black;
  //   display: table-cell;
`;
const StyledSpan = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.theme.greyTextColor};
  text-align: left;
  margin: auto 30px;
  //   display: table-cell;
`;
const ButtonA = styled.a`
  width: 100px;
  border: 1px solid #c5cdd7;
  background-color: #fff;
  text-align: center; // 좌우 정렬
  margin: auto 0px;
  //   box-sizing: border-box;
  //   vertical-align: top;
  //   display: table-cell;
  //   text-decoration-line: none;
  //   margin: auto 30px;
  //   font-size: 16px;
  //   font-weight: 400;
  //   color: black;
  display: block;
`;
const EditButton = styled.button`
  height: 24px;
  border: 1px solid ${(props) => props.theme.greyBorderColor};
  background-color: #fff;
  color: ${(props) => props.theme.blackTextColor};
  font-size: 14px;
  // background: pink; // 확인용
  &:hover {
    border: 1px solid gray;
    // box-shadow: 0 0 2px 0px lightgray;
    background-color: ${(props) => props.theme.greyBtnBgColor};
  }
`;
const Tag = styled.div`
  text-align: left; // 좌우 정렬
  margin: 0px 20px;
  color: black;
`;
const StyledA = styled.a`
  text-decoration-line: none;
`;

const SubTitle = styled.p`
  text-align: left; // 좌우 정렬
  margin: 0px 20px;
  font-size: 20px;
  font-weight: 200;
  color: gray;
`;
const Info = styled.p`
  text-align: left; // 좌우 정렬
  margin: 5px 0 0 20px;
  font-size: 16px;
  font-weight: 400;
  color: gray;
`;

const DivisionLine = styled.div`
  border-top: 1px solid lightgray;
  margin: 10px 0 50px 0;
  width: 100%;
`;

const Content = styled.p`
  text-align: left; // 좌우 정렬
  padding: 0px 30px;
  font-size: 16px;
  font-weight: 400;
  color: black;
`;

// const tag = "resume";
function MyPage() {
  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("published");
  //   const [option, setOption] = useState("published");
  const [activeMenu, setActiveMenu] = useState("published");

  let navigate = useNavigate();

  const apiGetPosts = async () => {
    try {
      const result = await Api.get(`posts/${status}/${userState.user.user_id}`);
      setPosts(result.data.list);
    } catch (e) {
      console.log(e);
    }
  };

  const onCheckPublishedPosts = async (e) => {
    e.preventDefault();
    setStatus("published");
    setActiveMenu("published");
  };
  const onCheckSavedPosts = async (e) => {
    e.preventDefault();
    setStatus("saved");
    setActiveMenu("saved");
  };

  //   const onCheckComments = async (e) => {
  //     e.preventDefault();
  //     setOption("comments");
  //   };

  useEffect(() => {
    apiGetPosts();
  }, [status]);

  return (
    <div>
      <PageNameDiv>
        <PageNameLeftDiv>
          <PageNameTitle>MY PAGE</PageNameTitle>
        </PageNameLeftDiv>
      </PageNameDiv>
      <MenuDiv>
        {/* <div>
          <span>최근 열람</span>
        </div> */}
        <div
          style={
            activeMenu == "published"
              ? {
                  borderTop: "1px solid black",
                  color: "black",
                }
              : {}
          }
        >
          <span onClick={onCheckPublishedPosts}>발행</span>
        </div>
        <div
          style={
            activeMenu == "saved"
              ? { borderTop: "1px solid black", color: "black" }
              : {}
          }
        >
          <span onClick={onCheckSavedPosts}>작성중</span>
        </div>
        {/* <div>
          <span onClick={onCheckComments}>댓글</span>
        </div> */}
      </MenuDiv>
      <PostBoxDiv>
        <PostBox>
          {posts.map((post) => (
            <PostBoxInnerDiv
              //   onClick={() => location.href("/")}
              key={post.post_id}
              className="box-post-list"
            >
              <PostBoxInnerLeft>
                <TitleA href={`/post/${post.post_id}`}>
                  {/* {post.title} */}
                  <TitleSpan>{post.title}</TitleSpan>
                </TitleA>
                <StyledSpan>
                  {post.tag}&nbsp; · &nbsp;{post.nickname}&nbsp; · &nbsp;
                  {post.created_at.split("T", 1)}
                </StyledSpan>
              </PostBoxInnerLeft>
              <PostBoxInnerRight>
                {/* <ButtonA>수정</ButtonA> */}
                {/* <EditButton>수정</EditButton> */}
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  수정
                </button>
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  발행
                </button>
              </PostBoxInnerRight>
            </PostBoxInnerDiv>
          ))}
        </PostBox>
      </PostBoxDiv>
    </div>
  );
}

export default MyPage;
