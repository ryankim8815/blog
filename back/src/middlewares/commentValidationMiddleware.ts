import {
  paramsPostIdSchema,
  paramsCommentUpdateSchema,
  paramsCommentDeleteSchema,
  bodyUserIdContentSchema,
  bodyUserIdSchema,
} from "../utils/commentSchemas.joi";
import * as express from "express";

const validateCommentByPostId = async function (
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

const validateCommentCreate = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const params = req.params;
    const body = req.body;
    await paramsPostIdSchema.validateAsync(params);
    await bodyUserIdContentSchema.validateAsync(body);
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

const validateCommentUpdate = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const params = req.params;
    const body = req.body;
    await paramsCommentUpdateSchema.validateAsync(params);
    await bodyUserIdContentSchema.validateAsync(body);
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

const validateCommentDelete = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const params = req.params;
    const body = req.body;
    await paramsCommentDeleteSchema.validateAsync(params);
    await bodyUserIdSchema.validateAsync(body);
    next();
  } catch (err) {
    const result_err = {
      result: false,
      cause: "type",
      message: "api 요청시 잘못된 type이 첨부되었습니다.",
    };
    console.log(result_err, err);
    return res.status(499).json(result_err);
  }
};

export {
  validateCommentByPostId,
  validateCommentCreate,
  validateCommentUpdate,
  validateCommentDelete,
};
