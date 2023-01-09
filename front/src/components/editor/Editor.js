import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../utils/Api";
import styled from "styled-components";
import showdown from "showdown";

// showdown.setFlavor("original");
const converter = new showdown.Converter({
  simplifiedAutoLink: true,
  excludeTrailingPunctuationFromURLs: true,
  literalMidWordUnderscores: true,
  literalMidWordAsterisks: true,
  strikethrough: true,
  tables: true,
  // tablesHeaderId: true,
  ghCodeBlocks: true, // default: true
  tasklists: true,
  smoothLivePreview: true,
  // smartIndentationFix: true,   // ???
  // disableForced4SpacesIndentedSublists: true, // 2 spaces
  // simpleLineBreaks: true,    // 1 enter enough but syntax issue
  requireSpaceBeforeHeadingText: true,
  ghMentions: true, // github mention @id
  ghMentionsLink: `https://github.com/{u}/profile`, // github @ mention url custom
  encodeEmails: false, // default : true error- too many log (not working) // false - working fine
  openLinksInNewWindow: true,
  // backslashEscapesHTMLTags: true,    // not useful
  emoji: true,
  // underline: true,
  // ellipsis: true,
  // completeHTMLDocument: true,
  // metadata: true,
  // splitAdjacentBlockquotes: true,
  parseImgDimensions: true,
});

const PageNameDiv = styled.div`
  background: linear-gradient(135deg, #342a97, #9d95da);
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center; // 상하 정렬
  justify-content: center; // 좌우 정렬
`;
const InnerDiv = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  align-items: center; // 상하 정렬
`;
const PageNameLeftDiv = styled.div`
  width: 50%;
  height: 100%;
  padding-left: 40px;
  display: flex;
  align-items: center;
  justify-content: left;
  // background-color: blue; // 영역확인용

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    padding-left: 20px;
  }
`;
const PageNameRightDiv = styled.div`
  width: 50%;
  height: 100%;
  padding-right: 40px;
  display: flex;
  align-items: center;
  justify-content: right;
  // background-color: purple; // 영역확인용
  button {
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    align-items: center;
    justify-content: flex-end;
    padding: 6px 20px;
    border: 1px solid #fff;
    background: transparent;
    border-radius: 14px;
    display: inline-flex;
    cursor: pointer;
    margin: 10px 10px;
    &:hover {
      box-shadow: 0 0 5px 0px lightgray;
    }
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    padding-right: 20px;
  }
`;

const PageNameTitle = styled.span`
  // font-family: Elice Digital Baeum;
  font-weight: 100;
  color: #ffffff;
  font-size: 24px;
  // font-weight: 900;
  // color: #333333;
  display: flex;
  justify-content: center; // 좌우 정렬
  // background-color: pink; // 영역확인용
`;

const EditorBoxDiv = styled.div`
  width: 100%;
  // background-color: green; // 영역확인용
  // margin: 50px 0px;
  // margin: auto 0px;
  // margin: 0px auto;
  // display: flex;
  display: inline-block;
  // text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  // align-items: center; // 상하 정렬
  justify-content: center; // 좌우 정렬
  padding: 50px 0;
  @media screen and (max-width: 500px) {
    padding: 20px 0;
    // background-color: green; // 영역확인용
  }
`;

const EditorBox = styled.div`
  width: 95%;
  max-width: 1024px;
  // max-width: 500px;
  // align-items: center; // 상하 정렬
  // text-align: center;
  // justify-content: center; // 좌우 정렬
  display: block;
  margin 0 auto;
  // background-color: tomato; // 영역확인용
`;

const EditorInput = styled.input`
  width: 95%;
  // width: 800px;
  // max-width: 500px;
  // max-width: 100%;
  height: 40px;
  border-radius: 2px;
  border: 1px solid #e1e1e1;
  // background-color: pink; // 영역확인용
  text-indent: 1em;
  font-size: 15px;
  font-weight: 400;
  color: gray;
  // margin: 0px 0px 0px 0;
  padding: 0 0 0 0;
  display: block;
  margin 0 auto;
  // justify-content: center; // 좌우 정렬
  &:focus {
    outline: 2px solid #daadff;
    // border: 1px solid red;
  }
`;
const TitleInput = styled.input`
  width: 95%;
  // width: 800px;
  // max-width: 500px;
  // max-width: 100%;
  // height: 40px;
  // border-radius: 2px;
  // border: 1px solid #e1e1e1;
  border: none;
  // background-color: pink; // 영역확인용
  text-indent: 0.3em;
  font-size: 50px;
  font-weight: 200;
  color: gray;
  // margin: 0px 0px 0px 0;
  padding: 0 0 0 0;
  display: block;
  margin 0 auto;
  // justify-content: center; // 좌우 정렬
  &:focus {
    // outline: 2px solid #daadff;
    outline: none;
    // border: 1px solid red;
  }
  @media screen and (max-width: 500px) {
    font-size: 40px;
    // background-color: green; // 영역확인용
  }
`;
const SubTitleInput = styled.input`
  width: 95%;
  // width: 800px;
  // max-width: 500px;
  // max-width: 100%;
  height: 30px;
  // border-radius: 2px;
  // border: 1px solid #e1e1e1;
  border: none;
  // background-color: pink; // 영역확인용
  text-indent: 1em;
  font-size: 16px;
  font-weight: 200;
  color: gray;
  // margin: 0px 0px 0px 0;
  padding: 0 0 0 0;
  display: block;
  margin 0 auto;
  // justify-content: center; // 좌우 정렬
  &:focus {
    // outline: 2px solid #daadff;
    outline: none;
    // border: 1px solid red;
  }
`;

const PreviewDiv = styled.div`
  // background-color: pink; // 영역확인용
  width: 95%;
  // max-width: 500px;
  // max-width: 100%;
  // height: 500px;
  height: 200px;
  // min-height: 100px;
  // max-height: 500px;
  margin 0 auto;
  padding: 10px 0px;
  overflow-y: scroll;
  display: block;
  border-radius: 2px;
  border: 1px solid #e1e1e1;
  text-indent: 1em;
  font-size: 16px;
  font-weight: 400;
  color: black;
  @media screen and (max-width: 500px) {
    height: 200px;
    // background-color: green; // 영역확인용
  }
`;
const ContentTextarea = styled.textarea`
  // background-color: pink; // 영역확인용
  width: 95%;
  // max-width: 500px;
  // max-width: 100%;
  height: 100px;
  resize: vertical;
  margin 0 auto;
  padding: 10px 0px;
  display: block;
  border-radius: 2px;
  border: 1px solid #e1e1e1;
  text-indent: 1em;
  font-size: 16px;
  font-weight: 200;
  color: black;
  &:focus {
    outline: 2px solid #daadff;
    // outline: none;
    // border: 1px solid red;
  }
`;

// 상하간격 스페이서
const SpacerSmallDiv = styled.div`
  width: 100%;
  // max-width: 1024px;
  // max-width: 500px;
  // hight: 20px
  padding: 2px 0;
  margin: 0 auto;
  // display: inline-block;
  display: flex;
  // background-color: tomato; // 영역확인용
`;
const SpacerDiv = styled.div`
  width: 100%;
  // max-width: 1024px;
  // max-width: 500px;
  // hight: 20px
  padding: 5px 0;
  margin: 0 auto;
  // display: inline-block;
  display: flex;
  // background-color: tomato; // 영역확인용
`;
const DivisionLine = styled.div`
  border-top: 1px solid lightgray;
  margin: 40px auto;
  width: 100%;
`;

function Editor() {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const onChangeContent = (e) => {
    let content = e.target.value;
    setContent(content);
  };
  const onClickSave = async () => {
    try {
      // "user/register" 엔드포인트로 post요청함.
      const status = "saved";
      const tag = "backend";
      const sub_title = subTitle;
      await Api.post("post", {
        title,
        sub_title,
        content,
        tag,
        status,
      });

      // 로그인 페이지로 이동함.
      navigate("/");
    } catch (err) {
      console.log("게시글 저장에 실패하였습니다.", err);
    }
  };
  const onClickPublish = async () => {
    try {
      // "user/register" 엔드포인트로 post요청함.
      const status = "published";
      const tag = "backend";
      const sub_title = subTitle;
      await Api.post("post", {
        title,
        sub_title,
        content,
        tag,
        status,
      });

      // 로그인 페이지로 이동함.
      navigate("/");
    } catch (err) {
      console.log("게시글 저장에 실패하였습니다.", err);
    }
  };

  useEffect(() => {
    setPreview(converter.makeHtml(content));
  }, [onChangeContent]);

  return (
    <>
      <PageNameDiv>
        <InnerDiv>
          <PageNameLeftDiv>
            <PageNameTitle>WRITING</PageNameTitle>
          </PageNameLeftDiv>
          <PageNameRightDiv>
            <button className="save-save" onClick={onClickSave}>
              SAVE
            </button>
            <button className="save-publish" onClick={onClickPublish}>
              PUBLISH
            </button>
          </PageNameRightDiv>
        </InnerDiv>
      </PageNameDiv>
      <EditorBoxDiv>
        <EditorBox className="title-box">
          <TitleInput
            className="editor-title"
            type="text"
            placeholder="제목을 입력하세요"
            onChange={(e) => setTitle(e.target.value)}
          />
          <SubTitleInput
            className="editor-desc"
            type="text"
            placeholder="소제목을 입력하세요"
            onChange={(e) => setSubTitle(e.target.value)}
          />
          <PreviewDiv
            className="preview-box"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
          <ContentTextarea
            className="input-box"
            autoFocus={false}
            placeholder="본문을 Markdown 문법으로 작성하세요."
            onChange={onChangeContent}
            // onChange={(e) => this.handleEditorInput(e)}
          />
        </EditorBox>
      </EditorBoxDiv>
    </>
  );
}

export default Editor;
