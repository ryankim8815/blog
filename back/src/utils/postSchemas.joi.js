"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDeleteSchema = exports.postUpdateSchema = exports.postCreateSchema = exports.postByUserIdParamsSchema = exports.postParamsSchema = exports.postListByTagSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.postListByTagSchema = joi_1.default.object().keys({
    tag: joi_1.default.string().required(),
});
exports.postParamsSchema = joi_1.default.object().keys({
    post_id: joi_1.default.string().required(),
});
exports.postByUserIdParamsSchema = joi_1.default.object().keys({
    user_id: joi_1.default.string().required(),
    status: joi_1.default.string().required(),
});
exports.postCreateSchema = joi_1.default.object().keys({
    user_id: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    sub_title: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
    tag: joi_1.default.string().required(),
});
exports.postUpdateSchema = joi_1.default.object().keys({
    user_id: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    sub_title: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
    tag: joi_1.default.string().required(),
});
exports.postDeleteSchema = joi_1.default.object().keys({
    user_id: joi_1.default.string().required(),
});
