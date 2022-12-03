import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../utils/Api";
import styled from "styled-components";
import showdown from "showdown";
showdown.setOption("ghMentions", true);
showdown.setOption("emoji", true);
showdown.setOption("smoothLivePreview", true);

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
// const WiseSaying = styled.p`
//   // background-color: pink; // 영역확인용
//   width: 50%;
//   font-size: 16px;
//   font-weight: 400;
//   text-align: center;
//   color: black;
// `;
// const Author = styled.p`
//   // background-color: pink; // 영역확인용
//   font-size: 14px;
//   font-weight: 400;
//   text-align: center;
//   color: black;
// `;
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
const ContentBox = styled.div`
  width: 95%;
  max-width: 1024px;
  // max-width: 500px;
  // align-items: center; // 상하 정렬
  text-align: center;
  // justify-content: center; // 좌우 정렬
  display: block;
  margin 0 auto;
  background-color: skyblue; // 영역확인용
`;

const PreviewDiv = styled.div`
  // background-color: pink; // 영역확인용
  width: 95%;
  // max-width: 500px;
  // max-width: 100%;
  height: 500px;
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
    height: 300px;
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
const ValidationP = styled.p`
  width: 95%;
  max-width: 500px;
  height: 20px;
  // background-color: pink; // 영역확인용
  text-indent: 1em;
  text-align: left;
  font-size: 15px;
  font-weight: 400;
  // color: gray;
  color: #ff7f7f;
  display: block;
  justify-content: center; // 좌우 정렬
`;

const LoginButton = styled.button`
  width: 95%;
  max-width: 500px;
  height: 40px;
  border-radius: 2px;
  border: 1px solid #e1e1e1;
  background-color: #835dfe;
  text-indent: 1em;
  font-size: 15px;
  font-weight: 400;
  color: white;
  &:hover {
    // outline: 2px solid purple;
    background-color: #7044ff;
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
  // const onChangeTitle = (e) => {
  //   let title = e.target.value;
  //   setTitle(title);
  // };
  // const onChangeSubTitle = (e) => {
  //   let subTitle = e.target.value;
  //   setSubTitle(subTitle);
  // };
  const onChangeContent = (e) => {
    let content = e.target.value;
    setContent(content);
  };
  const converter = new showdown.Converter();
  // const html = converter.makeHtml(contents);
  // console.log("converter: ", converter);
  // console.log("html: ", html);
  // //   const [tag, setTag] = useState([]);
  // /////
  // const [preview, setPreview] = useState("");

  // setContents = document.getElementById("inputbox");

  // const converter = new showdown.Converter();
  // const html = converter.makeHtml(contents);

  // // //// 세션 중간 저장 시작
  // // // 리액트 lifecycle method.
  // // // 컴포넌트가 mount되기 전 호출됩니다.
  // // const componentWillMount = () => {
  // //   // 브라우저 로컬스토리지의 content를 조회하여
  // //   if (window.localStorage.content) {
  // //     this.setState({
  // //       editor: window.localStorage.content, // 해당 데이터를 컴포넌트의 editor에 저장합니다.
  // //     });
  // //   }
  // // };

  // // // Editor 컴포넌트에 제공되는 method.
  // // const handleEditorInput = (e) => {
  // //   this.setState({ editor: e.target.value }); // synthetic event에 담긴 사용자 입력값에 접근하여 해당 데이터를 App 컴포넌트의 state에 저장합니다.
  // //   window.localStorage.setItem("content", e.target.value); // 또한 해당 데이터를 브라우저 localStorage에도 저장합니다. 브라우저 탭을 닫았다가 다시 켜도 내용이 사라지지 않기 위함입니다.
  // // };
  // // //// 세션 중간 저장 끝

  // useEffect(() => {
  //   setPreview(converter.makeHtml(contents));
  // }, [onChangeSubTitle]);
  // useEffect(() => {
  //   setPreview(subTitle);
  // }, [onChangeSubTitle]);
  const onClickSave = async () => {
    // e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청함.
      const tag = "backend";
      // const tag = "resume";
      const sub_title = subTitle;
      await Api.post("post", {
        title,
        sub_title,
        content,
        tag,
      });

      // // 로그인 페이지로 이동함.
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
      <div className="save-box">
        <button className="save-save" onClick={onClickSave}>
          SAVE
        </button>
        <button className="save-publish">PUBLISH</button>
      </div>
      <EditorBoxDiv>
        <EditorBox className="title-box">
          {/* <WiseSaying>
            100년을 살면서 단지 300 MB 밖에 기억하지 못하는 건 너무 가혹하다. CD
            한 장보다 못하지 않나? 인간의 조건은 정말 점점 더 초라해지고 있다.
          </WiseSaying>
          <Author>- Marvin Minsky, AI로 유명한 컴퓨터 과학자 -</Author> */}
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
            // placeholder="Markdown 문법으로 작성하세요."
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
        {/* <input className="editor-tag" type="text" placeholder="#태그입력" /> */}
        {/* <ContentBox> */}
        {/* <div className="editor"> */}
        {/* </div> */}
        {/* </ContentBox> */}
      </EditorBoxDiv>
    </>
  );
}

export default Editor;
