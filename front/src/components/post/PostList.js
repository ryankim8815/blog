// import React from "react";
import React, { useState, useEffect } from "react";
import Catbtn from "./Catbtn";
// import { useNavigate, useParams } from "react-router-dom";
import * as Api from "../utils/Api";
import styled from "styled-components";

// tag 리스트를 for문으로 돌려서 만들어 지도록 개선해야함
function PostList() {
  // category button list
  const CategoryDiv = styled.div`
    width: 100%;
    // background-color: green; // 영역확인용
    margin: 50px 0px;
    display: flex;
    text-align: center; // display를 inline으로 했기 때문에 정렬 가능
    align-items: center; // 상하 정렬
    justify-content: center; // 좌우 정렬
  `;
  const CategoryBox = styled.div`
    width: 950%;
    max-width: 1024px;
    // background-color: tomato; // 영역확인용
  `;

  // posts list
  const PostBoxDiv = styled.div`
    width: 100%;
    // background-color: green; // 영역확인용
    margin: 50px 0px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column; /*수직 정렬*/
    align-items: center; // 상하 정렬
    justify-content: center; // 좌우 정렬
  `;
  const PostBox = styled.div`
    width: 90%;
    // min-width: 360px;
    max-width: 1024px;
    // background-color: tomato; // 영역확인용
    // font-family: Elice Digital Baeum;
    margin: 50px 0px;
    text-align: left; // display를 inline으로 했기 때문에 정렬 가능
    display: flex-column;
  `;
  const StyledA = styled.a`
    text-decoration-line: none;
    color: black;
  `;
  const DivisionLine = styled.div`
    border-top: 1px solid lightgray;
    margin: 50px auto;
    width: 100%;
  `;

  const [posts, setPosts] = useState([]);
  //   const [tag, setTag] = useState([]);
  /////
  const [activeCat, setActiveCat] = useState("All");
  //   const [data, setData] = useState([]);
  //   let tag = ""; // 임시, 추후 tag 상태를 가져와야함

  const apiGetAllPosts = async () => {
    try {
      const result = await Api.get("posts");
      setPosts(result.data.list);
    } catch (e) {
      console.log(e);
    }
  };

  const apiGetPostsByTag = async (tag) => {
    try {
      const result = await Api.get(`posts/tag/${tag}`);
      setPosts(result.data.list);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    activeCat === "All" ? apiGetAllPosts() : apiGetPostsByTag(activeCat);
  }, [activeCat]);

  return (
    <div>
      <CategoryDiv>
        <CategoryBox>
          <Catbtn
            name="All"
            catActive={activeCat === "All" ? true : false}
            handleSetCat={setActiveCat}
          />
          {/* <Catbtn
            name="tag"
            catActive={activeCat === "tag" ? true : false}
            handleSetCat={setActiveCat}
          /> */}
          {/* <Catbtn
            name="SERVER"
            catActive={activeCat === "SERVER" ? true : false}
            handleSetCat={setActiveCat}
          /> */}
          <Catbtn
            name="BACKEND"
            catActive={activeCat === "BACKEND" ? true : false}
            handleSetCat={setActiveCat}
          />
          <Catbtn
            name="FRONTEND"
            catActive={activeCat === "FRONTEND" ? true : false}
            handleSetCat={setActiveCat}
          />
          <Catbtn
            name="DEVOPS"
            catActive={activeCat === "DEVOPS" ? true : false}
            handleSetCat={setActiveCat}
          />
          <Catbtn
            name="QA"
            catActive={activeCat === "QA" ? true : false}
            handleSetCat={setActiveCat}
          />
          <Catbtn
            name="SECURITY"
            catActive={activeCat === "SECURITY" ? true : false}
            handleSetCat={setActiveCat}
          />
          <Catbtn
            name="DATA"
            catActive={activeCat === "DATA" ? true : false}
            handleSetCat={setActiveCat}
          />
          <Catbtn
            name="etc"
            catActive={activeCat === "etc" ? true : false}
            handleSetCat={setActiveCat}
          />
        </CategoryBox>
      </CategoryDiv>
      <PostBoxDiv>
        {posts.map((post, index) => (
          <PostBox key={index}>
            <h6>
              {post.created_at.split("T", 1)}
              &nbsp;&nbsp;&nbsp;@{post.nickname}
            </h6>
            <h2>
              <StyledA href={"/post/" + post.post_id}>{post.title}</StyledA>
              {/* <a href="/posts/">{post.title}</a> */}
            </h2>
            <h6>{post.sub_title}</h6>
            {/* <div className="division-line"></div> */}
            <DivisionLine />
          </PostBox>
        ))}
      </PostBoxDiv>
    </div>
  );
}

export default PostList;
