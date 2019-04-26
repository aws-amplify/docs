#### Update Node.js Version for AWS Lambda
AWS Lambda anounced that it will deprecate its runtime support for Node.js 6.10  on April 30, 2019[[ref]](https://docs.aws.amazon.com/lambda/latest/dg/runtime-support-policy.html),
and it has started to support Node.js 8.10 [[ref]](https://aws.amazon.com/about-aws/whats-new/2018/04/aws-lambda-supports-nodejs/).

The Amplify CLI codebase has been udpated to reflect this change, if you use Amplify CLI version 1.6.5 and above
to create new aws resources, this does not concern you.

However, if you have used previous versions of the Amplify CLI to create aws resources in the following categories, 
you will need to manually update your project to avoid Node.js runtime issues with AWS Lambda. 
- analytics 
- auth
- function
- interactions

Before you make the following manual changes, thoroughly back up your project. 

After you make the following manual changes, run `amplify push` to update the AWS Lambda functions in the cloud. 

#### analytics
In the `<project-root>/amplify/backend/analytics/<resource-name>/pinpoint-cloudformation-template.json` file
1. replace `"Runtime": "nodejs6.10"` with `"Runtime": "nodejs8.10"`
2. search for `pinpoint.createApp(params).promise()`, and if there is a `return` in front of it, remove the `return`. 

#### auth
In the `<project-root>/amplify/backend/auth/<resource-name>/xxxxxxx-cloudformation-template.json` file
- replace `Runtime: nodejs6.10` with `Runtime: nodejs8.10`

#### function
In the `<project-root>/amplify/backend/function/<resource-name>/xxxxxxx-cloudformation-template.json` files
- replace `"Runtime": "nodejs6.10"` with `"Runtime": "nodejs8.10"`

#### interactions
In the `<project-root>/amplify/backend/interactions/<resource-name>/pinpoint-cloudformation-template.json` file

- replace `"Runtime": "nodejs6.10"` with `"Runtime": "nodejs8.10"`

In the `<project-root>/amplify/backend/interactions/<resource-name>/src/index.js` file

- search for `checkAndCreateLexServiceRole()`, and if there is a `return` in front of it, remove the `return`. 
