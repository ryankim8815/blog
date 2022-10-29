"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var module_test_1 = require("test/module_test");
var app = (0, express_1.default)();
app.get("/", function (_, res) {
    return res.json({ msg: "Hello world" });
});
app.get("/home", function (_, res) {
    return res.sendFile("home.html", { root: path_1.default.resolve(__dirname, "./view") });
});
app.listen(8080, function () { return console.log("Boot server, ".concat(module_test_1.abc)); });
