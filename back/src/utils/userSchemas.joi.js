"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUploadImageSchema = exports.userDeleteSchema = exports.userUpdateSchema = exports.userLoginSchema = exports.userCreateSchema = exports.userCurrentSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.userCurrentSchema = joi_1.default.object().keys({
    user_id: joi_1.default.string().required(),
});
exports.userCreateSchema = joi_1.default.object().keys({
    email: joi_1.default.string()
        .email({
        minDomainSegments: 2,
        tlds: {
            allow: ["com", "net"],
        },
    })
        .required(),
    password: joi_1.default.string()
        .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"))
        .required(),
    // nickname:
    // [메모리]: 한글은 3bytes 양아/숫자/기호는 1byte
    // [미관상 길이]: 한글+숫자 2~8 | 영어+숫자 2~12
    // **MySQL 4.1버전부터 varchar(n)에서 n은 byte가 아닌 글자 수를 의미
    nickname: joi_1.default.string()
        .pattern(new RegExp("^([ㄱ-힣0-9_-]{2,8}|[A-Za-z0-9_-]{2,12})$"))
        .required(),
});
exports.userLoginSchema = joi_1.default.object().keys({
    email: joi_1.default.string()
        .email({
        minDomainSegments: 2,
        tlds: {
            allow: ["com", "net"],
        },
    })
        .required(),
    password: joi_1.default.string().required(),
});
exports.userUpdateSchema = joi_1.default.object().keys({
    user_id: joi_1.default.string().required(),
    currentPassword: joi_1.default.string().required(),
    password: joi_1.default.string()
        .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"))
        .required(),
    nickname: joi_1.default.string()
        .pattern(new RegExp("^([ㄱ-힣0-9_-]{2,8}|[A-Za-z0-9_-]{2,12})$"))
        .required(),
});
exports.userDeleteSchema = joi_1.default.object().keys({
    user_id: joi_1.default.string().required(),
    password: joi_1.default.string()
        .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"))
        .required(), // 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
});
exports.userUploadImageSchema = joi_1.default.object().keys({
    fieldname: joi_1.default.string().valid("file").required(),
    originalname: joi_1.default.string()
        .pattern(new RegExp("^([\\ \\S]+(\\.(png|jpg|jpeg|gif))$)"))
        .required(),
    encoding: joi_1.default.string().valid("7bit").required(),
    mimetype: joi_1.default.string()
        .valid("image/png" || "image/jpg" || "image/jpeg" || "image/gif")
        .required(),
    destination: joi_1.default.string().valid("./uploads").required(),
    filename: joi_1.default.string().required(),
    path: joi_1.default.string().required(),
    size: joi_1.default.number()
        .max(1024 * 1000 * 5)
        .required(), // 5mb 이하
});
