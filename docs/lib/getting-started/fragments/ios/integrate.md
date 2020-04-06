
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

* [Analytics](~/lib/analytics/getting-started.md)
* [API (GraphQL)](~/lib/graphqlapi/getting-started.md)
* [API (REST)](~/lib/restapi/getting-started.md)
* [Authentication](~/lib/auth/getting-started.md)
* [DataStore](~/lib/datastore/getting-started.md)
* [Predictions](~/lib/predictions/getting-started.md)
* [Storage](~/lib/storage/getting-started.md)

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