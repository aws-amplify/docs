---
title: Configuring Lambda function settings
description: How to configure custom settings for your Lambda function
---

You may want to override the Amplify CLI default configurations for your Lambda function or configure changes not available within the `amplify add function` workflow.

*Example*: When creating a `Node.js` function, the CLI will automatically configure a runtime version, a default memory size, and more. There are a few things you may want to override or configure:

1. Runtime
2. Memory size
3. Environment variables

Let's look at how to update all of these things.

## Updating the Runtime

You may want to tweak the runtime version to be either a newer or older version than the Amplify-generated default.

Let's say we've deployed a Lambda function using a Node.js runtime and we want to modify the version of the runtime to be `14.x`.

To do so, open __amplify/backend/function/function-name/function-name-cloudformation-template.json__ and set the `Runtime` property in the `LambdaFunction` resource to:

```json
"Resources": {
  "LambdaFunction": {
      ...
      "Properties": {
        "Runtime": "nodejs14.x", // Runtime now set to 14.x
        "Layers": [],
      }
      ...
    }
  },
}
```

Next, deploy the updates using the Amplify CLI:

```sh
amplify push
```

## Updating the default memory size

When you deploy a function with Amplify, the default memory size will be set to a low setting (128MB). Often you will want to increase the default memory size in order to improve performance. A popular memory setting in Lambda is 1024MB as it speeds the function noticeably while usually keeping the cost the same or close to it.

To update the memory size, open __amplify/backend/function/function-name/function-name-cloudformation-template.json__ and set the `MemorySize` property in the `LambdaFunction` resource:

```json
"Resources": {
  "LambdaFunction": {
      ...
      "Properties": {
        "Runtime": "nodejs14.x",
        "MemorySize": "1024", // Memory size now set to 1024 mb
        "Layers": [],
      }
      ...
    }
  },
}
```

Next, deploy the updates using the Amplify CLI:

```sh
amplify push
```

_To learn more about optimizing resources allocation for Lambda functions, check out [this](https://dev.to/aws/deep-dive-finding-the-optimal-resources-allocation-for-your-lambda-functions-35a6) blog post._


## Setting an environment variable

A very common scenario is the need to set and use an environment variable in your Lambda function.

There are generally two types of environment variables:
- [Secret values (example: access keys, API keys etc.)](~/cli/function/secrets.md)
- [Non-secret values (example: endpoint information, locale information etc.)](~/cli/function/env-vars.md)

<amplify-callout>

To view all configuration options available in AWS Lambda, check out the documentation [here](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lambda-function-environment.html)

To learn more about extending the Amplify CLI with custom resources, check out the documentation [here](~/cli/usage/customcf.md)

</amplify-callout>
