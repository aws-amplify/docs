---
title: Getting Started
canonical: https://docs.amplify.aws/lib/getting-started/setup?platform=ios
---

<br />

**Note**
This guide shows how to build an app using our Amplify Libraries for iOS (Preview) and the Amplify CLI toolchain.
To use the existing AWS Mobile SDK for iOS instead, [click here.](../sdk/ios/start)
{: .callout .callout--warning}

# Getting Started

Build an iOS app using the Amplify Framework which contains:

- Amplify Tools - CLI toolchain for creating and managing your serverless backend.
- iOS, Android, and JavaScript libraries to access your resources using a category based programming model.
- Framework-specific UI component libraries for React, React Native, Angular, Ionic and Vue.

This page guides you through setting up a backend and integrating the Amplify libraries in your iOS app. You will create a "Note app" with a GraphQL API and to store and retrieve items in a cloud database, as well as receive updates over a realtime subscription using the [API category](https://aws-amplify.github.io/docs/ios/api){:target="_blank"}. Alternatively the [DataStore category](https://aws-amplify.github.io/docs/ios/datastore){:target="_blank"} can be used for local-first programming, offline access, and object sync with GraphQL.

[GraphQL](http://graphql.org){:target="_blank"} is a data language that was developed to enable apps to fetch data from APIs. It has a declarative, self-documenting style. In a GraphQL operation, the client specifies how to structure the data when it is returned by the server. This makes it possible for the client to query only for the data it needs, in the format that it needs it in.

## Prerequisites

* [Install Xcode](https://developer.apple.com/xcode/downloads/){:target="_blank"} version 10.2 or later.

* [Install CocoaPods](https://cocoapods.org/)

* [Install Node](https://nodejs.org/en/)

* This guide assumes that you are familiar with iOS development and tools. If you are new to iOS development, you can follow [these steps](https://developer.apple.com/library/archive/referencelibrary/GettingStarted/DevelopiOSAppsSwift/BuildABasicUI.html){:target="_blank"} to create your first iOS application using Swift. 


## Step 1: Configure your app
You can use an existing iOS app or create a new iOS app in Swift as per the steps in prerequisite section. 

a. From a terminal window, navigate into your Xcode project's root application directory and run the following commands:

```bash
$ cd ./YOUR_PROJECT_FOLDER
$ pod init
```

b. Open the created  `Podfile` in a text editor and add the pods for the core Amplify Framework components.

```ruby
target :'YOUR-APP-NAME' do
    use_frameworks!

    pod 'amplify-tools'

    pod 'Amplify'
    pod 'AWSPluginsCore'
    pod 'AmplifyPlugins/AWSAPIPlugin'

    # other pods
end
```

c. Install dependencies by running the following command:

```bash
pod install --repo-update
```

d. Close your Xcode project and reopen it using `./YOUR-PROJECT-NAME.xcworkspace` file. Remember to always use `./YOUR-PROJECT-NAME.xcworkspace` to open your Xcode project from now on.

e. Build your Xcode project.

Once the build is successful, three files are generated:
* **amplifyconfiguration.json** and **awsconfiguration.json**: Rather than configuring each service through a constructor or constants file, the Amplify Framework for iOS supports configuration through centralized files called amplifyconfiguration.json and awsconfiguration.json which define all the regions and service endpoints to communicate.
* **amplifyxc.config** : This file is used to configure modelgen and push to cloud actions.

## Step 2: Generate your Model files

The GraphQL schema is auto-generated can be found under `amplify/backend/api/amplifyDatasource/schema.graphql`.  
[Learn more](https://aws-amplify.github.io/docs/cli-toolchain/graphql){:target="_blank"} about annotating GraphQL schemas and data modeling.  

a. In this guide, use this schema:
```
type Task @model {
    id: ID!
    title: String!
    description: String
    status: String
}
type Note @model {
    id: ID!
    content: String!
}
```

b. Open `amplifyxc.config` and update `modelgen` to `true`
```
modelgen=true
```

c. Run build in Xcode (`CMD+B`). Amplify will automatically generate the Model files using the graphql schema. You should see the following Model files under `amplify/generated/models`  
```
AmplifyModels.swift
Note.swift
Note+Schema.swift
Task.swift
Task+Schema.swift
```
d. Drag the `models` directory over to your project, click on each file, and on the right panel, under `Target Membership`, check your app target to add it.  

e. Next, build the project.  

## Step 3: Add API and Database

a. Run `amplify configure` from the root of your application folder to set up Amplify with your AWS account. 

b. Click on `amplifyxc.config` and update `push` to `true`
```
push=true
```  

c. AppSync offers server-side conflict resolution that does the heavy lifting of managing data conflicts. This is only supported when using Amplify DataStore. So for now, disable conflict resolution.
Click on `amplify/backend/api/amplifyDatasource/transform.conf.json` and delete the `ResolverConfig` section. Remove this section:
```
"ResolverConfig": {
    "project": {
        "ConflictHandler": "AUTOMERGE",
        "ConflictDetection": "VERSION"
    }
}
```

d. Run build in Xcode (`CMD+B`). This starts provisioning the backend cloud resources.  
   Optional: You can view the provisioned backend in the AppSync console by running the command `amplify console api` and choosing `GraphQL`. 

e. Open `amplifyconfiguration.json` and you should see the `api` section containing your backend like the following:
```json
{
    "api": {
        "plugins": {
            "awsAPIPlugin": {
                "amplifyDatasource": {
                    "endpointType": "GraphQL",
                    "endpoint": "https://<YOUR-GRAPHQL-ENDPOINT>.appsync-api.us-west-2.amazonaws.com/graphql",
                    "region": "us-west-2",
                    "authorizationType": "API_KEY",
                    "apiKey": "da2-abcdefghijklmnoprst"
                }
            }
        }
    }
}
```

## Step 4: Integrate into your app

a. Add the following imports to the top of your `AppDelegate.swift` file 
```swift
import Amplify
import AmplifyPlugins
```

b. Add the follow code to your AppDelegate's `application:didFinishLaunchingWithOptions` method 
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

c. Add data to your backend using the following mutate method: 
```swift
func apiMutate() {
    let note = Note(content: "content")
    Amplify.API.mutate(of: note, type: .create) { (event) in
        switch event {
        case .completed(let result):
            switch result {
            case .success(let note):
                print("API Mutate successful, created note: \(note)")
            case .failure(let error):
                print("Completed with error: \(error.errorDescription)")
            }
        case .failed(let error):
            print("Failed with error \(error.errorDescription)")
        default:
            print("Unexpected event")
        }
    }
}
```
d. Query the results from your API using the query method by passing in `note.id` from the previous call: 
```swift
func apiQuery(id: String) {
    Amplify.API.query(from: Note.self, byId: id) { (event) in
        switch event {
        case .completed(let result):
            switch result {
            case .success(let note):
                guard let note = note else {
                    print("API Query completed but missing note")
                    return
                }
                print("API Query successful, got note: \(note)")
            case .failure(let error):
                print("Completed with error: \(error.errorDescription)")
            }
        case .failed(let error):
            print("Failed with error \(error.errorDescription)")
        default:
            print("Unexpected event")
        }
    }
}
```

e. Set up subscriptions to listen to realtime updates:

```swift

func createSubscription() {
    let subscriptionOperation = Amplify.API.subscribe(from: Note.self, type: .onCreate) { (event) in
        switch event {
        case .inProcess(let subscriptionEvent):
            switch subscriptionEvent {
            case .connection(let subscriptionConnectionState):
                print("Subsription connect state is \(subscriptionConnectionState)")
            case .data(let result):
                switch result {
                case .success(let todo):
                    print("Successfully got note from subscription: \(todo)")
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

Call the methods from your app code such as from a button click or when your app starts in `viewDidLoad()`. You will see data being stored and retrieved in your backend from the Xcode console.

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
* [DataStore](./datastore)
* [Storage](./storage)
* [API](./api)
* [Analytics](./analytics)
* [Predictions](./predictions)

**Existing AWS Resources**

If you want to use your existing AWS resources with your app you will need to **manually configure** your app with an `amplifyconfiguration.json` file in your code. 

```json
{
  "UserAgent": "aws-amplify-cli/2.0",
  "Version": "1.0",
  "storage": {
    "plugins": {
      "awsS3StoragePlugin": {
         "bucket": "my-s3-bucket",
         "region": "us-west-2",
         "defaultAccessLevel": "guest"
      }
    }
  },
  "analytics": {
    "plugins": {
      "awsPinpointAnalyticsPlugin": {
        "pinpointAnalytics": {
          "appId": "xxxx123xxxx23423bf24234",
          "region": "us-east-1"
        },
        "pinpointTargeting": {
           "region": "us-east-1",
        }
      }
    }
  },
  "api": {
    "plugins": {
      "awsAPIPlugin": {
        "uniqueApiname123": {
          "endpoint": "http://api-gw-endpoint-1",
          "region": "us-east-1"
          "authorizationType": "AWS_IAM",
          "endpointType": "REST"
        },
        "graphqlEndpoint123UserPools": {
          "endpoint": "http://graphql-endpoint-1",
          "region": "us-east-1",
          "authorizationType": "AMAZON_COGNITO_USER_POOLS",
          "endpointType": "GraphQL"
        },
        "graphqlEndpoint234APIKEy": { 
          "endpoint": "http://graphql-endpoint-1", 
          "region": "us-east-1", 
          "authorizationType": "API_KEY",
          "apiKey": "apikey12sudksjdfnskjd",
          "endpointType": "GraphQL" 
        },
        "graphqlEndpoint345IAM": { 
          "endpoint": "http://graphql-endpoint-1", 
          "region": "us-east-1", 
          "authorizationType": "AWS_IAM", 
          "endpointType": "GraphQL" 
        }

      }
    }
  },
"predictions":{
  "plugins": { 
     "awsPredictionsPlugin": {
        "identify": {
           "collectionId": "TestCollection",
           "region": "us-east-1", 
           "maxEntities": 50 
         }, 
        "convert": {
           "voiceId": "Ivy",
           "region": "us-east-1" 
        } 
      }
    }
  }
}
```

In the configuration above, you would need to set the appropriate values such as `Region`, `Bucket`, etc.
