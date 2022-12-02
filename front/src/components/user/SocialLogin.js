import React from "react";
import styled from "styled-components";
import googleIcon from "../../assets/img/googleIcon.png";
import kakaoIcon from "../../assets/img/kakaoIcon.png";
import naverIcon from "../../assets/img/naverIcon.png";

const SocialLoginBoxDiv = styled.div`
  width: 100%;
  max-width: 500px;
  justify-content: center; // 좌우 정렬
  // display: inline-block;
  display: flex;
`;

const SocialLogo = styled.a`
  font-size: 15px;
  font-weight: 400;
  color: gray;
  justify-content: center; // 좌우 정렬
  display: flex;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: 0px 0px;
  background-size: contain;
  vertical-align: middle;
  object-fit: cover;
  border: none;
  cursor: pointer;
  height: 60px;
  width: 60px;
  vertical-align: middle;
  margin: 0 15px;
`;

export default function SocialLoginBox() {
  // google
  const GOOGLE_client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const GOOGLE_redirectURI = process.env.REACT_APP_GOOGLE_REDIRECT_URL;
  const GOOGLE_encoded = encodeURIComponent(GOOGLE_redirectURI);
  const GOOGLE_state = process.env.REACT_APP_GOOGLE_STATE;
  // const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${client_id}&scope=openid%20email&redirect_uri=${encoded}&state=${state}&nonce=${nonce}&hd=${hd}`;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${GOOGLE_encoded}&client_id=${GOOGLE_client_id}&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&state=${GOOGLE_state}`;

  // naver
  const NAVER_client_id = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_redirectURI = process.env.REACT_APP_NAVER_REDIRECT_URL;
  const NAVER_encoded = encodeURIComponent(NAVER_redirectURI);
  const NAVER_state = process.env.REACT_APP_NAVER_STATE;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_client_id}&redirect_uri=${NAVER_encoded}&state=${NAVER_state}`;

  // kakao
  const KAKAO_client_id = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KAKAO_redirectURI = process.env.REACT_APP_KAKAO_REDIRECT_URL;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_client_id}&redirect_uri=${KAKAO_redirectURI}&response_type=code`;

  return (
    <>
      <p>간편로그인</p>
      <SocialLoginBoxDiv>
        <SocialLogo
          href={GOOGLE_AUTH_URL}
          style={{
            backgroundImage: `url(${googleIcon})`,
          }}
        />
        <SocialLogo
          href={NAVER_AUTH_URL}
          style={{
            backgroundImage: `url(${naverIcon})`,
          }}
        />
        <SocialLogo
          href={KAKAO_AUTH_URL}
          style={{
            backgroundImage: `url(${kakaoIcon})`,
          }}
        />
      </SocialLoginBoxDiv>
    </>
  );
}
