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

  const Title = styled.text`
    font-family: Elice Digital Baeum;
    font-weight: 600;
    color: #ffffff;
    // color: #ffe77aff;
    font-size: 36px;
    padding-bottom: 24px;
    display: flex;
  `;
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
    text-decoration-line: none;
    display: flex;
    word-break: keep-all;
    text-align: center;
    justify-content: center; // 좌우 정렬
    // padding-top: 20px;
  `;
  const Icon = styled(FA.FaYoutube)`
    font-size: 1.5rem;
    cursor: pointer;
    &:hover {
      color: #ffa5a5;
    }
  `;

  return (
    <CarouselDiv>
      <InnerDiv>
        <Title>Tech Blog</Title>
        <SubTitle>
          어제의 나를 유지보수 하면서 겪은 일들을 기록하고 있습니다.
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
