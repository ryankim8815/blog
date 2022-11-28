import React, { useState, useEffect } from "react";
import * as Api from "../components/utils/Api";
// import Catbtn from "../components/post/Catbtn";
import showdown from "showdown";
showdown.setOption("ghMentions", true);
showdown.setOption("emoji", true);
showdown.setOption("smoothLivePreview", true);
const converter = new showdown.Converter();
function About() {
  const [posts, setPosts] = useState([]);
  // 게시할 글을 작성하면 tag로 검색해서 노출 시키기
  // 추가적으로 전체 게시글 리스트에서 해당 테그 제외하기
  const apiGetPostByTag = async (tag) => {
    try {
      const result = await Api.get(`posts/tag/${tag}`);
      setPosts(result.data.list);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // 업로드할 게시글이 작성되면 테그를 넣어서 작동시키기
    apiGetPostByTag("resume");
  }, []);

  return (
    <div>
      {/* <div>소개글을 작성한 게시글 불러오기</div> */}
      {posts.map((post) => (
        <div key={post.post_id} className="box-post-list">
          <h6>UPDATED: {post.created_at.split("T", 1)}</h6>
          {/* <Catbtn name={post.tag} /> */}
          <h2>{post.title}</h2>
          <h6>{post.sub_title}</h6>
          {/* <h6>{post.content}</h6> */}
          {/* <div className="division-line"></div> */}
          <div
            className="preview-box"
            dangerouslySetInnerHTML={{
              __html: converter.makeHtml(post.content),
            }}
          />
          {/* <div className="division-line"></div> */}
        </div>
      ))}
    </div>
  );
}

export default About;
