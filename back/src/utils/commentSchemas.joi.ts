import Joi from "joi";

export const paramsPostIdSchema = Joi.object().keys({
  post_id: Joi.string().required(),
});

export const paramsUserIdSchema = Joi.object().keys({
  user_id: Joi.string().required(),
});

export const paramsCommentIdSchema = Joi.object().keys({
  comment_id: Joi.string().required(),
});

export const paramsCommentUpdateSchema = Joi.object().keys({
  post_id: Joi.string().required(),
  comment_id: Joi.string().required(),
});

export const paramsCommentDeleteSchema = Joi.object().keys({
  post_id: Joi.string().required(),
  comment_id: Joi.string().required(),
});

export const bodyUserIdContentSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  content: Joi.string().required(),
});

export const bodyUserIdSchema = Joi.object().keys({
  user_id: Joi.string().required(),
});
