import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Api from "../components/utils/Api";
import Catbtn from "../components/post/Catbtn"; //테스트용

import showdown from "showdown";
showdown.setOption("ghMentions", true);
showdown.setOption("emoji", true);
showdown.setOption("smoothLivePreview", true);
const converter = new showdown.Converter();
function Posts() {
  const navigate = useNavigate();
  const params = useParams();
  const [posts, setPosts] = useState([]);

  const apiGetPostByPostId = async (post_id) => {
    await Api.get(`post/${post_id}`)
      .then((res) => {
        let post = [];
        post[0] = res.data;
        setPosts(post);
      })
      .catch((err) => console.log(err));
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
      <div>Post</div>
      <div className="button-box">
        <button className="post-previous">이전글</button>
        <button className="post-list">게시글 리스트</button>
        <button className="post-next">다음글</button>
      </div>
      {posts.map((post, index) => (
        <div key={index} className="box-post-list">
          <h6>
            {post.created_at.split("T", 1)}
            &nbsp;&nbsp;&nbsp;@{post.nickname}
          </h6>
          <Catbtn name={post.tag} />
          <h2>{post.title}</h2>
          <h6>{post.sub_title}</h6>
          {/* <h6>{post.content}</h6> */}
          <div
            className="preview-box"
            dangerouslySetInnerHTML={{
              __html: converter.makeHtml(post.content),
            }}
          />
          <div className="division-line"></div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
