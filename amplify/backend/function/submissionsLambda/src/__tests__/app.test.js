"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = require("../app");
const node_mocks_http_1 = (0, tslib_1.__importDefault)(require("../../src/node_modules/node-mocks-http"));
describe('Express app', () => {
    describe('Post feedback', () => {
        it('Should return 400 error when vote is not boolean', () => {
            const request = node_mocks_http_1.default.createRequest({
                method: 'POST',
                url: '/feedback',
                headers: {
                    "content-type": "application/json"
                },
                body: {
                    vote: 1,
                    page_path: "path"
                }
            });
            const response = node_mocks_http_1.default.createResponse();
            (0, app_1.postCallback)(request, response);
            expect(response.statusCode).toBe(400);
        });
        it('Should return 400 error when vote is not in body', () => {
            const request = node_mocks_http_1.default.createRequest({
                method: 'POST',
                url: '/feedback',
                headers: {
                    "content-type": "application/json"
                },
                body: {
                    page_path: "path"
                }
            });
            const response = node_mocks_http_1.default.createResponse();
            (0, app_1.postCallback)(request, response);
            expect(response.statusCode).toBe(400);
        });
        it('Should return 400 error when path is not a string', () => {
            const request = node_mocks_http_1.default.createRequest({
                method: 'POST',
                url: '/feedback',
                headers: {
                    "content-type": "application/json"
                },
                body: {
                    vote: true,
                    page_path: 1
                }
            });
            const response = node_mocks_http_1.default.createResponse();
            (0, app_1.postCallback)(request, response);
            expect(response.statusCode).toBe(400);
        });
        it('Should return 400 error when path is not in body', () => {
            const request = node_mocks_http_1.default.createRequest({
                method: 'POST',
                url: '/feedback',
                headers: {
                    "content-type": "application/json"
                },
                body: {
                    vote: true
                }
            });
            const response = node_mocks_http_1.default.createResponse();
            (0, app_1.postCallback)(request, response);
            expect(response.statusCode).toBe(400);
        });
    });
});
