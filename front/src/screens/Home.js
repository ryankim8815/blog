import React, { useEffect, useState } from "react";
import PostList from "../components/post/PostList";
import Carousel from "../components/post/Carousel";

function Home() {
  const [welcome, setWelcome] = useState([]);
  const width = "300px";
  const height = "500px";
  const time = 3000;

  useEffect(() => {
    setWelcome("안녕하세요. Dogfoot.info 입니다!");
  }, []);

  return (
    <div>
      <Carousel />
      <PostList />
    </div>
  );
}

export default Home;
