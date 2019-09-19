---
title: Storage
---

# Storage

## S3

### Overview

Enable your app to store and retrieve user files from cloud storage with the permissions model that suits your purpose. The CLI deploys and configures cloud storage buckets using [Amazon Simple Storage Service](http://docs.aws.amazon.com/AmazonS3/latest/dev/).

### Storage Access

The CLI configures three different access levels on the storage bucket: public, protected and private. When you run `amplify add storage`, the CLI will configure appropriate IAM policies on the bucket using a Cognito Identity Pool Role. You will have the option of adding CRUD (Create/Update, Read and Delete) based permissions as well, so that Authenticated and Guest users will be granted limited permissions within these levels.

If you had previously enabled user sign-in by running `amplify add auth` in your project, the policies will be connected to an `Authenticated Role` of the Identity Pool which has scoped permission to the objects in the bucket for each user identity. If you haven't configured user sign-in, then an `Unauthenticated Role` will be assigned for each unique user/device combination, which still has scoped permissions to just their objects.

* Public: Accessible by all users of your app. Files are stored under the `public/` path in your S3 bucket.
* Protected: Readable by all users, but writable only by the creating user. Files are stored under `protected/{user_identity_id}/` where the `user_identity_id` corresponds to the unique Amazon Cognito Identity ID for that user.
* Private: Only accessible for the individual user. Files are stored under `private/{user_identity_id}/` where the `user_identity_id` corresponds to the unique Amazon Cognito Identity ID for that user.

See [Authentication](./authentication) for more information on how to get the `user_identity_id` for a signed in user.
 
### Set Up Your Backend

1. Complete the [Get Started](./start) steps before you proceed.

2. Use the CLI to add storage to your cloud-enabled backend and app.

    In a terminal window, navigate to your project folder (the folder that contains your app `.xcodeproj` file), and add the SDK to your app.

    ```bash
    $ cd ./YOUR_PROJECT_FOLDER
    $ amplify add storage
    ```

3.  Choose `Content` as your storage service.

    ```bash
    ❯ Content (Images, audio, video, etc.)
    ```

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

    The CLI will create the awsconfiguration.json file in your project directory. Add it to your project using XCode.

##### Lambda Triggers
If you want to enable triggers for the storage category with Amazon S3 & Amazon DynamoDB as providers, the CLI supports associating Lambda triggers with S3 and DynamoDB events. For example, this can be useful for a use case where you want to invoke a Lambda function after a create or update operation on a DynamoDB table managed by the Amplify CLI. [Read More]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/cli-toolchain/quickstart#storage-examples)

### Connect to Your Backend

Use the following steps to add file storage backend services to your app.

1. Add the `AWSS3` dependency to the `Podfile` to install the AWS Mobile SDK:

    ```ruby
    platform :ios, '9.0'

    target :'YOUR-APP-NAME' do
        use_frameworks!

        pod 'AWSS3', '~> 2.11.0'   # For file transfers

        # other pods . . .
        pod 'AWSMobileClient', '~> 2.11.0'
    end
    ```

Run `pod install --repo-update` before you continue.

2. Add the following import to the classes that perform user file storage operations:

    ```swift
    import AWSS3
    ```

### Mocking and Local Testing

Amplify supports running a local mock server for testing your application with S3. Please see the [CLI Toolchain documentation](../cli-toolchain/usage#mocking-and-testing) for more details.

## Using TransferUtility 

To make it easy to upload and download objects from Amazon S3, we provide a TransferUtility component with built-in support for background transfers, progress tracking, and MultiPart uploads. This section explains how to implement upload and download functionality and a number of additional storage use cases.

Note: If you use the transfer utility MultiPart upload feature, take advantage of automatic cleanup features by setting up the [AbortIncompleteMultipartUpload](https://docs.aws.amazon.com/AmazonS3/latest/dev/intro-lifecycle-rules.html) action in your Amazon S3 bucket life cycle configuration.
{: .callout .callout--info}

### Transfer Utility Options

You can use the `AWSS3TransferUtilityConfiguration` object to configure the operations of the `TransferUtility`.

#### isAccelerateModeEnabled
The isAccelerateModeEnabled option lets you to upload and download content from a bucket that has Transfer Acceleration enabled on it. This option is set to false by default. See [Transfer Acceleration](https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html) for information on how to enable transfer acceleration for your bucket. 

_The code sample below manually sets up credentials for the TransferUtility. The best practice is to use the AWSMobileClient. See [Authentication](./authentication) for more details_

```swift
//Setup credentials, see your awsconfiguration.json for the "YOUR-IDENTITY-POOL-ID"
let credentialProvider = AWSCognitoCredentialsProvider(regionType: YOUR-IDENTITY-POOL-REGION, identityPoolId: "YOUR-IDENTITY-POOL-ID")

//Setup the service configuration
let configuration = AWSServiceConfiguration(region: .USEast1, credentialsProvider: credentialProvider)

//Setup the transfer utility configuration
let tuConf = AWSS3TransferUtilityConfiguration()
tuConf.isAccelerateModeEnabled = true

//Register a transfer utility object asynchronously
AWSS3TransferUtility.register(
    with: configuration!,
    transferUtilityConfiguration: tuConf,
    forKey: "transfer-utility-with-advanced-options"
) { (error) in
     if let error = error {
         //Handle registration error.
     }
}

//Look up the transfer utility object from the registry to use for your transfers.
let transferUtility:(AWSS3TransferUtility?) = AWSS3TransferUtility.s3TransferUtility(forKey: "transfer-utility-with-advanced-options")
```

#### retryLimit
The retryLimit option allows you to specify the number of times the TransferUtility will retry a transfer when it encounters an error during the transfer. By default, it is set to 0, which means that there will be no retries.

```swift
tuConf.retryLimit = 5
```

#### multiPartConcurrencyLimit
The multiPartConcurrencyLimit option allows you to specify the number of parts that will be uploaded in parallel for a MultiPart upload request. By default, this is set to 5.

```swift
tuConf.multiPartConcurrencyLimit = 3
```

#### timeoutIntervalForResource 
The timeoutIntervalForResource parameter allows you to specify the maximum duration the transfer can run. The default value for this parameter is 50 minutes. This value is important if you use Amazon Cognito temporary credential because it aligns with the maximum span of time that those credentials are valid.

```swift
tuConf.timeoutIntervalForResource = 15*60 //15 minutes
```

### Upload a File 

 The transfer utility provides methods for both single-part and multipart uploads. When a transfer uses multipart upload, the data is chunked into a number of 5 MB parts which are transferred in parallel for increased speed.

 The following example shows how to upload a file to an Amazon S3 bucket.

```swift
func uploadData() {

  let data: Data = Data() // Data to be uploaded

  let expression = AWSS3TransferUtilityUploadExpression()
     expression.progressBlock = {(task, progress) in
        DispatchQueue.main.async(execute: {
          // Do something e.g. Update a progress bar.
       })
  }

  var completionHandler: AWSS3TransferUtilityUploadCompletionHandlerBlock?
  completionHandler = { (task, error) -> Void in
     DispatchQueue.main.async(execute: {
        // Do something e.g. Alert a user for transfer completion.
        // On failed uploads, `error` contains the error object.
     })
  }

  let transferUtility = AWSS3TransferUtility.default()

  transferUtility.uploadData(data,
       bucket: "YourBucket",
       key: "YourFileName",
       contentType: "text/plain",
       expression: expression,
       completionHandler: completionHandler).continueWith {
          (task) -> AnyObject? in
              if let error = task.error {
                 print("Error: \(error.localizedDescription)")
              }

              if let _ = task.result {
                 // Do something with uploadTask.
              }
              return nil;
      }
}
```

The following example shows how to upload a file to an Amazon S3 bucket using multipart uploads.

```swift
func uploadData() {

   let data: Data = Data() // Data to be uploaded

   let expression = AWSS3TransferUtilityMultiPartUploadExpression()
      expression.progressBlock = {(task, progress) in
         DispatchQueue.main.async(execute: {
           // Do something e.g. Update a progress bar.
        })
   }

   var completionHandler: AWSS3TransferUtilityMultiPartUploadCompletionHandlerBlock
   completionHandler = { (task, error) -> Void in
      DispatchQueue.main.async(execute: {
         // Do something e.g. Alert a user for transfer completion.
         // On failed uploads, `error` contains the error object.
      })
   }

   let transferUtility = AWSS3TransferUtility.default()

   transferUtility.uploadUsingMultiPart(data:data,
        bucket: "YourBucket",
        key: "YourFileName",
        contentType: "text/plain",
        expression: expression,
        completionHandler: completionHandler).continueWith {
           (task) -> AnyObject! in
               if let error = task.error {
                  print("Error: \(error.localizedDescription)")
               }

               if let _ = task.result {
                  // Do something with uploadTask.
               }
               return nil;
       }
}
```

### Download a File 

The following example shows how to download a file from an Amazon S3 bucket.

```swift
func downloadData() {
   let expression = AWSS3TransferUtilityDownloadExpression()
   expression.progressBlock = {(task, progress) in DispatchQueue.main.async(execute: {
      // Do something e.g. Update a progress bar.
      })
   }

   var completionHandler: AWSS3TransferUtilityDownloadCompletionHandlerBlock?
   completionHandler = { (task, URL, data, error) -> Void in
      DispatchQueue.main.async(execute: {
      // Do something e.g. Alert a user for transfer completion.
      // On failed downloads, `error` contains the error object.
      })
   }

   let transferUtility = AWSS3TransferUtility.default()
   transferUtility.downloadData(
         fromBucket: "YourBucket",
         key: "YourFileName",
         expression: expression,
         completionHandler: completionHandler
         ).continueWith {
            (task) -> AnyObject! in if let error = task.error {
               print("Error: \(error.localizedDescription)")
            }

            if let _ = task.result {
              // Do something with downloadTask.

            }
            return nil;
        }
}
```

### Track Transfer Progress

Implement progress and completion actions for transfers by passing a `progressBlock` and `completionHandler` blocks to the call to `AWSS3TransferUtility` that initiates the transfer.

The following example of initiating a data upload, shows how progress and completion handling is typically done for all transfers. The `AWSS3TransferUtilityUploadExpression`, `AWSS3TransferUtilityMultiPartUploadExpression` and `AWSS3TransferUtilityDownloadExpression` contains the `progressBlock` that gives you the progress of the transfer which you can use to update the progress bar.

```swift
// For example, create a progress bar
let progressView: UIProgressView! = UIProgressView()
progressView.progress = 0.0;

let data = Data() // The data to upload

let expression = AWSS3TransferUtilityUploadExpression()
expression.progressBlock = {(task, progress) in DispatchQueue.main.async(execute: {
        // Update a progress bar.
        progressView.progress = Float(progress.fractionCompleted)
    })
}

let completionHandler: AWSS3TransferUtilityUploadCompletionHandlerBlock = { (task, error) -> Void in DispatchQueue.main.async(execute: {
        if let error = error {
            NSLog("Failed with error: \(error)")
        }
        else if(self.progressView.progress != 1.0) {
            NSLog("Error: Failed.")
        } else {
            NSLog("Success.")
        }
    })
}

var refUploadTask: AWSS3TransferUtilityTask?
let transferUtility = AWSS3TransferUtility.default()
transferUtility.uploadData(data,
           bucket: "S3BucketName",
           key: "S3UploadKeyName",
           contentType: "text/plain",
           expression: expression,
           completionHandler: completionHandler).continueWith { (task) -> AnyObject! in
                if let error = task.error {
                    print("Error: \(error.localizedDescription)")
                }

                if let uploadTask = task.result {
                    // Do something with uploadTask.
                    // The uploadTask can be used to pause/resume/cancel the operation, retrieve task specific information
                    refUploadTask = uploadTask
                }

                return nil;
            }
```

### Pause a Transfer

To pause a transfer, retain references to `AWSS3TransferUtilityUploadTask`, `AWSS3TransferUtilityMultiPartUploadTask` or `AWSS3TransferUtilityDownloadTask` .

As described in the previous section :ref:`native-track-progress-and-completion-of-a-transfer`, the variable `refUploadTask` is a reference to the `UploadTask` object that is retrieved from the `continueWith` block of an upload operation that is invoked through `transferUtility.uploadData`.

To pause a transfer, use the `suspend` method:

```swift
refUploadTask.suspend()
```

### Resume a Transfer

To resume a transfer, use the `resume` method:

```swift
refUploadTask.resume()
```

### Cancel a Transfer

To cancel a transfer, use the `cancel` method:

```swift
refUploadTask.cancel()
```

### Background Transfers

All transfers performed by TransferUtility for iOS happen in the background using NSURLSession background sessions. Once a transfer is initiated, it will continue regardless of whether the initiating app moves to the foreground, moves to the background, is suspended, or is terminated by the system. Note that this doesn't apply when the app is force-closed. Transfers initiated by apps that are force-closed are terminated by the operating system at the NSURLSession level. For regular uploads and downloads, you will have to re-initiate the transfer. For multi-part uploads, the TransferUtility will resume automatically and will continue the transfer.  

To wake an app that is suspended or in the background when a transfer it has initiated is completed, implement the handleEventsForBackgroundURLSession method in the AppDelegate and have it call the interceptApplication method of AWSS3TransferUtility as follows. 

```swift
func application(_ application: UIApplication, handleEventsForBackgroundURLSession identifier: String, completionHandler: @escaping () -> Void) {
    // Store the completion handler.
    AWSS3TransferUtility.interceptApplication(application, handleEventsForBackgroundURLSession: identifier, completionHandler: completionHandler)
}
```

### Managing Transfers When an App Restarts

When an app that has initiated a transfer restarts (if it has been terminated by the system and not force-closed), the transfer may still be in progress or have completed. To make the restarting app aware of the status of transfers, instantiate the transfer utility using the ``AWSS3TransferUtility.s3TransferUtility(forKey: "YOUR_KEY")`` method. AWSS3TransferUtility uses the key to uniquely identify the NSURLSession of the transfers initiated by the app, so it is important to always use the same identifier. AWSS3TransferUtility will automatically reconnect to the transfers that were in progress the last time the app was running.

Though it can be called anywhere in the app, we recommend that you instantiate the AWSS3TransferUtility in the ``appDidFinishLaunching`` lifecycle method. 

### Manage a Transfer when a Suspended App Returns to the Foreground

When an app that has initiated a transfer becomes suspended and then returns to the foreground, the transfer may still be in progress or may have completed. In both cases, use the following code to re-establish the progress and completion handler blocks of the app.

```swift
let uploadTasks = transferUtility.getUploadTasks().result
  for task in uploadTasks! {
       task.setCompletionHandler(completionHandler!)
       task.setProgressBlock(progressBlock!)
}


let downloadTasks = transferUtility.getDownloadTasks().result
   for task in downloadTasks! {
       task.setCompletionHandler(completionHandler!)
       task.setProgressBlock(progressBlock!)
    }
}


let multiPartUploadTasks = transferUtility.getMultiPartUploadTasks().result
    for task in multiPartUploadTasks! {
        task.setCompletionHandler(completionHandler!)
        task.setProgressBlock(progressBlock!)

 }
```

### Transfer with Object Metadata

The `AWSS3TransferUtilityUploadExpression` and `AWSS3TransferUtilityMultiPartUploadExpression` classes contain the method `setValue:forRequestHeader` where you can pass in metadata to Amazon S3. This example demonstrates passing in the Server-side Encryption Algorithm as a request header in uploading data to S3 using MultiPart. See [Object Key and Metadata](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html) for more information.

```swift

let data: Data = Data() // The data to upload

let uploadExpression = AWSS3TransferUtilityMultiPartUploadExpression()
uploadExpression.setValue("AES256", forRequestHeader: "x-amz-server-side-encryption-customer-algorithm")
uploadExpression.progressBlock = {(task, progress) in DispatchQueue.main.async(execute: {
        // Do something e.g. Update a progress bar.
    })
}

let transferUtility = AWSS3TransferUtility.default()

transferUtility.uploadUsingMultiPart(data:data,
            bucket: "S3BucketName",
            key: "S3UploadKeyName",
            contentType: "text/plain",
            expression: uploadExpression,
            completionHandler: nil).continueWith { (task) -> AnyObject! in
                if let error = task.error {
                    print("Error: \(error.localizedDescription)")
                }

                return nil;
            }
```
## Usage with GraphQL APIs (Complex Objects)
Note: Please review the documentation for [API](./api) before you proceed with the rest of this section. 
{: .callout .callout--info}

You can also upload and download Amazon S3 Objects using AWS AppSync, a GraphQL based solution to build data-driven apps with real-time and offline capabilities. Sometimes you might want to create logical objects that have more complex data, such as images or videos, as part of their structure.  _For example, you might create a Person type with a profile picture or a Post type that has an associated image_. You can use AWS AppSync to model these as GraphQL types. If any of your mutations have a variable with `bucket`, `key`, `region`, `mimeType`, and `localUri` fields, the SDK uploads the file to Amazon S3 for you.

Attach the following policy to your IAM role to grant it programmatic read-write access to your bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::myBucket"]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject"
      ],
      "Resource": ["arn:aws:s3:::myBucket/*"]
    }
  ]
}
```

Using the previous sample schema as a reference, update it as follows to add the `S3Object` and `S3ObjectInput` types for the file, and a new mutation named `createPostWithFile`:

```diff
+ input CreatePostWithFileInput {
+   author: String!
+   title: String
+   content: String
+   url: String
+   ups: Int
+   downs: Int
+   file: S3ObjectInput!
+   version: Int!
+ }
  type Mutation {
    createPost(input: CreatePostInput!): Post
+   createPostWithFile(input: CreatePostWithFileInput!): Post
    updatePost(input: UpdatePostInput!): Post
    deletePost(input: DeletePostInput!): Post
  }
  type Post {
    id: ID!
    author: String!
    title: String
    content: String
    url: String
    ups: Int
    downs: Int
+   file: S3Object
    version: Int!
  }
+ type S3Object {
+   bucket: String!
+   key: String!
+   region: String!
+ }
+ input S3ObjectInput {
+   bucket: String!
+   key: String!
+   region: String!
+   localUri: String!
+   mimeType: String!
+ }
```

Next, you need to add a resolver for createPostWithFile mutation. You can do that from the AWS AppSync console by selecting PostsTable as the data source and the following mapping templates.
**Request Mapping Template**
```
  {
      "version": "2017-02-28",
      "operation": "PutItem",
      "key": {
        "id": $util.dynamodb.toDynamoDBJson($util.autoId()),
      },
      #set( $attribs = $util.dynamodb.toMapValues($ctx.args.input) )
      #if($util.isNull($ctx.args.input.file.version))
            #set( $attribs.file = $util.dynamodb.toS3Object($ctx.args.input.file.key, $ctx.args.input.file.bucket, $ctx.args.input.file.region))
      #else
            #set( $attribs.file = $util.dynamodb.toS3Object($ctx.args.input.file.key, $ctx.args.input.file.bucket, $ctx.args.input.file.region, $ctx.args.input.file.version))
      #end
      "attributeValues": $util.toJson($attribs),
      "condition": {
        "expression": "attribute_not_exists(#id)",
        "expressionNames": {
          "#id": "id",
        },
      },
   }
```
**Response Mapping Template**
```
  $util.toJson($context.result)
```
After you have a resolver for the mutation, to ensure that our S3 Complex Object details are fetched correctly during any query operation, add a resolver for the file field of Post. You can do that from the AWS AppSync console by using the following mapping templates.
**Request Mapping Template**
```
  {
    "version" : "2017-02-28",
    "operation" : "Query",
    "query" : {
        ## Provide a query expression. **
        "expression": "id = :id",
        "expressionValues" : {
            ":id" : {
                "S" : "${ctx.args.id}"
            }
        }
    }
  }
```
**Response Mapping Template**
```
  $util.toJson($util.dynamodb.fromS3ObjectJson($context.source.file))
```
The AWS AppSync SDK doesn't take a direct dependency on the AWS SDK for iOS for Amazon S3, but takes in `AWSS3TransferUtility` and `AWSS3PresignedURLClient` clients as part of AWSAppSyncClientConfiguration. The code generator used above for generating the API generates the Amazon S3 wrappers required to use the previous clients in the client code. To generate the wrappers, pass the `--add-s3-wrapper` flag while running the code generator tool. You also need to take a dependency on the AWSS3 SDK. You can do that by updating your Podfile to the following:

```ruby
  target: 'PostsApp' do
    use_frameworks!
    pod 'AWSAppSync', ~> '2.14.2'
    pod 'AWSS3', ~> '2.11.0'
  end
```

Then run `pod install` to fetch the new dependency.
Download the updated `schema.json` from the and put it in the `GraphQLOperations` folder in the root of the app.
Next, you have to add the new mutation, which is used to perform S3 uploads as part of mutation. Add the following mutation operation in your posts.graphql file:
```
  mutation AddPostWithFile($input: CreatePostWithFileInput!) {
      createPostWithFile(input: $input) {
          id
          title
          author
          url
          content
          ups
          downs
          version
          file {
              ...S3Object
          }
      }
    }
    fragment S3Object on S3Object {
      bucket
      key
      region
    }
  }
```
After adding the new mutation in our operations file, we run the code generator again with the new schema to generate mutations that support file uploads. This time, we also pass the -add-s3-wrapper flag, as follows:
```bash
  aws-appsync-codegen generate GraphQLOperations/posts.graphql --schema GraphQLOperations/schema.json --output API.swift --add-s3-wrapper
```
Update the `AWSAppSyncClientConfiguration` object to provide the `AWSS3TransferUtility` client for managing the uploads and downloads:
```swift
let appSyncConfig = try AWSAppSyncClientConfiguration(url: AppSyncEndpointURL,
                                                      serviceRegion: AppSyncRegion,
                                                      credentialsProvider: credentialsProvider,
                                                      databaseURL:databaseURL,
                                                      s3ObjectManager: AWSS3TransferUtility.default())
```

**The `AWSS3ObjectManager` integration** 

In order to use `AWSS3TransferUtility` as the `s3ObjectManager` the consumer needs to provide an integration layer between the base types (`S3ObjectInput`, `AWSS3TransferUtility`) and the required protocols: `AWSS3ObjectProtocol`, `AWSS3InputObjectProtocol` and `AWSS3ObjectManager`.

```swift
extension S3ObjectInput: AWSS3ObjectProtocol, AWSS3InputObjectProtocol {
    // ...
}

extension AWSS3PreSignedURLBuilder: AWSS3ObjectPresignedURLGenerator  {
    // ...
}

extension AWSS3TransferUtility: AWSS3ObjectManager {
    // ...
}
```

There is an implementation in the iOS Test Suite that can be used as a reference: [aws-mobile-appsync-sdk-ios/AWSAppSyncTestCommon/S3ObjectWrapper.swift](https://github.com/awslabs/aws-mobile-appsync-sdk-ios/blob/master/AWSAppSyncTestCommon/S3ObjectWrapper.swift). That code can be used as drop-in implementation for most use cases.

The mutation operation doesn't require any specific changes in method signature. It requires only an S3ObjectInput with `bucket`, `key`, `region`, `localUri`, and `mimeType`. Now when you do a mutation, it automatically uploads the specified file to Amazon S3 using the `AWSS3TransferUtility` client internally.

## Working with access levels in your app code

By default, all Amazon S3 resources are private. If you want your users to have access to Amazon S3 buckets or objects, you can assign appropriate permissions with an [IAM policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/PoliciesOverview.html).

### IAM Policy Based Permissions

When you upload objects to the S3 bucket the Amplify CLI creates, you must manually prepend the appropriate access-level information to the `key`. The correct prefix - `public/`, `protected/` or `private/` - will depend on the access level of the object as documented in the [Storage Access section](./storage#storage-access). For example:

```swift
var s3Object = S3ObjectInput()
// Accessible by all users
s3Object.key = "public/myFile.txt"
// Readable by all users, but writable only by the creating user
s3Object.key = "protected/\(cognitoIdentityId)/myFile.txt"
// Only accessible for the individual user
s3Object.key = "private/\(cognitoIdentityId)/myFile.txt"
```

**Note:** These keys must be prepended when you are uploading the object, and the same key must be specified as part of the object's key during download. The `cognitoIdentityId` is required for `protected` and `private` access and you can get it by using the [Authentication Utilities](./authentication#utility-properties): `AWSMobileClient.sharedInstance().identityId`.

### Temporary Permissions via Pre-signed URLs

However, what if you wanted to provide permissions temporarily, for example: _you want to share a link to file temporarily and have the link expire after a set time_. To do this using an IAM policy would require you to first setup the policy to grant access and then at a later time remember to delete the IAM policy to revoke access. 

Alternatively, you can use pre-signed URLs to give your users temporary access to Amazon S3 objects. When you create a pre-signed URL, you must provide your security credentials, specify a bucket name, an object key, an HTTP method, and an expiration date and time. The pre-signed URL is valid only for the specified duration.

The following example shows how to build a pre-signed URL to get an Amazon S3 object.

```swift
let getPreSignedURLRequest = AWSS3GetPreSignedURLRequest()
getPreSignedURLRequest.bucket = "myBucket"
getPreSignedURLRequest.key = "myFile.txt"
getPreSignedURLRequest.httpMethod = .GET
getPreSignedURLRequest.expires = Date(timeIntervalSinceNow: 3600)  // Change the value of the expires time interval as required

AWSS3PreSignedURLBuilder.default().getPreSignedURL(getPreSignedURLRequest).continueWith { (task:AWSTask<NSURL>) -> Any? in
    if let error = task.error as? NSError {
        print("Error: \(error)")
        return nil
    }

    let presignedURL = task.result
    // Use the Pre-Signed URL here as required
    ....
    ....

    return nil
}
```

The preceding example uses `GET` as the HTTP method: `AWSHTTPMethodGET`. For an upload request to Amazon S3, we would need to use a PUT method.

```swift
let getPreSignedURLRequest = AWSS3GetPreSignedURLRequest()
getPreSignedURLRequest.bucket = "myBucket"
getPreSignedURLRequest.key = "myFile.txt"
getPreSignedURLRequest.httpMethod = .PUT
getPreSignedURLRequest.expires = Date(timeIntervalSinceNow: 3600)  // Change the value of the expires time interval as required
getPreSignedURLRequest.contentType = "text/plain"

AWSS3PreSignedURLBuilder.default().getPreSignedURL(getPreSignedURLRequest).continueWith { (task:AWSTask<NSURL>) -> Any? in
    if let error = task.error as? NSError {
        print("Error: \(error)")
        return nil
    }

    let presignedURL = task.result
    // Use the Pre-Signed URL here as required
    ....
    ....

    return nil
}
```

## Note on Transfer Utility and Pre-Signed URLS 

The TransferUtility generates Amazon S3 pre-signed URLs to use for background data transfer. The best practice is to use Amazon Cognito for credentials with Transfer Utility. With Amazon Cognito Identity, you receive AWS temporary credentials that are valid for up to 60 minutes. The pre-signed URLs built using these credentials are bound by the same time limit, after which the URLs will expire. 

Because of this limitation, when you use TransferUtility with AWS Cognito, the expiry on the Pre-Signed URLs generated internally is set to **50 minutes**. Transfers that run longer than the 50 minutes will fail.  If you are transferring a large enough file where this becomes a constraint, you should create static credentials using AWSStaticCredentialsProvider ( _see [Authentication](./authentication) for more details on how to do this_)  and increase the expiry time on the Pre-Signed URLs by increasing the value for the `timeoutIntervalForResource` in the Transfer Utility Options.  Note that the max allowed expiry value for a Pre-Signed URL is 7 days. 


## Additional Resources

* [Amazon Simple Storage Service Getting Started Guide](http://docs.aws.amazon.com/AmazonS3/latest/gsg/GetStartedWithS3.html)
* [Amazon Simple Storage Service API Reference](http://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html)
* [Amazon Simple Storage Service Developer Guide](http://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html)
* [Identity and Access Management Console](https://console.aws.amazon.com/iam/home)
* [Granting Access to an Amazon S3 Bucket](http://blogs.aws.amazon.com/security/post/Tx3VRSWZ6B3SHAV/Writing-IAM-Policies-How-to-grant-access-to-an-Amazon-S3-bucket)
* [Protecting data using customer provided encryption keys](https://docs.aws.amazon.com/AmazonS3/latest/dev/ServerSideEncryptionCustomerKeys.html)

## Next Steps

For a sample app that demonstrate the capabilities of the TransferUtility, see [S3 TransferUtility Sample](https://github.com/awslabs/aws-sdk-ios-samples/tree/master/S3TransferUtility-Sample).

