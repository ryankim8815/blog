import axios from "axios";

axios.defaults.timeout = 3000;
axios.defaults.headers["Content-Type"] = "application/json";
// const backendPortNumber = import.meta.env.SERVER_PORT;
// const backendPortNumber = process.env.SERVER_PORT;
const backendPortNumber = 5002;
// console.log(backendPortNumber);
const BASE_URL = `http://${window.location.hostname}:${backendPortNumber}/`;
// console.log("BASE_URL: ", BASE_URL);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log(err);
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
  // console.log(bodyData);

  return customAxios.post(BASE_URL + endpoint, bodyData);
};

const get = async (endpoint, params = "") => {
  //   console.log("endpoint: ", endpoint);
  return await customAxios.get(BASE_URL + endpoint + "/" + params);
};

const put = async (endpoint, data) => {
  const bodyData = JSON.stringify(data);
  return customAxios.put(BASE_URL + endpoint, bodyData);
};

const del = async (endpoint, data) => {
  const bodyData = JSON.stringify(data);
  return customAxios.delete(BASE_URL + endpoint, bodyData);
};

export { post, get, put, del as delete };
