<br />

**Note**
Amplify iOS is in preview mode and not intended for production usage at this time. We welcome feedback to improve your experience in using Amplify iOS.
[Click here](../sdk/ios/storage) to access the Storage category guide for iOS SDK 2.0 docs.
{: .callout .callout--warning}

# Storage

The Amplify Storage module provides a simple mechanism for managing user content for your app in public, protected, or private storage buckets. The Storage category comes with default built-in support for Amazon Simple Storage Service (S3).


## Set up your backend

The Amplify CLI helps you to create and configure the storage buckets for your app. The Amplify AWS S3 Storage plugin leverages [Amazon S3](https://aws.amazon.com/s3).

**Prerequisites:**
* An iOS project targeting at least iOS 11.0.
* Install and configure the Amplify CLI

```terminal
$ npm install -g @aws-amplify/cli
$ amplify configure
```

**Steps**

Go to your project directory and run the following commands to get a fully functioning backend with the Storage category:

Run `amplify init` command as shown:

```terminal
$ amplify init
? Enter a name for the project AmplifyStorage
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building ios
? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use default
```

Add storage using the command `amplify add storage`. Here is an example:

```terminal
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
```terminal
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
    pod 'AWSMobileClient', '~> 2.12.0'
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

Add the following imports to the top of your `AppDelegate.swift` file
    ```swift
    import Amplify
    import AWSMobileClient
    import AmplifyPlugins
    ```
Add the following code to your AppDelegate's `application:didFinishLaunchingWithOptions` method

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

        let storagePlugin = AWSS3StoragePlugin()
        do {
            try Amplify.add(plugin: storagePlugin)
            try Amplify.configure()
            print("Amplify configured with storage plugin")
        } catch {
            print("Failed to initialize Amplify with \(error)")
        }

        return true
    }
    ```

## Use cases

The Storage category provides APIs do the following:

1. Upload data to or from a file to S3 cloud storage
2. Download data from S3 to memory or to a file
3. Generate a URL to access the object in S3 cloud storage
4. List all the objects stored in S3
5. Remove objects from S3.
6. Access the AWSS3 client to perform additional actions to S3 directly.

The following code examples assume you have followed the previous steps to set up the backend, initialize Amplify, and configure it with Storage. 

### Upload

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

When you have a file that you want to upload, you can specify the url to the file in the `local` parameter.

```swift

func uploadFile() {
  let dataString = "My Data"
  let fileNameKey = "myFile.txt"
  let filename = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0].appendingPathComponent(fileNameKey)
  do {
      try dataString.write(to: filename, atomically: true, encoding: String.Encoding.utf8)
  } catch {
      print("Failed to write to file \(error)")
  }

  _ = Amplify.Storage.uploadFile(key: fileNameKey, local: filename) { (event) in
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

### Download

If you uploaded the data at key `myKey` like in the previous example, you can retrieve the data using `Amplify.Storage.downloadData` or download to file with `Amplify.Storage.downloadFile`

```swift
func download() {
  Amplify.Storage.downloadData(key: "myKey") { (event) in
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

  let downloadToFileName = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0].appendingPathComponent("myFile.txt")
  Amplify.Storage.downloadFile(key: "myFile.txt", local: downloadToFileName) { (event) in
      switch event {
      case .completed:
          print("Completed")
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

### Get URL

You can also retrieve a URL for the object in storage

```swift
func getURL() {
  Amplify.Storage.getURL(key: "myKey") { (event) in
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

### List

You can list all of the objects uploaded.
```swift
func list() {
  Amplify.Storage.list { (event) in
      switch event {
      case .completed(let listResult):
          print("Completed")
          listResult.items.forEach { (item) in
              print("Key: \(item.key)")
          }
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
### Remove

Delete an object uploaded to S3 by using `Amplify.Storage.remove` and specify the key

```swift
func remove() {
  Amplify.Storage.remove(key: "myKey") { (event) in
      switch event {
      case .completed(let data):
          print("Completed: Deleted \(data)")
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


### Escape Hatch

For advanced use cases where Amplify does not provide the functionality, you can retrieve the escape hatch to access the AWSS3 instance.

Add `import AmplifyPlugins` and then the following code:

```swift
func getEscapeHatch() {
  do {
      let plugin = try Amplify.Storage.getPlugin(for: "awsS3StoragePlugin") as! AWSS3StoragePlugin
      let awsS3 = plugin.getEscapeHatch()
      XCTAssertNotNil(awsS3)
  } catch {
      XCTFail("Failed to get AWSS3 instance")
  }
}
```

### Restrict Access

Create an options object with the protected access level to restrict access for certain objects.

```swift
let options = StorageDownloadDataRequest.Options(accessLevel: .protected)
Amplify.Storage.downloadData(key: "myKey", options: options) { (event) in
    ...
}
```

When uploading a file with `protected` access level, users can only read the file and only the user which created the file can delete it.

Another user that wants to read the file can specify the user that created it:

```swift
let options = StorageDownloadDataRequest.Options(accessLevel: .protected,
                                                 targetIdentityId: "OtherUserId")
```

