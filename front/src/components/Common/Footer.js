import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const FooterDiv = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column; /*수직 정렬*/
  align-items: center; // 상하 정렬
  justify-content: flex-start; // 좌우 정렬
  border-top: 1px solid #dbdbdb;
  background-color: #595777; // 영역확인용
  // background-color: #201b4b; // 영역확인용
  position: absolute;
  bottom: -120px;
`;
const FooterBox = styled.div`
  width: 100%;
  // max-width: 1280px;
  padding: 20px 40px 10px;
  // padding: 40px;
  // padding-left: 40px;
  // padding-right: 40px;
  // padding-top: 40px;
  // padding-botton: 500px;
  // margin-left: 50px;
  // margin-right: 50px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start; // 상하 정렬
  justify-content: center; // 좌우 정렬
  // background-color: pink; // 영역확인용
`;
const FooterTop = styled.div`
  width: 100%;
  // max-width: 1280px;
  // min-height: 300px;
  // margin: 50px 0px;
  // padding-right: 15%;
  // padding-left: 15%;
  // padding-bottom: 70px;
  display: flex;
  flex-wrap: wrap;
  // text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  // align-items: top; // 상하 정렬
  align-content: flex-start; // 상하 정렬
  justify-content: space-between; // 좌우 정렬
  // background-color: skyblue; // 영역확인용
`;
const FooterBlock = styled.div`
  padding: 0px 40px 0px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column; /*수직 정렬*/
  // background-color: green; // 영역확인용
`;
const FooterTitle = styled.span`
  width: 100%;
  height: 40px;
  font-weight: 600;
  font-size: 20px;
  color: #909090;
  text-align: left;
  display: flex;
  // background-color: skyblue; // 영역확인용
`;
const FooterText = styled.span`
  width: 100%;
  // height: 35px;
  // font-family: Elice Digital coding;
  font-weight: 500;
  font-size: 14px;
  color: #adadad;
  text-align: left;
  // background-color: green; // 영역확인용
  // display: flex;
  // align-items: center; // 상하 정렬
  // justify-content: center; // 좌우 정렬
`;

const FooterBottom = styled.div`
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
  // color: #adadad;
  color: #fff;
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
        {/* <FooterTop>
          <FooterBlock>
            <FooterTitle>채용문의</FooterTitle>
            <FooterText>backend@dogfoot.info</FooterText>
            <FooterText>010.8060.8600</FooterText>
          </FooterBlock>
          <FooterBlock>
            <FooterTitle>기타문의</FooterTitle>
            <FooterText>admin@dogfoot.info</FooterText>
            <FooterText>ads@dogfoot.info</FooterText>
          </FooterBlock>
          <FooterBlock>
            <FooterTitle>DogFoot</FooterTitle>
            <FooterText>blog.dogfoot.info</FooterText>
            <FooterText>chaircoach.dogfoot.info</FooterText>
          </FooterBlock>
        </FooterTop> */}
        <FooterBottom>
          <FooterText2nd>
            Copyright © DogFoot Corp. All rights reserved.
          </FooterText2nd>
        </FooterBottom>
      </FooterBox>
    </FooterDiv>
  );
};

export default Footer;
