import Joi from "joi";

export const paramsPostIdSchema = Joi.object().keys({
  post_id: Joi.string().required(),
});

export const bodyUserIdSchema = Joi.object().keys({
  user_id: Joi.string().required(),
});
