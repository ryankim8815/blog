import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import userRouter from "../routers/userRouter";
import cors from "cors";
require("dotenv").config();

const swagger = express();
swagger.use(cors());

//swaggerUi
const swaggerDefinition = {
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
      url: `http://localhost:${process.env.SERVER_PORT}`,
    },
    {
      description: "서버환경",
      url: `http://${process.env.DB_HOST}:${process.env.SERVER_PORT}`,
    },
  ],
  tag: {
    name: "user",
    description: "userRouter관련 api",
  },
  host: `${process.env.DB_HOST}:${process.env.SERVER_PORT}`,
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
const option = {
  swaggerDefinition,
  apis: ["../routers/*.js"],
  //   swaggerPaths,
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
