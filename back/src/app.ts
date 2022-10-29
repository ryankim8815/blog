import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();

//swaggerUi
const swaggerDefinition = {
  info: {
    title: "개발자A가 진행하는 blog 프로젝트의 API 명세입니다.",
    version: "1.0.0",
    description:
      "API description: 이거 보신 분은 유튜브에서 '개발자A'를 검색해주세요~!",
  },
  host: "localhost: 5002",
  basePath: "/",
  securityDefinition: {
    bearerAuth: {
      type: "apikey",
      name: "Authorization",
      schema: "bearer",
      in: "header",
    },
  },
};

const option = {
  swaggerDefinition,
  apis: ["./db/schema/*.js"],
};

const swaggerSpec = swaggerJSDoc(option);

// Docs in Json format
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Swagger page
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, 개발자A의 첫 개인 프로젝트입니다.");
});

export = app;
