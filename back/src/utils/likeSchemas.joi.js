"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyUserIdSchema = exports.paramsPostIdSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.paramsPostIdSchema = joi_1.default.object().keys({
    post_id: joi_1.default.string().required(),
});
exports.bodyUserIdSchema = joi_1.default.object().keys({
    user_id: joi_1.default.string().required(),
});
