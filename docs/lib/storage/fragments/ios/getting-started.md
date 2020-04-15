The Amplify Storage module provides a simple mechanism for managing user content for your app in public, protected, or private storage buckets. The Storage category comes with default built-in support for Amazon Simple Storage Service (S3). The Amplify CLI helps you to create and configure the storage buckets for your app. The Amplify AWS S3 Storage plugin leverages [Amazon S3](https://aws.amazon.com/s3).

## Prerequisites

* An iOS project targeting at least iOS 11.0.
* Install and configure the [Amplify CLI](~/cli/start/install.md)

## Set up your backend

Go to your project directory and run the following commands to get a fully functioning backend with the Storage category:

Run `amplify init` command as shown:

```bash
$ amplify init
? Enter a name for the project AmplifyStorage
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building ios
? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use default
```

## Add Storage

Add storage using the command `amplify add storage`. Here is an example:

```bash
$ amplify add storage
? Please select from one of the below mentioned services: `Content (Images, audio, video, etc.)`
? You need to add auth (Amazon Cognito) to your project in order to add storage for user files. Do you want to add auth now? `Yes`
? Do you want to use the default authentication and security configuration? `Default configuration`
? How do you want users to be able to sign in? `Username`
? Do you want to configure advanced settings? `No, I am done.`
? Please provide a friendly name for your resource that will be used to label this category in the project: `S3friendlyName`
? Please provide bucket name: `storagebucketName`
? Who should have access: `Auth and guest users`
? What kind of access do you want for Authenticated users? `create/update, read, delete`
? What kind of access do you want for Guest users? `create/update, read, delete`
? Do you want to add a Lambda Trigger for your S3 Bucket? `No`
```

Push your changes to the cloud using the push command.

```bash
$ amplify push
```

When your backend is successfully provisioned, there should be two new generated files : `amplifyconfiguration.json` and `awsconfiguration.json` in your project folder. We will add these files to your project in a later step.

Run `amplify console storage` to open the AWS S3 console in a web browser.

## Install Amplify libraries

If this is a new project, run `pod init` from the root of your application folder to create the `Podfile` to use CocoaPods to manage your dependencies. Add the following to the `Podfile`

```ruby
target :'YOUR-APP-NAME' do
use_frameworks!
  pod 'AmplifyPlugins/AWSS3StoragePlugin'
  pod 'AWSMobileClient'
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

## Add configuration files

1. Open the finder of your project and drag the `amplifyconfiguration.json` and `awsconfiguration.json` over to the Xcode window, under the workspace. 
2. Enable `Copy items if needed` if not already enabled
3. For "Added folders", have `Create groups` selected. 
4. For "Add to targets", make sure the app target is checked off.
5. Build (`CMD+B`) the app 

## Initialize Amplify

Initialize `AWSMobileClient`, `Amplify`, and `AWSS3StoragePlugin`.

Add the following imports to the top of your `AppDelegate.swift` file:

```swift
import Amplify
import AWSMobileClient
import AmplifyPlugins
```

Add the following code to your AppDelegate's `application:didFinishLaunchingWithOptions` method:

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Override point for customization after application launch.

    AWSMobileClient.default().initialize { (userState, error) in
        guard error == nil else {
            print("Error initializing AWSMobileClient. Error: \(error!.localizedDescription)")
            return
        }
        print("AWSMobileClient initialized, userstate: \(userState)")
    }

    do {
        try Amplify.add(plugin: AWSS3StoragePlugin())
        try Amplify.configure()
        print("Amplify configured with storage plugin")
    } catch {
        print("Failed to initialize Amplify with \(error)")
    }

    return true
}
```

## Upload

To upload to S3 from a data object, specify the key and the data object to be uploaded.

```swift
func uploadData() {
    let dataString = "My Data"
    let data = dataString.data(using: .utf8)!
    Amplify.Storage.uploadData(key: "myKey", data: data) { (event) in
        switch event {
        case .completed(let data):
            print("Completed: \(data)")
        case .failed(let storageError):
            print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
        case .inProcess(let progress):
            print("Progress: \(progress)")
        default:
            break
        }
    }
}
```
