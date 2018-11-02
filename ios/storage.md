# Storage

## S3

### Overview

Enable your app to store and retrieve user files from cloud storage with the permissions model that suits your purpose. The CLI deploys and configures cloud storage buckets using [Amazon Simple Storage Service](http://docs.aws.amazon.com/AmazonS3/latest/dev/).

### Storage Access

The CLI configures three different access levels on the storage bucket; public, protected and private.

- Files with public access level can be accessed by all users who are using your app. In S3, they are stored under the ``public/`` path in your S3 bucket.

- Files with protected access level are readable by all users but writable only by the creating user. In S3, they are stored under ``protected/{user_identity_id}/`` where the ``user_identity_id`` corresponds to a unique Amazon Cognito Identity ID for that user.

- Files with private access level are only accessible for specific authenticated users only. In S3, they are stored under ``private/{user_identity_id}/`` where the ``user_identity_id`` corresponds to a unique Amazon Cognito Identity ID for that user.

### Set Up Your Backend

1. Complete the [Get Started](./start) steps before you proceed.

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

### Connect to Your Backend

Use the following steps to add file storage backend services to your app.

1. Add the following to the `Podfile` to install the AWS Mobile SDK:

    ```ruby
    platform :ios, '9.0'

    target :'YOUR-APP-NAME' do
        use_frameworks!

        pod 'AWSS3', '~> 2.6.33'   # For file transfers
        pod 'AWSMobileClient', '~> 2.6.33'
        pod 'AWSUserPoolsSignIn', '~> 2.6.33'

        # other pods . . .
    end
    ```

Run `pod install --repo-update` before you continue.

2. Add the following import to the classes that perform user file storage operations:

    ```swift
    import AWSS3
    ```

### Upload a File

The following example shows how to upload data to an Amazon S3 bucket.

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

### Download a File

The following example shows how to download a file from an Amazon S3 bucket.

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
## Using TransferUtility 

This section explains how to implement upload and download functionality and a number of additional storage use cases.

Note: If you use the transfer utility multipart upload feature, take advantage of automatic cleanup features by setting up the [AbortIncompleteMultipartUpload] https://docs.aws.amazon.com/AmazonS3/latest/dev/intro-lifecycle-rules.html) action in your Amazon S3 bucket life cycle configuration.
{: .callout .callout--info}

### Transfer Utility Options

You can use the `AWSS3TransferUtilityConfiguration` object to configure the operations of the `TransferUtility`.

**isAccelerateModeEnabled**
The isAccelerateModeEnabled option lets you to upload and download content from a bucket that has Transfer Acceleration enabled on it. See [Transfer Acceleration](https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html) for information on how to enable transfer acceleration for your bucket.

This option is set to false by default.

```swift
//Setup credentials
let credentialProvider = AWSCognitoCredentialsProvider(regionType: YOUR-IDENTITY-POOL-REGION, identityPoolId: "YOUR-IDENTITY-POOL-ID")

//Setup the service configuration
let configuration = AWSServiceConfiguration(region: .USEast1, credentialsProvider: credentialProvider)

//Setup the transfer utility configuration
let tuConf = AWSS3TransferUtilityConfiguration()
tuConf.isAccelerateModeEnabled = true


//Register a transfer utility object
AWSS3TransferUtility.register(
    with: configuration!,
    transferUtilityConfiguration: tuConf,
    forKey: "transfer-utility-with-advanced-options"
)

//Look up the transfer utility object from the registry to use for your transfers.
let transferUtility = AWSS3TransferUtility.s3TransferUtility(forKey: "transfer-utility-with-advanced-options")
```

**retryLimit**
The retryLimit option allows you to specify the number of times the TransferUtility will retry a transfer when it encounters an error during the transfer. By default, it is set to 0, which means that there will be no retries.

```swift
tuConf.retryLimit = 5
```

**multiPartConcurrencyLimit**
The multiPartConcurrencyLimit option allows you to specify the number of parts that will be uploaded in parallel for a MultiPart upload request. By default, this is set to 5.

```swift
tuConf.multiPartConcurrencyLimit = 3
```

**timeoutIntervalForResource** The timeoutIntervalForResource parameter allows you to specify the maximum duration the transfer can run. The default value for this parameter is 50 minutes. This value is important if you use Amazon Cognito temporary credential because it aligns with the maximum span of time that those credentials are valid.

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

### Manage a Transfer when a Suspended App Returns to the Foreground**

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

The `AWSS3TransferUtilityUploadExpression` and `AWSS3TransferUtilityMultiPartUploadExpression` classes contain the method `setValue:forRequestHeader` where you can pass in metadata to Amazon S3. This example demonstrates passing in the Server-side Encryption Algorithm as a request header in uploading data to S3 using MultiPart.

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

### Transfer with Access Control List

To upload a file and specify permissions for it, you can use predefined grants, also known as canned ACLs. The following code shows you how to setup a file with publicRead access using the AWSS3 client.


```swift
//Create a AWSS3PutObjectRequest object and setup the content, bucketname, key on it.
//use the .acl method to specify the ACL for the file
let s3: AWSS3 = AWSS3.default()

let putObjectRequest: AWSS3PutObjectRequest! = AWSS3PutObjectRequest()
let content = "testObjectData"
putObjectRequest.acl = AWSS3ObjectCannedACL.publicRead
putObjectRequest.bucket = "bucket name"
putObjectRequest.key = "file name"
putObjectRequest.body = content
putObjectRequest.contentLength = content.count as NSNumber
putObjectRequest.contentType = "text/plain";

s3.putObject(putObjectRequest, completionHandler: { (putObjectOutput:AWSS3PutObjectOutput? , error: Error? ) in
    if let output = putObjectOutput {
        print (output)
    }

    if let error = error {
        print (error)
    }
})
```

### Downloading to a File

```swift
let fileURL = // The file URL of the download destination.

let transferUtility = AWSS3TransferUtility.default()
transferUtility.download(
        to: fileURL
        bucket: S3BucketName,
        key: S3DownloadKeyName,
        expression: expression,
        completionHandler: completionHandler).continueWith {
            (task) -> AnyObject! in if let error = task.error {
                print("Error: \(error.localizedDescription)")
            }

            if let _ = task.result {
                // Do something with downloadTask.
            }
            return nil;
        }
```

### Uploading Binary Data to a File

To upload a binary data to a file, you have to make sure to set the appropriate content type in the uploadData method of the TransferUtility. In the example below, we are uploading a PNG image to S3.

```swift

let data: Data = Data() // The data to upload

let transferUtility = AWSS3TransferUtility.default()
transferUtility.uploadData(data,
          bucket: S3BucketName,
          key: S3UploadKeyName,
          contentType: "image/png",
          expression: expression,
          completionHandler: completionHandler).continueWith { (task) -> AnyObject! in
              if let error = task.error {
                  print("Error: \(error.localizedDescription)")
              }

              if let _ = task.result {
                  // Do something with uploadTask.
              }

              return nil;
          }
```

### Downloading Binary Data to a File

The following code shows how to download a binary file.

```swift

let fileURL = // The file URL of the download destination
let transferUtility = AWSS3TransferUtility.default()
transferUtility.downloadData(
        fromBucket: S3BucketName,
        key: S3DownloadKeyName,
        expression: expression,
        completionHandler: completionHandler).continueWith {
            (task) -> AnyObject! in if let error = task.error {
                print("Error: \(error.localizedDescription)")
            }

            if let _ = task.result {
                // Do something with downloadTask.
            }

            return nil;
        }
```

### Limitations

If you expect your app to perform transfers that take longer than 50 minutes, use [AWSS3](https://docs.aws.amazon.com/AWSiOSSDK/latest/Classes/AWSS3.html) instead of [AWSS3TransferUtility](https://docs.aws.amazon.com/AWSiOSSDK/latest/Classes/AWSS3TransferUtility.html).

`AWSS3TransferUtility` generates Amazon S3 pre-signed URLs to use for background data transfer. Using Amazon Cognito Identity, you receive AWS temporary credentials. The credentials are valid for up to 60 minutes. At the same time, generated S3 pre-signed URLs cannot last longer than that time. Because of this limitation, the AWSS3TransferUtility enforces **50 minutes** transfer timeout, leaving a 10 minute buffer before AWS temporary credentials are regenerated. After 50 minutes, you receive a transfer failure.

If the generated pre-signed URLs cannot last longer than the credentials, then transfers will run into errors. The default value of timeoutIntervalForResource is set to 50 minutes to work well with Amazon Cognito Identity. For transfers that need to run longer than 50 minutes, you can setup static credentials using AWSStaticCredentialsProvider and increase timeoutIntervalForResource ( up to a maximum value of 7 days). 


## Working with Pre-Signed URLS

By default, all Amazon S3 resources are private. If you want your users to have access to Amazon S3 buckets
or objects, you can assign appropriate permissions with an [IAM policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/PoliciesOverview.html).

Alternatively, you can use pre-signed URLs to give your users temporary access to Amazon S3 objects.  When you create a pre-signed URL, you must provide your security credentials, specify a bucket name, an object key, an HTTP method, and an expiration date and time. The pre-signed URL is valid only for the specified duration.

### Build a Pre-Signed URL

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

The preceding example uses ``GET`` as the HTTP method: ``AWSHTTPMethodGET``. For an upload request to Amazon S3,
we would need to use a PUT method.

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

## Amazon S3 Server-Side Encryption Support in iOS

The AWS Mobile SDK for iOS supports server-side encryption of Amazon S3 objects.  If you need server-side encryption for all of the objects that are stored in a bucket, use a bucket policy. To learn more about server-side
encryption, see [PUT Object](http://docs.aws.amazon.com/AmazonS3/latest/API/RESTObjectPUT.html).

You can encrypt an object using AES256 server-side encryption as follows

``` swift
	let s3 = AWSS3.default()
        let data = "testdata"
        let putObjectRequest = AWSS3PutObjectRequest();
        putObjectRequest?.serverSideEncryption = AWSS3ServerSideEncryption.AES256
        putObjectRequest?.body = data
        putObjectRequest?.contentLength = data.lengthOfBytes(using: .utf8) as NSNumber
        putObjectRequest?.bucket = "YOUR_BUCKET"
        putObjectRequest?.key = "YOUR_KEY"
    
        
        s3.putObject(putObjectRequest!).continueWith(block: { (task:(AWSTask<AWSS3PutObjectOutput>)) -> Any? in
            if let _ = task.error  {
		//Handle error
            }
            if let _ = task.result {
		//Your logic goes here
            }
            return nil
        })
```

You can encrypt an object using [AWS KMS](https://aws.amazon.com/kms/) keys as follows. Note that you can also, optionally, specify the id of a key that you have setup in KMS.

```
        let s3 = AWSS3.default()
        let data = "testdata"
        let putObjectRequest = AWSS3PutObjectRequest();
        
        putObjectRequest?.serverSideEncryption = AWSS3ServerSideEncryption.awsKms
        putObjectRequest?.ssekmsKeyId = "KEY_ID" //optionally provide a preconfigured KMS key
        putObjectRequest?.body = data
        putObjectRequest?.contentLength = data.lengthOfBytes(using: .utf8) as NSNumber
	putObjectRequest?.bucket = "YOUR_BUCKET"
        putObjectRequest?.key = "YOUR_KEY"


        s3.putObject(putObjectRequest!).continueWith(block: { (task:(AWSTask<AWSS3PutObjectOutput>)) -> Any? in
            if let _ = task.error  {
                //Handle error
            }
            if let _ = task.result {
                //Your logic goes here
            }
            return nil
        })
```

You can encrypt an object using custom keys as follows. Note that the key has to conform to AES256 specifications, the MD5 sum must conform to [RFC 1321](https://tools.ietf.org/html/rfc1321), and both values must be base64 Encoded.

```
        let s3 = AWSS3.default()
        let data = "AAAA"
        let putObjectRequest = AWSS3PutObjectRequest();

	putObjectRequest?.sseCustomerAlgorithm = "AES256"
        putObjectRequest?.sseCustomerKey = "YOUR_KEY"
        putObjectRequest?.sseCustomerKeyMD5 = "MD5_HASH_FOR_YOUR_KEY"
        putObjectRequest?.body = data
        putObjectRequest?.contentLength = data.lengthOfBytes(using: .utf8) as NSNumber
        putObjectRequest?.bucket = "YOUR_BUCKET"
        putObjectRequest?.key = "YOUR_KEY"


        s3.putObject(putObjectRequest!).continueWith(block: { (task:(AWSTask<AWSS3PutObjectOutput>)) -> Any? in
            if let _ = task.error  {
                //Handle error
            }
            if let _ = task.result {
                //Your logic goes here
            }
            return nil
        })
```

## Additional Resources

* [Amazon Simple Storage Service Getting Started Guide](http://docs.aws.amazon.com/AmazonS3/latest/gsg/GetStartedWithS3.html)
* [Amazon Simple Storage Service API Reference](http://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html)
* [Amazon Simple Storage Service Developer Guide](http://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html)
* [Identity and Access Management Console](https://console.aws.amazon.com/iam/home)
* [Granting Access to an Amazon S3 Bucket](http://blogs.aws.amazon.com/security/post/Tx3VRSWZ6B3SHAV/Writing-IAM-Policies-How-to-grant-access-to-an-Amazon-S3-bucket)
* [Protecting data using customer provided encryption keys](https://docs.aws.amazon.com/AmazonS3/latest/dev/ServerSideEncryptionCustomerKeys.html)

## Next Steps

For a sample app that demonstrate the capabilities of the TransferUtility, see [S3 TransferUtility Sample](https://github.com/awslabs/aws-sdk-ios-samples/tree/master/S3TransferUtility-Sample).

