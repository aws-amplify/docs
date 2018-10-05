# Storage

# Overview

Enable your app to store and retrieve user files from cloud storage with the permissions model that suits your purpose. The CLI deploys and configures cloud storage buckets using [Amazon Simple Storage Service](http://docs.aws.amazon.com/AmazonS3/latest/dev/).

## Storage Access

The CLI configures three different access levels on the storage bucket; public, protected and private.

- Files with public access level can be accessed by all users who are using your app. In S3, they are stored under the ``public/`` path in your S3 bucket.

- Files with protected access level are readable by all users but writable only by the creating user. In S3, they are stored under ``protected/{user_identity_id}/`` where the user_identity_id corresponds to a unique Amazon Cognito Identity ID for that user.

- Files with private access level are only accessible for specific authenticated users only. In S3, they are stored under ``private/{user_identity_id}/`` where the user_identity_id corresponds to a unique Amazon Cognito Identity ID for that user.

## Set Up Your Backend

1. Complete the [Get Started](./getting-started) steps before you proceed.

2. Use the CLI to add storage to your cloud-enabled backend and app.

    In a terminal window, navigate to your project folder (the folder that typically contains your project level build.gradle), and add the SDK to your app.

    ```bash
    $ cd ./YOUR_PROJECT_FOLDER
    $ amplify add storage
    ```

    In a terminal window, navigate to your project folder (the folder that contains your app `.xcodeproj` file), and add the SDK to your app.

    ```bash
    $ cd ./YOUR_PROJECT_FOLDER
    $ amplify add storage
    ```

3.  Choose `Content` as your storage service.

    `❯ Content (Images, audio, video, etc.)`

4. The CLI walks you through the options to enable Auth (if not enabled previously), to name your S3 bucket, and to decide who should have access (select `Auth and guest users` and `read/write` for both auth and guest users).

5. Confirm that you have storage and auth set up.

    ```bash
      $ amplify status
      | Category  | Resource name   | Operation | Provider plugin   |
      | --------- | --------------- | --------- | ----------------- |
      | Auth      | cognito2e202b09 | Create    | awscloudformation |
      | Storage   | sabc0123de      | Create    | awscloudformation |
      ```
6. To create your backend run:

    ```bash
    $ amplify push
    ```

    The CLI will create the awsconfiguration.json file in your project's `res/raw` directory.

iOS - Swift
    ```bash
    $ amplify push
    ```

    The CLI will create the awsconfiguration.json file in your project directory. Add it to your project using XCode.

## Connect to Your Backend

Use the following steps to connect add file storage backend services to your app.

1. Add the following to `Podfile` that you configure to install the AWS Mobile SDK:

	```ruby
   platform :ios, '9.0'

      target :'YOUR-APP-NAME' do
         use_frameworks!

         pod 'AWSS3', '~> 2.6.13'   # For file transfers
         pod 'AWSMobileClient', '~> 2.6.13'
         pod 'AWSUserPoolsSignIn', '~> 2.6.13'

         # other pods . . .

      end
	```
	Run `pod install --repo-update` before you continue.

2. Add the following import to the classes that perform user file storage operations:

	```swift
	import AWSS3
	```

## Upload a File

The following example shows how to upload data to an |S3| bucket.

```swift

          func uploadData() {

             let data: Data = "TestData".data(using: .utf8) // Data to be uploaded

             //Create an expression object for progress tracking, to pass in request headers etc.
             let expression = AWSS3TransferUtilityUploadExpression()
                expression.progressBlock = {(task, progress) in
                     // Do something e.g. Update a progress bar.
             }

	     //Create a completion handler to be called when the transfer completes
             var completionHandler: AWSS3TransferUtilityUploadCompletionHandlerBlock?
             completionHandler = { (task, error) -> Void in
                   // Do something e.g. Alert a user that the transfer has completed.
                   // On failed uploads, `error` contains the error object.
             }

             //Instantiate the transferUtility object. This will pick up the bucketName, region,
             //and auth configuration from the awsconfiguration.json file
             let transferUtility = AWSS3TransferUtility.default()

             //Upload the data. Pass in the expression to get progress updates and completion handler to get notified
             //when the transfer is completed.
             let task = transferUtility.uploadData(data!,
                  key: "public/YourFileName"
                  contentType: "text/plain",
                  expression: expression,
                  completionHandler: completionHandler)
          }
```

## Download a File

The following example shows how to download a file from an |S3| bucket.

```swift
func downloadData() {

 //Create an expression object for progress tracking, to pass in request headers etc.
 let expression = AWSS3TransferUtilityDownloadExpression()
 expression.progressBlock = {(task, progress) in
      // Do something e.g. Update a progress bar.
 }

//Create a completion handler to be called when the transfer completes
 var completionHandler: AWSS3TransferUtilityDownloadCompletionHandlerBlock?
 completionHandler = { (task, URL, data, error) -> Void in
      // Do something e.g. Alert a user for transfer completion.
      // On failed downloads, `error` contains the error object.
 }


 //Instantiate the transferUtility object. This will pickup the bucketName, region, and auth configuration
 //from the awsconfiguration.json file
 let transferUtility = AWSS3TransferUtility.default()

 //Download the data. Pass in the expression to get progress updates and completion handler to get notified
 //when the transfer is completed.
 let task = transferUtility.downloadData(
       fromKey: "public/YourFileName",
       expression: expression,
       completionHandler: completionHandler
       )

}
```

Next Steps
==========

* For sample apps that demonstrate TransferUtility capabilities, see [iOS S3 TransferUtility Sample](https://github.com/awslabs/aws-sdk-ios-samples/tree/master/S3TransferUtility-Sample).

* Looking for Amazon Cognito Sync? If you are a new user, use [AWS AppSync](https://aws.amazon.com/appsync/) instead. AppSync is a new service for synchronizing application data across devices. Like Cognito Sync, AppSync enables synchronization of a user's own data, such as game state or app preferences. AppSync extends these capabilities by allowing multiple users to synchronize and collaborate in real time on shared data, such as a virtual meeting space or chat room. [Start building with AWS AppSync now](https://aws.amazon.com/appsync/)
