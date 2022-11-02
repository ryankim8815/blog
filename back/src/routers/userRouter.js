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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// import express from "express";
var express_1 = __importDefault(require("express"));
var database_1 = __importDefault(require("../db/database"));
// import login_required from "../middlewares/login_required";
// import moment from "moment-timezone";
// moment.tz.setDefault("Asia/Seoul");
// import upload from "../middlewares/image_upload";
// import { Response } from "express";
var userRouter = express_1.default.Router();
// GET: 유저리스트 확인 기능
var userList = function (req, res, next
//   req: Request<{}>,
//   res: Response,
//   next: NextFunction
) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, rows, fields, rowsString, rowsObject, i, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, database_1.default.query("SELECT * FROM users")];
            case 1:
                _a = _b.sent(), rows = _a[0], fields = _a[1];
                rowsString = JSON.stringify(rows);
                rowsObject = JSON.parse(rowsString);
                for (i = 0; i < rowsObject.length; i++) {
                    delete rows[i].password;
                }
                res.status(200).json(rows);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// POST: 회원가입 기능
var userRegister = function (req, res, next
//   req: Request<{}>,
//   res: Response,
//   next: NextFunction
) { return __awaiter(void 0, void 0, void 0, function () {
    var email_1, password_1, nickname_1, duplicatedEmail, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email_1 = req.body.email;
                password_1 = req.body.password;
                nickname_1 = req.body.nickname;
                return [4 /*yield*/, database_1.default
                        .query({
                        sql: "SELECT * FROM users WHERE `email` = ? ",
                        values: [email_1],
                    })
                        .then(function (_a) {
                        var rows = _a[0], fields = _a[1];
                        if (JSON.stringify(rows) !== "[]") {
                            var result_errMail = {
                                result: false,
                                cause: "email",
                                message: "입력하신 email로 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.",
                            };
                            console.log(result_errMail);
                            res.status(200).json(result_errMail);
                            return false;
                        }
                        else {
                            var addUser = database_1.default
                                .query({
                                sql: "INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)",
                                values: [email_1, password_1, nickname_1],
                            })
                                .then(function (_a) {
                                var rows = _a[0], fields = _a[1];
                                var result_success = {
                                    result: true,
                                    cause: "success",
                                    message: "회원가입이 성공적으로 이뤄졌습니다.",
                                };
                                console.log(result_success);
                                res.status(200).json(result_success);
                            });
                        }
                    })];
            case 1:
                duplicatedEmail = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// api index
userRouter.get("/userlist", userList);
// userRouter.post("/userRegister", asyncHandler(userRegister));
userRouter.post("/userRegister", userRegister);
module.exports = userRouter;
