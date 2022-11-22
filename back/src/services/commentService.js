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
var Comment_1 = __importDefault(require("../db/models/Comment"));
var uuid_1 = require("uuid");
var moment_timezone_1 = __importDefault(require("moment-timezone"));
moment_timezone_1.default.tz.setDefault("Asia/Seoul");
var commentService = /** @class */ (function () {
    function commentService() {
    }
    //// 모든 댓글 조회
    commentService.getPostComments = function (_a) {
        var post_id = _a.post_id;
        return __awaiter(this, void 0, void 0, function () {
            var postComments, postCommentsString, postCommentsObject, i, countComments, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Comment_1.default.findByComment({ post_id: post_id })];
                    case 1:
                        postComments = _b.sent();
                        postCommentsString = JSON.stringify(postComments);
                        postCommentsObject = JSON.parse(postCommentsString);
                        // db에 많이 쌓이면 쿼리문과 속도 비교해보기
                        for (i = 0; i < postCommentsObject.length; i++) {
                            delete postCommentsObject[i].user_id;
                        }
                        return [4 /*yield*/, Comment_1.default.countByComment({ post_id: post_id })];
                    case 2:
                        countComments = _b.sent();
                        result_success = Object.assign({
                            result: true,
                            cause: "success",
                            message: "\uD574\uB2F9 \uAC8C\uC2DC\uBB3C\uC5D0 \uB300\uD55C \uBAA8\uB4E0 \uB313\uAE00 \uC870\uD68C\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                        }, { count: countComments[0].cnt, list: postCommentsObject });
                        return [2 /*return*/, result_success];
                }
            });
        });
    };
    //// 댓글 생성
    commentService.addComment = function (_a) {
        var user_id = _a.user_id, post_id = _a.post_id, content = _a.content;
        return __awaiter(this, void 0, void 0, function () {
            var created_at, updated_at, user, userString, userObject, result_errUserId, comment_id, newComment, newCommentString, newCommentObject, affectedRows, checkNewComment, checkNewCommentString, checkNewCommentObject, result_success, result_errCreate;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        created_at = (0, moment_timezone_1.default)().format("YYYY-MM-DD HH:mm:ss");
                        updated_at = created_at;
                        return [4 /*yield*/, User_1.default.findByUserId({ user_id: user_id })];
                    case 1:
                        user = _b.sent();
                        userString = JSON.stringify(user);
                        userObject = JSON.parse(userString);
                        // const user_id = userObject[0].user_id; // 예외처리 필요
                        if (userObject.length === 0) {
                            result_errUserId = {
                                result: false,
                                cause: "token",
                                message: "제출하신 token 정보와 일치하는 사용자가 없습니다. 다시 한 번 확인해 주세요.",
                            };
                            return [2 /*return*/, result_errUserId];
                        }
                        comment_id = (0, uuid_1.v4)();
                        return [4 /*yield*/, Comment_1.default.create({
                                comment_id: comment_id,
                                user_id: user_id,
                                post_id: post_id,
                                content: content,
                                created_at: created_at,
                                updated_at: updated_at,
                            })];
                    case 2:
                        newComment = _b.sent();
                        newCommentString = JSON.stringify(newComment);
                        newCommentObject = JSON.parse(newCommentString);
                        affectedRows = newCommentObject.affectedRows;
                        return [4 /*yield*/, Comment_1.default.findByCommentId({ comment_id: comment_id })];
                    case 3:
                        checkNewComment = _b.sent();
                        checkNewCommentString = JSON.stringify(checkNewComment);
                        checkNewCommentObject = JSON.parse(checkNewCommentString);
                        if (affectedRows == 1 && checkNewCommentObject.length == 1) {
                            result_success = {
                                result: true,
                                cause: "success",
                                message: "\uB313\uAE00 \uC0DD\uC131\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result_success];
                        }
                        else {
                            result_errCreate = {
                                result: false,
                                cause: "create",
                                message: "\uB313\uAE00 \uC0DD\uC131 \uC911\uC5D0 \uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result_errCreate];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //// 댓글 수정
    commentService.updateComment = function (_a) {
        var user_id = _a.user_id, comment_id = _a.comment_id, content = _a.content;
        return __awaiter(this, void 0, void 0, function () {
            var updated_at, user, userString, userObject, result_errUserId, checkComment, checkCommentString, checkCommentObject, result_errPost, updatedComment, updatedCommentString, updatedCommentObject, affectedRows, result_errUpdate, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        updated_at = (0, moment_timezone_1.default)().format("YYYY-MM-DD HH:mm:ss");
                        return [4 /*yield*/, User_1.default.findByUserId({ user_id: user_id })];
                    case 1:
                        user = _b.sent();
                        userString = JSON.stringify(user);
                        userObject = JSON.parse(userString);
                        // const user_id = userObject[0].user_id; // 예외처리 필요
                        if (userObject.length === 0) {
                            result_errUserId = {
                                result: false,
                                cause: "token",
                                message: "제출하신 token 정보와 일치하는 사용자가 없습니다. 다시 한 번 확인해 주세요.",
                            };
                            return [2 /*return*/, result_errUserId];
                        }
                        return [4 /*yield*/, Comment_1.default.findByCommentIdUserId({
                                comment_id: comment_id,
                                user_id: user_id,
                            })];
                    case 2:
                        checkComment = _b.sent();
                        checkCommentString = JSON.stringify(checkComment);
                        checkCommentObject = JSON.parse(checkCommentString);
                        if (!(checkCommentObject.length !== 1)) return [3 /*break*/, 3];
                        result_errPost = {
                            result: false,
                            cause: "authority",
                            message: "댓글 수정은 작성자만 할 수 있습니다. 수정 요청자가 작성자인지 확인해주세요.",
                        };
                        return [2 /*return*/, result_errPost];
                    case 3: return [4 /*yield*/, Comment_1.default.update({
                            comment_id: comment_id,
                            content: content,
                            updated_at: updated_at,
                        })];
                    case 4:
                        updatedComment = _b.sent();
                        updatedCommentString = JSON.stringify(updatedComment);
                        updatedCommentObject = JSON.parse(updatedCommentString);
                        affectedRows = updatedCommentObject.affectedRows;
                        if (affectedRows !== 1) {
                            result_errUpdate = {
                                result: false,
                                cause: "update",
                                message: "\uB313\uAE00 \uC5C5\uB370\uC774\uD2B8 \uC911\uC5D0 \uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result_errUpdate];
                        }
                        else {
                            result_success = {
                                result: true,
                                cause: "success",
                                message: "\uB313\uAE00 \uC5C5\uB370\uC774\uD2B8\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result_success];
                        }
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //// 댓글 삭제
    commentService.deleteComment = function (_a) {
        var user_id = _a.user_id, comment_id = _a.comment_id;
        return __awaiter(this, void 0, void 0, function () {
            var user, userString, userObject, result_errUserId, checkComment, checkPostString, checkPostObject, result_errPost, deletedComment, deletedCommentString, deletedCommentObject, affectedRows, result_errUpdate, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_1.default.findByUserId({ user_id: user_id })];
                    case 1:
                        user = _b.sent();
                        userString = JSON.stringify(user);
                        userObject = JSON.parse(userString);
                        // const user_id = userObject[0].user_id; // 예외처리 필요
                        if (userObject.length === 0) {
                            result_errUserId = {
                                result: false,
                                cause: "token",
                                message: "제출하신 token 정보와 일치하는 사용자가 없습니다. 다시 한 번 확인해 주세요.",
                            };
                            return [2 /*return*/, result_errUserId];
                        }
                        return [4 /*yield*/, Comment_1.default.findByCommentIdUserId({
                                comment_id: comment_id,
                                user_id: user_id,
                            })];
                    case 2:
                        checkComment = _b.sent();
                        checkPostString = JSON.stringify(checkComment);
                        checkPostObject = JSON.parse(checkPostString);
                        if (!(checkPostObject.length !== 1)) return [3 /*break*/, 3];
                        result_errPost = {
                            result: false,
                            cause: "authority|db",
                            message: "댓글 삭제 중에 문제가 발생했습니다. 댓글 작성자가 아니거나 댓글이 존재하지 않습니다.",
                        };
                        return [2 /*return*/, result_errPost];
                    case 3: return [4 /*yield*/, Comment_1.default.delete({
                            comment_id: comment_id,
                        })];
                    case 4:
                        deletedComment = _b.sent();
                        deletedCommentString = JSON.stringify(deletedComment);
                        deletedCommentObject = JSON.parse(deletedCommentString);
                        affectedRows = deletedCommentObject.affectedRows;
                        if (affectedRows !== 1) {
                            result_errUpdate = {
                                result: false,
                                cause: "delete",
                                message: "\uB313\uAE00 \uC0AD\uC81C \uC911\uC5D0 \uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result_errUpdate];
                        }
                        else {
                            result_success = {
                                result: true,
                                cause: "success",
                                message: "\uB313\uAE00 \uC0AD\uC81C\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result_success];
                        }
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return commentService;
}());
module.exports = commentService;
