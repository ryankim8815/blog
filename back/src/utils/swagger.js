"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
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
    description:
      "API description: </br>이거 보신 분은 유튜브에서 '개발자A'를 검색해주세요~!</br>좋대구알 필수!",
  },
  servers: [
    {
      description: "로컬환경",
      url: "http://localhost:".concat(process.env.SERVER_PORT),
    },
    {
      description: "서버환경",
      url: "http://"
        .concat(process.env.DB_HOST, ":")
        .concat(process.env.SERVER_PORT),
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
      User: {
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
  // paths: "./paths/_index.yaml",
  ////////////////////////////////////
  // paths: {
  //   // 자체 회원가입
  //   "/user/register": {
  //     post: {
  //       tag: "userRouter",
  //       summary: "회원가입",
  //       requestBody: {
  //         content: {
  //           "application/json": {
  //             schema: {
  //               $ref: "#/components/schemas/User",
  //             },
  //           },
  //         },
  //         description:
  //           '{</br>&nbsp;&nbsp; "email": 중복 혀용 불가, 이메일 형태만 가능</br>&nbsp;&nbsp; "password": 정책에 따라 글자수 00개 이상 </br>&nbsp;&nbsp; "nickname": 중복 허용 불가</br>}',
  //         required: true,
  //       },
  //       responses: {
  //         "200": {
  //           description: "successful operation",
  //           content: {
  //             "application/json": {
  //               schema: {
  //                 $ref: "#/components/schemas/ApiResponse",
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  //   // 로그인
  //   "/user/login": {
  //     post: {
  //       tag: "userRouter",
  //       summary: "로그인",
  //       requestBody: {
  //         content: {
  //           "application/json": {
  //             schema: {
  //               $ref: "#/components/schemas/User",
  //             },
  //           },
  //         },
  //         description:
  //           // '{</br>&nbsp;&nbsp; "스키마": 설명</br>}',
  //           '{</br>&nbsp;&nbsp; "email": 필수입력</br>&nbsp;&nbsp; "password": 필수입력</br>}',
  //         required: true,
  //       },
  //       responses: {
  //         "200": {
  //           description: "successful operation",
  //           content: {
  //             "application/json": {
  //               schema: {
  //                 // 커스텀을 하려면 모든 케이스에 대한 스키마를 작성해야함
  //                 $ref: "#/components/schemas/ApiResponse",
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  //   // 유저 정보 업데이트
  //   "/user/update": {
  //     post: {
  //       tag: "userRouter",
  //       summary: "사용자 정보 업데이트",
  //       parameters: {
  //         name: "api_key",
  //         in: "header",
  //         required: true,
  //         // schema: { type: "string" },
  //       },
  //       requestBody: {
  //         content: {
  //           "application/json": {
  //             schema: {
  //               $ref: "#/components/schemas/User",
  //               // type: "string",
  //             },
  //           },
  //         },
  //         description:
  //           // '{</br>&nbsp;&nbsp; "스키마": 설명</br>}',
  //           '{</br>&nbsp;&nbsp; "currentPassword": 필수입력</br>&nbsp;&nbsp; "password": 필수입력</br>&nbsp;&nbsp; "nickname": 필수입력</br>}',
  //         required: true,
  //       },
  //       responses: {
  //         "200": {
  //           description: "successful operation",
  //           content: {
  //             "application/json": {
  //               schema: {
  //                 // 커스텀을 하려면 모든 케이스에 대한 스키마를 작성해야함
  //                 $ref: "#/components/schemas/ApiResponse",
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  //   // 유저 정보 삭제
  //   // "/user/delete": { $ref: "./paths/userDelete.yaml" },
  // },
  ////////////////////////////////////
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
swagger.use(
  "/api-docs",
  swagger_ui_express_1.default.serve,
  swagger_ui_express_1.default.setup(swaggerSpec)
);
module.exports = swagger;
