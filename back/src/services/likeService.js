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
var User_1 = __importDefault(require("../db/models/User"));
var Like_1 = __importDefault(require("../db/models/Like"));
var uuid_1 = require("uuid");
var moment_timezone_1 = __importDefault(require("moment-timezone"));
moment_timezone_1.default.tz.setDefault("Asia/Seoul");
var likeService = /** @class */ (function () {
    function likeService() {
    }
    //// 모든 좋아요 조회
    likeService.getPostLikes = function (_a) {
        var post_id = _a.post_id;
        return __awaiter(this, void 0, void 0, function () {
            var postLikes, postLikesString, postLikesObject, countLikes, countLikesString, countLikesObject, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Like_1.default.findByPostId({ post_id: post_id })];
                    case 1:
                        postLikes = _b.sent();
                        postLikesString = JSON.stringify(postLikes);
                        postLikesObject = JSON.parse(postLikesString);
                        return [4 /*yield*/, Like_1.default.countByPostId({ post_id: post_id })];
                    case 2:
                        countLikes = _b.sent();
                        countLikesString = JSON.stringify(countLikes);
                        countLikesObject = JSON.parse(countLikesString);
                        result_success = Object.assign({
                            result: true,
                            cause: "success",
                            message: "\uD574\uB2F9 \uAC8C\uC2DC\uBB3C\uC5D0 \uB300\uD55C \uC88B\uC544\uC694 \uC815\uBCF4 \uC870\uD68C\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                        }, { count: countLikesObject[0].cnt, list: postLikesObject });
                        return [2 /*return*/, result_success];
                }
            });
        });
    };
    //// 좋아요 생성/삭제
    likeService.clickLike = function (_a) {
        var email = _a.email, post_id = _a.post_id;
        return __awaiter(this, void 0, void 0, function () {
            var created_at, user, userString, userObject, user_id, checkLike, checkLikeString, checkLikeObject, like_id, deletedLike, deletedLikeString, deletedLikeObject, affectedRows, result_errUpdate, result_success, like_id, newLike, newLikeString, newLikeObject, affectedRows, checkNewLike, checkNewLikeString, checkNewLikeObject, result_success, result_errCreate, result_errDB;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        created_at = (0, moment_timezone_1.default)().format("YYYY-MM-DD HH:mm:ss");
                        return [4 /*yield*/, User_1.default.findByEmail({ email: email })];
                    case 1:
                        user = _b.sent();
                        userString = JSON.stringify(user);
                        userObject = JSON.parse(userString);
                        user_id = userObject[0].user_id;
                        return [4 /*yield*/, Like_1.default.findByPostIdUserId({ post_id: post_id, user_id: user_id })];
                    case 2:
                        checkLike = _b.sent();
                        checkLikeString = JSON.stringify(checkLike);
                        checkLikeObject = JSON.parse(checkLikeString);
                        if (!(checkLikeObject.length == 1)) return [3 /*break*/, 4];
                        like_id = checkLikeObject[0].like_id;
                        return [4 /*yield*/, Like_1.default.delete({
                                like_id: like_id,
                            })];
                    case 3:
                        deletedLike = _b.sent();
                        deletedLikeString = JSON.stringify(deletedLike);
                        deletedLikeObject = JSON.parse(deletedLikeString);
                        affectedRows = deletedLikeObject.affectedRows;
                        if (affectedRows !== 1) {
                            result_errUpdate = {
                                result: false,
                                cause: "delete",
                                message: "\uC88B\uC544\uC694 \uCDE8\uC18C \uC911\uC5D0 \uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result_errUpdate];
                        }
                        else {
                            result_success = {
                                result: true,
                                cause: "success",
                                message: "\uC88B\uC544\uC694 \uCDE8\uC18C\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result_success];
                        }
                        return [3 /*break*/, 8];
                    case 4:
                        if (!(checkLikeObject.length == 0)) return [3 /*break*/, 7];
                        like_id = (0, uuid_1.v4)();
                        return [4 /*yield*/, Like_1.default.create({
                                like_id: like_id,
                                user_id: user_id,
                                post_id: post_id,
                                created_at: created_at,
                            })];
                    case 5:
                        newLike = _b.sent();
                        newLikeString = JSON.stringify(newLike);
                        newLikeObject = JSON.parse(newLikeString);
                        affectedRows = newLikeObject.affectedRows;
                        return [4 /*yield*/, Like_1.default.findByLikeId({ like_id: like_id })];
                    case 6:
                        checkNewLike = _b.sent();
                        checkNewLikeString = JSON.stringify(checkNewLike);
                        checkNewLikeObject = JSON.parse(checkNewLikeString);
                        if (affectedRows == 1 && checkNewLikeObject.length == 1) {
                            result_success = {
                                result: true,
                                cause: "success",
                                message: "\uC88B\uC544\uC694 \uC0DD\uC131\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result_success];
                        }
                        else {
                            result_errCreate = {
                                result: false,
                                cause: "create",
                                message: "\uC88B\uC544\uC694 \uC0DD\uC131 \uC911\uC5D0 \uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result_errCreate];
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        result_errDB = {
                            result: false,
                            cause: "db",
                            message: "[\uD655\uC778\uC694\uB9DD]: DB\uC5D0 \uB3D9\uC77C\uD55C \uC88B\uC544\uC694\uAC00 2\uAC1C \uC774\uC0C1 \uC874\uC7AC\uD569\uB2C8\uB2E4.",
                        };
                        return [2 /*return*/, result_errDB];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return likeService;
}());
module.exports = likeService;
