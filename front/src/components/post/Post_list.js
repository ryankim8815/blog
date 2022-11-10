// import React from "react";
import React, { useState, useEffect } from "react";
import Catbtn from "./Catbtn";
// import { useNavigate, useParams } from "react-router-dom";
import * as Api from "../utils/Api";
// tag 리스트를 for문으로 돌려서 만들어 지도록 개선해야함
function Post_list() {
  const [posts, setPosts] = useState([]);
  //   const [tag, setTag] = useState([]);
  /////
  const [activeCat, setActiveCat] = useState("All");
  //   const [data, setData] = useState([]);
  //   let tag = ""; // 임시, 추후 tag 상태를 가져와야함

  const apiGet = async (tag) => {
    //     console.log("APIAPIAPIAPI");

    // Api.get("p", tag)
    Api.get("p", tag)
      .then((res) => {
        // console.log("RESULT: ", res.data.list);
        // if (res.data.list) {
        setPosts(res.data.list);
        // setData(posts);
        // } else {
        //   console.log("error");
        // }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    activeCat === "All" ? apiGet() : apiGet(activeCat);
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
          name="QA/TESTING"
          catActive={activeCat === "QA/TESTING" ? true : false}
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

export default Post_list;
