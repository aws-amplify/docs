# Node Version Update
AWS Lambda deprecated its runtime support for Node.js 8.10 on December 31st, 2019[[ref]](https://docs.aws.amazon.com/lambda/latest/dg/runtime-support-policy.html),
and it has started to support Node.js 10.x [[ref]](https://aws.amazon.com/about-aws/whats-new/2019/05/aws_lambda_adds_support_for_node_js_v10/).

The Amplify CLI code base has been updated to reflect this change, if you use Amplify CLI version 4.12.0 and above
to create new aws resources, this does not concern you.

However, if you have used previous versions of the Amplify CLI to create aws resources in the following categories,
you will need to manually update your project to avoid Node.js runtime issues with AWS Lambda.
- analytics
- auth
- interactions

Before you make the following manual changes, please make sure to back up your entire project.

After you make the following manual changes, run `amplify push` to update the AWS Lambda functions in the cloud.

### analytics
In the `<project-root>/amplify/backend/analytics/<resource-name>/pinpoint-cloudformation-template.json` file
1. replace `"Runtime": "nodejs8.10"` with `"Runtime": "nodejs10.x"`
2. search for `pinpoint.createApp(params).promise()`, and if there is a `return` in front of it, remove the `return`.

### auth
In the `<project-root>/amplify/backend/auth/<resource-name>/xxxxxxx-cloudformation-template.yml` file
- replace `Runtime: nodejs8.10` with `Runtime: nodejs10.x`

### interactions
In the `<project-root>/amplify/backend/interactions/<resource-name>/xxxxxxx-cloudformation-template.json` file

- replace `"Runtime": "nodejs8.10"` with `"Runtime": "nodejs10.x"`

In the `<project-root>/amplify/backend/interactions/<resource-name>/src/index.js` file

- search for `checkAndCreateLexServiceRole()`, and if there is a `return` in front of it, remove the `return`.
