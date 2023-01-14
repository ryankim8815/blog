import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Api from "../components/utils/Api";
import Catbtn from "../components/post/Catbtn"; //테스트용
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
  justify-content: center; // 좌우 정렬
`;
const InnerDiv = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  align-items: center; // 상하 정렬
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

const PostBoxDiv = styled.div`
  width: 100%;
  margin: 0px 0px;
  display: flex;
  text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  justify-content: center; // 좌우 정렬
  padding: 50px 0 100px 0;
  @media screen and (max-width: 500px) {
    padding: 20px 0;
  }
`;
const PostBox = styled.div`
  width: 95%;
  max-width: 1024px;
  text-align: center;
  display: inline-block;
`;

const Tag = styled.div`
  text-align: left; // 좌우 정렬
  margin: 0px 20px;
  color: black;
`;
const StyledA = styled.a`
  text-decoration-line: none;
`;

const Title = styled.h1`
  text-align: left; // 좌우 정렬
  margin: 0px 20px;
  font-size: 40px;
  font-weight: 400;
  color: black;
`;

const SubTitle = styled.h2`
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

const Content = styled.h3`
  text-align: left; // 좌우 정렬
  padding: 0px 30px;
  font-size: 16px;
  font-weight: 400;
  color: black;
`;

// const tag = "resume";
function Posts() {
  const [posts, setPosts] = useState([]);

  const apiGetPostsByTag = async (tag) => {
    try {
      const status = "published";
      const startNumber = 0;
      const endNumber = 10;
      const result = await Api.get(
        `posts/status/${status}/tag/${tag.toLowerCase()}/${startNumber}/${endNumber}`
      );
      // const result = await Api.get(`posts/tag/${tag}`);
      setPosts(result.data.list);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    apiGetPostsByTag("resume");
  }, []);

  return (
    <div>
      <PageNameDiv>
        <InnerDiv>
          <PageNameLeftDiv>
            <PageNameTitle>RESUME</PageNameTitle>
          </PageNameLeftDiv>
        </InnerDiv>
      </PageNameDiv>
      <PostBoxDiv>
        <PostBox>
          {posts.map((post) => (
            <div key={post.post_id} className="box-post-list">
              <Tag>
                <StyledA href={"/"}>{/* <Catbtn name={post.tag} /> */}</StyledA>
              </Tag>
              <Title>{post.title}</Title>
              <SubTitle>{post.sub_title}</SubTitle>
              <Info>
                {post.created_at.split("T", 1)}
                &nbsp;&nbsp;&nbsp;@{post.nickname}
              </Info>{" "}
              <DivisionLine />
              <Content
                dangerouslySetInnerHTML={{
                  __html: converter.makeHtml(post.content),
                }}
              />
              <div className="division-line"></div>
              <Helmet
                meta={[
                  { property: "og:title", content: post.title },
                  {
                    property: "og:description",
                    content: post.content.slice(0, 80),
                  },
                  {
                    property: "keywords",
                    content: `개발자A, 개발자, 코딩, 부트캠프, 국비교육, 자바스크립트, node.js, 백앤드, 프론트앤드, ${post.tag}`,
                  },
                  { property: "og:image", content: post.image },
                  { name: "twitter:card", content: "summary" },
                ]}
              />
            </div>
          ))}
        </PostBox>
      </PostBoxDiv>
    </div>
  );
}

export default Posts;
