import { paramsPostIdSchema, bodyUserIdSchema } from "../utils/likeSchemas.joi";
import * as express from "express";

const validateLikesByPostId = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const params = req.params;
    await paramsPostIdSchema.validateAsync(params);
    next();
  } catch (err) {
    const result_err = {
      result: false,
      cause: "type",
      message: "api 요청시 잘못된 type이 첨부되었습니다.",
    };
    console.log(result_err);
    return res.status(499).json(result_err);
  }
};

const validateLikeClick = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.body;
    const params = req.params;
    await bodyUserIdSchema.validateAsync(body);
    await paramsPostIdSchema.validateAsync(params);
    next();
  } catch (err) {
    const result_err = {
      result: false,
      cause: "type",
      message: "api 요청시 잘못된 type이 첨부되었습니다." + err,
    };
    console.log(result_err);
    return res.status(499).json(result_err);
  }
};

export { validateLikesByPostId, validateLikeClick };
