---
title: Quickstart
---
{% if jekyll.environment == 'production' %}
  {% assign base_dir = site.amplify.docs_baseurl %}
{% endif %}
{% assign media_base = base_dir | append: page.dir | append: "images" %}


# Quickstart

## Installation

The Amplify Command Line Interface (CLI) is a unified toolchain to create, integrate, and manage the AWS cloud services for your app.
* [Install Node.js®](https://nodejs.org/en/download/") and [NPM](https://www.npmjs.com/get-npm) if they are not already on your machine.
* Verify that you are running at least Node.js version 8.12 or greater and npm version 5.x or greater by running `node -v` and npm -v in a terminal/console window
* Install and configure the Amplify CLI.

```bash
$ npm install -g @aws-amplify/cli
$ amplify configure
```

<iframe width="600" height="345" src="https://www.youtube.com/embed/fWbM5DLh25U">
</iframe>

## Concepts

The Amplify CLI toolchain is designed to work with the [Amplify](https://github.com/aws-amplify/amplify-js) JavaScript library as well as the AWS Mobile SDKs for [iOS](https://github.com/aws/aws-sdk-ios/) and [Android](https://github.com/aws/aws-sdk-android). Resources in your AWS account that the Amplify CLI category commands create can be easily consumed by the corresponding Amplify library modules or native SDKs. <br/>
The Amplify CLI is written in Node.js. It has a pluggable architecture and can be easily extended with additional functionalities.
Click [here](plugins) for more details.


### Typical CLI workflow
The following commands should be executed inside your project root directory: 
1. `amplify init`
2. `amplify <category> add/remove`
3. `amplify push`
4. `amplify pull`

#### The init process
`$ amplify init` <br/>

The `init` command must be executed at the root directory of a project to initialize the project for the Amplify CLI to work with. 
The `init` command goes through the following steps: 
- Analyzes the project and confirms the frontend settings
- Carries out the initialization logic of the selected frontend
- If there are multiple provider plugins, prompts to select the plugins that will provide accesses to cloud resources
- Carries out, in sequence, the initialization logic of the selected plugin(s) 
- Insert amplify folder structure into the project's root directory, with the initial project configuration
- Generate the project metadata files, with the outputs of the above-selected plugin(s)
- Creates a cloud project in the [AWS Amplify Console](https://console.aws.amazon.com/amplify) to view and manage resources for all backend environments.

### Samples workflow
To set up a sample amplify project, execute the following command inside an empty directory:

`amplify init --app <github url>`

where the github url is a valid sample amplify project repository. Click [here](https://aws-amplify.github.io/docs/cli-toolchain/usage#--app) for more details.

### Common CLI commands
- `amplify <category> <subcommand>`
- `amplify push`
- `amplify pull`
- `amplify env <subcommand>`
- `amplify configure`
- `amplify console`
- `amplify delete`
- `amplify help`
- `amplify init`
- `amplify publish`
- `amplify run`
- `amplify status`

**Most categories have the following command structure**
- `amplify <category> add`
- `amplify <category> remove`
- `amplify <category> push`

### amplify init
During the init process, the root stack is created with three resources: 
- IAM role for unauthenticated users
- IAM role for authenticated users
- S3 bucket, the deployment bucket, to support this provider's workflow

The provider logs the information of the root stack and the resources into the project metadata file (amplify/backend/amplify-meta.json).
The root stack's template can be found in `amplify/backend/awscloudformation`.

### amplify add
Once init is complete, run the command `amplify add <category>` to add resources of a category to the cloud. This will place a CloudFormation template for the resources of this category in the category's subdirectory `amplify/backend/<category>` and insert its reference into the above-mentioned root stack as the nested child stack. When working in teams, it is good practice to run an `amplify pull` before modifying the backend categories.

### amplify push
Once you have made your category updates, run the command `amplify push` to update the cloud resources. The CLI will first upload the latest versions of the category nested stack templates to the S3 deployment bucket, and then call the AWS CloudFormation API to create / update resources in the cloud. Based upon the resources added/updated, the `aws-exports.js` file (for JS projects) and the `awsconfiguration.json` file (for native projects) gets created/updated.

### amplify pull
The `amplify pull` command operates similar to a *git pull*, fetching upstream backend environment definition changes from the cloud and updating the local environment to match that definition. The command is particularly helpful in team scenarios when multiple team members are editing the same backend, pulling a backend into a new project, or when connecting to [multiple frontend projects](#multiple-frontends) that share the same Amplify backend environment.

### amplify console
The `amplify console` command launches the browser directing you to your cloud project in the AWS Amplify Console. The Amplify Console provides a central location for development teams to view and manage their backend environments, status of the backend deployment, deep-links to the backend resources by Amplify category, and instructions on how to pull, clone, update, or delete environments.

### amplify configure project
The `amplify configure project` command is an advanced command and not commonly used for getting started or individual development projects. The command should be used to modify the project configuration present in the `.config/` directory and re-configuring AWS credentials (based on profile on your local machine) set up during the `amplify init` step. The `.config/` directory is generated in the `amplify/` directory, if not already present, and the `local-aws-info.json`, `local-env-info.json` and `project-info.json` files are configured to reflect the selections made as a part of the `amplify configure project` command.

## Category usage

### Auth Examples

The Amplify CLI supports configuring many different Authentication and Authorization workflows, including simple and advanced configurations of the login options, triggering Lambda functions during different lifecycle events, and administrative actions which you can optionally expose to your applications.

#### Configuring auth without social providers

The easiest way to get started is to leverage the default configuration which is optimized for the most common use cases and choices.

```terminal
$ amplify add auth     ##"amplify update auth" if already configured

Do you want to use the default authentication and security configuration? 
❯ Default configuration 
  Default configuration with Social Provider (Federation) 
  Manual configuration 
  I want to learn more.
```

#### Configuring auth with social providers

Once your User Pool is functioning, you can enable more configurations such as federation with Facebook, Google, or Login with Amazon. You can also configure more advanced settings by selecting *Manual Configuration*.

```terminal
$ amplify add auth     ##"amplify update auth" if already configured
```
Select Default configuration with Social Provider (Federation):

```terminal
Do you want to use the default authentication and security configuration? 
  Default configuration 
❯ Default configuration with Social Provider (Federation) 
  Manual configuration 
  I want to learn more.
```

#### Group management

You can create logical Groups in Cognito User Pools and assign permissions to access resources in Amplify categories with the CLI, as well as define the relative precedence of one group to another. This can be useful for defining which users should be part of "Admins" vs "Editors", and if the users in a Group should be able to just write or write & read to a resource (AppSync, API Gateway, S3 bucket, etc). [You can also use these with `@auth` Static Groups in the GraphQL Transformer]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/cli-toolchain/graphql#static-group-authorization). Precedence helps remove any ambiguity on permissions if a user is in multiple Groups.

```terminal
$ amplify add auth
❯ Manual configuration

Do you want to add User Pool Groups? (Use arrow keys)
❯ Yes

? Provide a name for your user pool group: Admins
? Do you want to add another User Pool Group Yes
? Provide a name for your user pool group: Editors
? Do you want to add another User Pool Group No
? Sort the user pool groups in order of preference …  (Use <shift>+<right/left> to change the order)
  Admins
  Editors
```

When asked as in the example above, you can press `Shift` on your keyboard along with the **LEFT** and **RIGHT** arrows to move a Group higher or lower in precedence. Once complete you can open `./amplify/backend/auth/userPoolGroups/user-pool-group-precidence.json` to manually set the precedence.

#### Group access controls
For certain Amplify categories you can restrict access with CRUD (Create, Read, Update, and Delete) permissions, setting different access controls for authenticated users vs Guests (e.g. Authenticated users can read & write to S3 buckets while Guests can only read). You can further restrict this to apply different permissions conditionally depending on if a logged-in user is part of a specific User Pool Group.

```terminal
$amplify add storage  # Select content

? Restrict access by? (Use arrow keys)
  Auth/Guest Users 
  Individual Groups 
❯ Both 
  Learn more 

Who should have access?
❯ Auth and guest users

What kind of access do you want for Authenticated users? 
❯ create/update, read

What kind of access do you want for Guest users? 
❯ read

Select groups: 
❯ Admins

What kind of access do you want for Admins users? 
❯ create/update, read, delete
```

The above example uses a combination of permissions where users in the "Admins" Group have full access, Guest users can only read, and users whom are not a member of any specific Group are part of the "Authenticated" users whom have create, update, and read access. Amplify will configure the corresponding IAM policy on your behalf. Advanced users can additionally set permissions by adding a `customPolicies` key to `./amplify/backend/auth/userPoolGroups/user-pool-group-precidence.json` with custom IAM policy for a Group. This will attach an inline policy on the IAM role associated to this Group during deployment. **Note**  this is an advanced feature and only suitable if you have an understanding of AWS resources. For instance perhaps you wanted users in the "Admins" group to have the ability to Create an S3 bucket:

```json
[
    {
        "groupName": "Admins",
        "precedence": 1,
        "customPolicies": [{
          "PolicyName": "admin-group-policy",
        	"PolicyDocument": {
            "Version":"2012-10-17",
            "Statement":[
                {
                  "Sid":"statement1",
                  "Effect":"Allow",
                  "Action":[
                      "s3:CreateBucket"
                  ],
                  "Resource":[
                      "arn:aws:s3:::*"
                  ]
                }
             ]
         	}
        }]
    },
    {
        "groupName": "Editors",
        "precedence": 2
    }
]
```

#### Administrative Actions

In some scenarios you may wish to expose Administrative actions to your end user applications. For example, the ability to list all users in a Cognito User Pool may provide useful for the administrative panel of an app if the logged-in user is a member of a specific Group called "Admins". 

This is an advanced feature that is not recommended without an understanding of the underlying architecture. The associated infrastructure which is created is a base designed for you to customize for your specific business needs. We recommend removing any functionality which your app does not require.
{: .callout .callout--warning}

The Amplify CLi can setup a REST endpoint with secure access to a Lambda function running with limited permissions to the User Pool if you wish to have these capabilities in your application, and you can choose to expose the actions to all users with a valid account or restrict to a specific User Pool Group.

```terminal
$ amplify add auth
# Choose default or manual

? Do you want to add an admin queries API? Yes
? Do you want to restrict access to a specific Group Yes
? Select the group to restrict access with: (Use arrow keys)
❯ Admins 
  Editors 
  Enter a custom group 
```

This will configure an API Gateway endpoint with a Cognito Authorizer that accepts an Access Token, which is used by a Lambda function to perform actions against the User Pool. The function is example code which you can use to remove, add, or alter functionality based on your business case by editing it in the `./amplify/backend/function/AdminQueriesXXX/src` directory and running an `amplify push` to deploy your changes. If you choose to restrict actions to a specific Group, custom middleware in the function will prevent any actions unless the user is a member of that Group.

The default routes and their functions, HTTP methods, and expected parameters are below
- `addUserToGroup`: Adds a user to a specific Group. Expects `username` and `groupname` in the POST body.
- `removeUserFromGroup`: Adds a user to a specific Group. Expects `username` and `groupname` in the POST body.
- `confirmUserSignUp`: Adds a user to a specific Group. Expects `username` in the POST body.
- `disableUser`: Adds a user to a specific Group. Expects `username` in the POST body.
- `enableUser`: Adds a user to a specific Group. Expects `username` in the POST body.
- `getUser`: Adds a user to a specific Group. Expects `username` as a GET query string.
- `listUsers`: Adds a user to a specific Group. You can provide an OPTIONAL `limit` as a GET query string, which returns a `NextToken` that can be provided as a `token` query string for pagination.
- `listGroupsForUser`: Adds a user to a specific Group. Expects `username` as a GET query string. You can provide an OPTIONAL `limit` as a GET query string, which returns a `NextToken` that can be provided as a `token` query string for pagination.
- `listUsersInGroup`: Adds a user to a specific Group. Expects `groupname` as a GET query string. You can provide an OPTIONAL `limit` as a GET query string, which returns a `NextToken` that can be provided as a `token` query string for pagination.
- `signUserOut`: Signs a user out from User Pools, but only if the call is originating from that user. Expects `username` in the POST body.

To leverage this functionality in your app you would call the appropriate route in your [JavaScript]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/api#using-rest), [iOS]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/ios/api#cognito-user-pools-authorization), or [Android]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}http://127.0.0.1:4000/android/api#cognito-user-pools-authorization) application after signing in. For example to add a user "richard" to the Editors Group and then list all members of the Editors Group with a pagination limit of 10 you could use the following React code below:

```jsx
import React from 'react'
import Amplify, { Auth, API } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

async function addToGroup() { 
  let apiName = 'AdminQueries';
  let path = '/addUserToGroup';
  let myInit = {
      body: {
        "username" : "richard",
        "groupname": "Editors"
      }, 
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      } 
  }
  return await API.post(apiName, path, myInit);
}


let nextToken;

async function listEditors(limit){
  let apiName = 'AdminQueries';
  let path = '/listUsersInGroup';
  let myInit = { 
      queryStringParameters: {
        "groupname": "Editors",
        "limit": limit,
        "token": nextToken
      },
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
  }
  const { NextToken, ...rest } =  await API.get(apiName, path, myInit);
  nextToken = NextToken;
  return rest;
}

function App() {
  return (
    <div className="App">
      <button onClick={addToGroup}>Add to Group</button>
      <button onClick={() => listEditors(10)}>List Editors</button>
    </div>
  );
}

export default withAuthenticator(App, true);
```

#### Adding a Lambda Trigger

Lambda triggers are useful for adding functionality during certain lifecycles of the user registration and sign-in process of your application. Amplify ships common trigger templates which you can enable and modify (if necessary) through a few simple questions. Alternatively, you can build your own auth challenges manually.

There are two ways to setup Lambda Triggers for your Cognito User Pool.

1. In the default Auth CLI workflow, you will be presented with a list of Lambda Trigger templates if you opt to configure advanced settings:

```bash
$ Do you want to enable any of the following capabilities?
  ❯ ◯ Add Google reCaptcha Challenge
    ◯ Email Verification Link with Redirect
    ◯ Add User to Group
    ◯ Email Domain Filtering (blacklist)
    ◯ Email Domain Filtering (whitelist)
    ◯ Custom Auth Challenge Flow (basic scaffolding - not for production)
    ◯ Override ID Token Claims
```

2.  In the manual Auth CLI workflow, you will be given the chance to select the options above, but will also be able to manually configure Lambda Trigger templates:

```bash
$ Do you want to configure Lambda Triggers for Cognito? Yes

$ Which triggers do you want to enable for Cognito?
◯ Learn More
 ──────────────
 ◯ Create Auth Challenge
❯◉ Custom Message
 ◯ Define Auth Challenge
 ◯ Post Authentication
 ◯ Post Confirmation
 ◯ Pre Sign-up
 ◯ Verify Auth Challenge Response
 ◯ Pre Token Generation

$ What functionality do you want to use for Custom Message
 ◯ Learn More
 ──────────────
❯◉ Send Account Confirmation Link w/ Redirect
 ◯ Create your own module
```

If your manually-configured Lambda Triggers require enhanced permissions, you can run `amplify function update` after they have been initially configured.

##### Available Cognito Trigger Templates

The pre-populated templates provided by the Amplify CLI can be found [here]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/cli-toolchain/cognito-triggers#auth-templates).

### API Examples
#### REST

**REST endpoints which enables CRUD operations on an Amazon DynamoDB table** <br />
During the CLI setup, you'll be guided through to create a new Lambda function with a predefined [serverless-express](https://github.com/awslabs/aws-serverless-express) template with routing enabled for your REST API paths with support for CRUD operations to DynamoDB tables (which you can create by following the CLI prompts or use the tables which you've already configured using the `amplify add storage` command).

```terminal
$ amplify add api
? Please select from one of the below mentioned services REST
? Provide a friendly name for your resource to be used as a label for this category in the project: myRESTAPI
? Provide a path (e.g., /items) /items
? Choose a Lambda source Create a new Lambda function
? Provide a friendly name for your resource to be used as a label for this category in the project: betatest1d2654ef
? Provide the AWS Lambda function name: betatest1d2654ef
? Choose the function template that you want to use: 
❯ CRUD function for Amazon DynamoDB table (Integration with Amazon API Gateway and Amazon DynamoDB) 
  Serverless express function (Integration with Amazon API Gateway) 
```

**REST endpoints that triggers Lambda functions with a predefined simple serverless-express template** <br />
During the CLI setup, you'll be guided through to create a new Lambda function with a predefined [serverless-express](https://github.com/awslabs/aws-serverless-express) template with routing enabled for your REST API paths.

```terminal
$ amplify add api
? Please select from one of the below mentioned services REST
? Provide a friendly name for your resource to be used as a label for this category in the project: myRESTAPI
? Provide a path (e.g., /items) /items
? Choose a Lambda source Create a new Lambda function
? Provide a friendly name for your resource to be used as a label for this category in the project: betatest1d2654ef
? Provide the AWS Lambda function name: betatest1d2654ef
? Choose the function template that you want to use: 
  CRUD function for Amazon DynamoDB table (Integration with Amazon API Gateway and Amazon DynamoDB) 
❯ Serverless express function (Integration with Amazon API Gateway) 
```

**REST endpoints backed up by custom lambda function present in the current Amplify project** <br />
During the CLI setup, you'll be guided through to use your own Lambda functions which you've initialized as a part of your CLI project using the `amplify add function` command. This would allow you to have custom logic in your Lambda function and not use the predefined [serverless-express](https://github.com/awslabs/aws-serverless-express) templates generated by the CLI as in the examples above.

```terminal
$ amplify add api
? Please select from one of the below mentioned services REST
? Provide a friendly name for your resource to be used as a label for this category in the project: myRESTAPI
? Provide a path (e.g., /items) /items
? Choose a Lambda source 
  Create a new Lambda function 
❯ Use a Lambda function already added in the current Amplify project 
```
#### GraphQL 
You can spin up a GraphQL API via the Amplify CLI with the following flow:
```terminal
$ amplify add api
? Please select from one of the below mentioned services (Use arrow keys)
❯ GraphQL 
  REST
```
To learn more, take a look at the [GraphQL Transformer docs]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/cli-toolchain/graphql#quick-start).


### Functions Examples

You can add a Lambda function to your project which you can alongside a REST API or as a datasource, as a part of your GraphQL API using the @function directive. 
```terminal
$ amplify add api
? Provide a friendly name for your resource to be used as a label for this category in the project: lambdafunction
? Provide the AWS Lambda function name: lambdafunction
? Choose the function template that you want to use: (Use arrow keys)
❯ Hello world function 
  CRUD function for Amazon DynamoDB table (Integration with Amazon API Gateway and Amazon DynamoDB) 
  Serverless express function (Integration with Amazon API Gateway) 
```
* The `Hello World function` would create a basic hello world Lambda function
* The `CRUD function for Amazon DynamoDB table (Integration with Amazon API Gateway and Amazon DynamoDB)` function would add a predefined [serverless-express](https://github.com/awslabs/aws-serverless-express) Lambda function template for CRUD operations to DynamoDB tables (which you can create by following the CLI prompts or use the tables which you've already configured using the `amplify add storage` command)
* The `Serverless express function (Integration with Amazon API Gateway) ` would add a predefined [serverless-express](https://github.com/awslabs/aws-serverless-express) Lambda function template with routing enabled for your REST API paths.

You can update the Lambda execution role policies for your function to access other resources generated and maintained by the CLI, using the CLI

```terminal
$ amplify update api
Please select the Lambda Function you would want to update: lambdafunction
? Do you want to update permissions granted to this Lambda function to perform on other resources in your project? Yes
? Select the category (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◉ api
 ◯ function
 ◯ storage
 ◯ auth
? Select the operations you want to permit for betatest (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◉ create
 ◯ read
 ◯ update
 ◯ delete

You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiBetatestGraphQLAPIIdOutput = process.env.API_BETATEST_GRAPHQLAPIIDOUTPUT
var apiBetatestGraphQLAPIEndpointOutput = process.env.API_BETATEST_GRAPHQLAPIENDPOINTOUTPUT

```

Behind the scenes, the CLI automates populating of the resource identifiers for the selected resources as Lambda environment variables which you will see in your function code as well. This process additionally configures CRUD level IAM policies on the Lambda execution role to access these resources from the Lambda function. For instance, you might grant permissions to your Lambda function to read/write to a DynamoDB table in the Amplify project by using the above flow and the appropriate IAM policy would be set on that Lambda function's execution policy which is scoped to that table only.

#### GraphQL from Lambda

You can use a Lambda function to call your GraphQL API. For example, deploy a simple `Todo` model with the following schema in the `amplify add api` flow:

```
type Todo @model @auth (
    rules: [
        { allow: private, provider: iam, operations: [create] }
    ]
) {
  id: ID!
  name: String
  description: String
}
```

In the above example we want your Lambda function to have access to run a single mutation (`createTodo`) and hence we explicitly mention `create` in the `operations` list. To grant access for application users to perform other actions, you can add `read`, `update` or `delete` to the `operations` list along with `create`.

Save your changes and create a Lambda function with `amplify add function` and make sure to add access for your GraphQL API when prompted for in the `amplify add function` flow. The CLI would automatically configure the Lambda execution IAM role required by the Lambda function to call the GraphQL API. The following function will sign the request and use environment variables for the AppSync and Region that `amplify add function` created for you.

```javascript
const https = require('https');
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl = process.env.API_BACKENDGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const graphqlQuery = require('./query.js').mutation;
const apiKey = process.env.API_KEY;

exports.handler = async (event) => {
    const req = new AWS.HttpRequest(appsyncUrl, region);

    const item = {
        input: {
            name: "Lambda Item",
            description: "Item Generated from Lambda"
        }
    };

    req.method = "POST";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "application/json";
    req.body = JSON.stringify({
        query: graphqlQuery,
        operationName: "createTodo",
        variables: item
    });

    if (apiKey) {
        req.headers["x-api-key"] = apiKey;
    } else {
        const signer = new AWS.Signers.V4(req, "appsync", true);
        signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
    }

    const data = await new Promise((resolve, reject) => {
        const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
            result.on('data', (data) => {
                resolve(JSON.parse(data.toString()));
            });
        });

        httpRequest.write(req.body);
        httpRequest.end();
    });

    return {
        statusCode: 200,
        body: data
    };
};
```

Finally you can define the GraphQL operation you're running, in this case the `createTodo` mutation, in a separate `query.js` file:

```javascript
module.exports = {
    mutation: `mutation createTodo($input: CreateTodoInput!) {
      createTodo(input: $input) {
        id
        name
        description
      }
    }
    `
}
```

### Storage Examples

#### S3 Lambda Triggers

You can associate a trigger to an S3 bucket managed by the Amplify CLI, by following the `amplify add/update storage` flows. When attempting to add/update an S3 storage resource, you would get the following CLI prompts to add a trigger for it.

```bash
? Do you want to add a Lambda Trigger for your S3 Bucket? Yes
? Select from the following options 
❯ Choose an existing function from the project 
  Create a new function 
```
As you can see in the prompt above, you can either choose to use an existing Lambda function created using the CLI as a part of this project using `amplify add function` or create a new function with a base Lambda function to handle S3 events. We also auto-populate the IAM policies required by the Lambda execution role of the newly created function to access the S3 bucket.

***Note***: You can associate only one Lambda Function trigger to an S3 bucket.

#### DynamoDB Lambda Triggers

You can associate a Lambda trigger with a DynamoDB table, managed by the Amplify CLI, using the amplify add/update storage flows. When attempting to add/update a DynamoDB storage resource, you would get the following CLI prompts to add a trigger for it.

```bash
? Do you want to add a Lambda Trigger for your Table? Yes
? Select from the following options (Use arrow keys)
❯ Choose an existing function from the project 
  Create a new function
```

As you can see in the prompt above, you can either choose to use an already existing Lambda function created using the CLI as a part of this project using `amplify add function` or create a new function with a base Lambda function handle DynamoDB events.

***Note***: You can associate more than one Lambda Function trigger to a DynamoDB table.

## Mocking and Testing

It is highly recommended that you complete the Getting Started section of Amplify setup before using local mocking.

- [JavaScript Getting Started](../js/start)
- [Android Getting Started](../android/start)
- [iOS Getting Started](../ios/start)

Amplify supports running a local server for mocking and testing your application before pushing to the cloud with certain categories, including API (AWS AppSync), Storage (Amazon DynamoDB and Amazon S3), Functions (AWS Lambda), and Hosting. After running `amplify init` you can run the following to start a mock server:

```terminal
$ amplify mock
```

Amplify libraries when configured for these categories can use the local mocked endpoints for testing your application. When a mock endpoint is running the CLI will update your `aws-exports.js` or `awsconfiguration.json` to use the mock server. After the mock server is stopped they will be updated to use the cloud endpoint after you have run an `amplify push`. For more details [see the usage section](./usage#mocking-and-testing).

## Custom Cloudformation Stacks

The Amplify CLI provides escape hatches for modifying the backend configurations generated in the form of Cloudformation templates by the CLI. This allows you to use the CLI for common flows but also any advanced scenarios which aren't provided in the standard category workflows.

* For your GraphQL API generated by the Amplify CLI, you have the ability to [override resolvers]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/cli-toolchain/graphql#overwriting-resolvers) as well as add your own [custom resolvers]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/cli-toolchain/graphql#overwriting-resolvers) to add on to the CLI generated Cloudformation stacks. 

* For majority of the other categories, you can locally edit and manage the Cloudformation file generated by the CLI in the `amplify/backend/<category>/<cloudformation-template.json/yml>` location. [Read more about Cloudformation](https://aws.amazon.com/cloudformation/)

* For adding and deploying a Cloudformation stack for an AWS Service not supported by the Amplify CLI currently, go through the following steps:

1. Modify `amplify/backend/backend-config.json` in your project:
```
{
  "<custom-category-name>": {
    "<custom-resource-name>": {
      "service": <custom-aws-service-name>,
      "providerPlugin": "awscloudformation"
    }
  },
  "hosting": {
    "S3AndCloudFront": {
      "service": "S3AndCloudFront",
      "providerPlugin": "awscloudformation"
    }
  }
}
```

Note: You can also reference an output value from any other Amplify managed category cloudformation stack. For example, if you want to use the Amazon Cognito `userpool ID` generated by the `auth` category stack in your custom cloudformation stack, you would need to add the `dependsOn` block in the `backend-config.json` file, The above `backend-config.json` file would look like the following:

```javascript
{
  "<custom-category-name>": {
    "<custom-resource-name>": {
      "service": <custom-aws-service-name>,
      "providerPlugin": "awscloudformation",
      "dependsOn": [
	{
         "category": "auth",
	 "resourceName": "mycognitoresource", // check `amplify status` to find resource name
	 "attributes": [
	    "UserPoolId" // Check Output Value of the resource specific cloudformation file to find available attributes
	  ]
	}
     ]
    }
  },
  "hosting": {
    "S3AndCloudFront": {
      "service": "S3AndCloudFront",
      "providerPlugin": "awscloudformation"
    }
  }
}
```

To use the above mentioned attribute `UserPoolId` from the auth category in your custom cloudformation stack, you would need to construct the following input parameter. The CLI will be passing this input automatically from the other nested stack.

```javascript
"Parameters": {
  // Rest of the paramters
 
  "authmycognitoresourceUserPoolId": { // The format out here is `<category><resource-name><attribute-name>` - we have defined all of these in the `backend-config.json` file above
	 "Type": "String"
 }
},
```



2. Under `amplify/backend` folder, make a folder structure like the following:
  ```
  amplify
    \backend
      \<custom-category-name>
        \<custom-resource-name>
          parameters.json
          template.json
      \hosting
        parameters.json
        template.json
  ```
  `template.json` is a cloudformation template, and `parameters.json` is a json file of parameters that will be passed to the cloudformation template. Additionally, the `env` parameter will be passed in to your cloudformation templates dynamically by the CLI.

3. Run `amplify env checkout <current-env-name>` to populate the CLI runtime files and make it aware of the newly added custom resources


## Multiple Frontends

Use the `amplify pull` command to share the same Amplify backend across multiple frontends (e.g, a React and Android app). Users have an option to pull the entire backend definition (infrastructure templates and metadata) or only the metadata (e.g. the `aws-exports.js` or `amplifyconfiguration.json` file) required to connect to the backend. If you’re building a mobile and web app in separate repositories, the recommended workflow is to keep the backend definition (the amplify folder) in only one of the repositories and pull the metadata (the `aws-exports` or `amplifyconfiguration.json` file) in the second repository to connect to the same backend.

### Workflow

This workflow outlines the steps required to share a backend across two (or more) frontends. This example scenario is for a team building an Android and React app.

![Image]({{media_base}}/multiple-frontends.png)

1. Initialize a backend for your React app. This will create an Amplify project and backend environment that is accessible in the Amplify Console (by running `amplify console`). 

    ```bash
    $ cd my-react-app
    $ amplify init
        ? Enter a name for the project: ecommerce
        ? Choose the type of app that you're building: react
    $ amplify add api
    $ amplify push
    ```
2. Make your frontend changes and commit the code to Git. Your Git repository now stores the `amplify` folder which contains the definition of your infrastructure.

3. Reference the backend from your Android app using the `amplify pull` command. Choose 'No' when asked if you want to modify or add new categories to your backend. This will put the `amplifyconfiguration` to your src folder only. Choosing 'Yes' will work, however your backend definition will now be stored in two separate repositories leading to unintended consequences with multiple sources of truth. 

    ```bash
    $ cd my-android-app
    $ amplify pull
        ? Which app are you working on?
          > ecommerce
            mysecretproject
        ? Choose the type of app that you're building: android
        ? Do you plan on modifying this backend?: n
      Successfully pulled backend environment dev from the cloud.
      Run 'amplify pull' to sync upstream changes.
    ```

## Environments and Teams
### Concepts

When you initialize a project, you create an Amplify backend environment. Every Amplify backend environment is a container for the categories added to your project. To deploy updates to an environment, run `amplify push`. In teams where multiple members are working on the same backend, it is good practice to run `amplify pull` to fetch changes from upstream before beginning work on new backend features. View the list of backend environments in your cloud project by visiting the [Amplify Console](https://console.aws.amazon.com/amplify).

For multiple environments, Amplify matches the standard Git workflow where you switch between different branches using the `env checkout` command - similar to running `git checkout BRANCHNAME`, run `amplify env checkout ENVIRONMENT_NAME` to switch between environments. The diagram below shows a workflow of how to initialize new environments when creating new git branches.

![Image]({{media_base}}/AmplifyEnvSwitching.jpg)

You can independently add features to each environment which allows you to develop and test before moving them to different stages. Using the same example above of **Dev** being the base which **Test** and **Prod** were derived, you could add (or remove) features and merge & deploy accordingly once you are comfortable with your setup.

![Image]({{media_base}}/AmplifyEnvAddDeploy.jpg)

This can be done in an iterative manner as you work through your deployment pipeline:

![Image]({{media_base}}/AmplifyEnvAddDeploySwitching.jpg)

Multiple developers on a team can also share and manipulate the environment as well by using the credentials in the account. For instance suppose they wanted to test a change to the API without impacting the **Test** or **Prod** deployments. This will allow them to test the configured resources and, if they have been granted appropriate CloudFormation permissions, they can push resources as well to the backend with `amplify push`.

![Image]({{media_base}}/AmplifyEnvMultDevelopers.jpg)

You can alternatively, have developers setup their own isolated replica of these environments in different AWS account. To do this simply:
1. Clone the existing project
2. Run `amplify env add` and set up a new environment (e.g. "mydev") with that developer's account and AWS profile
3. Deploy with `amplify push`

This workflow can be used to share complete Amplify projects with people outside of your organization as well by committing the project into a Git repository. If you are doing this remove (or add to the .gitignore) the **team-provider-info.json** which is located in the `amplify` directory. You can learn more about this file [here](#teamprovider).

### Continuous deployment and Hosting

The Amplify CLI supports basic web application hosting with Amazon S3 and CloudFront. You can use the multi-environments feature with the Amplify Console for a fully managed web application hosting and continuous deployment solution. For more information please learn more in the [official documentation](https://docs.aws.amazon.com/amplify/latest/userguide/multi-environments.html).

### Setting up master and dev environments 

Create a Git repository for your project if you haven't already. It is recommended managing separate Git branches for different environments (try to have the same branch name as your environment name to avoid confusion).
From the root of your project, execute the following commands:

```
$ amplify init
? Enter a name for the environment master
// Provide AWS Profile info
// Add amplify categories using `amplify add <category>`
$ git init
$ git add <all project related files>
$ git commit -m "Creation of a master amplify environment"
$ git remote add origin git@github.com:<repo-name>
$ git push -u origin master
```

**Note**: When you initialize a project using the Amplify CLI, it appends (if a gitignore file exists at the root of the project) or creates one for you (if a gitignore file doesn't exist at the root of your project), with a list of recommended files to check in from the Amplify CLI generated list of files, into your Git repository.

Once you have your 'master' branch setup in Git, set up a 'dev' environment in your Amplify project (which would be based on your 'master' environment), and then walk through the following steps to create a corresponding git branch for it.

```
$ amplify env add
? Do you want to use an existing environment? No
? Enter a name for the environment dev
// Provide AWS Profile info
```

This will set up another environment for the project in the cloud. The backend-configs and resources are now cloned from the 'master' environment. Run `amplify push` to provision all the AWS resources for your new environment (dev).

Now push the changes to the 'master' branch (you would just see changes to the team-provider-info.json file - when running a `git status` command, which has cumulative stack information for all the project environments which are useful when you want to share the same backend within a team). After this, let's create a new git branch - 'dev' corresponding to the new environment we just created.

```
$ git add .
$ git commit -m "Creation of a dev amplify environment"
$ git push -u origin master
$ git checkout -b dev
$ git push -u origin dev
```

### Team workflow

#### Sharing a backend environment within a team
There are two ways to work with Amplify backend environments within a team:
1. Team members working on their own sandbox environments (Recommended)
2. Team-members sharing the same dev backend to work on 

##### Team-members working on their own sandbox environments (Recommended)
Now you have two independent environments (master & dev) in the cloud and have corresponding git branches with your amplify backend infrastructure code on Git. Suppose a team member wants to work on the same Amplify project, add some features to it and then push changes to the dev environment to test some changes. They would perform the following steps:

```
$ git clone <git-repo>
$ cd <project-dir>
$ git checkout -b mysandbox
$ amplify env add
? Do you want to use an existing environment? No
? Enter a name for the environment mysandbox
// Rest of init steps
// Add/update any backend configurations using amplify add/update <category>
$ amplify push
$ git push -u origin mysandbox
```

Next, suppose the team-member wants to move these changes to dev and master environments/branches: 

```
$ git checkout dev
$ amplify env checkout dev
$ git merge mysandbox
$ amplify push
$ git push -u origin dev
```

After testing that everything works fine in the dev stage, you could now merge dev to the master git branch:

```
$ git checkout master
$ amplify env checkout master
$ git merge dev
$ amplify push
$ git push -u origin master
```

In this approach, you can consider the git branches (dev & master) as the source of truth and all the team members should work off the branches and keep their workspaces in sync.

##### Team-members sharing the same dev backend 
You have two independent environments (master & dev) in the cloud and have corresponding git branches with your amplify backend infrastructure code on Git. Suppose all team members want to work on the same Amplify project and push backend related changes to the same dev environment to test their changes. Each team member would run the following:

```
$ git clone <git-repo>
$ cd <project-dir>
$ git checkout dev
$ amplify init
? Do you want to use an existing environment? Yes
? Choose the environment you would like to use: 
❯ dev 
master
// The rest of init steps
// Add/update any backend configurations using amplify add/update <category>
$ amplify push
$ git push -u origin dev
```

Since the team is sharing the same dev backend, periodically team members would need to pull in changes which their team members pushed for the dev environment to be in sync. Let's pull in the changes from the dev branch & environment.

```
$ cd <your-project>
$ git checkout dev
$ amplify init
? Do you want to use an existing environment? Yes
? Choose the environment you would like to use: 
❯ dev 
master
$ amplify pull
$ git pull origin dev
```

#### Sharing projects outside the team <a name="teamprovider"></a>
Inside the amplify/ dir file-structure you will observe a **team-provider-info.json** file which contains a structure similar to the following:

```json
{
    "dev": {
        "awscloudformation": {
            "AuthRoleName": "multenvtest-20181115101929-authRole",
            "UnauthRoleArn": "arn:aws:iam::132393967379:role/multenvtest-20181115101929-unauthRole",
            "AuthRoleArn": "arn:aws:iam::132393967379:role/multenvtest-20181115101929-authRole",
            "Region": "us-east-1",
            "DeploymentBucketName": "multenvtest-20181115101929-deployment",
            "UnauthRoleName": "multenvtest-20181115101929-unauthRole",
            "StackName": "multenvtest-20181115101929",
            "StackId": "arn:aws:cloudformation:us-east-1:132393967379:stack/multenvtest-20181115101929/fc7b1010-e902-11e8-a9bd-50fae97e0835"
        }
    },
    "master": {
        "awscloudformation": {
            "AuthRoleName": "multenvtest-20181115102119-authRole",
            "UnauthRoleArn": "arn:aws:iam::345090917734:role/multenvtest-20181115102119-unauthRole",
            "AuthRoleArn": "arn:aws:iam::345090917734:role/multenvtest-20181115102119-authRole",
            "Region": "us-east-1",
            "DeploymentBucketName": "multenvtest-20181115102119-deployment",
            "UnauthRoleName": "multenvtest-20181115102119-unauthRole",
            "StackName": "multenvtest-20181115102119",
            "StackId": "arn:aws:cloudformation:us-east-1:345090917734:stack/multenvtest-20181115102119/3e907b70-e903-11e8-a18b-503acac41e61"
        }
    }
}
```

This file is to be shared between team members, so that they have the ability to push/provision resources to the same Cloudformation stack and that way teams can work in a push/pull way and can always be in sync with the latest state of the project in the cloud.

Note: Team members would only be able to push to a stack only if they have the correct credentials (access key/secret keys) to do so.

If you want to share a project publicly and open source your serverless infrastructure, you should remove or put the amplify/team-provider-info.json file in gitignore file.

### Quick Tips
* git and Amplify CLI work well hand in hand (ideally a CI tool should be used to automate this process - amplify CLI now provides headless support for its init/push commands. Check out <https://github.com/aws-amplify/amplify-cli/tree/multienv/packages/amplify-cli/sample-headless-scripts> for examples)
* git checkout <branch-name> & amplify init (to initialize the env based on the git branch) should go hand in hand 
* git pull & amplify pull should go hand in hand
* git push & amplify push should go hand in hand

### Environment related commands
* amplify env add <br>
Adds a new environment to your Amplify Project 
* amplify env list [--details] [--json] <br>
Displays a list of all the environments in your Amplify project 
* amplify env remove <env-name> <br>
Removes an environment from the Amplify project
* amplify env get --name <env-name> <br>
Displays the details of the environment specified in the command 
* amplify env pull <br>
Pulls your environment from the cloud without impacting any local backend edits. Add the `--restore` flag to overwrite your local backend edits  (operates like the `amplify pull` command).
* amplify env import<br>
Imports an already existing Amplify project environment stack to your local backend. Here's a sample usage of the same

```
#!/bin/bash
set -e
IFS='|'

AWSCLOUDFORMATIONCONFIG="{\
\"Region\": \"us-east-1\",\
\"DeploymentBucketName\": \"mytestproject-20181106123241-deployment\",\
\"UnauthRoleName\": \"mytestproject-20181106123241-unauthRole\",\
\"StackName\": \"mytestproject-20181106123241\",\
\"StackId\": \"arn:aws:cloudformation:us-east-1:132393967379:stack/mytestproject67-20181106123241/1c03a3e0-e203-11e8-bea9-500c20ff1436\",\
\"AuthRoleName\": \"mytestproject67-20181106123241-authRole\",\
\"UnauthRoleArn\": \"arn:aws:iam::132393967379:role/mytestproject67-20181106123241-unauthRole\",\
\"AuthRoleArn\": \"arn:aws:iam::132393967379:role/mytestproject67-20181106123241-authRole\"\
}"
PROVIDER_CONFIG="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"


AWS_CONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":true,\
\"profileName\":\"default\"\
}"

amplify env import \
--name dev \
--config $PROVIDER_CONFIG \
--awsInfo $AWS_CONFIG \
--yes

```

You can get the `AWSCLOUDFORMATIONCONFIG` from the `team-provider-info.json` file from your existing Amplify project.

## Hosting

There are multiple ways to deploy and host your Amplify app. Two options are listed below:


<a href="#using-the-amplify-cli">Amplify CLI</a><br/>
<a href="#using-the-aws-amplify-console">AWS Amplify Console</a>

### Using the Amplify CLI

The `amplify publish` command is designed to build and publish both the backend and the front end of the project. Depending on the stage that the project is at, the command can be configured to publish either to a DEV or a PROD environment. In the current implementation, the frontend publish is only available for JavaScript project for static web hosting. This is accomplished by the category plugin amplify-category-hosting, using Amazon S3 and Amazon CloudFront.

The amplify-category-hosting module uses the amplify-provider-awscloudformation to create and update the S3 and CloudFront resources. For more  information of the Amazon S3 and Amazon CloudFront, check their docs:
[S3 static web hosting](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)
[CloudFront DEV Guide](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)

#### Workflow
- `amplify hosting add`<br/>
This adds the hosting resources to the backend. The command will first prompt for environment selection, either DEV or PROD. Upon completion, the CloudFormation template for the resources is placed in the amplify/backend/hosting directory. <br/><br/>
- `amplify hosting configure`<br/>
This command walks through the steps to configure the different sections of the resources used in hosting, including S3, CloudFront, and publish ignore. See below for more details.<br/><br/>
- `amplify publish`<br/>
This command first builds and pushes the update of backend resources to the cloud (including the resources used in hosting), and then builds and publishes the frontend.<br/>
For the amplify-category-hosting implementation, the frontend build artifacts will be uploaded to the S3 hosting bucket, and then if the CloudFront is used and the command is executed with the `--invalidateCloudFront` or `-c` flag, an invalidation request will be sent to the CloudFront to invalidate its cache. 


#### Configuration
The command `amplify hosting configure` walks through the steps to configure the different sections of the resources used in hosting. 
- `Website`<br/>
Configures the S3 bucket for static web hosting, the user can set the index doc and error doc, both are set to be `index.html` by default.<br/><br/>
- `CloudFront`<br/>
Configures the CloudFront content delivery network (CDN), the user can configure TTLs (Time To Live) for the default cache behavior, and configure custom error responses.<br/><br/>
- `Publish`<br/>
Configures the publish ignore patterns (just like what's in the .gitignore) for the publish command, the publish command will ignore directories and files in the distribution folder that have names matching the patterns. 

#### Stages
For the amplify-category-hosting implementation, there are two stages you can select from:
- DEV:  S3 static web hosting
- PROD: S3 and CloudFront

It can take time to create and replicate a CloudFront Distribution across the global CDN footprint, in some cases 15 minutes or more. Therefore the Amplify CLI provides a DEV configuration with an S3 static site only when prototyping your application; and a PROD configuration when you are ready to deploy in production. Note that the DEV stage using S3 static sites does not have full HTTPS end to end so it is **only recommended for prototyping your app**.

CloudFront can also be added or removed in your project afterwards by the `amplify hosting configure` command. Note that if the hosting S3 bucket is newly created in regions other than us-east-1, you might get the `HTTP 307 Temporary Redirect` error in the beginning when you access your published application through CloudFront. This is because CloudFront forwards requests to the default S3 endpoint (s3.amazonaws.com), which is in the us-east-1 region, and it can take up to 24 hours for the new hosting bucket name to propagate globally.


### Using the AWS Amplify Console

The AWS Amplify Console is a continuous deployment and hosting service for Amplify web apps. [Learn more](http://console.amplify.aws){: .target='new'}.
{: .callout .callout--action}

The AWS Amplify Console provides a Git-based workflow for building, deploying, and hosting your Amplify web app — both the frontend and backend — from source control. Once you connect a feature branch, all code commits are automatically deployed to an `amplifyapp.com` subdomain or your custom domain. **[Get started >>](https://docs.aws.amazon.com/amplify/latest/userguide/getting-started.html)**
