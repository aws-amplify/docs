"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const tslib_1 = require("tslib");
require("source-map-support/register");
const serverless_express_1 = tslib_1.__importDefault(require("@vendia/serverless-express"));
const app_1 = require("./app");
let serverlessExpressInstance;
const handler = (event, context) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    serverlessExpressInstance = (0, serverless_express_1.default)({ app: app_1.app });
    return serverlessExpressInstance(event, context);
};
exports.handler = handler;
