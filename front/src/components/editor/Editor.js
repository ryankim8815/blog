import React, { useState, useEffect } from "react";
import showdown from "showdown";
showdown.setOption("ghMentions", true);
showdown.setOption("emoji", true);
showdown.setOption("smoothLivePreview", true);

function Editor() {
  let title = "MARKDOWN EDITOR";
  const [contents, setContents] = useState("");
  const [preview, setPreview] = useState("");

  const onChange = (e) => {
    let contents = e.target.value;
    console.log("원본: ", contents);
    // contents = contents.replaceAll(/(\n|\r\n)/g, "<br>"); // 개행 미적용 해결
    // contents = contents.replaceAll(/(\n)/g, "</br>"); // 개행 미적용 해결
    console.log("수정본: ", contents);

    setContents(contents);
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

  useEffect(() => {
    setPreview(converter.makeHtml(contents));
  }, [onChange]);

  return (
    <div>
      <div className="save-box">
        <button className="save-save">SAVE</button>
        <button className="save-publish">PUBLISH</button>
      </div>
      <div className="title-box">
        <input
          className="editor-title"
          type="text"
          placeholder="제목을 입력하세요"
        />
        <input
          className="editor-desc"
          type="text"
          placeholder="소제목을 입력하세요"
        />
        {/* <input className="editor-tag" type="text" placeholder="#태그입력" /> */}
      </div>
      <div className="editor">
        <textarea
          className="input-box"
          autoFocus={false}
          placeholder="Markdown 문법으로 작성하세요."
          onChange={onChange}
          // onChange={(e) => this.handleEditorInput(e)}
        />
        <div
          className="preview-box"
          dangerouslySetInnerHTML={{ __html: preview }}
        />
      </div>
    </div>
  );
}

export default Editor;
