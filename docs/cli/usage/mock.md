---
title: Mocking and Testing
description: Landing page for the Amplify CLI
---  

It is highly recommended that you complete the Getting Started section of Amplify setup before using local mocking.

- [JavaScript Getting Started](../js/start)
- [Android Getting Started](../android/start)
- [iOS Getting Started](../ios/start)

In order to quickly test and debug without pushing all changes in your project to the cloud, Amplify supports *Local Mocking and Testing* for certain categories including API (AWS AppSync), Storage (Amazon DynamoDB and Amazon S3), and Functions (AWS Lambda). This includes using directives from the GraphQL Transformer, editing & debug resolvers, hot reloading, JWT mocking of authorization checks, and even performing S3 operations such as uploading and downloading content.

Java is required on your development workstation to use Local Mocking in Amplify
{: .callout .callout--info}

[Blog walk-through with sample app](https://aws.amazon.com/blogs/mobile/amplify-framework-local-mocking/){:target="_blank"}.

### API mocking setup
After running `amplify init` you can immediately add a GraphQL API and begin mocking without first pushing to the cloud. REST APIs are not yet supported. For example:

```terminal
$ amplify init
$ amplify add api #select GraphQL, use API Key
$ amplify mock api
```

When you run `amplify mock api` the codegen process will run and create any required GraphQL assets such as queries, mutations, and subscriptions as well as TypeScript or Swift classes for your app. Android requires a build step for Gradle to create required classes after the codegen process completes, as well as an extra [configuration in your AndroidManifest.xml](#android-config).

If you do not wish to test your app locally, you can still use the [local GraphQL console](#graphql-local-console) as well as [edit, debug, and test your VTL resolvers](#graphql-resolver-debugging) locally against the mock endpoint.

When adding a schema use an API Key at first to ensure everything works, though you can authenticate against a Cognito User Pool and the local testing server will honor the JWT tokens. You can also mock the JWT tokens in the local console (outlined below), however in that case you will need to do an `amplify push` first to create the User Pool.

When defining a schema you can use directives from the GraphQL Transformer in local testing as well as local code generation from the schema for types. The following directives are currently supported in local testing:

- [@auth](./graphql#auth)
- [@key](./graphql#key)
- [@connection](./graphql#connection)
- [@versioned](./graphql#versioned)
- [@function](./graphql#function)

Note that `@searchable` is not supported at this time.

### Storage mocking setup
For S3 storage mocking, after running `amplify init` you must first run through `amplify add auth`, either explicitly or implicitly if adding storage first, and then run an `amplify push`. This is because mocking storage in client libraries requires credentials for initial setup. Note however that S3 authorization rules, such as those placed on a bucket policy, are not checked by local mocking at this time.

Once you have done an initial push you can run the mock server and hit the local endpoint:

```terminal
$ amplify init
$ amplify add storage #This will prompt you to add auth
$ amplify push
$ amplify mock storage
```

To use an iOS application with the local S3 endpoint you will need to [modify your Info.plist file](#ios-config). To use an Android application with the local S3 endpoint you will need an extra [configuration in your AndroidManifest.xml](#android-config).

For DynamoDB storage, setup is automatically done when creating a GraphQL API with no action is needed on your part. Resources for the mocked data, such as the DynamoDB Local database or objects uploaded using the local S3 endpoint, inside your project under `./amplify/mock-data`.

### Function mocking setup
For Lambda function mocking, after running `amplify init` you can add a function to your project with `amplify add function` and either mock invoke it directly, or use the [@function](./graphql#function) directive as part of your GraphQL schema to mock the invocation as part of your API.

To invoke the function with the local mock:

```terminal
$ amplify init
$ amplify add function ## Follow prompts
$ amplify mock function <function_name>
```

This will take you through a few questions, such as the entry point for your Lambda function and sample event context to pass. The defaults are `index.js` and `event.json`.

Note that you will need to run `yarn` or `npm install` first if your Lambda function has any external dependencies (`<project-dir>/amplify/backend/function/<function-name>/src`). Only Node.js functions are supported at this time.
{: .callout .callout--info}

#### Function mocking with GraphQL

Alternatively, you can add a Lambda function and attach it as a GraphQL resolver with the `@function` directive. To do this first add a function to your project:

```terminal
$ amplify init  ## specify environment
$ amplify add function
```

Once the function is added, you can attach it to a field in your GraphQL schema. You will need to append `-${env}` to the function name in your schema when using the `@function` directive to denote the environment being used. For example if you ran `amplify add function` and used the name **quoteOfTheDay** for your function, and then ran `amplify add api`, your schema might have a query that looks like the below:

```
type Query {
    getQuote: String @function(name: "quoteOfTheDay-${env}")
}
```

Then when you run `amplify mock` the local GraphQL endpoint will invoke this function when running a GraphQL query such as:

```
query {
    getQuote
}
```

### Config files

When performing operations against the local mock endpoint, the Amplify CLI will automatically update your `aws-exports.js` and `awsconfiguration.json` with the local endpoints, fake values where necessary (e.g. fake API key), and disable SSL with an explicit value (`DangerouslyConnectToHTTPEndpointForTesting`) to indicate the functionality is only for local mocking and testing. This happens automatically when you run `amplify mock` and the server is running. Once you stop the mock server the config files are updated with the correct cloud endpoints for your project and `DangerouslyConnectToHTTPEndpointForTesting` is removed from the config file.

#### aws-exports.js example

```javascript
const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_appsync_graphqlEndpoint": "http://localhost:20002/graphql",
    "aws_appsync_region": "us-east-1",
    "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
    "aws_appsync_apiKey": "da2-fakeApiId123456",
    "aws_appsync_dangerously_connect_to_http_endpoint_for_testing": true,
    "aws_cognito_identity_pool_id": "us-east-1:270445b2-cc92-4d46-a937-e41e49bdb892",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_excPT39ZN",
    "aws_user_pools_web_client_id": "4a950rsq08d2gi68ogdt7sjqub",
    "oauth": {},
    "aws_user_files_s3_bucket": "local-testing-app-2fbf0a32d1896419b88f004c2755d084c-dev",
    "aws_user_files_s3_bucket_region": "us-east-1",
    "aws_user_files_s3_dangerously_connect_to_http_endpoint_for_testing": true
};
```

#### awsconfiguration.json example

```json
    "AppSync": {
        "Default": {
            "ApiUrl": "http://localhost:20002/graphql",
            "Region": "us-east-1",
            "AuthMode": "AMAZON_COGNITO_USER_POOLS",
            "ClientDatabasePrefix": "deddd_AMAZON_COGNITO_USER_POOLS",
            "DangerouslyConnectToHTTPEndpointForTesting": true
        }
    },
    "S3TransferUtility": {
        "Default": {
            "Bucket": "local-testing-app-2fbf0a32d1896419b88f004c2755d084c-dev",
            "Region": "us-east-1",
            "DangerouslyConnectToHTTPEndpointForTesting": true
        }
    }
```

### iOS config

When running against the local mock S3 server with iOS you must update your `Info.plist` to not require SSL when on a local network. To enable this set `NSAllowsLocalNetworking` to `YES` under `NSAppTransportSecurity`. This will scope the security exception to only run on localhost domains as outlined in [Apple Developer documentation for NSAllowsLocalNetworking](https://developer.apple.com/documentation/bundleresources/information_property_list/nsapptransportsecurity/nsallowslocalnetworking).

### Android config

When running against the local mock server with Android **it is recommended to use additional Build Variants**, such as a Debug and Release, to enable cleartext traffic only if the app is running on your local network. This will help ensure that you do not allow unsecured HTTP traffic in your Release Build Variant.

For example, in your Android Studio project create `/src/debug/AndroidManifest.xml` and in this file create a network configuration file reference `android:networkSecurityConfig="@xml/network_security_config"`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application android:networkSecurityConfig="@xml/network_security_config" />
</manifest>
```

Then create the network configuration file `/src/debug/res/xml/network_security_config.xml` and restrict to only run on your localhost IP range:

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
  <domain-config cleartextTrafficPermitted="true">
    <domain includeSubdomains="true">10.0.2.2</domain>
  </domain-config>
</network-security-config>
```

Then use a [Build Variant](https://developer.android.com/studio/build/build-variants) and run the Debug build and only test this setting with your local mock server. To learn more about this please see the [official Android documentation](https://developer.android.com/studio/build/manifest-merge).

Alternatively, if you are running a non-production application and do not want to use multiple Build Variants, you can set `android:usesClearTextTraffic="true"` in your **AndroidManifest.xml** as in the code snippet below. **This is not a recommended practice. Ensure you remove this once mocking is complete**.

```xml
<application
    android:icon="@mipmap/ic_launcher"
    android:label="@string/app_name"
    android:theme="@style/AppTheme"
    android:usesClearTextTraffic="true" >

    <!--other code-->
</application>
```

### GraphQL Local Console

To start testing, before starting your JavaScript/Android/iOS application run the following command:

```
$ amplify mock
```

Alternatively, you can run `amplify mock api` to only mock the API category. When prompted, ensure you select **YES** to automatically generate queries, mutations, and subscriptions if you are building a client application.

Once the server starts it will print a URL. Open this URL in your browser (it should be `http://localhost:20002`) and the [OneGraph](https://github.com/OneGraph/graphiql-explorer) GraphQL console will open up in your browser. You can use the explorer on the left to build out a query/mutation or manually type your statements in the main window. Amplify mocking will use DynamoDB Local to persist the records on your system. If you wish, you can view these in Visual Studio code with [SQLite Explorer](https://github.com/AlexCovizzi/vscode-sqlite). Follow the instructions in that repo for connecting to local databases.

When your API is configured to use Cognito User Pools, the local console provides a way to change `Username`, `Groups`, and `email` of the bundled JWT token. These values are used by GraphQL transformers Auth directive. Edit them by clicking **Auth** and saving your changes, then run operations in the console to test your rules.

### GraphQL Resolver Debugging

You can edit VTL templates locally to see if they contain errors, including the line numbers causing problems, before pushing to AppSync. With the local API running navigate to `./amplify/backend/api/APINAME/resolvers` where `APINAME` is the logical name that you used when running `$amplify add api`. You will see a list of resolver templates that the Transformer generated. Modify any of them and save, and they will be immediately loaded into the locally running API service with a message `Mapping template change detected. Reloading.`. If there is an error you will see something such as the following:

```
Reloading failed Error: Parse error on line 1:
...son($context.result
----------------------^
```

If you stop the server locally, for instance to push your changes to the cloud, all of the templates in the `../APINAME/resolvers` directory will be removed except for any that you modified. When you subsequently push to the cloud these local changes will be merged with your AppSync API.

#### Modify schema and test again

As you are developing your app, you can always modify the GraphQL schema which lives in `./amplify/backend/api/APINAME/schema.graphql`. You can modify any types using any of the supported directives and save this file, while the local server is still running. The changes will be detected and if your schema is valid they will be hot reloaded into the local API. If there is an error in the schema an error will be printed to the terminal like so:

```
Unknown directive "mode".

GraphQL request (1:11)
1: type Todo @mode{
             ^
2:   id: ID!

    at GraphQLTransform.transform
```

Amplify libraries when configured for these categories can use the local mocked endpoints for testing your application. When a mock endpoint is running the CLI will update your `aws-exports.js` or `awsconfiguration.json` to use the mock server and once stopped they will be updated to use the cloud endpoint once you have run an `amplify push`.
