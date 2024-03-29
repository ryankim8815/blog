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
`;
const PageNameTitle = styled.span`
  font-weight: 100;
  color: #ffffff;
  font-size: 24px;
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
  // background-color: #201b4b; // 영역확인용

  @media screen and (max-width: 500px) {
    padding: 20px 0;
  }
`;
const PostBox = styled.div`
  width: 95%;
  max-width: 1024px;
  text-align: center;
  display: inline-block;
  // background-color: #201b4b; // 영역확인용
`;

const Tag = styled.div`
  text-align: left; // 좌우 정렬
  margin: 0px 20px;
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
  min-height: 400px;
  text-align: left; // 좌우 정렬
  padding: 0px 30px;
  font-size: 16px;
  font-weight: 400;
  color: black;
`;

function Posts() {
  const navigate = useNavigate();
  const params = useParams();
  const [posts, setPosts] = useState([]);

  const apiGetPostByPostId = async (post_id) => {
    try {
      const result = await Api.get(`post/${post_id}`);
      let post = [];
      post[0] = result.data;
      setPosts(post);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (params.post_id) {
      apiGetPostByPostId(params.post_id);
    } else {
      navigate("/");
      return;
    }
  }, [params]);

  return (
    <div>
      <PageNameDiv>
        <InnerDiv>
          <PageNameLeftDiv>
            <PageNameTitle>READING</PageNameTitle>
          </PageNameLeftDiv>
        </InnerDiv>
      </PageNameDiv>
      <PostBoxDiv>
        <PostBox>
          {posts.map((post) => (
            <div key={post.post_id} className="box-post-list">
              <Tag>
                <StyledA href={"/"}>
                  <Catbtn name={post.tag} />
                </StyledA>
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
              <DivisionLine />
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
