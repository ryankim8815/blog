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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express = __importStar(require("express"));
var likeController_1 = __importDefault(require("../controllers/likeController"));
var authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
var validation = __importStar(require("../middlewares/likeValidationMiddleware"));
var likeRouter = express.Router();
// api index
likeRouter.get("/post/:post_id/likes", validation.validateLikesByPostId, likeController_1.default.likeList); // 특정 게시물의 좋아요 리스트
likeRouter.post("/post/:post_id/like", authMiddleware_1.default, validation.validateLikeClick, likeController_1.default.likeClick); // 좋아요 생성/삭제
module.exports = likeRouter;
/**
 * @swagger
 * /post/{post_id}/likes:
 *   get:
 *     summary: 특정 게시물의 좋아요 리스트
 *     description: 비회원도 확인 가능합니다.(추후 비회원은 댓글을 못보게 하여 회원가입을 유도할 수도 있음)
 *     tags: ["likeRouter"]
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
 *                   example: 해당 게시물에 대한 좋아요 정보 조회가 성공적으로 이뤄졌습니다.
 *                 count:
 *                   type: int
 *                   example: 10000
 *                 list:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     nickname:
 *                       type: string
 *                   example:
 *                     - email: admin@dogfoot.info
 *                       nickname: admin
 *                     - email: admin2@dogfoot.info
 *                       nickname: admin2
 */
/**
 * @swagger
 * /post/{post_id}/like:
 *   post:
 *     summary: 좋아요 생성/삭제
 *     description: 로그인한 사용자만 가능합니다.
 *     tags: ["likeRouter"]
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
 *                   example: 좋아요 생성이 성공적으로 이뤄졌습니다.
 */
