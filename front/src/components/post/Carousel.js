import React, { useEffect, useRef, useState } from "react";
// import styled from "styled-components";

const CarouselA = () => {
  //   const SHOWING_CLASS = "showing";
  //   const firstSlide = document.querySelector(".slider__item:first-child");
  async function slide() {
    //   const slide = async () => {
    const SHOWING_CLASS = "showing";
    const firstSlide = document.querySelector(".slider__item:first-child");
    console.log("firstSlide: ", firstSlide);
    const currentSlide = document.querySelector(`.${SHOWING_CLASS}`);
    if (currentSlide) {
      console.log("current: ", currentSlide);
      currentSlide.classList.remove(SHOWING_CLASS);
      const nextSlide = currentSlide.nextElementSibling;
      if (nextSlide) {
        console.log("next: ", nextSlide);
        nextSlide.classList.add(SHOWING_CLASS);
      } else {
        console.log("first: ", firstSlide);
        firstSlide.classList.add(SHOWING_CLASS);
      }
    } else {
      console.log("first2: ", firstSlide);
      await firstSlide.classList.add(SHOWING_CLASS);
    }
  }
  slide(); // 이 코드를 주석 처리하고 추가하면 페이지가 정상 작동함, 새로고침 시 문제 발생
  setInterval(slide, 5000);

  return (
    <div id="slider">
      <div className="slider__item">
        <h1>1</h1>
      </div>
      <div className="slider__item">
        <h1>2</h1>
      </div>
      <div className="slider__item">
        <h1>3</h1>
      </div>
      <div className="slider__item">
        <h1>4</h1>
      </div>
      <div className="slider__item">
        <h1>5</h1>
      </div>
    </div>
  );
};

export default CarouselA;

// //https://webaura.tistory.com/entry/React-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EC%97%86%EC%9D%B4-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%8D%94-%EB%A7%8C%EB%93%A4%EA%B8%B0

// import React, { useState, useEffect } from "react";

// const CarouselA = () => {
//   const [projectList, setProjectList] = useState([]);
//   const [scrollState, setScrollState] = useState(0);

//   let count = 0;

//   const nextButton = () => {
//     count = projectList.length - 1 === count ? 0 : count + 1;
//     setScrollState("-" + count * 100 + "vw");
//   };
//   const prevButton = () => {
//     count = count === 0 ? projectList.length - 1 : count - 1;
//     setScrollState("-" + count * 100 + "vw");
//   };

//   useEffect(() => {
//     getProjectList().then((docs) => {
//       setProjectList(docs);
//     });
//   }, []);

//   return (
//     <div>
//       <h1>제발</h1>
//       <button onClick={prevButton}> Prev </button>
//       <button onClick={nextButton}> Next </button>
//     </div>
//   );
// };

// export default CarouselA;
