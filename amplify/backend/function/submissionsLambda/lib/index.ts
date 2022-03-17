import "source-map-support/register";
import serverlessExpress from "@vendia/serverless-express";
import { app } from "./app";

let serverlessExpressInstance;

export const handler =  (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context);
}
