import React, { useEffect, useState } from "react";
// import { Carousel } from "react-bootstrap";
import PostList from "../components/post/PostList";
import Carousel from "../components/post/Carousel";
import Banner from "../components/common/Banner";
// import { Carousel } from "react-bootstrap/Carousel";

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
      {/* <Carousel>
        <Carousel.Item interval={time}>
          <img
            className="d-block w-100"
            // src="holder.js/800x400?text=First slide&bg=373940"
            // src="http://blog.dogfoot.info/uploads/carousel_sample.jpg"
            // src={"../../public/images/carousel_sample.jpg"}
            src={
              "https://cdn.pixabay.com/photo/2020/09/27/13/15/data-5606639__480.jpg"
            }
            // title="Gold"
            width={width}
            height={height}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label: {welcome}</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={time}>
          <img
            className="d-block w-100"
            src={
              "https://cdn.pixabay.com/photo/2017/07/31/14/45/code-2558220__480.jpg"
            }
            width={width}
            height={height}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={time}>
          <img
            className="d-block w-100"
            src={
              "https://cdn.pixabay.com/photo/2018/06/17/09/19/cyber-security-3480163__480.jpg"
            }
            width={width}
            height={height}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel> */}
      {/* <CarouselA /> */}
      <PostList />
    </div>
  );
}

export default Home;
