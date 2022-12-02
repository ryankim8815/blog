import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Api from "../components/utils/Api";
import Catbtn from "../components/post/Catbtn"; //테스트용
import styled from "styled-components";
import showdown from "showdown";
showdown.setOption("ghMentions", true);
showdown.setOption("emoji", true);
showdown.setOption("smoothLivePreview", true);
const converter = new showdown.Converter();

const PostBoxDiv = styled.div`
  width: 100%;
  // background-color: green; // 영역확인용
  margin: 50px 0px;
  display: flex;
  // display: inline-block;
  text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  // align-items: center; // 상하 정렬
  justify-content: center; // 좌우 정렬
  padding: 20px 0 120px 0;
`;
const PostBox = styled.div`
  width: 95%;
  max-width: 1024px;
  // max-width: 500px;
  // align-items: center; // 상하 정렬
  text-align: center;
  // justify-content: center; // 좌우 정렬
  display: inline-block;
  // background-color: tomato; // 영역확인용
`;

const Tag = styled.p`
  // background-color: pink; // 영역확인용
  text-align: left; // 좌우 정렬
  margin: 0px 0px;
  // padding: 0px 20px;
  // text-indent: 1em;
  font-size: 40px;
  font-weight: 900;
  color: black;
`;
const StyledA = styled.a`
  text-decoration-line: none;
  // color: black;
`;

const Title = styled.p`
  // background-color: pink; // 영역확인용
  text-align: left; // 좌우 정렬
  margin: 0px 0px;
  padding: 0px 20px;
  // text-indent: 1em;
  font-size: 40px;
  font-weight: 900;
  color: black;
`;

const SubTitle = styled.p`
  // background-color: pink; // 영역확인용
  text-align: left; // 좌우 정렬
  margin: 0px 0px;
  padding: 0px 20px;
  // text-indent: 1em;
  font-size: 20px;
  font-weight: 400;
  color: gray;
`;
const Info = styled.p`
  // background-color: pink; // 영역확인용
  text-align: left; // 좌우 정렬
  margin: 5px 0 0 0;
  padding: 0px 20px;
  // text-indent: 1em;
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
  // background-color: pink; // 영역확인용
  text-align: left; // 좌우 정렬
  padding: 0px 30px;
  // text-indent: 1em;
  font-size: 16px;
  font-weight: 400;
  color: black;
`;

// const tag = "resume";
function Posts() {
  const [posts, setPosts] = useState([]);

  const apiGetPostsByTag = async (tag) => {
    try {
      const result = await Api.get(`posts/tag/${tag}`);
      setPosts(result.data.list);
      console.log("api결과", result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    apiGetPostsByTag("resume");
  }, []);

  return (
    <div>
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
            </div>
          ))}
        </PostBox>
      </PostBoxDiv>
    </div>
  );
}

export default Posts;
