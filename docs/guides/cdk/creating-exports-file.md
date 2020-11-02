---
title: Creating a CDK exports file
description: Creating the exports file for consumption by Amplify
---

When using Amplify client libraries, you can consume resources from a CDK backend by creating a CDK exports file and then configuring Amplify to consume it.

### Creating the exports file

Using the CDK `CfnOutput` command, you can print out and the write to file the values from your CDK app that Amplify client libraries require.

For example, a CDK app that implements an AppSync API with multiple authorization types and a Cognito User Pool could use the following to print out the values:

```ts
new cdk.CfnOutput(this, "aws_user_pools_id", {
  value: userPool.userPoolId
});

new cdk.CfnOutput(this, "aws_user_pools_web_client_id", {
  value: client.userPoolClientId
});

new cdk.CfnOutput(this, "aws_appsync_graphqlEndpoint", {
  value: api.graphqlUrl
});

new cdk.CfnOutput(this, "aws_appsync_apiKey", {
  value: api.apiKey || ""
});
```

Then use the following command create the outputs JSON file:

```sh
cdk deploy -O cdk-exports.json
```

### Consuming the resources file

#### Using only a CDK backend

```js
import Amplify from "aws-amplify";
import { YourStackName } from "./cdk-exports";
Amplify.configure(YourStackName);
```

#### Combining a CDK backend and an Amplify backend

```js
import Amplify from "aws-amplify";
import { YourStackName } from "./cdk-exports";
import config from "./aws-exports";
Amplify.configure({
  ...config, ...YourStackName
});
```