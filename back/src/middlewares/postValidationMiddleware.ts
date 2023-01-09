import {
  postListByTagSchema,
  postParamsSchema,
  postByUserIdParamsSchema,
  postCreateSchema,
  postUpdateSchema,
  postDeleteSchema,
} from "../utils/postSchemas.joi";
import * as express from "express";

const validatePostByTag = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const params = req.params;
    await postListByTagSchema.validateAsync(params);
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

const validatePostByPostId = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const params = req.params;
    await postParamsSchema.validateAsync(params);
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
const validatePostByUserIdStatus = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const params = req.params;
    await postByUserIdParamsSchema.validateAsync(params);
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

const validatePostCreate = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.body;
    await postCreateSchema.validateAsync(body);
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

const validatePostUpdate = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.body;
    const params = req.params;
    console.log(params);
    console.log(typeof params);
    await postUpdateSchema.validateAsync(body);
    await postParamsSchema.validateAsync(params);
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

const validatePostDelete = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.body;
    const params = req.params;
    await postDeleteSchema.validateAsync(body);
    await postParamsSchema.validateAsync(params);
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
  validatePostByTag,
  validatePostByPostId,
  validatePostByUserIdStatus,
  validatePostCreate,
  validatePostUpdate,
  validatePostDelete,
};
