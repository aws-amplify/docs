# Transfer Files and Data Using TransferUtility and Amazon S3

**Just Getting Started?** | [Use streamlined steps] (./add-aws-mobile-user-data-storage) to install the SDK and integrate Amazon S3.
------------ | -------------

*Or, use the contents of this page if your app will integrate existing AWS services.*

This page explains how to implement upload and download functionality and a number of additional storage use cases.

The examples on this page assume you have added the AWS Mobile SDK to your mobile app. To create a new cloud storage backend for your app, see [Add User File Storage] (./add-aws-mobile-user-data-storage).

**Best practice** | If you use the transfer utility multipart upload feature, take advantage of automatic cleanup features by setting up the [AbortIncompleteMultipartUpload] https://docs.aws.amazon.com/AmazonS3/latest/dev/intro-lifecycle-rules.html) action in your Amazon S3 bucket life cycle configuration.
------------ | -------------

## Upload a File

Android - Java

The following example shows how to upload a file to an Amazon S3 bucket.

Use `AWSMobileClient` to get the `AWSConfiguration` and `AWSCredentialsProvider`, then create the `TransferUtility` object. AWSMobileClient expects an activity context for resuming an authenticated session and creating the credentials provider.

The following example shows using the transfer utility in the context of an Activity. If you are creating transfer utility from an application context, you can construct the CredentialsProvider and
AWSConfiguration object and pass it into TransferUtility. The TransferUtility will check the size of file being uploaded and will automatically switch over to using multi part uploads if the file size exceeds 5 MB.

```java
import android.app.Activity;
import android.util.Log;

import com.amazonaws.mobile.client.AWSMobileClient;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferUtility;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferState;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferObserver;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferListener;
import com.amazonaws.services.s3.AmazonS3Client;

import java.io.File;

public class YourActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        AWSMobileClient.getInstance().initialize(this).execute();
        uploadWithTransferUtility();
    }

    private void uploadWithTransferUtility() {

        TransferUtility transferUtility =
            TransferUtility.builder()
                .context(getApplicationContext())
                .awsConfiguration(AWSMobileClient.getInstance().getConfiguration())
                .s3Client(new AmazonS3Client(AWSMobileClient.getInstance().getCredentialsProvider()))
                .build();

        TransferObserver uploadObserver =
            transferUtility.upload(
                "s3Folder/s3Key.txt",
                new File("/path/to/file/localFile.txt"));

        // Attach a listener to the observer to get state update and progress notifications
        uploadObserver.setTransferListener(new TransferListener() {

            @Override
            public void onStateChanged(int id, TransferState state) {
                if (TransferState.COMPLETED == state) {
                    // Handle a completed upload.
                }
            }

            @Override
            public void onProgressChanged(int id, long bytesCurrent, long bytesTotal) {
                float percentDonef = ((float) bytesCurrent / (float) bytesTotal) * 100;
                int percentDone = (int)percentDonef;

                Log.d("YourActivity", "ID:" + id + " bytesCurrent: " + bytesCurrent
                        + " bytesTotal: " + bytesTotal + " " + percentDone + "%");
            }

            @Override
            public void onError(int id, Exception ex) {
                // Handle errors
            }

        });

        // If you prefer to poll for the data, instead of attaching a
        // listener, check for the state and progress in the observer.
        if (TransferState.COMPLETED == uploadObserver.getState()) {
            // Handle a completed upload.
        }

        Log.d("YourActivity", "Bytes Transferred: " + uploadObserver.getBytesTransferred());
        Log.d("YourActivity", "Bytes Total: " + uploadObserver.getBytesTotal());
    }
}
```

Android - Kotlin

The following example shows how to upload a file to an Amazon S3 bucket.

Use `AWSMobileClient` to get the `AWSConfiguration` and `AWSCredentialsProvider`, then create the `TransferUtility` object. AWSMobileClient expects an activity context for resuming an authenticated session and creating the credentials provider.

The following example shows using the transfer utility in the context of an Activity. If you are creating transfer utility from an application context, you can construct the CredentialsProvider and
AWSConfiguration object and pass it into TransferUtility. The TransferUtility will check the size of file being uploaded and will automatically switch over to using multi part uploads if the file size exceeds 5 MB.

```java
import android.app.Activity;
import android.util.Log;

import com.amazonaws.mobile.client.AWSMobileClient;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferUtility;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferState;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferObserver;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferListener;
import com.amazonaws.services.s3.AmazonS3Client;

import java.io.File;

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate()
        AWSMobileClient.getInstance().initialize(this).execute()
        uploadWithTransferUtility(
            "s3Folder/s3Key.txt"
            File("/path/to/file/localfile.txt")
        )
    }

    private fun uploadWithTransferUtility(remote: String, local: File) {
        val txUtil = TransferUtility.builder()
                .context(getApplicationContext)
                .awsConfiguration(AWSMobileClient.getInstance().configuration)
                .s3Client(AmazonS3Client(AWSMobileClient.getInstance().credentialsProvider))
                .build()

        val txObserver = txUtil.upload(remote, local)
        txObserver.transferListener = object : TransferListener() {
            override fun onStateChanged(id: Int, state: TransferState) {
                if (state == TransferState.COMPLETED) {
                    // Handle a completed upload
                }
            }

            override fun onProgressChanged(id: Int, current: Long, total: Long) {
                val done = (((current / total) * 100.0) as Float) as Int
                Log.d(TAG, "ID: $id, percent done = $done")
            }

            override fun onError(id: Int, ex: Exception) {
                // Handle errors
            }
        }

        // If you prefer to poll for the data, instead of attaching a
        // listener, check for the state and progress in the observer.
        if (txObserver.state == TransferState.COMPLETED) {
            // Handle a completed upload.
        }
    }
}
```

iOS - Swift
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

## Download a File

Android - Java

The following example shows how to download a file from an Amazon S3 bucket. We use `AWSMobileClient` to get the `AWSConfiguration` and `AWSCredentialsProvider` to create the `TransferUtility` object. AWSMobileClient expects an activity context for resuming an authenticated session and creating the credentials provider.

This example shows using the transfer utility in the context of an Activity. If you are creating transfer utility from an application context, you can construct the CredentialsProvider and
AWSConfiguration object and pass it into TransferUtility.

```java
import android.app.Activity;
import android.util.Log;

import com.amazonaws.mobile.client.AWSMobileClient;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferUtility;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferState;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferObserver;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferListener;
import com.amazonaws.services.s3.AmazonS3Client;

import java.io.File;

public class YourActivity extends Activity {

    @Override
      protected void onCreate(Bundle savedInstanceState) {
          AWSMobileClient.getInstance().initialize(this).execute();
          downloadWithTransferUtility();
    }

    public void downloadWithTransferUtility() {

        TransferUtility transferUtility =
              TransferUtility.builder()
                    .context(getApplicationContext())
                    .awsConfiguration(AWSMobileClient.getInstance().getConfiguration())
                    .s3Client(new AmazonS3Client(AWSMobileClient.getInstance().getCredentialsProvider()))
                    .build();

        TransferObserver downloadObserver =
              transferUtility.download(
                    "s3Folder/s3Key.txt",
                    new File("/path/to/file/localFile.txt"));

        // Attach a listener to the observer to get notified of the
        // updates in the state and the progress
        downloadObserver.setTransferListener(new TransferListener() {

           @Override
           public void onStateChanged(int id, TransferState state) {
              if (TransferState.COMPLETED == state) {
                 // Handle a completed upload.
              }
           }

           @Override
           public void onProgressChanged(int id, long bytesCurrent, long bytesTotal) {
                 float percentDonef = ((float)bytesCurrent/(float)bytesTotal) * 100;
                 int percentDone = (int)percentDonef;

                 Log.d("MainActivity", "   ID:" + id + "   bytesCurrent: " + bytesCurrent + "   bytesTotal: " + bytesTotal + " " + percentDone + "%");
           }

           @Override
           public void onError(int id, Exception ex) {
              // Handle errors
           }

        });

        // If you do not want to attach a listener and poll for the data
        // from the observer, you can check for the state and the progress
        // in the observer.
        if (TransferState.COMPLETED == downloadObserver.getState()) {
            // Handle a completed upload.
        }

        Log.d("YourActivity", "Bytes Transferred: " + downloadObserver.getBytesTransferred());
        Log.d("YourActivity", "Bytes Total: " + downloadObserver.getBytesTotal());
    }
}
```

Android - Kotlin

The following example shows how to download a file from an Amazon S3 bucket. We use `AWSMobileClient` to get the `AWSConfiguration` and `AWSCredentialsProvider` to create the `TransferUtility` object. AWSMobileClient expects an activity context for resuming an authenticated session and creating the credentials provider.

This example shows using the transfer utility in the context of an Activity. If you are creating transfer utility from an application context, you can construct the CredentialsProvider and
AWSConfiguration object and pass it into TransferUtility.

```java
import android.app.Activity;
import android.util.Log;

import com.amazonaws.mobile.client.AWSMobileClient;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferUtility;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferState;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferObserver;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferListener;
import com.amazonaws.services.s3.AmazonS3Client;

import java.io.File;

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate()
        AWSMobileClient.getInstance().initialize(this).execute()
        downloadWithTransferUtility(
            "s3Folder/s3Key.txt"
            File("/path/to/file/localfile.txt")
        )
    }

    private fun downloadWithTransferUtility(remote: String, local: File) {
        val txUtil = TransferUtility.builder()
                .context(getApplicationContext)
                .awsConfiguration(AWSMobileClient.getInstance().configuration)
                .s3Client(AmazonS3Client(AWSMobileClient.getInstance().credentialsProvider))
                .build()

        val txObserver = txUtil.download(remote, local)
        txObserver.transferListener = object : TransferListener() {
            override fun onStateChanged(id: Int, state: TransferState) {
                if (state == TransferState.COMPLETED) {
                    // Handle a completed upload
                }
            }

            override fun onProgressChanged(id: Int, current: Long, total: Long) {
                val done = (((current / total) * 100.0) as Float) as Int
                Log.d(TAG, "ID: $id, percent done = $done")
            }

            override fun onError(id: Int, ex: Exception) {
                // Handle errors
            }
        }

        // If you prefer to poll for the data, instead of attaching a
        // listener, check for the state and progress in the observer.
        if (txObserver.state == TransferState.COMPLETED) {
            // Handle a completed upload.
        }
    }
}
```

iOS - Swift

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

## Track Transfer Progress

Android - Java

With the `TransferUtility`, the download() and upload() methods return a `TransferObserver` object. This object gives access to:

1.  The state, as an `enum`
2.  The total bytes currently transferred
3.  The total bytes remaining to transfer, to aid in calculating progress bars
4.  A unique ID that you can use to keep track of distinct transfers

Given the transfer ID, the `TransferObserver` object can be retrieved from anywhere in your app, even if the app was terminated during a transfer. It also lets you create a `TransferListener`, which will be updated on state or progress change, as well as when an error occurs.

To get the progress of a transfer, call `setTransferListener()` on your `TransferObserver`. This requires you to implement `onStateChanged`, `onProgressChanged`, and `onError`. For example:

You can also query for `TransferObservers` with either the `getTransfersWithType(transferType)` or `getTransfersWithTypeAndState(transferType, transferState)` method. You can use `TransferObservers` to determine what transfers are underway, what are paused and handle the transfers as necessary.

```java

TransferObserver transferObserver = download(MY_BUCKET, OBJECT_KEY, MY_FILE);
transferObserver.setTransferListener(new TransferListener(){

    @Override
    public void onStateChanged(int id, TransferState state) {
        // do something
    }

    @Override
    public void onProgressChanged(int id, long bytesCurrent, long bytesTotal) {
        int percentage = (int) (bytesCurrent/bytesTotal * 100);
        //Display percentage transferred to user
    }

    @Override
    public void onError(int id, Exception ex) {
        // do something
    }
});
```

The transfer ID can be retrieved from the `TransferObserver` object that is returned from upload or download function.

```java
// Gets id of the transfer.
int transferId = transferObserver.getId();
```

Android - Kotlin

With the `TransferUtility`, the download() and upload() methods return a `TransferObserver` object. This object gives access to:

1.  The state, as an `enum`
2.  The total bytes currently transferred
3.  The total bytes remaining to transfer, to aid in calculating progress bars
4.  A unique ID that you can use to keep track of distinct transfers

Given the transfer ID, the `TransferObserver` object can be retrieved from anywhere in your app, even if the app was terminated during a transfer. It also lets you create a `TransferListener`, which will be updated on state or progress change, as well as when an error occurs.

To get the progress of a transfer, call `setTransferListener()` on your `TransferObserver`. This requires you to implement `onStateChanged`, `onProgressChanged`, and `onError`. For example:

You can also query for `TransferObservers` with either the `getTransfersWithType(transferType)` or `getTransfersWithTypeAndState(transferType, transferState)` method. You can use `TransferObservers` to determine what transfers are underway, what are paused and handle the transfers as necessary.

```kotlin
val transferObserver = download(MY_BUCKET, OBJECT_KEY, MY_FILE);
transferObserver.transferListener = object : TransferListener() {
    override fun onStateChanged(id: Int, state: TransferState) {
        // Do something
    }

    override fun onProgressChanged(id: int, current: Long, total: Long) {
        int percent = ((current / total) * 100.0) as Int
        // Display percent transferred
    }

    override fun onError(id: Int, ex: Exception) {
        // Do something
    }
}
```

The transfer ID can be retrieved from the `TransferObserver` object that is returned from upload or download function.

```kotlin
// Gets id of the transfer.
val transferId = transferObserver.id;
```

iOS - Swift

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

## Pause a Transfer

Android - Java

Transfers can be paused using the `pause(transferId)` method. If your app is terminated, crashes, or loses Internet connectivity, transfers are automatically paused.

The `transferId` can be retrieved from the `TransferObserver` object as described in :ref:`native-track-progress-and-completion-of-a-transfer`.

To pause a single transfer:
```java
transferUtility.pause(idOfTransferToBePaused);
```

To pause all uploads:

```java
transferUtility.pauseAllWithType(TransferType.UPLOAD);
```

To pause all downloads:

```java
transferUtility.pauseAllWithType(TransferType.DOWNLOAD);
```

To pause all transfers of any type:

```java
transferUtility.pauseAllWithType(TransferType.ANY);
```

Android - Kotlin

Transfers can be paused using the `pause(transferId)` method. If your app is terminated, crashes, or loses Internet connectivity, transfers are automatically paused.

The `transferId` can be retrieved from the `TransferObserver` object as described in :ref:`native-track-progress-and-completion-of-a-transfer`.

To pause a single transfer:

```kotlin
transferUtility.pause(idOfTransferToBePaused);
```

To pause all uploads:

```kotlin
transferUtility.pauseAllWithType(TransferType.UPLOAD);
```

To pause all downloads:

```kotlin
transferUtility.pauseAllWithType(TransferType.DOWNLOAD);
```

To pause all transfers of any type:

```kotlin
transferUtility.pauseAllWithType(TransferType.ANY);
```

iOS - Swift

To pause or suspend a transfer, retain references to `AWSS3TransferUtilityUploadTask`, `AWSS3TransferUtilityMultiPartUploadTask` or `AWSS3TransferUtilityDownloadTask` .

As described in the previous section :ref:`native-track-progress-and-completion-of-a-transfer`, the variable `refUploadTask` is a reference to the `UploadTask` object that is retrieved from the `continueWith` block of an upload operation that is invoked through `transferUtility.uploadData`.

To pause a transfer, use the `suspend` method:

```swift
refUploadTask.suspend()
```

## Resume a Transfer

Android - Java

In the case of a loss in network connectivity, transfers will automatically resume when network connectivity is restored. If the app crashed or was terminated by the operating system, transfers can be resumed with the `resume(transferId)` method.

The `transferId` can be retrieved from the `TransferObserver` object as described in :ref:`native-track-progress-and-completion-of-a-transfer`.

To resume a single transfer:

```java
transferUtility.resume(idOfTransferToBeResumed);
```
To resume all uploads:

```java
transferUtility.resumeAllWithType(TransferType.UPLOAD);
```

To resume all downloads:

```java
transferUtility.resumeAllWithType(TransferType.DOWNLOAD);
```

To resume all transfers of any type:

```java
transferUtility.resumeAllWithType(TransferType.ANY);
```

Android - Kotlin

In the case of a loss in network connectivity, transfers will automatically resume when network connectivity is restored. If the app crashed or was terminated by the operating system, transfers can be resumed with the `resume(transferId)` method.

The `transferId` can be retrieved from the `TransferObserver` object as described in :ref:`native-track-progress-and-completion-of-a-transfer`.

To resume a single transfer:

```kotlin
transferUtility.resume(idOfTransferToBeResumed);
```

To resume all uploads:

```kotlin

transferUtility.resumeAllWithType(TransferType.UPLOAD);
```

To resume all downloads:

```kotlin

transferUtility.resumeAllWithType(TransferType.DOWNLOAD);
```

To resume all transfers of any type:

```kotlin

transferUtility.resumeAllWithType(TransferType.ANY);
```

iOS - Swift

To resume an upload or a download operation, retain references to `AWSS3TransferUtilityUploadTask`, `AWSS3TransferUtilityMultiPartUploadTask` or `AWSS3TransferUtilityDownloadTask`.

As described in the previous section :ref:`native-track-progress-and-completion-of-a-transfer`, the variable `refUploadTask` is a reference to the `UploadTask` object that is retrieved from the `continueWith` block of an upload operation that is invoked through `transferUtility.uploadData`.

To resume a transfer, use the `resume` method:

```swift

refUploadTask.resume()
```

## Cancel a Transfer

Android - Java
To cancel an upload, call cancel() or cancelAllWithType() on the `TransferUtility` object.

The `transferId` can be retrieved from the `TransferObserver` object as described in :ref:`native-track-progress-and-completion-of-a-transfer`.

To cancel a single transfer, use:

```java

transferUtility.cancel(idToBeCancelled);
```

To cancel all transfers of a certain type, use:

```java

transferUtility.cancelAllWithType(TransferType.DOWNLOAD);
```
Android - Kotlin

To cancel an upload, call cancel() or cancelAllWithType() on the `TransferUtility` object.

The `transferId` can be retrieved from the `TransferObserver` object as described in :ref:`native-track-progress-and-completion-of-a-transfer`.

To cancel a single transfer, use:

```kotlin

transferUtility.cancel(idToBeCancelled);
```
To cancel all transfers of a certain type, use:

```kotlin

transferUtility.cancelAllWithType(TransferType.DOWNLOAD);
```

iOS - Swift

To cancel an upload or a download operation, retain references to `AWSS3TransferUtilityUploadTask`, `AWSS3TransferUtilityMultiPartUploadTask` and `AWSS3TransferUtilityDownloadTask`.

As described in the previous section :ref:`native-track-progress-and-completion-of-a-transfer`, the variable `refUploadTask` is a reference to the `UploadTask` object that is retrieved from the `continueWith` block of an upload operation that is invoked through `transferUtility.uploadData`.

To cancel a transfer, use the `cancel` method:

```swift

refUploadTask.cancel()
```

## Background Transfers

The SDK supports uploading to and downloading from Amazon S3 while your app is running in the background.

Android - Java
No additional work is needed to use this feature. As long as your app is present in the background a transfer that is in progress will continue.

Android - Kotlin
No additional work is needed to use this feature. As long as your app is present in the background a transfer that is in progress will continue.

iOS - Swift
**Configure the Application Delegate**

The `TransferUtility` for iOS uses NSURLSession background transfers to continue data transfers even when your app moves to the background. Call the following method in the `- application:handleEventsForBackgroundURLSession: completionHandler:` of your application delegate.
When the app moves the foreground, the delegate enables iOS to notify TransferUtility that a transfer has completed.

```swift

func application(_ application: UIApplication, handleEventsForBackgroundURLSession identifier: String, completionHandler: @escaping () -> Void) {
    // Store the completion handler.
    AWSS3TransferUtility.interceptApplication(application, handleEventsForBackgroundURLSession: identifier, completionHandler: completionHandler)
}
```

**Manage a Transfer with the App in the Foreground**

To manage transfers for an app that has moved from the background to the foreground, retain references to `AWSS3TransferUtilityUploadTask`, `AWSS3TransferUtilityMultiPartUploadTask` and `AWSS3TransferUtilityDownloadTask`. Call suspend, resume, or cancel methods on those task references. The following example shows how to suspend a transfer when the app is about to be terminated.

```swift
transferUtility.uploadFile(fileURL,
        bucket: S3BucketName,
        key: S3UploadKeyName,
        contentType: "image/png",
        expression: nil,
        completionHandler: nil).continueWith {
            (task) -> AnyObject! in if let error = task.error {
                print("Error: \(error.localizedDescription)")
            }

            if let uploadTask = task.result {
                uploadTask.suspend()
            }

            return nil;
        }
```

**Manage a Transfer when a Suspended App Returns to the Foreground**

When an app that has initiated a transfer becomes suspended and then returns to the foreground, the transfer may still be in progress or may have completed. In both cases, use the following code to reestablish the progress and completion handler blocks of the app.

This code example is for downloading a file but the same pattern can be used for upload:

You can get a reference to the `AWSS3TransferUtilityUploadTask`, `AWSS3TransferUtilityMultiPartUploadTask` and `AWSS3TransferUtilityDownloadTask` objects from the task.result in continueWith block when you initiate the upload and download respectively. These tasks have a property called taskIdentifier, which uniquely identifies the transfer task object within the `AWSS3TransferUtility`. Your app should persist the identifier through closure and relaunch, so that you can uniquely identify the task objects when the app comes back into the foreground.

```swift

let transferUtility = AWSS3TransferUtility.default()

var uploadProgressBlock: AWSS3TransferUtilityProgressBlock? = {(task: AWSS3TransferUtilityTask, progress: Progress) in
    DispatchQueue.main.async {
        // Handle progress feedback, e.g. update progress bar
    }
}


var downloadProgressBlock: AWSS3TransferUtilityProgressBlock? = {
    (task: AWSS3TransferUtilityTask, progress: Progress) in DispatchQueue.main.async {
        // Handle progress feedback, e.g. update progress bar
    }
}
var completionBlockUpload:AWSS3TransferUtilityUploadCompletionHandlerBlock? = {
    (task, error) in DispatchQueue.main.async {
        // perform some action on completed upload operation
    }
}
var completionBlockDownload:AWSS3TransferUtilityDownloadCompletionHandlerBlock? = {
    (task, url, data, error) in DispatchQueue.main.async {
        // perform some action on completed download operation
    }
}



transferUtility.enumerateToAssignBlocks(forUploadTask: {
    (task, progress, completion) -> Void in

        let progressPointer = AutoreleasingUnsafeMutablePointer<AWSS3TransferUtilityProgressBlock?>(& uploadProgressBlock)

        let completionPointer = AutoreleasingUnsafeMutablePointer<AWSS3TransferUtilityUploadCompletionHandlerBlock?>(&completionBlockUpload)

        // Reassign your progress feedback
        progress?.pointee = progressPointer.pointee

        // Reassign your completion handler.
        completion?.pointee = completionPointer.pointee

}, downloadTask: {
    (task, progress, completion) -> Void in

        let progressPointer = AutoreleasingUnsafeMutablePointer<AWSS3TransferUtilityProgressBlock?>(&downloadProgressBlock)

        let completionPointer = AutoreleasingUnsafeMutablePointer<AWSS3TransferUtilityDownloadCompletionHandlerBlock?>(&completionBlockDownload)

        // Reassign your progress feedback
        progress?.pointee = progressPointer.pointee

        // Reassign your completion handler.
        completion?.pointee = completionPointer.pointee
})

 if let downloadTask = task.result {
    // Do something with downloadTask.
}
```

## Advanced Transfer Methods

### Transfer with Object Metadata

Android - Java

To upload a file with metadata, use the `ObjectMetadata` object. Create a `ObjectMetadata` object and add in the metadata headers and pass it to the upload function.

```java

import com.amazonaws.services.s3.model.ObjectMetadata;

ObjectMetadata myObjectMetadata = new ObjectMetadata();

//create a map to store user metadata
Map<String, String> userMetadata = new HashMap<String,String>();
userMetadata.put("myKey","myVal");

//call setUserMetadata on our ObjectMetadata object, passing it our map
myObjectMetadata.setUserMetadata(userMetadata);
```

Then, upload an object along with its metadata:

```java

TransferObserver observer = transferUtility.upload(
  MY_BUCKET,        /* The bucket to upload to */
  OBJECT_KEY,       /* The key for the uploaded object */
  MY_FILE,          /* The file where the data to upload exists */
  myObjectMetadata  /* The ObjectMetadata associated with the object*/
);
```

To download the meta, use the S3 `getObjectMetadata` method. For more information, see the [API Reference](http://docs.aws.amazon.com/AWSAndroidSDK/latest/javadoc/com/amazonaws/services/s3/AmazonS3Client.html#getObjectMetadata%28com.amazonaws.services.s3.model.GetObjectMetadataRequest%29).

Android - Kotlin

To upload a file with metadata, use the `ObjectMetadata` object. Create a `ObjectMetadata` object and add in the metadata headers and pass it to the upload function.

```kotlin

import com.amazonaws.services.s3.model.ObjectMetadata;

val myObjectMetadata = new ObjectMetadata()
myObjectMetadata.userMetadata = mapOf("myKey" to "myVal")
```

Then, upload an object along with its metadata:

```kotlin

val observer = transferUtility.upload(
  MY_BUCKET,        /* The bucket to upload to */
  OBJECT_KEY,       /* The key for the uploaded object */
  MY_FILE,          /* The file where the data to upload exists */
  myObjectMetadata  /* The ObjectMetadata associated with the object*/
)
```

To download the meta, use the S3 `getObjectMetadata` method. For more information, see the [API Reference](http://docs.aws.amazon.com/AWSAndroidSDK/latest/javadoc/com/amazonaws/services/s3/AmazonS3Client.html#getObjectMetadata%28com.amazonaws.services.s3.model.GetObjectMetadataRequest%29).

iOS - Swift

`AWSS3TransferUtilityUploadExpression` and `AWSS3TransferUtilityMultiPartUploadExpression` contain the method `setValue:forRequestHeader` where you can pass in metadata to Amazon S3. This example demonstrates passing in the Server-side Encryption Algorithm as a request header in uploading data to S3 using MultiPart.

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

Android - Java

To upload a file with Access Control List, use the `CannedAccessControlList` object. The [CannedAccessControlList](http://docs.aws.amazon.com/AWSAndroidSDK/latest/javadoc/com/amazonaws/services/s3/model/CannedAccessControlList.html) specifies the constants defining a canned access control list. For example, if you use [CannedAccessControlList.PublicRead](http://docs.aws.amazon.com/AWSAndroidSDK/latest/javadoc/com/amazonaws/services/s3/model/CannedAccessControlList.html#PublicRead) , this specifies the owner is granted `Permission.FullControl` and the `GroupGrantee.AllUsers` group grantee is granted Permission.Read access.

Then, upload an object along with its ACL:

```java

TransferObserver observer = transferUtility.upload(
  MY_BUCKET,                          /* The bucket to upload to */
  OBJECT_KEY,                         /* The key for the uploaded object */
  MY_FILE,                            /* The file where the data to upload exists */
  CannedAccessControlList.PublicRead  /* Specify PublicRead ACL for the object in the bucket. */
);
```

Android - Kotlin

To upload a file with Access Control List, use the `CannedAccessControlList` object. The [CannedAccessControlList](http://docs.aws.amazon.com/AWSAndroidSDK/latest/javadoc/com/amazonaws/services/s3/model/CannedAccessControlList.html) specifies the constants defining a canned access control list. For example, if you use [CannedAccessControlList.PublicRead](http://docs.aws.amazon.com/AWSAndroidSDK/latest/javadoc/com/amazonaws/services/s3/model/CannedAccessControlList.html#PublicRead) , this specifies the owner is granted `Permission.FullControl` and the `GroupGrantee.AllUsers` group grantee is granted Permission.Read access.

Then, upload an object along with its ACL:

```kotlin

val observer = transferUtility.upload(
  MY_BUCKET,                          /* The bucket to upload to */
  OBJECT_KEY,                         /* The key for the uploaded object */
  MY_FILE,                            /* The file where the data to upload exists */
  CannedAccessControlList.PublicRead  /* Specify PublicRead ACL for the object in the bucket. */
)
```

iOS - Swift

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

### Transfer Utility Options

Android - Java
You can use the `TransferUtilityOptions` object to customize the operations of the `TransferUtility`.

**TransferThreadPoolSize**
This parameter will let you specify the number of threads in the thread pool for transfers. By increasing the number of threads, you will be able to increase the number of parts of a multi-part upload that will be uploaded in parallel. By default, this is set to 2 * (N + 1), where N is the number of available processors on the mobile device. The minimum allowed value is 2.

```java
TransferUtilityOptions options = new TransferUtilityOptions();
options.setTransferThreadPoolSize(8);

TransferUtility transferUtility = TransferUtility.builder()
    // Pass-in S3Client, Context, AWSConfiguration/DefaultBucket Name
    .transferUtilityOptions(options)
    .build();
```

**TransferServiceCheckTimeInterval**
The `TransferUtility` monitors each on-going transfer by checking its status periodically. If a stalled transfer is detected, it will be automatically resumed by the `TransferUtility`. The TransferServiceCheckTimeInterval option allows you to set the time interval
between the status checks. It is specified in milliseconds and set to 60,000 by default.

```java
TransferUtilityOptions options = new TransferUtilityOptions();
options.setTransferServiceCheckTimeInterval(2 * 60 * 1000); // 2-minutes

TransferUtility transferUtility = TransferUtility.builder()
    // Pass-in S3Client, Context, AWSConfiguration/DefaultBucket Name
    .transferUtilityOptions(options)
    .build();
```

Android - Kotlin
You can use the `TransferUtilityOptions` object to customize the operations of the `TransferUtility`.

**TransferThreadPoolSize**
This parameter will let you specify the number of threads in the thread pool for transfers. By increasing the number of threads, you will be able to increase the number of parts of a multi-part upload that will be uploaded in parallel. By default, this is set to 2 * (N + 1), where N is the number of available processors on the mobile device. The minimum allowed value is 2.

```kotlin

val options = new TransferUtilityOptions().apply {
    transferThreadPoolSize = 8
}

val transferUtility = TransferUtility.builder()
    // Pass-in S3Client, Context, AWSConfiguration/DefaultBucket Name
    .transferUtilityOptions(options)
    .build()
```

**TransferServiceCheckTimeInterval**
The `TransferUtility` monitors each on-going transfer by checking its status periodically. If a stalled transfer is detected, it will be automatically resumed by the `TransferUtility`. The TransferServiceCheckTimeInterval option allows you to set the time interval
between the status checks. It is specified in milliseconds and set to 60,000 by default.

```kotlin

val options = new TransferUtilityOptions().apply {
    transferServiceCheckTimeInterval = 2 * 60 * 1000 // 2-minutes
}

val transferUtility = TransferUtility.builder()
    // Pass-in S3Client, Context, AWSConfiguration/DefaultBucket Name
    .transferUtilityOptions(options)
    .build()
```

iOS - Swift
You can use the `AWSS3TransferUtilityConfiguration` object to configure the operations of the `TransferUtility`.

**isAccelerateModeEnabled**
The isAccelerateModeEnabled option lets you to upload and download content from a bucket that has Transfer Acceleration enabled on it. See https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html for information on how to enable transfer acceleration for your bucket.

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
```

//Look up the transfer utility object from the registry to use for your transfers.
let transferUtility = AWSS3TransferUtility.s3TransferUtility(forKey: "transfer-utility-with-advanced-options")

* `YOUR-IDENTITY-POOL-REGION` should be in the form of `.USEast1`

* `YOUR-IDENTITY-POOL-ID` should be in the form of `us-east-1:01234567-yyyy-0123-xxxx-012345678901`

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

## More Transfer Examples

This section provides descriptions and abbreviated examples of the aspects of each type of transfer that are unique. For information about typical code surrounding the following snippets see `native-track-progress-and-completion-of-a-transfer`.

### Downloading to a File

The following code shows how to download an Amazon S3 Object to a local file.

Android - Java

```java
TransferObserver downloadObserver =
    transferUtility.download(
          "s3Folder/s3Key.txt",
          new File("/path/to/file/localFile.txt"));

downloadObserver.setTransferListener(new TransferListener() {

     @Override
     public void onStateChanged(int id, TransferState state) {
        if (TransferState.COMPLETED == state) {
           // Handle a completed download.
        }
     }

     @Override
     public void onProgressChanged(int id, long bytesCurrent, long bytesTotal) {
           float percentDonef = ((float)bytesCurrent/(float)bytesTotal) * 100;
           int percentDone = (int)percentDonef;

           Log.d("MainActivity", "   ID:" + id + "   bytesCurrent: " + bytesCurrent + "   bytesTotal: " + bytesTotal + " " + percentDone + "%");
     }

     @Override
     public void onError(int id, Exception ex) {
        // Handle errors
     }

});
```

Android - Kotlin

```kotlin
val observer = transferUtility.download(
          "s3Folder/s3Key.txt",
          new File("/path/to/file/localFile.txt"))
observer.transferListener = object : TransferListener() {
    override fun onStateChanged(id: int, state: TransferState) {
        if (state == TransferState.COMPLETED) {
            // Handle a completed download
        }
    }

    override fun onProgressChanged(id: Int, current: Long, total: Long) {
        val done = ((current / total) * 100.0) as Int
        // Do something
    }

    override fun onError(id: Int, ex: Exception) {
        // Do something
    }
}
```

iOS - Swift

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

Android - Java
Use the following code to upload binary data to a file in Amazon S3.

```java
TransferObserver uploadObserver =
        transferUtility.upload(
              "s3Folder/s3Key.bin",
              new File("/path/to/file/localFile.bin"));

uploadObserver.setTransferListener(new TransferListener() {

     @Override
     public void onStateChanged(int id, TransferState state) {
        if (TransferState.COMPLETED == state) {
           // Handle a completed upload.
        }
     }

     @Override
     public void onProgressChanged(int id, long bytesCurrent, long bytesTotal) {
           float percentDonef = ((float)bytesCurrent/(float)bytesTotal) * 100;
           int percentDone = (int)percentDonef;

           Log.d("MainActivity", "   ID:" + id + "   bytesCurrent: " + bytesCurrent + "   bytesTotal: " + bytesTotal + " " + percentDone + "%");
     }

     @Override
     public void onError(int id, Exception ex) {
        // Handle errors
     }

});
```

Android - Kotlin
Use the following code to upload binary data to a file in Amazon S3.

```kotlin
val observer = transferUtility.upload(
          "s3Folder/s3Key.bin",
          new File("/path/to/file/localFile.bin"))
observer.transferListener = object : TransferListener() {
    override fun onStateChanged(id: int, state: TransferState) {
        if (state == TransferState.COMPLETED) {
            // Handle a completed download
        }
    }

    override fun onProgressChanged(id: Int, current: Long, total: Long) {
        val done = ((current / total) * 100.0) as Int
        // Do something
    }

    override fun onError(id: Int, ex: Exception) {
        // Do something
    }
}
```

iOS - Swift
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

Android - Java
```java

TransferObserver downloadObserver =
    transferUtility.download(
          "s3Folder/s3Key.bin",
          new File("/path/to/file/localFile.bin"));

downloadObserver.setTransferListener(new TransferListener() {

     @Override
     public void onStateChanged(int id, TransferState state) {
        if (TransferState.COMPLETED == state) {
           // Handle a completed download.
        }
     }
     @Override
     public void onProgressChanged(int id, long bytesCurrent, long bytesTotal) {
           float percentDonef = ((float)bytesCurrent/(float)bytesTotal) * 100;
           int percentDone = (int)percentDonef;

           Log.d("MainActivity", "   ID:" + id + "   bytesCurrent: " + bytesCurrent + "   bytesTotal: " + bytesTotal + " " + percentDone + "%");
     }

     @Override
     public void onError(int id, Exception ex) {
        // Handle errors
     }

});
```

Android - Kotlin
```kotlin

val observer = transferUtility.download(
          "s3Folder/s3Key.bin",
          new File("/path/to/file/localFile.bin"))
observer.transferListener = object : TransferListener() {
    override fun onStateChanged(id: int, state: TransferState) {
        if (state == TransferState.COMPLETED) {
            // Handle a completed download
        }
    }

    override fun onProgressChanged(id: Int, current: Long, total: Long) {
        val done = ((current / total) * 100.0) as Int
        // Do something
    }

    override fun onError(id: Int, ex: Exception) {
        // Do something
    }
}
```
iOS - Swift
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

## Limitations

Android - Java

If you expect your app to perform transfers that take longer than 50 minutes, use [AmazonS3Client](http://docs.aws.amazon.com/AWSAndroidSDK/latest/javadoc/com/amazonaws/services/s3/AmazonS3Client.html) instead of [TransferUtility](http://docs.aws.amazon.com/AWSAndroidSDK/latest/javadoc/com/amazonaws/mobileconnectors/s3/transferutility/TransferUtility.html).

`TransferUtility` generates Amazon S3 pre-signed URLs to use for background data transfer. Using |COG| Identity, you receive AWS temporary credentials. The credentials are valid for up to 60 minutes. Generated Amazon S3 pre-signed URLs cannot last longer than that time. Because of this limitation, the Amazon S3 Transfer Utility enforces 50 minute transfer timeouts, leaving a 10 minute buffer before AWS temporary credentials are regenerated. After **50 minutes**, you receive a transfer failure.

Android - Kotlin

If you expect your app to perform transfers that take longer than 50 minutes, use [AmazonS3Client](http://docs.aws.amazon.com/AWSAndroidSDK/latest/javadoc/com/amazonaws/services/s3/AmazonS3Client.html) instead of [TransferUtility](http://docs.aws.amazon.com/AWSAndroidSDK/latest/javadoc/com/amazonaws/mobileconnectors/s3/transferutility/TransferUtility.html).

`TransferUtility` generates Amazon S3 pre-signed URLs to use for background data transfer. Using |COG| Identity, you receive AWS temporary credentials. The credentials are valid for up to 60 minutes. Generated Amazon S3 pre-signed URLs cannot last longer than that time. Because of this limitation, the Amazon S3 Transfer Utility enforces 50 minute transfer timeouts, leaving a 10 minute buffer before AWS temporary credentials are regenerated. After **50 minutes**, you receive a transfer failure.

iOS - Swift

If you expect your app to perform transfers that take longer than 50 minutes, use [AWSS3](https://docs.aws.amazon.com/AWSiOSSDK/latest/Classes/AWSS3.html) instead of [AWSS3TransferUtility](https://docs.aws.amazon.com/AWSiOSSDK/latest/Classes/AWSS3TransferUtility.html).

`AWSS3TransferUtility` generates Amazon S3 pre-signed URLs to use for background data transfer. Using Amazon Cognito Identity, you receive AWS temporary credentials. The credentials are valid for up to 60 minutes. At the same time, generated S3 pre-signed URLs cannot last longer than that time. Because of this limitation, the AWSS3TransferUtility enforces **50 minutes** transfer timeout, leaving a 10 minute buffer before AWS temporary credentials are regenerated. After 50 minutes, you receive a transfer failure.
