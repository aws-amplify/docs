**Note:** Please review the documentation for [API](~/sdk/api/graphql.md) before you proceed with the rest of this section. 

You can upload and download Amazon S3 Objects using AWS AppSync, a GraphQL based solution to build data-driven apps with real-time and offline capabilities. Sometimes you might want to create logical objects that have more complex data, such as images or videos, as part of their structure.  _For example, you might create a Person type with a profile picture or a Post type that has an associated image_. You can use AWS AppSync to model these as GraphQL types. If any of your mutations have a variable with `bucket`, `key`, `region`, `mimeType`, and `localUri` fields, the SDK uploads the file to S3 for you.

Update file `amplify/backend/api/yourAppName/schema.graphql` using the following schema which has a `S3Object` type:

```graphql
type Picture @model {
  id: ID!
  name: String
  owner: String
  visibility: Visibility
  file: S3Object
  createdAt: String
}

type S3Object {
  bucket: String!
  region: String!
  key: String!
  localUri: String!
  mimeType: String!
}

enum Visibility {
  public
  private
}
```

and run `amplify push` to update the AppSync backend, when updating backend, need to choose udpate `API.swift`

The AWS AppSync SDK doesn't take a direct dependency on the AWS SDK for S3, but takes in `AWSS3TransferUtility` and `AWSS3PresignedURLClient` clients as part of `AWSAppSyncClientConfiguration`. The code generator used above for generating the API generates the S3 wrappers required to use the previous clients in code. To generate the wrappers, pass the `--add-s3-wrapper` flag while running the code generator tool. You will also need to take a dependency on the `AWSS3` SDK. You can do that by updating your Podfile:

```ruby
  target: 'PostsApp' do
    use_frameworks!
    pod 'AWSMobileClient'
	  pod 'AWSAppSync'
	  pod 'AmplifyPlugins/AWSS3StoragePlugin'
	  pod 'AmplifyPlugins/AWSCognitoAuthPlugin'
  end
```

Then run `pod install` to fetch the new dependencies.

Update the `func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?)` in `AppDelegate.swift` to configure `AWSS3TransferUtility` for managing the uploads and downloads like below:

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
  do {
    let cacheConfiguration = try AWSAppSyncCacheConfiguration()
    let appSyncServiceConfig = try AWSAppSyncServiceConfig()
    let appSyncConfig = try AWSAppSyncClientConfiguration(
        appSyncServiceConfig: appSyncServiceConfig,
        cacheConfiguration: cacheConfiguration,
        s3ObjectManager: AWSS3TransferUtility.default()
    ) //userPoolsAuthProvider: AWSMobileClient.default() as? AWSCognitoUserPoolsAuthProvider,
    appSyncClient = try AWSAppSyncClient(appSyncConfig: appSyncConfig)
    print("AppSync Client Initialized")
  } catch {
    print("Error initializing AppSync Client")
  }
  
  AWSMobileClient.default().initialize { (userState, error) in
    if let userState = userState {
        print("UserState: \(userState.rawValue)")
    } else if let error = error {
        print("error: \(error.localizedDescription)")
    }
  }
  return true
}
```

And to automatically upload complex image when doing the api mutation. You can create a button to trigger the following method:

```swift
func uploadImage() {
  let s3ObjectInput = S3ObjectInput(bucket: "yourBucket",
                                    region: "yourBucketRegion",
                                    key: "public/imageName.jpeg",
                                    localUri: "uriOfImageToUpload",
                                    mimeType: "jpeg")

  let pictureMutationInput = CreatePictureInput(id: UUID().uuidString,
                                                name: "yourInputName",
                                                owner: "yourName",
                                                visibility: Visibility(rawValue: "public"),
                                                file: s3ObjectInput)      
  
  appSyncClient.perform(mutation: CreatePictureMutation(input: pictureMutationInput)) { (result, error) in
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

There is an implementation in the iOS Test Suite that can be used as a reference: [aws-mobile-appsync-sdk-ios/AWSAppSyncTestCommon/S3ObjectWrapper.swift](https://github.com/awslabs/aws-mobile-appsync-sdk-ios/blob/master/AWSAppSyncTestCommon/S3ObjectWrapper.swift).

The mutation operation doesn't require any specific changes in method signature. It requires only an `S3Object` with `bucket`, `key`, `region`, `localUri`, and `mimeType`. Now when you do a mutation, it automatically uploads the specified file to Amazon S3 using the `AWSS3TransferUtility` client internally.
