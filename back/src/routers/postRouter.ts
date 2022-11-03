import * as express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadMiddleware";
import postService from "../services/postService";
// import asyncHandler from "../utils/asyncHandler";
import type { MulterFile } from "../customType/multer.d";
const postRouter = express.Router();

export = postRouter;
