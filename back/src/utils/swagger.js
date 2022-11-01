"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
require("dotenv").config();
var swagger = (0, express_1.default)();
//swaggerUi
var swaggerDefinition = {
    info: {
        title: "개발자A가 진행하는 blog 프로젝트의 API 명세입니다.",
        version: "1.0.0",
        description: "API description: 이거 보신 분은 유튜브에서 '개발자A'를 검색해주세요~!",
    },
    host: "localhost: ".concat(process.env.SERVER_PORT),
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
swagger.get("/swagger.json", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});
// Swagger page
swagger.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
module.exports = swagger;
