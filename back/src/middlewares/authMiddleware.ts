import jwt from "jsonwebtoken";
import * as express from "express";
// import "dotenv/config";
// require("dotenv").config();

const authMiddleware = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
  //   req: Request<{}>,
  //   res: Response,
  //   next: NextFunction
) {
  // request 헤더로부터 authorization bearer 토큰을 받음.
  const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
  // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열임.
  // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.
  if (userToken === "null") {
    const result_errNoToken = {
      result: false,
      cause: "token",
      message: "로그인한 유저만 사용할 수 있는 서비스입니다.",
    };
    console.log(result_errNoToken);
    return res.status(400).json(result_errNoToken);
  }

  // 해당 token 이 정상적인 token인지 확인 -> 토큰에 담긴 user_id 정보 추출
  try {
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    // console.log("secretKey: ", secretKey);
    const jwtDecoded: any = jwt.verify(userToken, secretKey);
    const user_id = jwtDecoded.user_id;
    // console.log("미들웨어에서 토큰 확인: ", user_id);
    // req.email = email; // src/customType/express.d.ts에서 추가해주었다.
    req.user_id = user_id; // src/customType/express.d.ts에서 추가해주었다.
    next();
  } catch (error) {
    const result_errInvalidToken = {
      result: false,
      cause: "token",
      message: "정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.",
    };
    console.log(result_errInvalidToken);
    return res.status(400).json(result_errInvalidToken);
  }
};

export = authMiddleware;
