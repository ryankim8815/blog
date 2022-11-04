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
var likeService_1 = __importDefault(require("../services/likeService"));
var likeRouter = express.Router();
// GET: 특정 게시물의 좋아요 리스트
var likeList = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var post_id, postLikes, err_1, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                post_id = req.params.post_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, likeService_1.default.getPostLikes({ post_id: post_id })];
            case 2:
                postLikes = _a.sent();
                console.log(postLikes);
                res.status(200).json(postLikes);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "likeList api에서 오류가 발생했습니다.",
                };
                console.log(result_err);
                res.status(200).json(result_err);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// POST: 좋아요 생성/삭제
var likeClick = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, post_id, clickedlike, err_2, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.email;
                post_id = req.params.post_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, likeService_1.default.clickLike({
                        email: email,
                        post_id: post_id,
                    })];
            case 2:
                clickedlike = _a.sent();
                console.log(clickedlike);
                res.status(200).json(clickedlike);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "likeClick api에서 오류가 발생했습니다.",
                };
                console.log(result_err);
                res.status(200).json(result_err);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// api index
likeRouter.get("/post/:post_id", likeList); // 전체 좋아요 검섹
likeRouter.post("/post/:post_id", authMiddleware_1.default, likeClick); // 좋아요 생성/삭제
module.exports = likeRouter;
