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
var axios_1 = __importDefault(require("axios"));
var socialLoginService_1 = __importDefault(require("../services/socialLoginService"));
var socialLoginRouter = express.Router();
axios_1.default.interceptors.response.use(function (res) {
    return res.data;
}, function (err) {
    console.log(err);
    throw new Error("(!) axios error");
});
var makeFormData = function (params) {
    var searchParams = new URLSearchParams();
    Object.keys(params).forEach(function (key) {
        searchParams.append(key, params[key]);
    });
    return searchParams;
};
////////////////////////////////////////
/////////////  카  카  오  ///////////////
////////////////////////////////////////
// POST: kakao api 회원가입
var kakaoOauth = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var code, REST_API_KEY, REDIRECT_URI, kakaoToken_1, kakaoUser_1, access_token, email, logedinUser, err_1, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = req.body.code;
                REST_API_KEY = process.env.KAKAO_REST_API_KEY;
                REDIRECT_URI = process.env.KAKAO_REDIRECT_URL;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                kakaoToken_1 = "";
                return [4 /*yield*/, (0, axios_1.default)({
                        method: "POST",
                        headers: {
                            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                        },
                        url: "https://kauth.kakao.com/oauth/token",
                        data: makeFormData({
                            grant_type: "authorization_code",
                            client_id: REST_API_KEY,
                            redirect_uri: REDIRECT_URI,
                            code: code,
                        }),
                    })
                        .then(function (res) {
                        kakaoToken_1 = res;
                    })
                        .catch(function (err) {
                        console.log(err);
                    })];
            case 2:
                _a.sent();
                kakaoUser_1 = "";
                access_token = kakaoToken_1.access_token;
                return [4 /*yield*/, (0, axios_1.default)({
                        method: "GET",
                        headers: {
                            Authorization: "bearer ".concat(access_token),
                        },
                        url: "https://kapi.kakao.com/v1/oidc/userinfo",
                    })
                        .then(function (res) {
                        kakaoUser_1 = res;
                    })
                        .catch(function (err) {
                        console.log(err);
                    })];
            case 3:
                _a.sent();
                email = kakaoUser_1.email;
                return [4 /*yield*/, socialLoginService_1.default.kakao({ email: email, access_token: access_token })];
            case 4:
                logedinUser = _a.sent();
                console.log(logedinUser);
                res.status(200).json(logedinUser);
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "kakaoOauth api에서 오류가 발생했습니다.",
                };
                console.log(result_err);
                res.status(200).json(result_err);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
socialLoginRouter.post("/kakaoOauth", kakaoOauth);
module.exports = socialLoginRouter;
