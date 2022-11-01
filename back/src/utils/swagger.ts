import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
require("dotenv").config();

const swagger = express();

//swaggerUi
const swaggerDefinition = {
  info: {
    title: "개발자A가 진행하는 blog 프로젝트의 API 명세입니다.",
    version: "1.0.0",
    description:
      "API description: 이거 보신 분은 유튜브에서 '개발자A'를 검색해주세요~!",
  },
  host: `localhost: ${process.env.SERVER_PORT}`,
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
swagger.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Swagger page
swagger.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export = swagger;
