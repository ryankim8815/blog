// import React from "react";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Api from "../utils/Api";
// tag 리스트를 for문으로 돌려서 만들어 지도록 개선해야함
function Post_list() {
  const [posts, setPosts] = useState(null);
  //   const [tag, setTag] = useState([]);
  let tag = ""; // 임시, 추후 tag 상태를 가져와야함

  const apiGet = async (tag) => {
    Api.get("p", tag)
      .then((res) => {
        console.log("RESULT: ", res.data.list);
        if (res.data.list) {
          setPosts(res.data.list);
        } else {
          console.log("error");
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    apiGet(tag);
  }, [tag]);
  //////////
  return (
    <div>
      {posts.map((post, index) => (
        <div key={index} class="box-post-list">
          <h6>{post.nickname}</h6>
          <h2>{post.title}</h2>
          <h6>{post.content}</h6>
          <div class="division-line"></div>
        </div>
      ))}
    </div>
  );
}

export default Post_list;
