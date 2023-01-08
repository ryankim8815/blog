"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignupNickname = exports.validateVerifyEmail = exports.validateSignupEmail = exports.validateUserUploadImage = exports.validateUserDelete = exports.validateUserUpdateNickname = exports.validateUserUpdate = exports.validateUserLogin = exports.validateUserCreate = exports.validateUserCurrent = void 0;
var userSchemas_joi_1 = require("../utils/userSchemas.joi");
var validateUserCurrent = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, err_1, result_err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req.body;
                    return [4 /*yield*/, userSchemas_joi_1.userCurrentSchema.validateAsync(body)];
                case 1:
                    _a.sent();
                    next();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    result_err = {
                        result: false,
                        cause: "type",
                        message: "api 요청시 잘못된 type이 첨부되었습니다.",
                    };
                    console.log(result_err);
                    return [2 /*return*/, res.status(499).json(result_err)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.validateUserCurrent = validateUserCurrent;
var validateUserCreate = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, err_2, result_err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req.body;
                    return [4 /*yield*/, userSchemas_joi_1.userCreateSchema.validateAsync(body)];
                case 1:
                    _a.sent();
                    next();
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    result_err = {
                        result: false,
                        cause: "type",
                        message: "api 요청시 잘못된 type이 첨부되었습니다.",
                    };
                    console.log(result_err);
                    return [2 /*return*/, res.status(499).json(result_err)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.validateUserCreate = validateUserCreate;
var validateUserLogin = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, err_3, result_err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req.body;
                    return [4 /*yield*/, userSchemas_joi_1.userLoginSchema.validateAsync(body)];
                case 1:
                    _a.sent();
                    next();
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    result_err = {
                        result: false,
                        cause: "type",
                        message: "api 요청시 잘못된 type이 첨부되었습니다.",
                    };
                    console.log(result_err);
                    return [2 /*return*/, res.status(499).json(result_err)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.validateUserLogin = validateUserLogin;
var validateUserUpdate = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, err_4, result_err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req.body;
                    return [4 /*yield*/, userSchemas_joi_1.userUpdateSchema.validateAsync(body)];
                case 1:
                    _a.sent();
                    next();
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _a.sent();
                    result_err = {
                        result: false,
                        cause: "type",
                        message: "api 요청시 잘못된 type이 첨부되었습니다.",
                    };
                    console.log(result_err);
                    return [2 /*return*/, res.status(499).json(result_err)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.validateUserUpdate = validateUserUpdate;
var validateUserUpdateNickname = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, err_5, result_err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req.body;
                    return [4 /*yield*/, userSchemas_joi_1.userUpdateNicknameSchema.validateAsync(body)];
                case 1:
                    _a.sent();
                    next();
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _a.sent();
                    result_err = {
                        result: false,
                        cause: "type",
                        message: "api 요청시 잘못된 type이 첨부되었습니다.",
                    };
                    console.log(result_err);
                    return [2 /*return*/, res.status(499).json(result_err)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.validateUserUpdateNickname = validateUserUpdateNickname;
var validateUserDelete = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, err_6, result_err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req.body;
                    return [4 /*yield*/, userSchemas_joi_1.userDeleteSchema.validateAsync(body)];
                case 1:
                    _a.sent();
                    next();
                    return [3 /*break*/, 3];
                case 2:
                    err_6 = _a.sent();
                    result_err = {
                        result: false,
                        cause: "type",
                        message: "api 요청시 잘못된 type이 첨부되었습니다.",
                    };
                    console.log(result_err);
                    return [2 /*return*/, res.status(499).json(result_err)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.validateUserDelete = validateUserDelete;
var validateUserUploadImage = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, file, err_7, result_err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    body = req.body;
                    file = req.file;
                    return [4 /*yield*/, userSchemas_joi_1.userCurrentSchema.validateAsync(body)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, userSchemas_joi_1.userUploadImageSchema.validateAsync(file)];
                case 2:
                    _a.sent();
                    next();
                    return [3 /*break*/, 4];
                case 3:
                    err_7 = _a.sent();
                    result_err = {
                        result: false,
                        cause: "type",
                        message: "api 요청시 잘못된 type이 첨부되었습니다.",
                    };
                    console.log(result_err, err_7);
                    return [2 /*return*/, res.status(499).json(result_err)];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.validateUserUploadImage = validateUserUploadImage;
var validateSignupEmail = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, err_8, result_err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req.body;
                    return [4 /*yield*/, userSchemas_joi_1.signupEmailSchema.validateAsync(body)];
                case 1:
                    _a.sent();
                    next();
                    return [3 /*break*/, 3];
                case 2:
                    err_8 = _a.sent();
                    result_err = {
                        result: false,
                        cause: "type",
                        message: "api 요청시 잘못된 type이 첨부되었습니다.",
                    };
                    return [2 /*return*/, res.status(499).json(result_err)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.validateSignupEmail = validateSignupEmail;
var validateVerifyEmail = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, err_9, result_err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req.params;
                    return [4 /*yield*/, userSchemas_joi_1.verifyEmailSchema.validateAsync(body)];
                case 1:
                    _a.sent();
                    next();
                    return [3 /*break*/, 3];
                case 2:
                    err_9 = _a.sent();
                    result_err = {
                        result: false,
                        cause: "type",
                        message: "api 요청시 잘못된 type이 첨부되었습니다.",
                    };
                    return [2 /*return*/, res.status(499).json(result_err)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.validateVerifyEmail = validateVerifyEmail;
var validateSignupNickname = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, err_10, result_err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req.params;
                    return [4 /*yield*/, userSchemas_joi_1.signupNicknameSchema.validateAsync(body)];
                case 1:
                    _a.sent();
                    next();
                    return [3 /*break*/, 3];
                case 2:
                    err_10 = _a.sent();
                    result_err = {
                        result: false,
                        cause: "type",
                        message: "api 요청시 잘못된 type이 첨부되었습니다.",
                    };
                    return [2 /*return*/, res.status(499).json(result_err)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.validateSignupNickname = validateSignupNickname;
