The Amplify API category provides an interface for making requests to your backend. The Amplify CLI deploys REST APIs and handlers using [Amazon API Gateway](http://docs.aws.amazon.com/apigateway/latest/developerguide/) and [AWS Lambda](http://docs.aws.amazon.com/lambda/latest/dg/).

## Goal
To setup and configure your application with Amplify API to make requests to your API Gateway and trigger the lambda function using authorization provided by Amplify Auth.

## Prerequisites

<inline-fragment platform="ios" src="~/lib/restapi/fragments/ios/getting-started/10_preReq.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/restapi/fragments/android/getting-started/10_preReq.md"></inline-fragment>

## Provision Backend Storage Services

To start provisioning api resources in the backend, go to your project directory and **execute the command**:

```bash
amplify add api
```

Enter the following when prompted:
```console
? Please select from one of the below mentioned services: 
    `REST`
? Provide a friendly name for your resource to be used as a label for this category in the project: 
    `api1f12345`
? Provide a path (e.g., /book/{isbn}): 
    `/todo`
? Choose a Lambda source 
    `Create a new Lambda function`
? Provide a friendly name for your resource to be used as a label for this category in the project: 
    `restTodo123`
? Provide the AWS Lambda function name: 
    `restTodoLambda123`
? Choose the function runtime that you want to use: 
    `NodeJS`
? Choose the function template that you want to use: 
    `Serverless ExpressJS function (Integration with API Gateway)`
? Do you want to access other resources created in this project from your Lambda function? 
    `No`
? Do you want to invoke this function on a recurring schedule? 
    `No`
? Do you want to edit the local lambda function now? `No`
Succesfully added the Lambda function locally
? Restrict API access 
    `Yes`
? Who should have access? 
    `Authenticated and Guest users`
? What kind of access do you want for Authenticated users? 
    `create, read, update, delete`
? What kind of access do you want for Guest users? 
    `create, read, update, delete`
Successfully added auth resource locally.
? Do you want to add another path? 
    `No`
```

To push your changes to the cloud, **execute the command**:

```bash
amplify push
```

Upon completion, `amplifyconfiguration.json` should be updated to reference provisioned backend storage resources.  Note that these files should already be a part of your project if you followed the [Project setup walkthrough](~/lib/project-setup/create-application.md).

## Install Amplify Libraries
<inline-fragment platform="ios" src="~/lib/restapi/fragments/ios/getting-started/20_installLib.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/restapi/fragments/android/getting-started/20_installLib.md"></inline-fragment>

## Initialize Amplify API
<inline-fragment platform="ios" src="~/lib/restapi/fragments/ios/getting-started/30_initapi.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/restapi/fragments/android/getting-started/30_initapi.md"></inline-fragment>

## Make a Post Request

<inline-fragment platform="ios" src="~/lib/restapi/fragments/ios/getting-started/40_postTodo.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/restapi/fragments/android/getting-started/40_postTodo.md"></inline-fragment>

To navigate to your backend, go to the [API Gateway console](https://aws.amazon.com/apigateway) and select the API. The name of the API corresponds to the friendly name of the resource to be used as a label you specified earlier in the CLI steps.

## Next Steps
Congratulations! You've made a call to your API Gateway and triggered your lambda function. Check out the following links to see other Amplify API use cases:

* [Fetching Data](~/lib/restapi/fetch.md)
* [Updating Data](~/lib/restapi/update.md)
* [Deleting Data](~/lib/restapi/delete.md)
* [Define authorization rules](~/lib/restapi/authz.md)
