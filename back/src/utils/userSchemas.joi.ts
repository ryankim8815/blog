import Joi from "joi";

export const userCurrentSchema = Joi.object().keys({
  user_id: Joi.string().required(),
});

export const userCreateSchema = Joi.object().keys({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "net"],
      },
    })
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
      )
    )
    .required(), // 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
  // nickname:
  // [메모리]: 한글은 3bytes 양아/숫자/기호는 1byte
  // [미관상 길이]: 한글+숫자 2~8 | 영어+숫자 2~12
  // **MySQL 4.1버전부터 varchar(n)에서 n은 byte가 아닌 글자 수를 의미
  nickname: Joi.string()
    .pattern(new RegExp("^([가-힣0-9]{2,8}|[A-Za-z0-9]{2,12})$"))
    .required(),
});

export const userLoginSchema = Joi.object().keys({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "net"],
      },
    })
    .required(),
  password: Joi.string().required(),
});

export const userUpdateSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  currentPassword: Joi.string().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
      )
    )
    .required(), // 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
  nickname: Joi.string()
    .pattern(new RegExp("^([가-힣0-9]{2,8}|[A-Za-z0-9]{2,12})$"))
    .required(),
});

export const userDeleteSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
      )
    )
    .required(), // 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
});

export const userUploadImageSchema = Joi.object().keys({
  fieldname: Joi.string().valid("file").required(), // "file",
  originalname: Joi.string()
    .pattern(new RegExp("^([\\ \\S]+(\\.(png|jpg|jpeg|gif))$)"))
    .required(), // "default.png", 공백을 포함한 파일명 가능
  encoding: Joi.string().valid("7bit").required(), // "7bit",
  mimetype: Joi.string()
    .valid("image/png" || "image/jpg" || "image/jpeg" || "image/gif")
    .required(), //"image/png",
  destination: Joi.string().valid("./uploads").required(), // "./uploads",
  filename: Joi.string().required(), // "file-1669021214727-43580897.png",
  path: Joi.string().required(), // "uploads/file-1669021214727-43580897.png",
  size: Joi.number()
    .max(1024 * 1000 * 5)
    .required(), // 5mb 이하
});
