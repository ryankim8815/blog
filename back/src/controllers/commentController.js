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
var commentService_1 = __importDefault(require("../services/commentService"));
var commentController = /** @class */ (function () {
    function commentController() {
    }
    // GET: 특정 게시글의 댓글 조회
    commentController.commentList = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var post_id, postComments, err_1, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        post_id = req.params.post_id;
                        return [4 /*yield*/, commentService_1.default.getPostComments({ post_id: post_id })];
                    case 1:
                        postComments = _a.sent();
                        console.log(postComments);
                        return [2 /*return*/, res.status(200).json(postComments)];
                    case 2:
                        err_1 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "commentList api에서 오류가 발생했습니다.",
                        };
                        console.log(result_err);
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // GET: 특정 사용자의 댓글 조회
    commentController.commentsByUserId = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, comments, err_2, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user_id = req.params.user_id;
                        return [4 /*yield*/, commentService_1.default.getCommentsByUserId({
                                user_id: user_id,
                            })];
                    case 1:
                        comments = _a.sent();
                        console.log(comments);
                        return [2 /*return*/, res.status(200).json(comments)];
                    case 2:
                        err_2 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "commensByUserId api에서 오류가 발생했습니다.",
                        };
                        console.log(result_err);
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // POST: 댓글 생성
    commentController.commentCreate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, post_id, content, createdComment, err_3, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = req.body.user_id;
                        post_id = req.params.post_id;
                        content = req.body.content;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, commentService_1.default.addComment({
                                user_id: user_id,
                                post_id: post_id,
                                content: content,
                            })];
                    case 2:
                        createdComment = _a.sent();
                        console.log(createdComment);
                        return [2 /*return*/, res.status(200).json(createdComment)];
                    case 3:
                        err_3 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "commentCreate api에서 오류가 발생했습니다.",
                        };
                        console.log(result_err);
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // PUT: 댓글 수정
    commentController.commentUpdate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, post_id, comment_id, content, updatedComment, err_4, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = req.body.user_id;
                        post_id = req.params.post_id;
                        comment_id = req.params.comment_id;
                        content = req.body.content;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, commentService_1.default.updateComment({
                                user_id: user_id,
                                comment_id: comment_id,
                                content: content,
                            })];
                    case 2:
                        updatedComment = _a.sent();
                        console.log(updatedComment);
                        return [2 /*return*/, res.status(200).json(updatedComment)];
                    case 3:
                        err_4 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "commentUpdate api에서 오류가 발생했습니다.",
                        };
                        console.log(result_err);
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // DELETE: 댓글 삭제
    commentController.commentDelete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, comment_id, deletedComment, err_5, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = req.body.user_id;
                        comment_id = req.params.comment_id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, commentService_1.default.deleteComment({
                                user_id: user_id,
                                comment_id: comment_id,
                            })];
                    case 2:
                        deletedComment = _a.sent();
                        console.log(deletedComment);
                        return [2 /*return*/, res.status(200).json(deletedComment)];
                    case 3:
                        err_5 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "commentDelete api에서 오류가 발생했습니다.",
                        };
                        console.log(result_err);
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return commentController;
}());
module.exports = commentController;
