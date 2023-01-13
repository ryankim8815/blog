import Joi from "joi";

export const postListByTagSchema = Joi.object().keys({
  tag: Joi.string().required(),
  status: Joi.string().required(),
  start: Joi.number().required(),
  end: Joi.number().required(),
});

export const postParamsSchema = Joi.object().keys({
  post_id: Joi.string().required(),
});

export const postByUserIdParamsSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  status: Joi.string().required(),
  start: Joi.number().required(),
  end: Joi.number().required(),
});

export const postCreateSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  title: Joi.string().required(),
  sub_title: Joi.string().required(),
  content: Joi.string().required(),
  tag: Joi.string().required(),
  status: Joi.string().required(),
});

export const postUpdateSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  title: Joi.string().required(),
  sub_title: Joi.string().required(),
  content: Joi.string().required(),
  tag: Joi.string().required(),
  status: Joi.string().required(),
});

export const postDeleteSchema = Joi.object().keys({
  user_id: Joi.string().required(),
});
