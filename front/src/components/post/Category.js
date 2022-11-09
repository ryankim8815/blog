import React from "react";

// tag 리스트를 for문으로 돌려서 만들어 지도록 개선해야함
function Category() {
  return (
    <div class="box-category">
      <button type="button" class="btn-post-category" href="/posts">
        SERVER
      </button>
      <button type="button" class="btn-post-category" href="/posts">
        BACKEND
      </button>
      <button type="button" class="btn-post-category" href="/posts">
        FRONTEND
      </button>
      <button type="button" class="btn-post-category" href="/posts">
        PM
      </button>
      <button type="button" class="btn-post-category" href="/posts">
        DEVOPS
      </button>
      <button type="button" class="btn-post-category" href="/posts">
        QA/TESTING
      </button>
      <button type="button" class="btn-post-category" href="/posts">
        SECURITY
      </button>
      <button type="button" class="btn-post-category" href="/posts">
        APP
      </button>
      <button type="button" class="btn-post-category" href="/posts">
        DATA
      </button>
      <button type="button" class="btn-post-category" href="/posts">
        ETC
      </button>
    </div>
  );
}

export default Category;
