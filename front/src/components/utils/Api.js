import React from "react";
import axios from "axios";

axios.defaults.timeout = 10000;
axios.defaults.headers["Content-Type"] = "application/json";

let BASE_URL = null;
const env = process.env.REACT_APP_ENV;
const http = process.env.REACT_APP_HTTP_SERVER_PORT;
const https = process.env.REACT_APP_HTTPS_SERVER_PORT;
if (env == "local") {
  BASE_URL = `http://${window.location.hostname}:${http}/`;
} else {
  BASE_URL = `https://${window.location.hostname}:${https}/`;
}

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    throw new Error("(!) axios error");
  }
);

// 중복으로 쓰이는 헤더를 기본 값으로 하도록 정의
const customAxios = axios.create({
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
  },
});

const post = async (endpoint, data) => {
  const bodyData = JSON.stringify(data);
  // bodydata는 백엔에서 처리되기 전 데이터
  return customAxios.post(BASE_URL + endpoint, bodyData);
};

const get = async (endpoint, params = "") => {
  return await customAxios.get(BASE_URL + endpoint + "/" + params);
};

const put = async (endpoint, data) => {
  const bodyData = JSON.stringify(data);
  return customAxios.put(BASE_URL + endpoint, bodyData);
};
const patch = async (endpoint, data) => {
  const bodyData = JSON.stringify(data);
  return customAxios.patch(BASE_URL + endpoint, bodyData);
};

const del = async (endpoint, data) => {
  const bodyData = JSON.stringify(data);
  return customAxios.delete(BASE_URL + endpoint, bodyData);
};

export { post, get, put, patch, del as delete };
