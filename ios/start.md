---
title: Getting Started
---

# Getting Started

Build an iOS app using the AWS Amplify CLI and the AWS SDK for iOS. The Amplify CLI lets you quickly add backend features to your application so that you can focus on your application code. This page guides you through setting up an initial backend and integration into your app. 

## Prerequisites

[Install and configure the Amplify CLI](..)

[Install Xcode](https://developer.apple.com/xcode/downloads/) version 9.2 or later.


## Step 1: Create a new app

Follow [these steps](https://developer.apple.com/library/archive/referencelibrary/GettingStarted/DevelopiOSAppsSwift/BuildABasicUI.html) to create an iOS application using Swift.

Install Cocoapods. From a terminal window navigate into your Xcode project's application directory and run the following:

```bash
sudo gem install cocoapods
pod init
```

Open the created  `Podfile` in a text editor and add the pod for core AWS Mobile SDK components to your build.

```ruby
platform :ios, '9.0'
target :'YOUR-APP-NAME' do
    use_frameworks!

    pod 'AWSCore', '~> 2.9.0'

    # other pods
end
```

Install dependencies by running the following:

```bash
pod install --repo-update
```

Close your Xcode project and reopen it using `./YOUR-PROJECT-NAME.xcworkspace` file. Remember to always use `./YOUR-PROJECT-NAME.xcworkspace` to open your Xcode project from now on. **Build your Xcode project**.


## Step 2: Set Up Your Backend

Create new AWS backend resources and pull the AWS services configuration into the app. In a terminal window, navigate to your project folder (the folder that contains your `xcodeproj` file), and run the following command (for this app, accepting all defaults is OK):

```bash
$ cd ./YOUR_PROJECT_FOLDER
$ amplify init        #accept defaults
$ amplify push        #creates configuration file
```

In the Finder, drag `awsconfiguration.json` into Xcode under the top Project Navigator folder (the folder name should match your Xcode project name). When the `Options` dialog box that appears, do the following:

* Clear the `Copy items if needed` check box.
* Choose `Create groups`, and then choose `Next`.

## Step 3: How it Works

Rather than configuring each service through a constructor or constants file, the AWS SDKs for iOS support configuration through a centralized file called `awsconfiguration.json` which defines all the regions and service endpoints to communicate. Whenever you run `amplify push`, this file is automatically created allowing you to focus on your Swift application code. On iOS projects the `awsconfiguration.json` will be placed into the root directory and you will need to add it to your XCode project.

To verify that the CLI is set up for your app, run the following command.

```bash
  $ amplify status
  | Category | Resource name | Operation | Provider plugin |
  | -------- | ------------- | --------- | --------------- |
```

The CLI displays a status table with no resources listed. As you add feature categories to your app and run `amplify push`, backend resources created for your app are listed in this table.

## Step 4: Add API and Database

Add a GraphQL API to your app and automatically provision a database with the following command (accepting all defaults is OK):

```bash
$ amplify add api     #select GraphQL, API Key
```

The `add api` flow above will ask you some questions, like if you already have an annotated GraphQL schema. If this is your first time using the CLI select **No** and let it guide you through the default project **"Single object with fields (e.g., “Todo” with ID, name, description)"** as it will be used in the code generation examples below. Later on you can always change it. This process creates an AWS AppSync API and connects it to an Amazon DynamoDB database.

Create required backend resources for your configured api with the following command:

```bash
$ amplify push
```

Since you added an API the `amplify push` process will automatically enter the codegen process and prompt you for configuration. Accept the defaults which generate a file named `API.swift`. Drag and drop this file from your `Finder` to the Xcode project and update your Podfile to include `AWSAppSync`:

```ruby
platform :ios, '9.0'
target :'YOUR-APP-NAME' do
    use_frameworks!

    pod 'AWSAppSync', '~> 2.10.0'

end
```

Run `pod install` and **build your app**.

## Step 5: Integrate into your app

initialize the AppSync client inside your application delegate:

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
        } catch {
            print("Error initializing appsync client. \(error)")
        }
        // other methods
        return true
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

You can now add data to your database with a mutation:

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
        }
    }
```

Next, query the data:

```swift
    func runQuery(){
        appSyncClient?.fetch(query: ListTodosQuery(), cachePolicy: .returnCacheDataAndFetch) {(result, error) in
            if error != nil {
                print(error?.localizedDescription ?? "")
                return
            }
            result?.data?.listTodos?.items!.forEach { print(($0?.name)! + " " + ($0?.description)!) }
        }
    }
```

> Note: The AppSync API is asynchronous, which means that simply invoking `runMutation` and `runQuery` back-to-back may not work as expected, because the mutation will not complete before the query is sent. If you want to ensure that a mutation is complete before issuing a query, use the mutation's callback to trigger the query, as in:

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
                    print(result.data!.onCreateTodo!.name + " " + result.data!.onCreateTodo!.description!)
                } else if let error = error {
                    print(error.localizedDescription)
                }
            })
        } catch {
            print("Error starting subscription.")
        }
    }
```

Call the `runMutation()`, `runQuery()`, and `subscribe()` methods from your app code, such as from a button click or when your app starts in `viewDidLoad()`. You will see data being stored and retrieved in your backend from the Xcode console. At any time you can open the AWS console for your new API directly by running the following command:

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

You can call methods on any AWS Service interface object supported by the AWS iOS SDK by passing your credentials from the AWSMobileClient to the service call constructor. See [Manual SDK Setup](./manualsetup) for more information.
