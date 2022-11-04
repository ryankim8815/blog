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
var database_1 = __importDefault(require("../database"));
var Comment = /** @class */ (function () {
    function Comment() {
    }
    // 전체 댓글 검색
    Comment.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, rows, fields;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, database_1.default.query({
                            //   sql: "SELECT * FROM comments",
                            sql: "SELECT * FROM comments INNER JOIN users ON comments.user_id = users.user_id",
                        })];
                    case 1:
                        _a = _b.sent(), rows = _a[0], fields = _a[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    // comment_id로 검색
    Comment.findByCommentId = function (_a) {
        var comment_id = _a.comment_id;
        return __awaiter(this, void 0, void 0, function () {
            var _b, rows, fields;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, database_1.default.query({
                            sql: "SELECT * FROM comments WHERE `comment_id` = ?",
                            values: [comment_id],
                        })];
                    case 1:
                        _b = _c.sent(), rows = _b[0], fields = _b[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    // user_id로 검색
    Comment.findByUserId = function (_a) {
        var user_id = _a.user_id;
        return __awaiter(this, void 0, void 0, function () {
            var _b, rows, fields;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, database_1.default.query({
                            sql: "SELECT * FROM comments WHERE `user_id` = ?",
                            values: [user_id],
                        })];
                    case 1:
                        _b = _c.sent(), rows = _b[0], fields = _b[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    // comment_id와 user_id로 검색
    Comment.findByCommentIdUserId = function (_a) {
        var comment_id = _a.comment_id, user_id = _a.user_id;
        return __awaiter(this, void 0, void 0, function () {
            var _b, rows, fields;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, database_1.default.query({
                            sql: "SELECT * FROM comments WHERE `comment_id` = ? AND `user_id` = ?",
                            values: [comment_id, user_id],
                        })];
                    case 1:
                        _b = _c.sent(), rows = _b[0], fields = _b[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    // post_id로 검색
    Comment.findByComment = function (_a) {
        var post_id = _a.post_id;
        return __awaiter(this, void 0, void 0, function () {
            var _b, rows, fields;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, database_1.default.query({
                            sql: "SELECT * FROM comments WHERE `post_id` = ?",
                            values: [post_id],
                        })];
                    case 1:
                        _b = _c.sent(), rows = _b[0], fields = _b[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    // 댓글 작성일로 검색
    Comment.findByCreatedAtDate = function (_a) {
        var created_at_date = _a.created_at_date;
        return __awaiter(this, void 0, void 0, function () {
            var _b, rows, fields;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, database_1.default.query({
                            sql: "SELECT * FROM comments WHERE DATE_FORMAT(`created_at`, `$Y-%m-%d`) = DATE_FORMAT(?, `%Y-$m-$d`)",
                            values: [created_at_date],
                        })];
                    case 1:
                        _b = _c.sent(), rows = _b[0], fields = _b[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    // 댓글 작성기간으로 검색
    Comment.findByCreatedAtDuration = function (_a) {
        var created_at_from = _a.created_at_from, created_at_to = _a.created_at_to;
        return __awaiter(this, void 0, void 0, function () {
            var _b, rows, fields;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, database_1.default.query({
                            sql: "SELECT * FROM comments WHERE `created_at` BETWEEN ? AND ?",
                            values: [created_at_from, created_at_to],
                        })];
                    case 1:
                        _b = _c.sent(), rows = _b[0], fields = _b[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    // 댓글 등록
    Comment.create = function (_a) {
        var comment_id = _a.comment_id, user_id = _a.user_id, post_id = _a.post_id, content = _a.content, created_at = _a.created_at, updated_at = _a.updated_at;
        return __awaiter(this, void 0, void 0, function () {
            var _b, rows, fields;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, database_1.default.query({
                            sql: "INSERT INTO comments (comment_id, user_id, post_id, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
                            values: [comment_id, user_id, post_id, content, created_at, updated_at],
                        })];
                    case 1:
                        _b = _c.sent(), rows = _b[0], fields = _b[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    // 댓글 수정
    Comment.update = function (_a) {
        var comment_id = _a.comment_id, content = _a.content, updated_at = _a.updated_at;
        return __awaiter(this, void 0, void 0, function () {
            var _b, rows, fields;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, database_1.default.query({
                            sql: "UPDATE comments SET `content` = ?, `updated_at` = ? WHERE `comment_id` = ?",
                            values: [content, updated_at, comment_id],
                        })];
                    case 1:
                        _b = _c.sent(), rows = _b[0], fields = _b[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    // 게시글 삭제
    Comment.delete = function (_a) {
        var comment_id = _a.comment_id;
        return __awaiter(this, void 0, void 0, function () {
            var _b, rows, fields;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, database_1.default.query({
                            sql: "DELETE FROM comments WHERE `comment_id` = ?",
                            values: [comment_id],
                        })];
                    case 1:
                        _b = _c.sent(), rows = _b[0], fields = _b[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    return Comment;
}());
module.exports = Comment;
