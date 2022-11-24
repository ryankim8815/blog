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
// "use strict";
var nodemailer_1 = __importDefault(require("nodemailer"));
// async..await is not allowed in global scope, must use a wrapper
// async function main() {
var sendEmail = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var transporter, info, err_1, result_err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("email checking: ", req.body.email);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    transporter = nodemailer_1.default.createTransport({
                        host: "smtp.gmail.com",
                        port: 587,
                        secure: false,
                        //   service: "gmail",
                        auth: {
                            user: "dogfoot.info@gmail.com",
                            pass: "vjlixxgnouqbywtx", // generated ethereal password
                        },
                    });
                    return [4 /*yield*/, transporter.sendMail({
                            from: '"Chair Coach" <dogfoot.info@gmail.com>',
                            to: req.body.email,
                            subject: "ChairCoach에서 메일 확인을 위해 보내드립니다. ✔",
                            //   text: "Hello world?", // plain text body
                            html: "<b>Hello world?</b>\n            <h1>0000</h1> \n            <h3>\uC704\uC758 \uBC88\uD638\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.</h3>\n      ", // html body
                        })];
                case 2:
                    info = _a.sent();
                    console.log("Message sent: %s", info.messageId);
                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                    // Preview only available when sending through an Ethereal account
                    console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    result_err = {
                        result: false,
                        cause: "mail",
                        message: "mail 발송에 실패했습니다.",
                    };
                    console.log(result_err);
                    return [2 /*return*/, res.status(499).json(result_err)];
                case 4: return [2 /*return*/];
            }
        });
    });
};
module.exports = sendEmail;
