"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoDB = exports.awsSdkPromiseResponse = void 0;
exports.awsSdkPromiseResponse = jest.fn().mockReturnValue(Promise.resolve(true));
const putFn = jest.fn().mockImplementation(() => ({ promise: exports.awsSdkPromiseResponse }));
class DocumentClient {
    constructor() {
        this.put = putFn;
    }
}
exports.DynamoDB = {
    DocumentClient,
};
