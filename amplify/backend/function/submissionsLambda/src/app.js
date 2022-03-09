"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const tslib_1 = require("tslib");
const aws_sdk_1 = (0, tslib_1.__importDefault)(require("aws-sdk"));
const body_parser_1 = (0, tslib_1.__importDefault)(require("body-parser"));
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const SubmissionsController_1 = require("./controllers/SubmissionsController");
aws_sdk_1.default.config.update({ region: process.env.TABLE_REGION });
const path = '/submissions';
const app = (0, express_1.default)();
exports.app = app;
app.use(body_parser_1.default.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});
app.post(path, SubmissionsController_1.postCallback);
