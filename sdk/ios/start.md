---
title: Getting Started
---


**Note**
This guide shows how to build an app using AWS Mobile SDK for iOS and the Amplify CLI toolchain.
To use our new, preview developer experience with new Amplify Libraries for iOS, [click here.](../../ios/start)
{: .callout .callout--warning}

# Getting Started

Build an iOS app using the Amplify Framework which contains:

- CLI toolchain for creating and managing your serverless backend.
- iOS, Android, and JavaScript libraries to access your resources using a category based programming model.
- Framework-specific UI component libraries for React, React Native, Angular, Ionic and Vue.

This page guides you through setting up a backend and integration into your iOS app. You will create a "Todo app" with a GraphQL API to store and retrieve items in a cloud database, as well as receive updates over a realtime subscription.

[GraphQL](http://graphql.org){:target="_blank"} is a data language that was developed to enable apps to fetch data from APIs. It has a declarative, self-documenting style. In a GraphQL operation, the client specifies how to structure the data when it is returned by the server. This makes it possible for the client to query only for the data it needs, in the format that it needs it in.

## Prerequisites

* [Install and configure the Amplify CLI](..)

* [Install Xcode](https://developer.apple.com/xcode/downloads/){:target="_blank"} version 10.2 or later.

* This guide assumes that you are familiar with iOS development and tools. If you are new to iOS development, you can follow [these steps](https://developer.apple.com/library/archive/referencelibrary/GettingStarted/DevelopiOSAppsSwift/BuildABasicUI.html){:target="_blank"} to create your first iOS application using Swift. 


## Step 1: Configure your app
You can use an existing iOS app or create a new iOS app in Swift as per the steps in prerequisite section. 

Install Cocoapods: From a terminal window navigate into your Xcode project's application directory and run the following:

```bash
$ cd ./YOUR_PROJECT_FOLDER
$ sudo gem install cocoapods
$ pod init
```

Open the created  `Podfile` in a text editor and add the pod for core AWS Mobile SDK components to your build.

```ruby
target :'YOUR-APP-NAME' do
    use_frameworks!

    pod 'AWSCore', '~> 2.12.0'
    pod 'AWSAppSync', '~> 2.14.2'

    # other pods
end
```

Install dependencies by running the following command:

```bash
pod install --repo-update
```

Close your Xcode project and reopen it using `./YOUR-PROJECT-NAME.xcworkspace` file. Remember to always use `./YOUR-PROJECT-NAME.xcworkspace` to open your Xcode project from now on. Build your Xcode project.


## Step 2: Initialize your project

In a terminal window, navigate to your project folder (the folder that contains your `xcodeproj` file), and run the following command (for this app, accepting all defaults is OK):

```bash
$ cd ./YOUR_PROJECT_FOLDER
$ amplify init        #accept defaults
```

The `awsconfiguration.json` configuration file should be created in the root directory. 

## Step 3: Add config

**What is awsconfiguration.json?**

Rather than configuring each service through a constructor or constants file, the AWS SDKs for iOS support configuration through a centralized file called `awsconfiguration.json` which defines all the regions and service endpoints to communicate. Whenever you run `amplify push`, this file is automatically created allowing you to focus on your Swift application code. On iOS projects the `awsconfiguration.json` will be placed into the root directory and you will need to add it to your Xcode project.

In the Finder, drag `awsconfiguration.json` into Xcode under the top Project Navigator folder (the folder name should match your Xcode project name). When the `Options` dialog box appears, do the following:

* Clear the `Copy items if needed` check box.
* Choose `Create groups`, and then choose `Finish`.

## Step 4: Add API and Database

Add a [GraphQL API](https://docs.aws.amazon.com/appsync/latest/devguide/designing-a-graphql-api.html) to your app and automatically provision a database by running the the following command from the root of your application directory (accepting all defaults is OK):

```bash
$ amplify add api     #select 'GraphQL' service, and 'API Key' for the authorization type
```

The `add api` flow  will ask you simple questions. If this is your first time using the CLI select **No** for the question "Do you have an annotated GraphQL schema". The CLI then guides you through the default project **"Single object with fields (e.g., “Todo” with ID, name, description)"** as it will be used in the code generation examples below. You can always change the schema as needed. This process creates an AWS AppSync API and connects it to an Amazon DynamoDB database. The CLI flow will look like below:

```bash
$ amplify add api
? Please select from one of the below mentioned services: GraphQL
? Provide API name: todo
? Choose the default authorization type for the API: API key
? Enter a description for the API key: ToDo description
? After how many days from now the API key should expire (1-365): 180
? Do you want to configure advanced settings for the GraphQL API: No, I am done.
? Do you have an annotated GraphQL schema? No
? Do you want a guided schema creation? Yes
? What best describes your project: Single object with fields (e.g., “Todo” with ID, name, description)
? Do you want to edit the schema now? No
```

[Learn more](https://aws-amplify.github.io/docs/cli-toolchain/graphql){:target="_blank"} about annotating GraphQL schemas and data modeling.

## Step 5: Push changes

Create the required backend resources for your configured API using the `amplify push` command.
Since you added an API, the `amplify push` process will automatically enter the [codegen process](https://aws-amplify.github.io/docs/cli-toolchain/graphql#codegen) and prompt you for configuration. Accept the defaults.

The codegen process generates a file named `API.swift` in your application root directory after the completion of `amplify push` command.

The CLI flow for push command is shown below:

```bash
$ amplify push
? Are you sure you want to continue?: Yes
? Do you want to generate code for your newly created GraphQL API: Yes
? Enter the file name pattern of graphql queries, mutations and subscriptions: graphql/**/*.graphql
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions: Yes
? Enter maximum statement depth [increase from default if your schema is deeply nested]: 2
? Enter the file name for the generated code: API.swift
```

## Step 6: Add generated code

**What is API.swift?**

`API.swift` (or an alternate name chosen by you in CLI flow) contains the generated code for GraphQL statements such as queries, mutation, and subscriptions. This saves you time as you don't have to hand author them.

From the Finder window, drag and drop the generated `API.swift` to the Xcode project under the top Project Navigator folder whose name matches your Xcode project name. When the `Options` dialog box appears, do the following:

* Clear the `Copy items if needed` check box.
* Choose `Create groups`, and then choose `Finish`.

## Step 7: Integrate into your app

Initialize the AppSync client inside your application delegate:

```swift
import AWSAppSync

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var appSyncClient: AWSAppSyncClient?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        do {
            // You can choose the directory in which AppSync stores its persistent cache databases
            let cacheConfiguration = try AWSAppSyncCacheConfiguration()

            // AppSync configuration & client initialization
            let appSyncServiceConfig = try AWSAppSyncServiceConfig()
            let appSyncConfig = try AWSAppSyncClientConfiguration(appSyncServiceConfig: appSyncServiceConfig,
                                                                  cacheConfiguration: cacheConfiguration)
            appSyncClient = try AWSAppSyncClient(appSyncConfig: appSyncConfig)
            print("Initialized appsync client.")
        } catch {
            print("Error initializing appsync client. \(error)")
        }
        // other methods
        return true
    }
}
```

Next, in your application code where you wish to use the AppSync client (like your View Controller) reference this in the `viewDidLoad()` lifecycle method:

```swift
import AWSAppSync

class Todos: UIViewController{
  //Reference AppSync client
  var appSyncClient: AWSAppSyncClient?

  override func viewDidLoad() {
      super.viewDidLoad()
      let appDelegate = UIApplication.shared.delegate as! AppDelegate
      appSyncClient = appDelegate.appSyncClient
  }
}
```

You can now add data to your database with a mutation function as shown below:

```swift
func runMutation(){
    let mutationInput = CreateTodoInput(name: "Use AppSync", description:"Realtime and Offline")
    appSyncClient?.perform(mutation: CreateTodoMutation(input: mutationInput)) { (result, error) in
        if let error = error as? AWSAppSyncClientError {
            print("Error occurred: \(error.localizedDescription )")
        }
        if let resultError = result?.errors {
            print("Error saving the item on server: \(resultError)")
            return
        }
        print("Mutation complete.")
    }
}
```

Next, query the data using function below:

```swift
func runQuery(){
    appSyncClient?.fetch(query: ListTodosQuery(), cachePolicy: .returnCacheDataAndFetch) {(result, error) in
        if error != nil {
            print(error?.localizedDescription ?? "")
            return
        }
        print("Query complete.")
        result?.data?.listTodos?.items!.forEach { print(($0?.name)! + " " + ($0?.description)!) }
    }
}
```

> **Note:** The AppSync API is asynchronous, which means that simply invoking `runMutation` and `runQuery` back-to-back may not work as expected, because the mutation will not complete before the query is sent. If you want to ensure that a mutation is complete before issuing a query, use the mutation's callback to trigger the query as shown below:

```swift
func runMutation(){
    let mutationInput = CreateTodoInput(name: "Use AppSync", description:"Realtime and Offline")
    appSyncClient?.perform(mutation: CreateTodoMutation(input: mutationInput)) { [weak self] (result, error) in
        // ... do whatever error checking or processing you wish here
        self?.runQuery()
    }
}
```

You can also setup realtime subscriptions to data:

```swift
var discard: Cancellable?

func subscribe() {
    do {
        discard = try appSyncClient?.subscribe(subscription: OnCreateTodoSubscription(), resultHandler: { (result, transaction, error) in
            if let result = result {
                print("CreateTodo subscription data:" +result.data!.onCreateTodo!.name + " " + result.data!.onCreateTodo!.description!)
            } else if let error = error {
                print(error.localizedDescription)
            }
        })
        print("Subscribed to CreateTodo Mutations.")
        } catch {
            print("Error starting subscription.")
        }
}
```

Call the `runMutation()`, `runQuery()`, and `subscribe()` methods from your app code such as from a button click or when your app starts in `viewDidLoad()`. You will see data being stored and retrieved in your backend from the Xcode console.

**Testing your API**
You can open the AWS console for you to run Queries, Mutation, or Subscription against you new API at any time directly by running the following command:

```terminal
$ amplify console api
> GraphQL               ##Select GraphQL
```

This will open the AWS AppSync console for you to run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.

## Next Steps

🎉 Congratulations! Your app is built, with a realtime backend using AWS AppSync.

What next? Here are some things to add to your app:

* [Authentication](./authentication)
* [User File Storage](./storage)
* [Serverless APIs](./api)
* [Analytics](./analytics)
* [Push Notification](./push-notifications)
* [Messaging](./messaging)

**Existing AWS Resources**

If you want to use your existing AWS resources with your app you will need to **manually configure** your app with an `awsconfiguration.json` file in your code. For example, if you were using Amazon Cognito Identity, Cognito User Pools, AWS AppSync, or Amazon S3:

```xml
{
    "CredentialsProvider": {
        "CognitoIdentity": {
            "Default": {
                "PoolId": "XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab",
                "Region": "XX-XXXX-X"
            }
        }
    },
    "CognitoUserPool": {
        "Default": {
            "PoolId": "XX-XXXX-X_abcd1234",
            "AppClientId": "XXXXXXXX",
            "AppClientSecret": "XXXXXXXXX",
            "Region": "XX-XXXX-X"
        }
    },
    "AppSync": {
        "Default": {
            "ApiUrl": "https://XXXXXX.appsync-api.XX-XXXX-X.amazonaws.com/graphql",
            "Region": "XX-XXXX-X",
            "AuthMode": "AMAZON_COGNITO_USER_POOLS"
        }
    },
    "S3TransferUtility": {
        "Default": {
            "Bucket": "BUCKET_NAME",
            "Region": "XX-XXXX-X"
        }
    }
}
```

In the configuration above, you would need to set the appropriate values such as `Region`, `Bucket`, etc.

**AWS SDK Interfaces**

For working with other AWS services you can use service interface objects directly via the generated SDK clients. 

To work with service interface objects, your Amazon Cognito users' [IAM role](https://docs.aws.amazon.com/cognito/latest/developerguide/iam-roles.html) must have the appropriate permissions to call the requested services.
{: .callout .callout--warning}

You can call methods on any AWS Service interface object supported by the AWS iOS SDK by passing your credentials from the AWSMobileClient to the service call constructor. See [SDK Setup Options](./manualsetup) for more information.
