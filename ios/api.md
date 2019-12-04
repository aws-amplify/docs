<br />

**Note**
Amplify iOS is in preview mode and not intended for production usage at this time. We welcome feedback to improve your experience in using Amplify iOS.
[Click here](../sdk/ios/api) to access the API category iOS SDK 2.0 docs.
{: .callout .callout--warning}

# API

The API category provides a solution for making HTTP requests to REST and GraphQL endpoints.

## GraphQL

AWS AppSync helps you build data-driven apps with real-time and offline capabilities. The [Amplify API Plugin](https://github.com/aws-amplify/amplify-ios) enables you to integrate your app with the AWS AppSync service. The framework supports multiple authorization models, handles subscription handshake protocols for real-time updates to data, and has built-in capabilities for offline support that makes it easy to integrate into your app.

You can integrate with Amplify framework using the following steps:

1. Setup the API endpoint and authentication information in the client side configuration.
2. Generate Swift Model classes from the API schema.
3. Write app code to run queries, mutations and subscriptions.

### Set up your backend

**Prerequisites**
* An iOS project targeting at least iOS 11.0.
* Install and configure the Amplify CLI

```terminal
$ npm install -g @aws-amplify/cli
$ amplify configure
```

**Steps**

Go to your project directory and run the following commands to get a fully functioning AppSync backend with API category.

Run `amplify init` command as shown:

```terminal
$ amplify init
? Enter a name for the project AmplifAPI
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building ios
? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use default
```

Add API using the command `amplify add api`. Here is an example:

```perl
? Please select from one of the below mentioned services: `GraphQL`
? Provide API name: `apiName`
? Choose the default authorization type for the API `API key`
? Enter a description for the API key: 
? After how many days from now the API key should expire (1-365): `30`
? Do you want to configure advanced settings for the GraphQL API `No, I am done.`
? Do you have an annotated GraphQL schema? `No`
? Do you want a guided schema creation? `Yes`
? What best describes your project: `Single object with fields (e.g., “Todo” with ID, name, description)`
? Do you want to edit the schema now? `Yes`
```

We'll be using this schema:
```ruby
type Todo @model {
  id: ID!
  name: String!
  description: String
}
```
Provision the backend with `amplify push` command. Here is an example:
```perl
? Are you sure you want to continue? `Yes`
? Do you want to generate code for your newly created GraphQL API `No`
```

The example above creates a backend with the Todo schema. You can open the AWS Console for AppSync with 
`amplify console api` to interact directly with the GraphQL service.  When your backend is successfully updated, there should be two newly created files: `amplifyconfiguration.json` and `awsconfiguration.json` in your project folder.

### Install Amplify libraries and tools

If this is a new project, run `pod init` to create the `Podfile` to use CocoaPods to manage your dependencies. Add the following to the Podfile:

```ruby
target :'YOUR-APP-NAME' do
    use_frameworks!
    pod 'Amplify'
    pod 'AWSPluginsCore'
    pod 'AmplifyPlugins/AWSAPIPlugin'
    pod 'amplify-tools'
end
```

Close out of the existing Xcode project if you have it open.

Install the dependencies via CocoaPods
```ruby
pod install --repo-update
```

Open the `.xcworkspace` file created by CocoaPods
```ruby
open <YOURAPP>.xcworkspace
```
Build your project and you should see the `amplify` folder, `amplifyxc.config`, `awsconfiguration.json`, and `amplifyconfiguration.json`. 

### Initialize Amplify

Initialize Amplify and AWSAPIPlugin.

Add the following imports to the top of your `AppDelegate.swift` file 
```swift
import Amplify
import AmplifyPlugins
```

Add the follow code to your AppDelegate's `application:didFinishLaunchingWithOptions` method
```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    let apiPlugin = AWSAPIPlugin(modelRegistration: AmplifyModels())
    do {
        try Amplify.add(plugin: apiPlugin)
        try Amplify.configure()
        print("Amplify initialized")
    } catch {
        print("Failed to configure Amplify \(error)")
    }
    return true
}
```
### Add configuration files

3. Click on the top level project on the left panel.
4. Click on your app under Targets in the left panel that contains Project and Targets.
5. Click on Build Phases
6. Expand the Copy Bundle Resources
7. Click on the + button, and select `awsconfiguration.json` and `amplifyconfiguration.json` to add.
8. Build and run (`CMD+R`) the app and make sure Amplify is initialized.

### Generate your Model files

1. In `amplifyxc.config`, enable model generation, and save the file.
    ```ruby
    modelgen=true
    ```
2. Build (`CMD+B`). This will generate the Model files to be used with `Amplify.API` to query, mutate, and subscribe to you AppSync service. After build completes, the model files will be generated under `amplify/generated/models`. When you edit the schema under `amplify/backend/api/<APINAME>/schema.graphql` and build, it will regenerate the Model files.

3. Alternatively, you can run `amplify codegen models` using Amplify CLI. Make sure you set `modelgen=false` if you are using the CLI instead of Amplify Tools.

3. Drag the entire `models` directory over to your project. If you Build the project, the model files will be regenerated under the `amplify` folder. 
4. Select each model file, and select the app under Target Membership, to make sure it gets added to the target when building the app.

6. Register the models before initializing Amplify in your AppDelegate method.
    ```
    ModelRegistry.register(modelType: Todo.self)
    ```
Make sure it builds and runs (`CMD+R`) successfully before moving onto the next section.

### Use cases

#### Run a Mutation

Now that the client is set up, you can run a GraphQL mutation with `Amplify.API.mutate` to create, update, and delete your data.

With the Todo model generated, add the following import and the method..

```swift
import Amplify

func createTodo() {
    let todo = Todo(name: "MyTodo", description: "description") // Create an instance of the Model you want to mutate
    _ = Amplify.API.mutate(of: todo, type: .create) { (event) in  // Call Mutate with the model with `create` mutation type. You can also `update` or `delete`
        switch event {
        case .completed(let result):
            switch result {
            case .success(let todo):
                print("Successfully created todo: \(todo)")
            case .failure(let error):
                print("Got failed result with \(error.errorDescription)")
            }
        case .failed(let error):
            print("Got failed event with error \(error)")
        default:
            print("Should never happen")
        }
    }
}

```

#### Query by Id

Now that you were able to make a mutation, take the `Id` that was printed out and use it in your query to retrieve data.

```swift
func getTodo() {
    _ = Amplify.API.query(from: Todo.self, byId: "9FCF5DD5-1D65-4A82-BE76-42CB438607A0") { (event) in
        switch event {
        case .completed(let result):
            switch result {
            case .success(let todo):
                guard let todo = todo else {
                    print("Could not find todo")
                    return
                }
                print("Successfully retrieved todo: \(todo)")
            case .failure(let error):
                print("Got failed result with \(error.errorDescription)")
            }
        case .failed(let error):
            print("Got failed event with error \(error)")
        default:
            print("Should never happen")
        }
    }
}
```

#### List Query

You can get the list of items that match a condition that you specify using the `where` parameter in `Amplify.API.query`

```swift
func testAmplifyAPIListQuery() {
    let completed = expectation(description: "Retrieve Todo successfully")
    let todo = Todo.keys
    let predicate = todo.name == "MyTodo" && todo.description == "description"
    _ = Amplify.API.query(from: Todo.self, where: predicate) { (event) in
        switch event {
        case .completed(let result):
            switch result {
            case .success(let todo):
                print("Successfully retrieved list of todos: \(todo)")
                completed.fulfill()
            case .failure(let error):
                print("Got failed result with \(error.errorDescription)")
            }
        case .failed(let error):
            print("Got failed event with error \(error)")
        default:
            print("Should never happen")
        }
    }
    wait(for: [completed], timeout: 100)
}
```

#### Subscribe to Data

Subscribe to mutations for creating real-time clients.

```swift
func createSubscription() {
    let subscriptionOperation = Amplify.API.subscribe(from: Todo.self, type: .onCreate) { (event) in
        switch event {
        case .inProcess(let subscriptionEvent):
            switch subscriptionEvent {
            case .connection(let subscriptionConnectionState):
                print("Subsription connect state is \(subscriptionConnectionState)")
            case .data(let result):
                switch result {
                case .success(let todo):
                    print("Successfully got todo from subscription: \(todo)")
                case .failure(let error):
                    print("Got failed result with \(error.errorDescription)")
                }
            }
        case .completed:
            print("Subscription has been closed")
        case .failed(let error):
            print("Got failed result with \(error.errorDescription)")
        default:
            print("Should never happen")
        }
    }
}
```

### Model Generation

#### Named Connections

The name argument specifies a name for the connection and it’s used to create bi-directional relationships that reference the same underlying foreign key.

For example, if you wanted your `Post.comments` and `Comment.post` fields to refer to opposite sides of the same relationship, you need to provide a name.

```
type Blog @model {
  id: ID!
  name: String!
  posts: [Post] @connection(name: "BlogPosts")
}

type Post @model {
  id: ID!
  title: String!
  blog: Blog! @connection(name: "BlogPosts")
}
```
Will generate the Models with 
```
public struct Blog: Model {
...
  public var posts: List<Post>?
  ...
}
public struct Post: Model {
...
  public var blog: Blog
  ...
}
```

### Authorization Modes

For client authorization AppSync supports API Keys, Amazon IAM credentials, Amazon Cognito User Pools, and 3rd party OIDC providers. This is inferred from the `amplifyconfiguration.json` file when you call `Amplify.congifure()`.

#### API Key

API Key is the easiest way to setup and prototype your application with AppSync. 


#### Cognito User Pools

Amazon Cognito User Pools is the most common service to use with AppSync when adding user Sign-Up and Sign-In to your application. If your application needs to interact with other AWS services besides AppSync, such as S3, you will need to use IAM credentials with Cognito Identity Pools. The Amplify CLI can automatically configure this for you when running `amplify add auth` and can also automatically federate User Pools with Identity Pools. This allows you to have both User Pool credentials for AppSync and AWS credentials for S3. You can then use the `AWSMobileClient` for automatic credentials refresh [as outlined in the authentication section](./authentication). For manual configuration, add the following snippet to your `awsconfiguration.json` file:

```json
{
  "CognitoUserPool": {
        "Default": {
            "PoolId": "POOL-ID",
            "AppClientId": "APP-CLIENT-ID",
            "AppClientSecret": "APP-CLIENT-SECRET",
            "Region": "us-east-1"
        }
    },
  "AppSync": {
        "Default": {
            "ApiUrl": "YOUR-GRAPHQL-ENDPOINT",
            "Region": "us-east-1",
            "AuthMode": "AMAZON_COGNITO_USER_POOLS"
        }
   }
}
```

and your `amplifyconfiguration.json` file, under the `awsAPIPlugin`
```json
{
    ...
    "awsAPIPlugin": {
        "<YOUR-GRAPHQLENDPOINT-NAME": {
            "endpointType": "GraphQL",
            "endpoint": "YOUR-GRAPHQL-ENDPOINT",
            "region": "us-west-2",
            "authorizationType": "AMAZON_COGNITO_USER_POOLS",
        }
    }
}

```

Add the following code to your app:

```swift                                
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        AWSMobileClient.default().initialize { (userState, error) in
            guard error == nil else {
                print("Error initializing AWSMobileClient. Error: \(error!.localizedDescription)")
                return
            }
            guard let userState = userState else {
                print("userState is unexpectedly empty initializing AWSMobileClient")
                return
            }

            print("AWSMobileClient initialized, userstate: \(userState)")
        }

        // Amplify section
        let apiPlugin = AWSAPIPlugin()
        try! Amplify.add(plugin: apiPlugin)
        try! Amplify.configure()
        print("Amplify initialized")

        return true
    }
```

#### IAM

When using AWS IAM in a mobile application you should leverage Amazon Cognito Identity Pools. The Amplify CLI can automatically configure this for you when running `amplify add auth`. You can then use the `AWSMobileClient` for automatic credentials refresh [as outlined in the authentication section](./authentication) For manual configuration, add the following snippet to your `awsconfiguration.json` file:

```json
{
  "CredentialsProvider": {
      "CognitoIdentity": {
          "Default": {
              "PoolId": "YOUR-COGNITO-IDENTITY-POOLID",
              "Region": "us-east-1"
          }
      }
  } 
}
```

and your `amplifyconfiguration.json` file, under the `awsAPIPlugin`
```json
{
    ...
    "awsAPIPlugin": {
        "<YOUR-GRAPHQLENDPOINT-NAME": {
            "endpointType": "GraphQL",
            "endpoint": "YOUR-GRAPHQL-ENDPOINT",
            "region": "us-west-2",
            "authorizationType": "API_IAM",
        }
    }
}
```


#### OIDC

If you are using a 3rd party OIDC provider you will need to configure it and manage the details of token refreshes yourself. Update the `amplifyconfiguration.json` file and code snippet as follows:

```json
{
    ...
    "awsAPIPlugin": {
        "<YOUR-GRAPHQLENDPOINT-NAME": {
            "endpointType": "GraphQL",
            "endpoint": "YOUR-GRAPHQL-ENDPOINT",
            "region": "us-west-2",
            "authorizationType": "OPENID_CONNECT",
        }
    }
}
```

Add the following code to your app:

```swift
public class MyOidcURLRequestInterceptor: URLRequestInterceptor {

    public func intercept(_ request: URLRequest) throws -> URLRequest {
        guard let mutableRequest = (request as NSURLRequest).mutableCopy() as? NSMutableURLRequest else {
            throw APIError.unknown("Could not get mutable request", "")
        }
        mutableRequest.setValue(NSDate().aws_stringValue(AWSDateISO8601DateFormat2), forHTTPHeaderField: "X-Amz-Date")
        mutableRequest.setValue("application/json", forHTTPHeaderField: "Content-Type")
        mutableRequest.setValue("amplify-ios/0.0.1 Amplify", forHTTPHeaderField: "User-Agent")

        let token = "MyToken"
        mutableRequest.setValue(token, forHTTPHeaderField: "authorization")
        return mutableRequest as URLRequest
    }
}

do {
    // Initialize Amplify with the interceptor
    let apiPlugin = AWSAPIPlugin()
    do {
        try Amplify.add(plugin: apiPlugin)
        try Amplify.configure()
        print("Amplify initialized")
        let interceptor = MyOidcURLRequestInterceptor()
        try Amplify.API.add(interceptor: interceptor, for: "<YOUR-GRAPHQENDPOINT-NAME>")
    } catch {
        print("Failed to configure Amplify \(error)")
    }
} catch {
    print("Error initializing appsync client. \(error)")
}
```

#### Multi-Auth

This section talks about the capability of AWS AppSync to configure multiple authorization modes for a single AWS AppSync endpoint and region. Follow the [AWS AppSync Multi-Auth](https://docs.aws.amazon.com/appsync/latest/devguide/security.html#using-additional-authorization-modes) to configure multiple authorization modes for your AWS AppSync endpoint.

You can now configure a single GraphQL API to deliver private and public data. Private data requires authenticated access using authorization mechanisms such as IAM, Cognito User Pools, and OIDC. Public data does not require authenticated access and is delivered through authorization mechanisms such as API Keys. You can also configure a single GraphQL API to deliver private data using more than one authorization type. For example, you can configure your GraphQL API  to authorize some schema fields using OIDC, while other schema fields through Cognito User Pools and/or IAM.

As discussed in the above linked documentation, certain fields may be protected by different authorization types. This can lead the same query, mutation, or subscription to have different responses based on the authorization sent with the request; Therefore, it is recommended to use the different `friendly_name_<AuthMode>` as the `apiName` parameter in the `Amplify.API` call to reference each authorization type.

The following snippets highlight the new values in the `amplifyconfiguration.json` and the client code configurations.

The `friendly_name` illustrated here is created from Amplify CLI prompt. There are 4 clients in this configuration that connect to the same API except that they use different `AuthMode`.

```json
{
    "UserAgent": "aws-amplify-cli/2.0",
    "Version": "1.0",
    "api": {
        "plugins": {
            "awsAPIPlugin": {
                "friendly_name_API_KEY": {
                    "endpointType": "GraphQL",
                    "endpoint": "https://xyz.appsync-api.us-west-2.amazonaws.com/graphql",
                    "region": "us-west-2",
                    "authorizationType": "API_KEY",
                    "apiKey": "da2-abcdefghijklmnopqr"
                },
                "friendly_name_AWS_IAM": {
                    "endpointType": "GraphQL",
                    "endpoint": "https://xyz.appsync-api.us-west-2.amazonaws.com/graphql",
                    "region": "us-west-2",
                    "authorizationType": "API_KEY",
                },
                "friendly_name_AMAZON_COGNITO_USER_POOLS": {
                    "endpointType": "GraphQL",
                    "endpoint": "https://xyz.appsync-api.us-west-2.amazonaws.com/graphql",
                    "region": "us-west-2",
                    "authorizationType": "AMAZON_COGNITO_USER_POOLS",
                },
                "friendly_name_OPENID_CONNECT": {
                    "endpointType": "GraphQL",
                    "endpoint": "https://xyz.appsync-api.us-west-2.amazonaws.com/graphql",
                    "region": "us-west-2",
                    "authorizationType": "OPENID_CONNECT",
                }
            }
        }
    }
}
```

```swift
Amplify.API.mutate(apiName: "friendly_name_API_KEY" ...)
```

## REST API

### Overview

The Amplify CLI deploys REST APIs and handlers using [Amazon API Gateway](http://docs.aws.amazon.com/apigateway/latest/developerguide/) and [AWS Lambda](http://docs.aws.amazon.com/lambda/latest/dg/).

The API category will perform SDK code generation which, when used with the `AWSMobileClient` can be used for creating signed requests for Amazon API Gateway when the service Authorization is set to `AWS_IAM` or when using a [Cognito User Pools Authorizer](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-integrate-with-cognito.html).

See [the authentication section for more details](./authentication) for using the `AWSMobileClient` in your application.

### Set Up Your Backend

In a terminal window, navigate to your project folder (the folder that contains your app `.Xcodeproj` file), and add the SDK to your app.

```terminal
$ cd ./YOUR_PROJECT_FOLDER
$ amplify add api
```

When prompted select the following options:

```terminal
$ > REST
$ > Create a new Lambda function
$ > Serverless express function
$ > Restrict API access? Yes
$ > Who should have access? Authenticated and Guest users
```

When configuration of your API is complete, the CLI displays a message confirming that you have configured local CLI metadata for this category. You can confirm this by running `amplify status`. Finally deploy your changes to the cloud:

```terminal
$ amplify push
```

### Connect to Your Backend

Add `AWSAPIGateway` to your Podfile:

```ruby

	target :'YOUR-APP-NAME' do
	  use_frameworks!

	    pod 'Amplify', :path => '~/aws-amplify/amplify-ios'
        pod 'AWSPluginsCore', :path => '~/aws-amplify/amplify-ios'
        pod 'AmplifyPlugins/AWSAPIPlugin', :path => '~/aws-amplify/amplify-ios'
	end
```

Run `pod install --repo-update` and then add `awsconfiguration.json` and `amplifyconfiguration.json` file to your project **(File->Add Files to ..->Add)** and then build your project, ensuring there are no issues.

Add the following code to your app:

```swift                                
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        AWSMobileClient.default().initialize { (userState, error) in
            guard error == nil else {
                print("Error initializing AWSMobileClient. Error: \(error!.localizedDescription)")
                return
            }
            guard let userState = userState else {
                print("userState is unexpectedly empty initializing AWSMobileClient")
                return
            }

            print("AWSMobileClient initialized, userstate: \(userState)")
        }

        // Amplify section
        let apiPlugin = AWSAPIPlugin()
        try! Amplify.add(plugin: apiPlugin)
        try! Amplify.configure()
        print("Amplify initialized")

        return true
    }
```

#### IAM authorization

To invoke an API Gateway endpoint from your application, For AWS IAM authorization use the `AWSMobileClient` as outlined in [the authentication section](./authentication).


#### Cognito User Pools authorization

