import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PageDiv = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  align-items: center; // 상하 정렬
  justify-content: center; // 좌우 정렬
  position: absolute;
  bottom: 30px;
  // background-color: #201b4b; // 영역확인용

  @media screen and (max-width: 500px) {
    bottom: 20px;
  }
`;
const PageBox = styled.div`
  width: 95%;
  max-width: 1024px;
  // background-color: tomato; // 영역확인용
`;

const PageButton = styled.button`
  min-width: 35px;
  color: ${(props) => props.theme.blackTextColor};
  font-size: 14px;
  font-weight: 100;
  padding: 3px 10px;
  margin: 0px 10px;
  cursor: pointer;
  border: 0px;
  background: none;
  // background: pink; // 확인용

  &:hover {
    font-weight: 900;
    text-decoration: underline;
    color: ${(props) => props.theme.purpleTextColor};
  }
`;
function Pagination({
  pageNum,
  totalPage,
  currentPage,
  maximumPage,
  handleSetPage,
}) {
  let pages = [];
  for (let i = 0; i < totalPage; i++) {
    pages.push(i + 1);
  }

  return (
    <PageDiv>
      <PageBox>
        <PageButton
          onClick={() =>
            handleSetPage(currentPage != 1 ? currentPage - 1 : currentPage)
          }
        >
          &lt;
        </PageButton>
        {pages.map((page) => (
          <PageButton
            key={page}
            onClick={() => handleSetPage(page)}
            style={
              currentPage == page
                ? {
                    fontWeight: 900,
                    textDecoration: "underline",
                    color: "#825dfe",
                  }
                : {}
            }
          >
            {page}
          </PageButton>
        ))}
        <PageButton
          onClick={() =>
            handleSetPage(
              currentPage >= maximumPage ? maximumPage : currentPage + 1
            )
          }
        >
          &gt;
        </PageButton>
      </PageBox>
    </PageDiv>
  );
}
export default Pagination;
