"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
// import path from "path";
// import yaml from "yamljs";
// import userRouter from "../routers/userRouter";
var cors_1 = __importDefault(require("cors"));
require("dotenv").config();
var swagger = (0, express_1.default)();
swagger.use((0, cors_1.default)());
//swaggerUi
var swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "개발자A's blog 프로젝트의 API",
        version: "1.0.0",
        description: "API description: </br>이거 보신 분은 유튜브에서 '개발자A'를 검색해주세요~!</br>좋대구알 필수!",
    },
    servers: [
        {
            description: "로컬환경",
            url: "http://localhost:".concat(process.env.SERVER_PORT),
        },
        {
            description: "서버환경",
            url: "http://".concat(process.env.DB_HOST, ":").concat(process.env.SERVER_PORT),
        },
    ],
    tags: [
        {
            name: "userRouter",
            description: "userRouter.ts",
        },
        {
            name: "socialLoginRouter",
            description: "socialLoginRouter.ts",
        },
        {
            name: "postRouter",
            description: "postRouter.ts",
        },
        {
            name: "commentRouter",
            description: "commentRouter.ts",
        },
        {
            name: "likeRouter",
            description: "likeRouter.ts",
        },
    ],
    host: "".concat(process.env.DB_HOST, ":").concat(process.env.SERVER_PORT),
    basePath: "/",
    // securityDefinition: {
    //   bearerAuth: {
    //     type: "apikey",
    //     name: "Authorization",
    //     schema: "bearer",
    //     in: "header",
    //   },
    // },
    components: {
        securitySchemes: {
            bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
        },
        schemas: {
            User: {
                type: "object",
                properties: {
                    user_id: {
                        type: "string",
                        description: "PK, UUID",
                    },
                    password: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                    },
                    nickname: {
                        type: "string",
                    },
                    profile_image: {
                        type: "string",
                    },
                    admin: {
                        type: "integer",
                    },
                    provider: {
                        type: "string",
                    },
                    created_at: {
                        type: "timstamp",
                    },
                },
            },
            Post: {
                type: "object",
                properties: {
                    post_id: {
                        type: "string",
                        description: "PK, UUID",
                    },
                    user_id: {
                        type: "string",
                    },
                    title: {
                        type: "string",
                    },
                    content: {
                        type: "string",
                    },
                    image: {
                        type: "string",
                    },
                    tag: {
                        type: "integer",
                    },
                    created_at: {
                        type: "timstamp",
                    },
                    updated_at: {
                        type: "timstamp",
                    },
                },
            },
            Comment: {
                type: "object",
                properties: {
                    comment_id: {
                        type: "string",
                        description: "PK, UUID",
                    },
                    user_id: {
                        type: "string",
                    },
                    post_id: {
                        type: "string",
                    },
                    content: {
                        type: "string",
                    },
                    created_at: {
                        type: "timstamp",
                    },
                    updated_at: {
                        type: "timstamp",
                    },
                },
            },
            Like: {
                type: "object",
                properties: {
                    like_id: {
                        type: "string",
                        description: "PK, UUID",
                    },
                    post_id: {
                        type: "string",
                    },
                    user_id: {
                        type: "string",
                    },
                    created_at: {
                        type: "timstamp",
                    },
                },
            },
        },
    },
};
var option = {
    swaggerDefinition: swaggerDefinition,
    apis: ["./src/routers/*.js"], // 디렉터리 선언이 상대경로인데 본 파일 기준이 아니라 back 기준으로 선언해야함. 이것 때문에 시간이 오래 걸림
    //   swaggerPaths,
};
var swaggerSpec = (0, swagger_jsdoc_1.default)(option); // json
// const swaggerSpec = yaml.load(path.join(__dirname, "./build.yarm")); // yaml
// Docs in Json format
swagger.get("/swagger.json", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});
// Swagger page
swagger.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
module.exports = swagger;
