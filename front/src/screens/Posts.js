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
    // apiGetPostByPostId("e95afc1b-7b28-496b-9aa3-f5d79e8460ab");
    if (params.post_id) {
      apiGetPostByPostId(params.post_id);
    } else {
      navigate("/");
      return;
    }
  }, [params]);

  return (
    <div>
      <PostBoxDiv>
        <PostBox>
          <div>Post</div>
          <div className="button-box">
            <button className="post-previous">이전글</button>
            <button className="post-list">게시글 리스트</button>
            <button className="post-next">다음글</button>
          </div>
          {posts.map((post) => (
            <div key={post.post_id} className="box-post-list">
              <Tag>
                <Catbtn name={post.tag} justifyContent="left" />
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
