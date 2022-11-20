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
