"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.postCallback = void 0;
const tslib_1 = require("tslib");
const aws_sdk_1 = (0, tslib_1.__importDefault)(require("aws-sdk"));
const serverless_express_1 = require("@vendia/serverless-express");
const body_parser_1 = (0, tslib_1.__importDefault)(require("body-parser"));
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const uuid_1 = require("uuid");
aws_sdk_1.default.config.update({ region: process.env.TABLE_REGION });
const dynamodb = new aws_sdk_1.default.DynamoDB.DocumentClient();
let tableName = 'submissionsTable';
if (process.env.ENV && process.env.ENV !== 'NONE') {
    tableName = tableName + '-' + process.env.ENV;
}
const userIdPresent = false;
const partitionKeyName = 'page_path';
const partitionKeyType = 'S';
const sortKeyName = 'created';
const sortKeyType = 'S';
const hasSortKey = sortKeyName !== '';
const path = '/submissions';
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';
const app = (0, express_1.default)();
exports.app = app;
app.use(body_parser_1.default.json());
const currentInvoke = (0, serverless_express_1.getCurrentInvoke)();
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});
const convertUrlType = (param, type) => {
    switch (type) {
        case 'N':
            return Number.parseInt(param);
        default:
            return param;
    }
};
app.get(path, function (req, res) {
    res.statusCode = 405;
    res.json({ error: 'Method is not allowed.' });
});
app.get(path + hashKeyPath + sortKeyPath, function (req, res) {
    res.statusCode = 405;
    res.json({ error: 'Method is not allowed.' });
});
app.put(path, function (req, res) {
    res.statusCode = 405;
    res.json({ error: 'Method is not allowed.' });
});
app.post(path, postCallback);
function postCallback(req, res) {
    if (userIdPresent) {
        req.body['userId'] =
            currentInvoke.event.requestContext.identity.cognitoIdentityId || UNAUTH;
    }
    const timestamp = new Date().toISOString();
    if (typeof req.body.vote === 'boolean' &&
        typeof req.body.page_path === 'string') {
        let id = (0, uuid_1.v4)();
        if (req.body.id && typeof req.body.id === 'string') {
            id = req.body.id;
        }
        let putItemParams = {
            TableName: tableName,
            Item: {
                id: id,
                created: timestamp,
                vote: req.body.vote,
                page_path: req.body.page_path
            }
        };
        dynamodb.put(putItemParams, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.json({ error: err, url: req.url, body: req.body });
            }
            else {
                res.json({
                    success: 'post call succeed!',
                    url: req.url,
                    data: JSON.stringify(putItemParams.Item)
                });
            }
        });
    }
    else {
        res.statusCode = 400;
        const invalidBody = 'Invalid body for creating feedback: "vote" should be a boolean and "page_path" should be a string.';
        res.json({ error: invalidBody, url: req.url, body: req.body });
    }
}
exports.postCallback = postCallback;
app.delete(path + hashKeyPath + sortKeyPath, function (req, res) {
    res.statusCode = 405;
    res.json({ error: 'Method is not allowed.' });
});
app.listen(3000, function () {
    console.log('App started');
});
