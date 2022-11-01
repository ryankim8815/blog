"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
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
    tag: {
        name: "user",
        description: "userRouter관련 api",
    },
    host: "".concat(process.env.DB_HOST, ":").concat(process.env.SERVER_PORT),
    basePath: "/",
    securityDefinition: {
        bearerAuth: {
            type: "apikey",
            name: "Authorization",
            schema: "bearer",
            in: "header",
        },
    },
    components: {
        schemas: {
            user: {
                type: "object",
                properties: {
                    user_id: {
                        type: "integer",
                        description: "User email",
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
                        type: "int",
                    },
                    provider: {
                        type: "string",
                    },
                    created_at: {
                        type: "timstamp",
                    },
                },
            },
            ApiResponse: {
                type: "object",
                properties: {
                    result: {
                        type: "boolean",
                    },
                    cause: {
                        type: "string",
                    },
                    message: {
                        type: "string",
                    },
                },
            },
            userRouter: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                    },
                    Password: {
                        type: "string",
                    },
                    nickname: {
                        type: "string",
                    },
                },
            },
        },
    },
    paths: {
        "/userRegister": {
            post: {
                tag: "userRouter",
                summary: "회원가입",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/userRouter",
                            },
                        },
                    },
                    description: "회원가입 시 필수</br>email과 nickname은 중복 허용X",
                    required: true,
                },
                responses: {
                    "200": {
                        description: "successful operation",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ApiResponse",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
// const swaggerPaths = {
//   schemas: {
//     GeneralError: {
//       type: "object",
//       properties: {
//         code: {
//           type: "integer",
//           format: "int32",
//         },
//         message: {
//           type: "string",
//         },
//       },
//     },
//   },
// };
var option = {
    swaggerDefinition: swaggerDefinition,
    apis: ["../routers/*.js"],
    //   swaggerPaths,
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
