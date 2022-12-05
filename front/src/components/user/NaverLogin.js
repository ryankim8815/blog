import React, { useState, useEffect, useContext } from "react";
import * as Api from "../utils/Api";
import { useNavigate } from "react-router-dom";

const NaverLogin = () => {
  const navigate = useNavigate();
  const getPermissonCode = async () => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get("code");
    const res = await Api.post("naver", {
      code: code,
    });
    console.log("res", res);
    navigate("/");
  };

  useEffect(() => {
    getPermissonCode();
  }, []);

  return <div>로그인</div>;
};

export default NaverLogin;
