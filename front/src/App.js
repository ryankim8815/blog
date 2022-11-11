// import logo from "./logo.svg";
// import "./App.css";

// login status
import React, { useEffect, useReducer, useState, createContext } from "react";
// import React, { createContext } from "react";
import * as Api from "./components/utils/Api";
import { loginReducer } from "./components/utils/Reducer";
// for screens
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// screens
import Home from "./screens/Home";
import About from "./screens/About";
import Projects from "./screens/Projects";
import Live from "./screens/Live";
import Register from "./screens/Register";
import Admin from "./screens/Admin";
import Posts from "./screens/Posts";
import Editor from "./components/editor/Editor";
// import EditorA from "./components/editor/EditorA";
// components
import NavBarElements from "./components/common/NavBarElements";
// import NavBarElements from "./components/Common/NavBarElements";
import "./assets/main.css";
import LoginForm from "./components/user/LoginForm";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
  //useReducer(첫 번째 파라미터에는 리듀서 함수, 두 번째 파라미터에는 리듀서의 기본 값을 넣는다.)
  //useReducer를 사용하면 state값과 dispatch 함수를 받아온다. 여기서 state는 현재 가리키고 있는 상태 / dispatch는 액션을 '발생시키는' 함수.
  //dispatch(action: 어떤 값도 가능)과 같은 형태로 함수 안에 파라미터로 액션 값을 넣어주면 리듀서 함수가 호출.
  console.log("리듀서 전");
  const [userState, dispatch] = useReducer(loginReducer, {
    // <- 여기서 문제 발생
    user: null,
  });
  console.log("리듀서 후");
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const res = await Api.get("u/current");
      const currentUser = res.data;
      // console.log(currentUser);

      dispatch({
        type: "LOGIN",
        payload: currentUser,
      });
    } catch (err) {
      console.log("로그인된 사용자가 아닙니다.");
    }
    // fetch 과정이 끝났으므로
    setIsFetchCompleted(true);
  };

  // 이 다음에!!! useEffect 사용!!!
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <Router>
          <NavBarElements />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/live" element={<Live />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </Router>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
