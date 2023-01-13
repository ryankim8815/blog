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
var postService_1 = __importDefault(require("../services/postService"));
var postController = /** @class */ (function () {
    function postController() {
    }
    // GET: 전체 게시글 리스트
    postController.postList = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var allPosts, err_1, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, postService_1.default.getAllPosts()];
                    case 1:
                        allPosts = _a.sent();
                        // console.log(allPosts);
                        return [2 /*return*/, res.status(200).json(allPosts)];
                    case 2:
                        err_1 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "postList api에서 오류가 발생했습니다.",
                        };
                        console.log(result_err);
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // // GET: 테그로 검색한 게시글 리스트
    // static async postListByTag(
    //   req: express.Request,
    //   res: express.Response,
    //   next: express.NextFunction
    // ) {
    //   const tag = req.params.tag;
    //   try {
    //     const Posts = await postService.getPostsByTag({ tag });
    //     // console.log(Posts);
    //     return res.status(200).json(Posts);
    //   } catch (err) {
    //     const result_err = {
    //       result: false,
    //       cause: "api",
    //       message: "postListByTag api에서 오류가 발생했습니다.",
    //     };
    //     console.log(result_err);
    //     return res.status(200).json(result_err);
    //   }
    // }
    // GET: 테그로 검색한 게시글 리스트
    postController.postsByStatusTag = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var status, tag, start, end, Posts, err_2, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = req.params.status;
                        tag = req.params.tag;
                        start = req.params.start;
                        end = req.params.end;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, postService_1.default.getPostsByStatusTag({
                                status: status,
                                tag: tag,
                                start: start,
                                end: end,
                            })];
                    case 2:
                        Posts = _a.sent();
                        // console.log(Posts);
                        return [2 /*return*/, res.status(200).json(Posts)];
                    case 3:
                        err_2 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "postsByStatusTag api에서 오류가 발생했습니다.",
                        };
                        console.log(result_err);
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // GET: post_id로 검색한 게시글 리스트
    postController.postByPostId = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var post_id, Post, err_3, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        post_id = req.params.post_id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, postService_1.default.getPostByPostId({ post_id: post_id })];
                    case 2:
                        Post = _a.sent();
                        // console.log(Post);
                        return [2 /*return*/, res.status(200).json(Post)];
                    case 3:
                        err_3 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "postByPostId api에서 오류가 발생했습니다.",
                        };
                        console.log(result_err);
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // GET: user_id와 status로 검색한 게시글 리스트
    postController.postByUserIdStatus = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, status, start, end, Post, err_4, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = req.params.user_id;
                        status = req.params.status;
                        start = req.params.start;
                        end = req.params.end;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, postService_1.default.getPostByUserIdStatus({
                                user_id: user_id,
                                status: status,
                                start: start,
                                end: end,
                            })];
                    case 2:
                        Post = _a.sent();
                        return [2 /*return*/, res.status(200).json(Post)];
                    case 3:
                        err_4 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "PostByUserIdStatus api에서 오류가 발생했습니다.",
                        };
                        console.log(result_err);
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // POST: 게시글 생성
    postController.postCreate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, title, sub_title, content, tag, status, createdPost, err_5, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = req.body.user_id;
                        title = req.body.title;
                        sub_title = req.body.sub_title;
                        content = req.body.content;
                        tag = req.body.tag;
                        status = req.body.status;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, postService_1.default.addPost({
                                user_id: user_id,
                                title: title,
                                sub_title: sub_title,
                                content: content,
                                tag: tag,
                                status: status,
                            })];
                    case 2:
                        createdPost = _a.sent();
                        return [2 /*return*/, res.status(200).json(createdPost)];
                    case 3:
                        err_5 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "postCreate api에서 오류가 발생했습니다.",
                        };
                        console.log(result_err);
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // PUT: 게시글 수정
    postController.postUpdate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, post_id, title, sub_title, content, tag, status, updatedPost, err_6, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = req.body.user_id;
                        post_id = req.params.post_id;
                        title = req.body.title;
                        sub_title = req.body.sub_title;
                        content = req.body.content;
                        tag = req.body.tag;
                        status = req.body.status;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, postService_1.default.updatePost({
                                user_id: user_id,
                                post_id: post_id,
                                title: title,
                                sub_title: sub_title,
                                content: content,
                                tag: tag,
                                status: status,
                            })];
                    case 2:
                        updatedPost = _a.sent();
                        // console.log(updatedPost);
                        return [2 /*return*/, res.status(200).json(updatedPost)];
                    case 3:
                        err_6 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "postUpdate api에서 오류가 발생했습니다.",
                        };
                        console.log(result_err);
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // DELETE: 게시글 삭제
    postController.postDelete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, post_id, deletedPost, err_7, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = req.body.user_id;
                        post_id = req.params.post_id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, postService_1.default.deletePost({
                                user_id: user_id,
                                post_id: post_id,
                            })];
                    case 2:
                        deletedPost = _a.sent();
                        // console.log(deletedPost);
                        return [2 /*return*/, res.status(200).json(deletedPost)];
                    case 3:
                        err_7 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "deletedPost api에서 오류가 발생했습니다.",
                        };
                        console.log(result_err);
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return postController;
}());
module.exports = postController;
