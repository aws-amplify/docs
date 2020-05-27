The Amplify API category provides an interface for making requests to your backend. The Amplify CLI deploys REST APIs and handlers using [Amazon API Gateway](http://docs.aws.amazon.com/apigateway/latest/developerguide/) and [AWS Lambda](http://docs.aws.amazon.com/lambda/latest/dg/).

## Goal
To setup and configure your application with Amplify API to make requests to your API Gateway and trigger the lambda function using authorization provided by Amplify Auth.

## Prerequisites

<inline-fragment platform="ios" src="~/lib/restapi/fragments/ios/getting-started/10_preReq.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/restapi/fragments/android/getting-started/10_preReq.md"></inline-fragment>

## Configure API

<inline-fragment platform="ios" src="~/lib/restapi/fragments/ios/getting-started/11_amplifyInit.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/restapi/fragments/android/getting-started/11_amplifyInit.md"></inline-fragment>

## Install Amplify Libraries

<inline-fragment platform="ios" src="~/lib/restapi/fragments/ios/getting-started/20_installLib.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/restapi/fragments/android/getting-started/20_installLib.md"></inline-fragment>

## Initialize Amplify API

<inline-fragment platform="ios" src="~/lib/restapi/fragments/ios/getting-started/30_initapi.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/restapi/fragments/android/getting-started/30_initapi.md"></inline-fragment>

## Make a POST Request

Copy and paste the following code in your application so that it runs only once when the app starts:

<inline-fragment platform="ios" src="~/lib/restapi/fragments/ios/getting-started/40_postTodo.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/restapi/fragments/android/getting-started/40_postTodo.md"></inline-fragment>

To navigate to your backend, go to the [API Gateway console](https://aws.amazon.com/apigateway) and select the API. The name of the API corresponds to the friendly name of the resource to be used as a label you specified earlier in the CLI steps.

## Next steps

Congratulations! You've made a call to your API Gateway and triggered your Lambda function. Check out the following links to see other Amplify API use cases:

* [Fetching Data](~/lib/restapi/fetch.md)
* [Updating Data](~/lib/restapi/update.md)
* [Deleting Data](~/lib/restapi/delete.md)
* [Define authorization rules](~/lib/restapi/authz.md)
