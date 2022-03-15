"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const SubmissionsController_1 = require("../SubmissionsController");
const node_mocks_http_1 = (0, tslib_1.__importDefault)(require("../../../src/node_modules/node-mocks-http"));
const aws_sdk_1 = require("../__mocks__/aws-sdk");
const db = new aws_sdk_1.DynamoDB.DocumentClient();
describe('Express app', () => {
    describe('Post feedback', () => {
        it('Should return 400 error when vote is not boolean', () => {
            const request = node_mocks_http_1.default.createRequest({
                method: 'POST',
                url: '/feedback',
                headers: {
                    'content-type': 'application/json'
                },
                body: {
                    vote: 1,
                    page_path: 'path'
                }
            });
            const response = node_mocks_http_1.default.createResponse();
            (0, SubmissionsController_1.postCallback)(request, response);
            expect(response.statusCode).toBe(400);
        });
        it('Should return 400 error when vote is not in body', () => {
            const request = node_mocks_http_1.default.createRequest({
                method: 'POST',
                url: '/feedback',
                headers: {
                    'content-type': 'application/json'
                },
                body: {
                    page_path: 'path'
                }
            });
            const response = node_mocks_http_1.default.createResponse();
            (0, SubmissionsController_1.postCallback)(request, response);
            expect(response.statusCode).toBe(400);
        });
        it('Should return 400 error when page_path is not a string', () => {
            const request = node_mocks_http_1.default.createRequest({
                method: 'POST',
                url: '/feedback',
                headers: {
                    'content-type': 'application/json'
                },
                body: {
                    vote: true,
                    page_path: 1
                }
            });
            const response = node_mocks_http_1.default.createResponse();
            (0, SubmissionsController_1.postCallback)(request, response);
            expect(response.statusCode).toBe(400);
        });
        it('Should return 400 error when page_path is not in body', () => {
            const request = node_mocks_http_1.default.createRequest({
                method: 'POST',
                url: '/feedback',
                headers: {
                    'content-type': 'application/json'
                },
                body: {
                    vote: true
                }
            });
            const response = node_mocks_http_1.default.createResponse();
            (0, SubmissionsController_1.postCallback)(request, response);
            expect(response.statusCode).toBe(400);
        });
        it('Should return 400 error when page_path is not a path', () => {
            const request = node_mocks_http_1.default.createRequest({
                method: 'POST',
                url: '/feedback',
                headers: {
                    'content-type': 'application/json'
                },
                body: {
                    vote: true,
                    page_path: "/test>/test/path/"
                }
            });
            const response = node_mocks_http_1.default.createResponse();
            (0, SubmissionsController_1.postCallback)(request, response);
            expect(response.statusCode).toBe(400);
        });
        it('Should call dynamodb put', async () => {
            const request = node_mocks_http_1.default.createRequest({
                method: 'POST',
                url: '/feedback',
                headers: {
                    'content-type': 'application/json'
                },
                body: {
                    vote: true,
                    page_path: '/path/to/page'
                }
            });
            const response = node_mocks_http_1.default.createResponse();
            await (0, SubmissionsController_1.postCallback)(request, response);
            expect(response.statusCode).toBe(200);
            expect(db.put).toHaveBeenCalled();
        });
    });
});
