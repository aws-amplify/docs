"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCallback = void 0;
const tslib_1 = require("tslib");
const aws_sdk_1 = require("aws-sdk");
const serverless_express_1 = require("@vendia/serverless-express");
const uuid_1 = require("uuid");
const isUUID_1 = tslib_1.__importDefault(require("validator/lib/isUUID"));
const isURL_1 = tslib_1.__importDefault(require("validator/lib/isURL"));
const escape_1 = tslib_1.__importDefault(require("validator/lib/escape"));
const dynamodb = new aws_sdk_1.DynamoDB.DocumentClient();
let tableName = 'submissionsTable';
if (process.env.ENV && process.env.ENV !== 'NONE') {
    tableName = tableName + '-' + process.env.ENV;
}
const userIdPresent = false;
const UNAUTH = 'UNAUTH';
const currentInvoke = (0, serverless_express_1.getCurrentInvoke)();
function postCallback(req, res) {
    if (userIdPresent) {
        req.body['userId'] =
            currentInvoke.event.requestContext.identity.cognitoIdentityId || UNAUTH;
    }
    const timestamp = new Date().toISOString();
    if (typeof req.body.vote === 'boolean' &&
        typeof req.body.page_path === 'string' &&
        (typeof req.body.comment === 'string' ||
            typeof req.body.comment === 'undefined') &&
        (0, isURL_1.default)(req.body.page_path)) {
        let id = (0, uuid_1.v4)();
        if (typeof req.body.id === 'string' && (0, isUUID_1.default)(req.body.id)) {
            id = req.body.id;
        }
        let putItemParams = {
            TableName: tableName,
            Item: {
                id: id,
                created: timestamp,
                vote: req.body.vote,
                page_path: req.body.page_path,
                comment: req.body.comment ? (0, escape_1.default)(req.body.comment) : undefined
            }
        };
        dynamodb.put(putItemParams, (err, data) => {
            if (err) {
                res.statusCode = 400;
                const dbError = 'Error saving feedback';
                res.json({ message: dbError });
            }
            else {
                res.json({
                    data: JSON.stringify({ id: putItemParams.Item.id })
                });
            }
        });
    }
    else {
        res.statusCode = 400;
        const invalidBody = 'Invalid body for creating feedback';
        res.json({ message: invalidBody });
    }
}
exports.postCallback = postCallback;
