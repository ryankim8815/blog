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
  position: absolute;
  bottom: -120px;
  // background-color: #201b4b; // 영역확인용
`;

const FooterText = styled.span`
  width: 100%;
  font-size: 14px;
  color: #fff;
  text-align: center;
  padding-top: 20px;
  // background-color: green; // 영역확인용
`;
const Footer = () => {
  return (
    <FooterDiv>
      <FooterText>Copyright © DogFoot Corp. All rights reserved.</FooterText>
    </FooterDiv>
  );
};

export default Footer;
