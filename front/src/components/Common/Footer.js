import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const FooterDiv = styled.div`
  width: 100%;
  // height: 300px;
  min-height: 300px;
  // background-color: #201b4b; // 영역확인용
  display: flex;
  flex-direction: column; /*수직 정렬*/
  // text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  align-items: center; // 상하 정렬
  // justify-content: center; // 좌우 정렬
  justify-content: flex-start; // 좌우 정렬
  border-top: 1px solid #dbdbdb;
`;
const FooterBox = styled.div`
  width: 100%;
  // width: 1280px;
  // min-height: 300px;
  // background-color: tomato; // 영역확인용
  // margin: 50px 0px;
  // padding-right: 15%;
  // padding-left: 15%;
  // padding-bottom: 70px;
  display: flex;
  flex-wrap: wrap;
  // text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  // align-items: top; // 상하 정렬
  align-content: flex-start; // 상하 정렬
  justify-content: center; // 좌우 정렬
  // word-break: keep-all;
  padding-top: 50px;
  padding-bottom: 100px;
`;
const Footerleft = styled.div`
  // width: 20%;
  min-width: 256px;
  // height: 230px;
  // text-align: left;
  // background-color: pink; // 영역확인용
  padding-bottom: 30px;
  display: flex;
  // flex-wrap: wrap;
  flex-direction: column; /*수직 정렬*/
  // justify-content: center; // 좌우 정렬
`;
const FooterTitle = styled.span`
  width: 100%;
  height: 50px;
  font-family: Elice Digital Baeum;
  font-weight: 600;
  font-size: 20px;
  color: #909090;
  text-align: left;
  // background-color: skyblue; // 영역확인용
  display: flex;
  // align-items: center; // 상하 정렬
  // justify-content: center; // 좌우 정렬
`;
const FooterText = styled.span`
  width: 100%;
  height: 35px;
  font-family: Elice Digital coding;
  font-weight: 500;
  font-size: 16px;
  color: #adadad;
  text-align: left;
  // background-color: green; // 영역확인용
  // display: flex;
  // align-items: center; // 상하 정렬
  // justify-content: center; // 좌우 정렬
`;

const FooterRight = styled.div`
  // width: 40%;
  // min-width: 512px; // 이것 때문에 옆으로 조금 밀렸음
  min-width: 360px;
  // height: 100%;
  height: 50px;
  display: flex;
  // background-color: yellow; // 영역확인용
  // flex-wrap: wrap;
  flex-direction: column; /*수직 정렬*/
  align-items: center; // 상하 정렬
`;
const FooterText2nd = styled.span`
  width: 100%;
  font-size: 16px;
  // color: #575757;
  color: #adadad;
  // background-color: green; // 영역확인용
  // padding-top: 50px;
  text-align: center;
  // display: flex;
  // align-items: center; // 상하 정렬
  // justify-content: center; // 좌우 정렬
`;
const Footer = () => {
  return (
    <FooterDiv>
      <FooterBox>
        <Footerleft>
          <FooterTitle>채용문의</FooterTitle>
          <FooterText>backend@dogfoot.info</FooterText>
          <FooterText>010.8060.8600</FooterText>
        </Footerleft>
        <Footerleft>
          <FooterTitle>기타문의</FooterTitle>
          <FooterText>admin@dogfoot.info</FooterText>
          <FooterText>ads@dogfoot.info</FooterText>
        </Footerleft>
        <Footerleft>
          <FooterTitle>DogFoot</FooterTitle>
          <FooterText>blog.dogfoot.info</FooterText>
          <FooterText>proj01.dogfoot.info</FooterText>
          <FooterText>proj02.dogfoot.info</FooterText>
        </Footerleft>
        <FooterRight>
          <FooterText2nd>
            Copyright © DogFoot Corp. All rights reserved.
          </FooterText2nd>
        </FooterRight>
      </FooterBox>
    </FooterDiv>
  );
};

export default Footer;
