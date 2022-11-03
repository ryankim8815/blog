"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express = __importStar(require("express"));
var authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
var uploadMiddleware_1 = __importDefault(require("../middlewares/uploadMiddleware"));
var userService_1 = __importDefault(require("../services/userService"));
var userRouter = express.Router();
// GET: 유저리스트 확인 기능
var userList = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allUsers, err_1, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userService_1.default.getAllUsers()];
            case 1:
                allUsers = _a.sent();
                console.log(allUsers);
                res.status(200).json(allUsers);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "userList api에서 오류가 발생했습니다.",
                };
                console.log(result_err);
                res.status(200).json(result_err);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// POST: 회원가입 기능
var userRegister = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, nickname, newUser, err_2, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = req.body.email;
                password = req.body.password;
                nickname = req.body.nickname;
                return [4 /*yield*/, userService_1.default.addUser({ email: email, password: password, nickname: nickname })];
            case 1:
                newUser = _a.sent();
                console.log(newUser);
                res.status(200).json(newUser);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "userRegister api에서 오류가 발생했습니다.",
                };
                console.log(result_err);
                res.status(200).json(result_err);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// POST: 로그인
var userLogin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, logedinUser, err_3, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = req.body.email;
                password = req.body.password;
                return [4 /*yield*/, userService_1.default.getUser({ email: email, password: password })];
            case 1:
                logedinUser = _a.sent();
                console.log(logedinUser);
                res.status(200).json(logedinUser);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "userLogin api에서 오류가 발생했습니다.",
                };
                console.log(result_err);
                res.status(200).json(result_err);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// POST: 회원정보 수정
var userUpdate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, currentPassword, password, nickname, updateUser, err_4, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = req.email;
                currentPassword = req.body.currentPassword;
                password = req.body.password;
                nickname = req.body.nickname;
                return [4 /*yield*/, userService_1.default.updateUser({
                        email: email,
                        currentPassword: currentPassword,
                        password: password,
                        nickname: nickname,
                    })];
            case 1:
                updateUser = _a.sent();
                console.log(updateUser);
                res.status(200).json(updateUser);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "userUpdate api에서 오류가 발생했습니다.",
                };
                console.log(result_err);
                res.status(200).json(result_err);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// DELETE: 회원정보 삭제
var userDelete = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, deleteUser, err_5, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = req.email;
                password = req.body.password;
                return [4 /*yield*/, userService_1.default.deleteUser({
                        email: email,
                        password: password,
                    })];
            case 1:
                deleteUser = _a.sent();
                console.log(deleteUser);
                res.status(200).json(deleteUser);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "userDelete api에서 오류가 발생했습니다.",
                };
                console.log(result_err);
                res.status(200).json(result_err);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
//// POST: 프로필 사진 업로드
var userUploadImage = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, new_filename, uploadUserImage, err_6, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = req.email;
                new_filename = req.file.filename;
                console.log("new_filename: ", new_filename);
                return [4 /*yield*/, userService_1.default.uploadUserImage({
                        email: email,
                        new_filename: new_filename,
                    })];
            case 1:
                uploadUserImage = _a.sent();
                console.log(uploadUserImage);
                res.status(200).json(uploadUserImage);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "uploadUserImage api에서 오류가 발생했습니다.",
                };
                console.log(result_err);
                res.status(200).json(result_err);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// api index
userRouter.get("/user/list", userList); // 전체 유저 검섹
userRouter.post("/user/register", userRegister); // 자체 회원가입
userRouter.post("/user/login", userLogin); // 로그인
userRouter.put("/user/update", authMiddleware_1.default, userUpdate); // 유저 정보 업데이트(pw & nickname)
userRouter.delete("/user/delete", authMiddleware_1.default, userDelete); // 유저 삭제
userRouter.post("/user/upload_image", authMiddleware_1.default, uploadMiddleware_1.default.single("file"), userUploadImage); // 프로필 사진 업로드(기존 사진 자동 삭제)
module.exports = userRouter;
