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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import "dotenv/config";
// require("dotenv").config();
var authMiddleware = function (req, res, next
//   req: Request<{}>,
//   res: Response,
//   next: NextFunction
) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var userToken, result_errNoToken, secretKey, jwtDecoded, user_id, result_errInvalidToken;
        return __generator(this, function (_c) {
            userToken = (_b = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) !== null && _b !== void 0 ? _b : "null";
            // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열임.
            // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.
            if (userToken === "null") {
                result_errNoToken = {
                    result: false,
                    cause: "token",
                    message: "로그인한 유저만 사용할 수 있는 서비스입니다.",
                };
                console.log(result_errNoToken);
                return [2 /*return*/, res.status(400).json(result_errNoToken)];
            }
            // 해당 token 이 정상적인 token인지 확인 -> 토큰에 담긴 user_id 정보 추출
            try {
                secretKey = process.env.JWT_SECRET_KEY || "secret-key";
                jwtDecoded = jsonwebtoken_1.default.verify(userToken, secretKey);
                user_id = jwtDecoded.user_id;
                // console.log("미들웨어에서 토큰 확인: ", user_id);
                // req.email = email; // src/customType/express.d.ts에서 추가해주었다.
                req.body.user_id = user_id; // src/customType/express.d.ts에서 추가해주었다.
                next();
            }
            catch (error) {
                result_errInvalidToken = {
                    result: false,
                    cause: "token",
                    message: "정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.",
                };
                console.log(result_errInvalidToken);
                return [2 /*return*/, res.status(400).json(result_errInvalidToken)];
            }
            return [2 /*return*/];
        });
    });
};
module.exports = authMiddleware;
