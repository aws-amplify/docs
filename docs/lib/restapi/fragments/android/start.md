The Amplify CLI deploys REST APIs and handlers using [Amazon API Gateway](http://docs.aws.amazon.com/apigateway/latest/developerguide/) and [AWS Lambda](http://docs.aws.amazon.com/lambda/latest/dg/).

The API category will perform SDK code generation which when used with the `AWSMobileClient` can be used for creating signed requests for Amazon API Gateway when the service Authorization is set to `AWS_IAM` or when using a [Cognito User Pools Authorizer](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-integrate-with-cognito.html).

See the authentication section for more details for using the `AWSMobileClient` in your application.

## Create new REST API

In a terminal window, navigate to your project folder (the folder that contains your app `.Android Studioproj` file), and add the SDK to your app.

```bash
$ cd ./YOUR_PROJECT_FOLDER
$ amplify add api
```

When prompted select the following options:

```bash
$ > REST
$ > Create a new Lambda function
$ > Serverless express function
$ > Restrict API access? Yes
$ > Who should have access? Authenticated and Guest users
```

When configuration of your API is complete, the CLI displays a message confirming that you have configured local CLI metadata for this category. You can confirm this by running `amplify status`. Finally deploy your changes to the cloud:

```bash
$ amplify push
```

## Working with the API

Next make a call using one of the HTTP verbs under `Amplify.API` such as a GET:

```java
final Map parameters = new HashMap<>();
parameters.put("lang", "en_US");

RestOptions options = new RestOptions("/items", parameters);

Amplify.API.get("myAPI",
    options,
    restResponse -> Log.i("ApiQuickStart", restResponse.toString()),
    apiFailure -> Log.e("ApiQuickStart", apiFailure.getMessage(), apiFailure)
);
```
