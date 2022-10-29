"use strict";
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const app = (0, express_1.default)();
// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// 기본 페이지
app.get("/", (req, res) => {
    res.send("안녕하세요, 개발자A의 첫 개인 프로젝트입니다.");
});
module.exports = app;
//# sourceMappingURL=app.js.map