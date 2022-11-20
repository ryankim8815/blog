import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import * as FI from "react-icons/fi";

const Carousel = () => {
  const CarouselDiv = styled.div`
    // background-color: #4f3466ff;
    // background-color: #5f4a8b;
    // background: linear-gradient(135deg, #51087e, #b24bf3);
    // background-color: #1d490d;
    // background-color: #004523;
    // background-color: #2c5f2dff;
    background: linear-gradient(135deg, #3f5c4a, #91a86f);
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
    padding-bottom: 20px;
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

  return (
    <CarouselDiv>
      <InnerDiv>
        <Title>Tech Blog</Title>
        <SubTitle>
          유튜브에서 '개발자A' 채널을 운영하고 있는 backend 개발자입니다.
        </SubTitle>
        <SubTitle>
          제 실수와 생각들을 기억하기 위해서 기록하고 있습니다.
        </SubTitle>
      </InnerDiv>
    </CarouselDiv>
  );
};

export default Carousel;
