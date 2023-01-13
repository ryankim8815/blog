import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Api from "../utils/Api";
import styled from "styled-components";
import showdown from "showdown";
// import swal from "sweetalert";
import tags from "./Tags";

// const tags = ["backend", "frontend", "qa"];
// const tags = { 0: "backend", 1: "frontend", 2: "qa" };

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
  @media ${(props) => props.theme.mobile} {
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

const TagSelect = styled.select`
  width: 130px;
  height: 30px;
  font-size: 14px;
  font-weight: 200;
  color: gray;
  border: none;
  margin-left: 40px;
  cursor: pointer;
  // background-color: pink; // 영역확인용
  &:focus {
    outline: none;
  }

  @media ${(props) => props.theme.mobile} {
    margin-left: 30px;
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
  @media ${(props) => props.theme.mobile} {
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
  @media ${(props) => props.theme.mobile} {
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
const TogleSwitchButton = styled.button`
  // width: 65px;
  width: 85px;
  position: relative;
  .thumb {
    // right: 38px;
    position: absolute;
    width: 23px;
    height: 23px;
    border-radius: 50%;
    background-color: #fff;
    transform
  }
  span {
    // right: 33px;
    right: 29px;
    position: absolute; 
  }
`;

function Editor() {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [status, setStatus] = useState("saved");
  const [tag, setTag] = useState("");
  const params = useParams();

  const navigate = useNavigate();

  // 화면에서 가리기
  function elementShow(idName) {
    const target = document.getElementById(idName);
    target.style.display = "block";
  }
  function elementHide(idName) {
    const target = document.getElementById(idName);
    target.style.display = "none";
  }

  const onChangeHandleTag = (e) => {
    setTag(e.target.value);
  };

  const onChangeContent = (e) => {
    let content = e.target.value;
    setContent(content);
  };
  const onClickSave = async () => {
    try {
      if (!tag | !title | !subTitle | !content | !status) {
        alert("입력되지 않은 항목이 있습니다.");
      } else {
        const sub_title = subTitle;
        const newPost = await Api.post("post", {
          title,
          sub_title,
          content,
          tag,
          status,
        });
        alert("게시물이 저장되었습니다.");
        // 로그인 페이지로 이동함.
        navigate(`/editor/${newPost.data.post_id}`);
      }
    } catch (err) {
      console.log("게시글 저장에 실패하였습니다.", err);
    }
  };
  const onClickUpdate = async () => {
    try {
      if (!tag | !title | !subTitle | !content | !status) {
        alert("입력되지 않은 항목이 있습니다.");
      } else {
        const sub_title = subTitle;
        await Api.put(`post/${params.post_id}`, {
          title,
          sub_title,
          content,
          tag,
          status,
        });
        alert("게시물이 저장되었습니다.");
        // 로그인 페이지로 이동함.
        navigate(`/editor/${params.post_id}`);
      }
    } catch (err) {
      console.log("게시글 저장에 실패하였습니다.", err);
    }
  };

  const onClickToggle = async () => {
    if (status != "published") {
      setStatus("published");
    } else {
      setStatus("saved");
    }
  };

  const getPost = async (postId) => {
    try {
      const { data } = await Api.get(`post/${postId}`);
      setTitle(data.title);
      setSubTitle(data.sub_title);
      setContent(data.content);
      setTag(data.tag);
      setStatus(data.status);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setPreview(converter.makeHtml(content));
  }, [onChangeContent]);

  useEffect(() => {
    // 포스트 저장 여부 확인
    if (!params.post_id) {
      setTitle("");
      setSubTitle("");
      setContent("");
      setTag("");
      setIsSaved(false);
      elementShow("new-post-only");
      elementHide("saved-post-only");
    } else {
      getPost(params.post_id);
      setIsSaved(true);
      elementShow("saved-post-only");
      elementHide("new-post-only");
    }
  }, [params.post_id]);

  return (
    <>
      <PageNameDiv>
        <InnerDiv>
          <PageNameLeftDiv>
            <PageNameTitle>WRITING</PageNameTitle>
          </PageNameLeftDiv>
          <PageNameRightDiv>
            <TogleSwitchButton
              className="toggle"
              onClick={onClickToggle}
              style={
                status == "published"
                  ? { background: "transparent", transition: "0.2s" }
                  : { background: "#8582a5", transition: "0.2s" }
              }
            >
              <div
                className="thumb"
                style={
                  status == "published"
                    ? { right: "2px", transition: "0.2s" }
                    : { right: "58px", transition: "0.2s" }
                }
              />
              {status == "published" ? (
                <span>PUBLIC</span>
              ) : (
                <span style={{ right: "10px" }}>PRIVATE</span>
              )}
              &nbsp;
            </TogleSwitchButton>
            <button
              id="new-post-only"
              className="save-save"
              onClick={onClickSave}
            >
              SAVE
            </button>
            <button
              id="saved-post-only"
              className="save-update"
              onClick={onClickUpdate}
            >
              UPDATE
            </button>
          </PageNameRightDiv>
        </InnerDiv>
      </PageNameDiv>
      <EditorBoxDiv>
        <EditorBox className="title-box">
          {/* <TagSelect id="tag" onChange={onChangeHandleTag} defaultValue={tag}> */}
          <TagSelect id="tag" onChange={onChangeHandleTag} value={tag}>
            <option value="" disabled>
              Choose a tag..
            </option>
            {tags.map((option) => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
            {/* <option value="backend">BACKEND</option> */}
            {/* <option value="frontend">FRONTEND</option> */}
          </TagSelect>
          <TitleInput
            className="editor-title"
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <SubTitleInput
            className="editor-desc"
            type="text"
            placeholder="소제목을 입력하세요"
            value={subTitle}
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
            value={content}
            onChange={onChangeContent}
            // onChange={(e) => this.handleEditorInput(e)}
          />
        </EditorBox>
      </EditorBoxDiv>
    </>
  );
}

export default Editor;
