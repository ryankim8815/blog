export function loginReducer(userState, action) {
  // console.log("reducer가 하는 일 확인", userState, action);
  // reducer가 하는 일이 이해됨
  // reducer: userState를 업데이트 하는 역할
  // dispatch: userState 업데이트를 위한 요구
  // action: 요구 내용
  // ***** 아래 return에 왜 ...userState를 넣는지 이해한됨
  // 아래 (1) useReducer 설명과 useContext를 함께 봐야지 이해가 됨 둘이 한세트임
  // (1) https://www.youtube.com/watch?v=tdORpiegLg0
  // (1-2) https://velog.io/@addiescode/UseReducer-UseContext-in-React-Hooks%EA%B8%B0%EB%8A%A5%EA%B3%BC-%EC%97%AD%ED%95%A0

  console.log("리듀서에서 액션: ", action);
  console.log("리듀서에서 액션.payload: ", action.payload);
  console.log("리듀서에서 액션type: ", action.type);
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("%c로그인!", "color: #d93d1a;");
      return {
        // ...userState,
        user: action.payload,
      };
    // return userState;
    case "LOGOUT":
      console.log("%c로그아웃!", "color: #d93d1a;");
      return {
        // ...userState,
        user: null,
      };
    default:
      return userState;
  }
}
