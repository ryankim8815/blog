import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as FA from "react-icons/fa";

const CarouselDiv = styled.div`
  background: linear-gradient(135deg, #342a97, #9d95da);
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center; // 상하 정렬
  justify-content: center; // 좌우 정렬
  @media screen and (max-width: 500px) {
    height: 180px;
  }
`;
const InnerDiv = styled.div`
  width: 1024px;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.span`
  font-family: Elice Digital Baeum;
  font-weight: 600;
  color: #ffffff;
  font-size: 36px;
  padding-bottom: 16px;
  display: flex;
  @media screen and (max-width: 500px) {
    font-size: 30px;
    padding-bottom: 10px;
  }
`;
const SubTitle = styled.span`
  width: 70%;
  padding: 0px 0px 10px 0;
  font-weight: 400;
  color: #ffffff;
  font-size: 16px;
  display: flex;
  word-break: keep-all;
  text-align: center;
  justify-content: center; // 좌우 정렬
  @media screen and (max-width: 500px) {
    font-size: 13px;
    padding: 0px 0px 5px 0;
  }
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
  align-items: center; // 상하 정렬
  justify-content: center; // 좌우 정렬
  @media screen and (max-width: 500px) {
    font-size: 13px;
  }
`;
const Icon = styled(FA.FaYoutube)`
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: #ffa5a5;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.1rem;
  }
`;

const Carousel = () => {
  return (
    <CarouselDiv>
      <InnerDiv>
        <Title>Tech Blog</Title>
        <SubTitle>어제의 나를 유지보수하며 기록하고 있습니다.</SubTitle>
        <SubTitleLink href="https://www.youtube.com/@dogfoot.">
          <Icon />
          &nbsp;@dogfoot.
        </SubTitleLink>
      </InnerDiv>
    </CarouselDiv>
  );
};

export default Carousel;
