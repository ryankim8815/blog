// import React from "react";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Catbtn from "./Catbtn";
import Pagination from "./Pagination";
// import { useNavigate, useParams } from "react-router-dom";
import * as Api from "../utils/Api";
import styled from "styled-components";
import tags from "../editor/Tags";

// category button list
const CategoryDiv = styled.div`
  width: 100%;
  padding-top: 40px;
  display: flex;
  text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  align-items: center; // 상하 정렬
  justify-content: center; // 좌우 정렬
  // background-color: #201b4b; // 영역확인용

  @media screen and (max-width: 500px) {
    padding-top: 20px;
  }
`;
const CategoryBox = styled.div`
  width: 95%;
  max-width: 1024px;
  // background-color: tomato; // 영역확인용
`;
const CategoryUnitDiv = styled.div`
  margin: 5px 10px;
  display: inline-block;
`;

// posts list
const PostBoxDiv = styled.div`
  width: 100%;
  // min-height: 510px;
  // min-height: ${window.outerHeight - (60 + 300 + 100 + 120 + 35)}px;
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column; /*수직 정렬*/
  // margin: auto;
  align-items: center; // 상하 정렬
  // align-items: top; // 상하 정렬
  // justify-content: center; // 좌우 정렬
  // justify-content: top; // 좌우 정렬
  // background-color: #201b4b; // 영역확인용

  @media screen and (max-width: 500px) {
    padding-top: 30px;
    padding-bottom: 30px;
  }
`;
const PostBox = styled.div`
  width: 90%;
  max-width: 1024px;
  text-align: left; // display를 inline으로 했기 때문에 정렬 가능
  display: flex-column;
  // background-color: pink; // 영역확인용
`;
const StyledA = styled.a`
  text-decoration-line: none;
  color: black;
`;
const DivisionLine = styled.div`
  border-top: 1px solid lightgray;
  margin: 40px auto;
  width: 100%;
  @media screen and (max-width: 500px) {
    margin: 25px auto;
  }
`;
// 상하간격 스페이서
const SpacerDiv = styled.div`
  width: 100%;
  padding: 10px 0;
  margin: 0 auto;
  display: flex;
  @media screen and (max-width: 500px) {
    padding: 5px 0;
  }
`;

// tag 리스트를 for문으로 돌려서 만들어 지도록 개선해야함
function PostList() {
  const [posts, setPosts] = useState([]);
  const [activeCat, setActiveCat] = useState("All");
  const [pageMax, setPageMax] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [pageNum, setPageNum] = useState(1);
  const location = useLocation();

  const apiGetPostsByTag = async (tag, start) => {
    try {
      const status = "published";
      const startNumber = start ? start : 0;
      const endNumber = postsPerPage;
      const result = await Api.get(
        `posts/status/${status}/tag/${tag.toLowerCase()}/${startNumber}/${endNumber}`
      );
      setPosts(result.data.list);
      const calculatePageMax = Math.ceil(result.data.count / postsPerPage);
      setPageMax(calculatePageMax ? calculatePageMax : 1);
      window.scrollTo(0, 0);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    apiGetPostsByTag(activeCat);
    setPageNum(1);
  }, [activeCat]);

  useEffect(() => {
    const start = postsPerPage * (pageNum - 1);
    apiGetPostsByTag(activeCat, start);
  }, [pageNum]);

  return (
    <div>
      <CategoryDiv>
        <CategoryBox>
          <CategoryUnitDiv>
            <Catbtn
              name="All"
              catActive={activeCat === "All" ? true : false}
              handleSetCat={setActiveCat}
            />
          </CategoryUnitDiv>
          {tags.map((tag) => (
            <CategoryUnitDiv key={tag}>
              <Catbtn
                name={tag.toUpperCase()}
                catActive={activeCat === tag.toUpperCase() ? true : false}
                handleSetCat={setActiveCat}
              />
            </CategoryUnitDiv>
          ))}
        </CategoryBox>
      </CategoryDiv>
      <PostBoxDiv>
        {posts.length == 0 ? (
          <p>게시물이 없습니다.</p>
        ) : (
          posts.map((post) => (
            <PostBox key={post.post_id}>
              <h6>
                {post.created_at.split("T", 1)}
                &nbsp;&nbsp;&nbsp;@{post.nickname}
              </h6>
              <h2>
                <StyledA href={"/post/" + post.post_id}>{post.title}</StyledA>
              </h2>
              <h6>{post.sub_title}</h6>
              <DivisionLine />
              <SpacerDiv />
            </PostBox>
          ))
        )}
      </PostBoxDiv>
      <Pagination
        totalPage={pageMax}
        currentPage={pageNum}
        maximumPage={pageMax}
        handleSetPage={setPageNum}
      />
    </div>
  );
}

export default PostList;
