// import React from "react";
import React, { useState, useEffect } from "react";
import Catbtn from "./Catbtn";
// import { useNavigate, useParams } from "react-router-dom";
import * as Api from "../utils/Api";
// tag 리스트를 for문으로 돌려서 만들어 지도록 개선해야함
function PostList() {
  const [posts, setPosts] = useState([]);
  //   const [tag, setTag] = useState([]);
  /////
  const [activeCat, setActiveCat] = useState("All");
  //   const [data, setData] = useState([]);
  //   let tag = ""; // 임시, 추후 tag 상태를 가져와야함

  const apiGetAllPosts = async () => {
    Api.get("p")
      .then((res) => {
        setPosts(res.data.list);
      })
      .catch((err) => console.log(err));
  };
  const apiGetPostsByTag = async (tag) => {
    // console.log("검색한 테그: ", tag);
    Api.get(`p/${tag}`)
      .then((res) => {
        setPosts(res.data.list);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    activeCat === "All" ? apiGetAllPosts() : apiGetPostsByTag(activeCat);
    //   : setPosts(posts.filter((e) => e.tag === activeCat));
  }, [activeCat]);
  //   useEffect(() => {
  //     apiGet(tag);
  //   }, [tag]);
  //////////
  return (
    <div>
      <div className="box-category">
        <Catbtn
          name="All"
          catActive={activeCat === "All" ? true : false}
          handleSetCat={setActiveCat}
        />
        <Catbtn
          name="tag"
          catActive={activeCat === "tag" ? true : false}
          handleSetCat={setActiveCat}
        />
        <Catbtn
          name="SERVER"
          catActive={activeCat === "SERVER" ? true : false}
          handleSetCat={setActiveCat}
        />
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
      </div>
      {posts.map((post, index) => (
        <div key={index} className="box-post-list">
          <h6>
            {post.created_at.split("T")[0]}
            &nbsp;&nbsp;&nbsp;@{post.nickname}
          </h6>
          <h2>{post.title}</h2>
          <h6>{post.content}</h6>
          <div className="division-line"></div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
