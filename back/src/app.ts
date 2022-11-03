import express from "express";
import swagger from "./utils/swagger";
import cors from "cors";
import userRouter from "./routers/userRouter";
import socialLoginRouter from "./routers/socialLoginRouter";

const app = express();
app.use(cors());
//application/json의 Content-Type에 대해 파싱해주는 역할 - req.body에 접근 가능
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.

app.use(userRouter);
app.use(socialLoginRouter);
app.use(swagger);

// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, 개발자A의 첫 개인 프로젝트입니다.");
});

export = app;
