import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as FA from "react-icons/fa";

const Carousel = () => {
  // const YouTubeIcon = () => {
  //   return <FA className="FaYoutube"></FA>;
  // };

  const CarouselDiv = styled.div`
    // background-color: #584bbf;
    // background-color: #5f4a8b;
    background: linear-gradient(135deg, #342a97, #9d95da);
    // background-color: #1d490d;
    // background-color: #004523;
    // background-color: #2c5f2dff;
    // background: linear-gradient(135deg, #3f5c4a, #91a86f);
    width: 100%;
    // height: 350px;
    height: 300px;
    display: flex;
    align-items: center; // 상하 정렬
    justify-content: center; // 좌우 정렬
  `;
  const InnerDiv = styled.div`
    // background-color: skyblue; // 위치 확인용
    width: 1024px;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;
  // const Title = styled(Link)`
  //   font-family: Elice Digital Baeum;
  //   font-weight: 600;
  //   color: #ffffff;
  //   // color: #ffe77aff;
  //   font-size: 36px;
  //   padding-bottom: 12px;
  //   display: flex;
  //   textdecoration: "none";
  //   &:hover,
  //   &:focus {
  //     color: blue;
  //   }
  //   &:active {
  //     color: red;
  //   }
  // `;
  const Title = styled.text`
    font-family: Elice Digital Baeum;
    font-weight: 600;
    color: #ffffff;
    // color: #ffe77aff; 
    font-size: 36px;
    padding-bottom: 24px;
    display: flex;
d  `;
  const SubTitle = styled.text`
    width: 70%;
    font-family: Elice Digital Coding;
    font-weight: 100;
    color: #ffffff;
    font-size: 16px;
    display: flex;
    word-break: keep-all;
    text-align: center;
    justify-content: center; // 좌우 정렬
  `;
  const SubTitleLink = styled.a`
    width: 70%;
    font-family: Elice Digital Coding;
    font-weight: 100;
    color: #ffffff !important;
    font-size: 16px;
    display: flex;
    word-break: keep-all;
    text-align: center;
    justify-content: center; // 좌우 정렬
    // padding-top: 20px;
  `;
  const Icon = styled(FA.FaYoutube)`
    font-size: 1.5rem;
    cursor: pointer;
  `;

  return (
    <CarouselDiv>
      <InnerDiv>
        <Title>Tech Blog</Title>
        {/* <Title to={{ pathname: "https://www.naver.com" }} target="_blank">
          Tech Blog
        </Title> */}
        <SubTitle>
          제 실수와 생각들을 기억하기 위해서 기록하고 있습니다.
        </SubTitle>
        <SubTitleLink href="https://www.youtube.com/@dogfoot.">
          <Icon />
          &nbsp;@dogfoot.
        </SubTitleLink>
      </InnerDiv>
    </CarouselDiv>
  );
};

export default Carousel;
