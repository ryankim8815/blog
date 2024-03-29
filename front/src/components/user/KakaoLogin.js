import React, { useState, useEffect, useContext } from "react";
import * as Api from "../utils/Api";
import { useNavigate } from "react-router-dom";
import { DispatchContext } from "../../App";

const KakaoLogin = () => {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const getPermissonCode = async () => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get("code");
    const res = await Api.post("kakao", {
      code: code,
    });
    if (res.data.result == false) {
      alert("로그인에 실패하였습니다.\n");
    } else {
      const user = res.data;
      const jwtToken = user.token;
      sessionStorage.setItem("userToken", jwtToken);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });
      if (user.nickname.length > 12) {
        return navigate(`/users/${user.user_id}/updateuserinfo`);
      }
      navigate("/");
      window.location.reload();
    }
  };

  useEffect(() => {
    getPermissonCode();
  }, []);

  return <div>로그인</div>;
};

export default KakaoLogin;
