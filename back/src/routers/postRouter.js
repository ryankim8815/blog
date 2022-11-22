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
// import upload from "../middlewares/uploadMiddleware";   // 사진 업로드 기능은 resize 적용 후 사용
var postService_1 = __importDefault(require("../services/postService"));
// import asyncHandler from "../utils/asyncHandler";
// import type { MulterFile } from "../customType/multer.d";
var postRouter = express.Router();
// GET: 전체 게시글 리스트
var postList = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allPosts, err_1, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, postService_1.default.getAllPosts()];
            case 1:
                allPosts = _a.sent();
                console.log(allPosts);
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
}); };
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: 전체 게시글 조회
 *     description: 요청 시 보내야 하는 값이 없습니다.
 *     tags: ["postRouter"]
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: 모든 게시글 조회가 성공적으로 이뤄졌습니다.
 *                 count:
 *                   type: int
 *                   example: 10000
 *                 list:
 *                   type: object
 *                   properties:
 *                     post_id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     image:
 *                       type: string
 *                     tag:
 *                       type: string
 *                     created_at:
 *                       type: timstamp
 *                     updated_at:
 *                       type: timstamp
 *                     email:
 *                       type: string
 *                     nickname:
 *                       type: string
 *                     profile_image:
 *                       type: string
 *                     admin:
 *                       type: int
 *                     provider:
 *                       type: string
 *                   example:
 *                     - post_id: sdbhf2w9eiubr24we9iurg2w
 *                       title: 공지사항
 *                       content: 회원가입을 축하합니다~!!
 *                       image: file-12344051798734-416354969.png
 *                       tag: announcement
 *                       created_at: 2022-11-03T04:52:32.000Z
 *                       updated_at: 2022-11-03T04:52:32.000Z
 *                       email: admin@dogfoot.info
 *                       nickname: admin
 *                       profile_image: file-1234405177970-416354969.png
 *                       admin: 1
 *                       provider: dogfoot
 *                     - post_id: sdbhf2w9eiubr24aeerhr5s4w3e
 *                       title: 블로그 개발기 1화
 *                       content: 내가 왜 TS를 한다고 해서 이 고생을..
 *                       image: file-123443126434-123354969.png
 *                       tag: announcement
 *                       created_at: 2022-11-03T04:52:32.000Z
 *                       updated_at: 2022-11-03T04:52:32.000Z
 *                       email: admin@dogfoot.info
 *                       nickname: admin
 *                       profile_image: file-1234405177970-416354969.png
 *                       admin: 1
 *                       provider: dogfoot
 */
// GET: 테그로 검색한 게시글 리스트
var postListByTag = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var tag, Posts, err_2, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tag = req.params.tag;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, postService_1.default.getPostsByTag({ tag: tag })];
            case 2:
                Posts = _a.sent();
                console.log(Posts);
                return [2 /*return*/, res.status(200).json(Posts)];
            case 3:
                err_2 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "postListByTag api에서 오류가 발생했습니다.",
                };
                console.log(result_err);
                return [2 /*return*/, res.status(200).json(result_err)];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * @swagger
 * /posts/tag/{tag}:
 *   get:
 *     summary: tag로 게시글 조회
 *     description: 요청 시 보내야 하는 값이 없습니다.
 *     tags: ["postRouter"]
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: tag로 게시글 조회가 성공적으로 이뤄졌습니다.
 *                 count:
 *                   type: int
 *                   example: 10000
 *                 list:
 *                   type: object
 *                   properties:
 *                     post_id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     image:
 *                       type: string
 *                     tag:
 *                       type: string
 *                     created_at:
 *                       type: timstamp
 *                     updated_at:
 *                       type: timstamp
 *                     email:
 *                       type: string
 *                     nickname:
 *                       type: string
 *                     profile_image:
 *                       type: string
 *                     admin:
 *                       type: int
 *                     provider:
 *                       type: string
 *                   example:
 *                     - post_id: sdbhf2w9eiubr24we9iurg2w
 *                       title: 공지사항
 *                       content: 회원가입을 축하합니다~!!
 *                       image: file-12344051798734-416354969.png
 *                       tag: announcement
 *                       created_at: 2022-11-03T04:52:32.000Z
 *                       updated_at: 2022-11-03T04:52:32.000Z
 *                       email: admin@dogfoot.info
 *                       nickname: admin
 *                       profile_image: file-1234405177970-416354969.png
 *                       admin: 1
 *                       provider: dogfoot
 *                     - post_id: sdbhf2w9eiubr24aeerhr5s4w3e
 *                       title: 블로그 개발기 1화
 *                       content: 내가 왜 TS를 한다고 해서 이 고생을..
 *                       image: file-123443126434-123354969.png
 *                       tag: announcement
 *                       created_at: 2022-11-03T04:52:32.000Z
 *                       updated_at: 2022-11-03T04:52:32.000Z
 *                       email: admin@dogfoot.info
 *                       nickname: admin
 *                       profile_image: file-1234405177970-416354969.png
 *                       admin: 1
 *                       provider: dogfoot
 */
// GET: post_id로 검색한 게시글 리스트
var postByPostId = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
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
                console.log(Post);
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
}); };
/**
 * @swagger
 * /post/{post_id}:
 *   get:
 *     summary: post_id로 게시글 조회
 *     description: 요청 시 보내야 하는 값이 없습니다.
 *     tags: ["postRouter"]
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: post_id로 게시글 조회가 성공적으로 이뤄졌습니다.
 *                 post_id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 image:
 *                   type: string
 *                 tag:
 *                   type: string
 *                 created_at:
 *                   type: timstamp
 *                 updated_at:
 *                   type: timstamp
 *                 email:
 *                   type: string
 *                 nickname:
 *                   type: string
 *                 profile_image:
 *                   type: string
 *                 admin:
 *                   type: int
 *                 provider:
 *                   type: string
 *               example:
 *                     - post_id: sdbhf2w9eiubr24we9iurg2w
 *                       title: 공지사항
 *                       content: 회원가입을 축하합니다~!!
 *                       image: file-12344051798734-416354969.png
 *                       tag: announcement
 *                       created_at: 2022-11-03T04:52:32.000Z
 *                       updated_at: 2022-11-03T04:52:32.000Z
 *                       email: admin@dogfoot.info
 *                       nickname: admin
 *                       profile_image: file-1234405177970-416354969.png
 *                       admin: 1
 *                       provider: dogfoot
 */
// POST: 게시글 생성
var postCreate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, title, sub_title, content, tag, createdPost, err_4, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.user_id;
                title = req.body.title;
                sub_title = req.body.sub_title;
                content = req.body.content;
                tag = req.body.tag;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, postService_1.default.addPost({
                        user_id: user_id,
                        title: title,
                        sub_title: sub_title,
                        content: content,
                        tag: tag,
                    })];
            case 2:
                createdPost = _a.sent();
                console.log(createdPost);
                return [2 /*return*/, res.status(200).json(createdPost)];
            case 3:
                err_4 = _a.sent();
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
}); };
/**
 * @swagger
 * /post:
 *   post:
 *     summary: 게시글 작성
 *     description: 초기에는 관리자만 가능하도록 할 예정입니다.
 *     tags: ["postRouter"]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: title
 *               content:
 *                 type: string
 *                 example: content
 *               tag:
 *                 type: string
 *                 example: tag
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: 게시글 생성이 성공적으로 이뤄졌습니다.
 */
// PUT: 게시글 수정
var postUpdate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, post_id, title, content, tag, updatedPost, err_5, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.user_id;
                post_id = req.params.post_id;
                title = req.body.title;
                content = req.body.content;
                tag = req.body.tag;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, postService_1.default.updatePost({
                        user_id: user_id,
                        post_id: post_id,
                        title: title,
                        content: content,
                        tag: tag,
                    })];
            case 2:
                updatedPost = _a.sent();
                console.log(updatedPost);
                return [2 /*return*/, res.status(200).json(updatedPost)];
            case 3:
                err_5 = _a.sent();
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
}); };
/**
 * @swagger
 * /post/{post_id}:
 *   put:
 *     summary: 게시글 수정
 *     description: 작성자만 게시글을 수정할 수 있습니다.
 *     tags: ["postRouter"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: title
 *               content:
 *                 type: string
 *                 example: content
 *               tag:
 *                 type: string
 *                 example: tag
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: 게시글 수정이 성공적으로 이뤄졌습니다.
 */
// DELETE: 게시글 삭제
var postDelete = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, post_id, deletedPost, err_6, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.user_id;
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
                console.log(deletedPost);
                return [2 /*return*/, res.status(200).json(deletedPost)];
            case 3:
                err_6 = _a.sent();
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
}); };
/**
 * @swagger
 * /post/{post_id}:
 *   delete:
 *     summary: 게시글 삭제
 *     description: 작성자만 게시글을 삭제할 수 있습니다.
 *     tags: ["postRouter"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: 게시글 삭제가 성공적으로 이뤄졌습니다.
 */
// api index
postRouter.get("/posts", postList); // 전체 게시글 검섹
postRouter.get("/posts/tag/:tag", postListByTag); // tag로 게시글 검섹
postRouter.get("/post/:post_id", postByPostId); // post_id로 게시글 검섹
postRouter.post("/post", authMiddleware_1.default, postCreate); // 게시글 생성
postRouter.put("/post/:post_id", authMiddleware_1.default, postUpdate); //  게시글 수정
postRouter.delete("/post/:post_id", authMiddleware_1.default, postDelete); // 게시글 삭제
module.exports = postRouter;
