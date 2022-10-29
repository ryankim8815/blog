"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var app = (0, express_1.default)();
//swaggerUi
var swaggerDefinition = {
    info: {
        title: "개발자A가 진행하는 blog 프로젝트의 API 명세입니다.",
        version: "1.0.0",
        description: "API description: 이거 보신 분은 유튜브에서 '개발자A'를 검색해주세요~!",
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
var option = {
    swaggerDefinition: swaggerDefinition,
    apis: ["./db/schema/*.js"],
};
var swaggerSpec = (0, swagger_jsdoc_1.default)(option);
// Docs in Json format
app.get("/swagger.json", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});
// Swagger page
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// 기본 페이지
app.get("/", function (req, res) {
    res.send("안녕하세요, 개발자A의 첫 개인 프로젝트입니다.");
});
module.exports = app;
