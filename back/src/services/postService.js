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
var Post_1 = __importDefault(require("../db/models/Post"));
var uuid_1 = require("uuid");
var moment_timezone_1 = __importDefault(require("moment-timezone"));
moment_timezone_1.default.tz.setDefault("Asia/Seoul");
var postService = /** @class */ (function () {
    function postService() {
    }
    //// 모든 게시글 조회
    postService.getAllPosts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allPosts, allPostsString, allPostsObject, i, countPosts, result_success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Post_1.default.findAll()];
                    case 1:
                        allPosts = _a.sent();
                        allPostsString = JSON.stringify(allPosts);
                        allPostsObject = JSON.parse(allPostsString);
                        for (i = 0; i < allPostsObject.length; i++) {
                            delete allPostsObject[i].user_id;
                            delete allPostsObject[i].password;
                        }
                        return [4 /*yield*/, Post_1.default.countAll()];
                    case 2:
                        countPosts = _a.sent();
                        result_success = Object.assign({
                            result: true,
                            cause: "success",
                            message: "\uBAA8\uB4E0 \uAC8C\uC2DC\uAE00 \uC870\uD68C\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                        }, { count: countPosts[0].cnt, list: allPostsObject });
                        return [2 /*return*/, result_success];
                }
            });
        });
    };
    //// tag로 게시글 조회
    postService.getPostsByTag = function (_a) {
        var tag = _a.tag;
        return __awaiter(this, void 0, void 0, function () {
            var posts, postsString, postsObject, i, countPosts, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Post_1.default.findByTag({ tag: tag })];
                    case 1:
                        posts = _b.sent();
                        postsString = JSON.stringify(posts);
                        postsObject = JSON.parse(postsString);
                        for (i = 0; i < postsObject.length; i++) {
                            delete postsObject[i].user_id;
                            delete postsObject[i].password;
                        }
                        return [4 /*yield*/, Post_1.default.countByTag({ tag: tag })];
                    case 2:
                        countPosts = _b.sent();
                        result_success = Object.assign({
                            result: true,
                            cause: "success",
                            message: "tag\uB85C \uAC8C\uC2DC\uAE00 \uC870\uD68C\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                        }, { count: countPosts[0].cnt, list: postsObject });
                        return [2 /*return*/, result_success];
                }
            });
        });
    };
    //// post_id로 게시글 조회
    postService.getPostByPostId = function (_a) {
        var post_id = _a.post_id;
        return __awaiter(this, void 0, void 0, function () {
            var post, postString, postObject, result_errUpdate, result_errUpdate, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Post_1.default.findByPostId({ post_id: post_id })];
                    case 1:
                        post = _b.sent();
                        postString = JSON.stringify(post);
                        postObject = JSON.parse(postString);
                        if (postObject.length == 0) {
                            result_errUpdate = {
                                result: false,
                                cause: "db",
                                message: "\uC694\uCCAD\uD558\uC2E0 \uAC8C\uC2DC\uBB3C\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result_errUpdate];
                        }
                        else if (postObject.length > 1) {
                            result_errUpdate = {
                                result: false,
                                cause: "db",
                                message: "[\uD655\uC778\uC694\uB9DD]: \uC694\uCCAD\uD558\uC2E0 post_id\uB85C \uC800\uC7A5\uB41C \uAC8C\uC2DC\uBB3C\uC774 \uB450 \uAC1C \uC774\uC0C1\uC785\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result_errUpdate];
                        }
                        else {
                            delete postObject[0].user_id;
                            delete postObject[0].password;
                            result_success = Object.assign({
                                result: true,
                                cause: "success",
                                message: "post_id\uB85C \uAC8C\uC2DC\uAE00 \uC870\uD68C\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                            }, postObject[0]);
                            return [2 /*return*/, result_success];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //// user_id와 status로 게시글 조회
    postService.getPostByUserIdStatus = function (_a) {
        var user_id = _a.user_id, status = _a.status;
        return __awaiter(this, void 0, void 0, function () {
            var posts, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Post_1.default.findByUserIdStatus({ user_id: user_id, status: status })];
                    case 1:
                        posts = _b.sent();
                        result_success = Object.assign({
                            result: true,
                            cause: "success",
                            message: "\uBAA8\uB4E0 \uAC8C\uC2DC\uAE00 \uC870\uD68C\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                        }, { list: posts });
                        return [2 /*return*/, result_success];
                }
            });
        });
    };
    //// 게시글 생성
    postService.addPost = function (_a) {
        var user_id = _a.user_id, title = _a.title, sub_title = _a.sub_title, content = _a.content, tag = _a.tag;
        return __awaiter(this, void 0, void 0, function () {
            var currentTime, created_at, updated_at, user, userString, userObject, result_errUserId, post_id, newPost, newpostString, newpostObject, affectedRows, checkNewPost, checkNewPostString, checkNewPostObject, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        currentTime = (0, moment_timezone_1.default)().format("YYYY-MM-DD HH:mm:ss");
                        created_at = currentTime;
                        updated_at = currentTime;
                        return [4 /*yield*/, User_1.default.findByUserId({ user_id: user_id })];
                    case 1:
                        user = _b.sent();
                        userString = JSON.stringify(user);
                        userObject = JSON.parse(userString);
                        if (userObject.length === 0) {
                            result_errUserId = {
                                result: false,
                                cause: "token",
                                message: "제출하신 token 정보와 일치하는 사용자가 없습니다. 다시 한 번 확인해 주세요.",
                            };
                            return [2 /*return*/, result_errUserId];
                        }
                        post_id = (0, uuid_1.v4)();
                        return [4 /*yield*/, Post_1.default.create({
                                post_id: post_id,
                                user_id: user_id,
                                title: title,
                                sub_title: sub_title,
                                content: content,
                                tag: tag,
                                created_at: created_at,
                                updated_at: updated_at,
                            })];
                    case 2:
                        newPost = _b.sent();
                        newpostString = JSON.stringify(newPost);
                        newpostObject = JSON.parse(newpostString);
                        affectedRows = newpostObject.affectedRows;
                        return [4 /*yield*/, Post_1.default.findByPostId({ post_id: post_id })];
                    case 3:
                        checkNewPost = _b.sent();
                        checkNewPostString = JSON.stringify(checkNewPost);
                        checkNewPostObject = JSON.parse(checkNewPostString);
                        if (affectedRows == 1 && checkNewPostObject.length == 1) {
                            result_success = {
                                result: true,
                                cause: "success",
                                message: "\uAC8C\uC2DC\uAE00 \uC0DD\uC131\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result_success];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //// 게시글 수정
    postService.updatePost = function (_a) {
        var user_id = _a.user_id, post_id = _a.post_id, title = _a.title, sub_title = _a.sub_title, content = _a.content, tag = _a.tag;
        return __awaiter(this, void 0, void 0, function () {
            var updated_at, user, userString, userObject, result_errUserId, checkPost, checkPostString, checkPostObject, result_errPost, updatedPost, updatedPostString, updatedPostObject, affectedRows, result_errUpdate, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        updated_at = (0, moment_timezone_1.default)().format("YYYY-MM-DD HH:mm:ss");
                        return [4 /*yield*/, User_1.default.findByUserId({ user_id: user_id })];
                    case 1:
                        user = _b.sent();
                        userString = JSON.stringify(user);
                        userObject = JSON.parse(userString);
                        if (userObject.length === 0) {
                            result_errUserId = {
                                result: false,
                                cause: "token",
                                message: "제출하신 token 정보와 일치하는 사용자가 없습니다. 다시 한 번 확인해 주세요.",
                            };
                            return [2 /*return*/, result_errUserId];
                        }
                        return [4 /*yield*/, Post_1.default.findByPostIdUserId({ post_id: post_id, user_id: user_id })];
                    case 2:
                        checkPost = _b.sent();
                        checkPostString = JSON.stringify(checkPost);
                        checkPostObject = JSON.parse(checkPostString);
                        if (!(checkPostObject.length !== 1)) return [3 /*break*/, 3];
                        result_errPost = {
                            result: false,
                            cause: "authority",
                            message: "게시글 수정은 작성자만 할 수 있습니다. 수정 요청자가 작성자인지 확인해주세요.",
                        };
                        return [2 /*return*/, result_errPost];
                    case 3: return [4 /*yield*/, Post_1.default.update({
                            post_id: post_id,
                            title: title,
                            sub_title: sub_title,
                            content: content,
                            tag: tag,
                            updated_at: updated_at,
                        })];
                    case 4:
                        updatedPost = _b.sent();
                        updatedPostString = JSON.stringify(updatedPost);
                        updatedPostObject = JSON.parse(updatedPostString);
                        affectedRows = updatedPostObject.affectedRows;
                        if (affectedRows !== 1) {
                            result_errUpdate = {
                                result: false,
                                cause: "update",
                                message: "\uAC8C\uC2DC\uAE00 \uC5C5\uB370\uC774\uD2B8 \uC911\uC5D0 \uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result_errUpdate];
                        }
                        else {
                            result_success = {
                                result: true,
                                cause: "success",
                                message: "\uAC8C\uC2DC\uAE00 \uC218\uC815\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result_success];
                        }
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //// 게시글 삭제
    postService.deletePost = function (_a) {
        var user_id = _a.user_id, post_id = _a.post_id;
        return __awaiter(this, void 0, void 0, function () {
            var user, userString, userObject, result_errUserId, checkPost, checkPostString, checkPostObject, result_errPost, deletedPost, deletedPostString, deletedPostObject, affectedRows, result_errUpdate, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_1.default.findByUserId({ user_id: user_id })];
                    case 1:
                        user = _b.sent();
                        userString = JSON.stringify(user);
                        userObject = JSON.parse(userString);
                        if (userObject.length === 0) {
                            result_errUserId = {
                                result: false,
                                cause: "token",
                                message: "제출하신 token 정보와 일치하는 사용자가 없습니다. 다시 한 번 확인해 주세요.",
                            };
                            return [2 /*return*/, result_errUserId];
                        }
                        return [4 /*yield*/, Post_1.default.findByPostIdUserId({ post_id: post_id, user_id: user_id })];
                    case 2:
                        checkPost = _b.sent();
                        checkPostString = JSON.stringify(checkPost);
                        checkPostObject = JSON.parse(checkPostString);
                        if (!(checkPostObject.length !== 1)) return [3 /*break*/, 3];
                        result_errPost = {
                            result: false,
                            cause: "authority",
                            message: "게시글 삭제는 작성자만 할 수 있습니다. 삭제 요청자가 작성자인지 확인해주세요.",
                        };
                        return [2 /*return*/, result_errPost];
                    case 3: return [4 /*yield*/, Post_1.default.delete({
                            post_id: post_id,
                        })];
                    case 4:
                        deletedPost = _b.sent();
                        deletedPostString = JSON.stringify(deletedPost);
                        deletedPostObject = JSON.parse(deletedPostString);
                        affectedRows = deletedPostObject.affectedRows;
                        if (affectedRows !== 1) {
                            result_errUpdate = {
                                result: false,
                                cause: "delete",
                                message: "\uAC8C\uC2DC\uAE00 \uC0AD\uC81C \uC911\uC5D0 \uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result_errUpdate];
                        }
                        else {
                            result_success = {
                                result: true,
                                cause: "success",
                                message: "\uAC8C\uC2DC\uAE00 \uC0AD\uC81C\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result_success];
                        }
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return postService;
}());
module.exports = postService;
