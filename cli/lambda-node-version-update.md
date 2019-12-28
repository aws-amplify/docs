# Node Version Update

## Node.js 8.10 to Node.js 10.x
According to AWS Lambda [Runtime Support Policy](https://docs.aws.amazon.com/lambda/latest/dg/runtime-support-policy.html), AWS Lambda deprecates Node.js 
runtime Node.js 8.10 on January 6th, 2020. 

The Amplify CLI code base has been updated to reflect this change. Amplify CLI replaces Node.js 8.10 with Node.js 10 in the Lambda functions that it creates for you. If you use Amplify CLI version 4.10.0 and above to create new aws resources, this does not concern you.

However, if you have used previous versions of the Amplify CLI to create aws resources in the following categories, 
you will need to manually update your project to avoid Node.js runtime issues with AWS Lambda. 
- auth
- interactions

Before you make the following manual changes, please make sure to back up your entire project. 

After you make the following manual changes, run `amplify push` to update the AWS Lambda functions in the cloud. 

### auth
Auth allows you to add/configure Lambda Triggers for cognito, such as PostAuthentication and PostConfirmation, etc.. 
The code base for those Lambda Triggers are places under `amplify/function/<prefix><TriggerName>/src`. 

In the index files for the Lambda Triggers, Located at `amplify/function/<prefix><TriggerName>/src/index.js`   

Replace 
```js
//...
const { handler } = require(`${modules[i]}`);
//...
```
With 
```js
//...
const { handler } = require(`./${modules[i]}`);
//...
```

### interactions
In the `<project-root>/amplify/backend/interactions/<resource-name>/src/index.js` file

Replace 
```js
const response = require('cfn-response');
//...
```
With
```js
const response = require('./cfn-response');
//...
```

### runtime string replacement
With the latest version of the Amplify CLI, when you execute any command on a project initialized by CLI version prior to 4.10.0, it will prompt for your confirmation, and then automatically does a global string replacement of `nodejs8.10` to `nodejs10.x` in all the CloudFormation template files under the `amplify/backend` folder. If you do not confirm, you will need to manually carry out such replacements. Just go to each category subdirectory, then each resource subdirectory under it, and locate the template file (it could be either `.yml` or `.json` file), the template file has `template` in its name. Then do a global string replacement of `nodejs8.10` to `nodejs10.x` in the file. 

## Node.js 6.10 to Node.js 8.10
AWS Lambda deprecated its runtime support for Node.js 6.10  on April 30th, 2019[[ref]](https://docs.aws.amazon.com/lambda/latest/dg/runtime-support-policy.html),
and it has started to support Node.js 8.10 [[ref]](https://aws.amazon.com/about-aws/whats-new/2018/04/aws-lambda-supports-nodejs/).

The Amplify CLI code base has been updated to reflect this change, if you use Amplify CLI version 1.6.5 and above
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
1. replace `"Runtime": "nodejs6.10"` with `"Runtime": "nodejs8.10"`
2. search for `pinpoint.createApp(params).promise()`, and if there is a `return` in front of it, remove the `return`. 

### auth
In the `<project-root>/amplify/backend/auth/<resource-name>/xxxxxxx-cloudformation-template.yml` file
- replace `Runtime: nodejs6.10` with `Runtime: nodejs8.10`

### interactions
In the `<project-root>/amplify/backend/interactions/<resource-name>/xxxxxxx-cloudformation-template.json` file

- replace `"Runtime": "nodejs6.10"` with `"Runtime": "nodejs8.10"`

In the `<project-root>/amplify/backend/interactions/<resource-name>/src/index.js` file

- search for `checkAndCreateLexServiceRole()`, and if there is a `return` in front of it, remove the `return`. 
