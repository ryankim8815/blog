import React, { useEffect, useReducer, useState, createContext } from "react";
import * as Api from "./components/utils/Api";
import { loginReducer } from "./components/utils/Reducer";
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
import KakaoLogin from "./components/user/KakaoLogin";
import NaverLogin from "./components/user/NaverLogin";
import GoogleLogin from "./components/user/GoogleLogin";
// components
import Header from "./components/header/Header";
import LoginForm from "./components/user/LoginForm";
import Footer from "./components/common/Footer";
import UpdateUserInfo from "./screens/UpdateUserInfo";
import MyPage from "./components/myPage/MyPage";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
  //useReducer(첫 번째 파라미터에는 리듀서 함수, 두 번째 파라미터에는 리듀서의 기본 값을 넣는다.)
  //useReducer를 사용하면 state값과 dispatch 함수를 받아온다. 여기서 state는 현재 가리키고 있는 상태 / dispatch는 액션을 '발생시키는' 함수.
  //dispatch(action: 어떤 값도 가능)과 같은 형태로 함수 안에 파라미터로 액션 값을 넣어주면 리듀서 함수가 호출.
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      if (sessionStorage.getItem("userToken") == null) {
        dispatch({ type: "LOGOUT" });
        return setIsFetchCompleted(true);
      }
      const res = await Api.get("user");
      const currentUser = res.data;
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      });
      setIsFetchCompleted(true);
    } catch (err) {
      console.log("로그인된 사용자가 아닙니다.");
    }
  };

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
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/post/:post_id" element={<Posts />} />
            <Route path="/live" element={<Live />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/editor/:post_id" element={<Editor />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/login/oauth2/code/kakao" element={<KakaoLogin />} />
            <Route path="/login/oauth2/code/naver" element={<NaverLogin />} />
            <Route path="/login/oauth2/code/google" element={<GoogleLogin />} />
            <Route
              path="/users/:user_id/updateuserinfo"
              d
              element={<UpdateUserInfo />}
            />
            <Route path="/users/:user_id/mypage" element={<MyPage />} />
          </Routes>
          <Footer />
        </Router>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
