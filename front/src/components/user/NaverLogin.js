import React, { useState, useEffect, useContext } from "react";
import * as Api from "../utils/Api";
import { useNavigate } from "react-router-dom";
import { DispatchContext } from "../../App";

const NaverLogin = () => {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const getPermissonCode = async () => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get("code");
    const res = await Api.post("naver", {
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
      navigate("/");
      window.location.reload();
    }
  };

  useEffect(() => {
    getPermissonCode();
  }, []);

  return <div>로그인</div>;
};

export default NaverLogin;
