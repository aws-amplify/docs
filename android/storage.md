# Storage
<div class="nav-tab create" data-group='create'>
<ul class="tabs">
    <li class="tab-link java current" data-tab="java">Java</li>
    <li class="tab-link kotlin" data-tab="kotlin">Kotlin</li>
</ul>
## Add User File Storage to Your Mobile App with Amazon S3

### Note

`TransferService` in version `2.7.0` will only have the responsibility of listening to network connectivity changes. When network goes offline, the transfers that are in progress will be paused. When network comes back online, the transfers that are paused will be resumed. The `TransferService` will not be started or stopped by `TransferUtility` anymore. You have to start `TransferService` manually from your application. A recommended way is to start the service upon Application startup. One way you can do this is to include the following line in the :code:`onCreate` method of your app's Application class.

```java
getApplicationContext().startService(new Intent(getApplicationContext(), TransferService.class));
```

See [Limitations of TransferUtility](./transfer-utility-limitations) for further details.

### Overview

Enable your app to store and retrieve user files from cloud storage with the permissions model that suits your purpose. The CLI deploys and configures cloud storage buckets using [Amazon Simple Storage Service](http://docs.aws.amazon.com/AmazonS3/latest/dev/).

### Storage Access

The CLI configures three different access levels on the storage bucket; public, protected and private.

- Files with public access level can be accessed by all users who are using your app. In S3, they are stored under the ``public/`` path in your S3 bucket.

- Files with protected access level are readable by all users but writable only by the creating user. In S3, they are stored under ``protected/{user_identity_id}/`` where the user_identity_id corresponds to a unique Amazon Cognito Identity ID for that user.

- Files with private access level are only accessible for specific authenticated users only. In S3, they are stored under ``private/{user_identity_id}/`` where the user_identity_id corresponds to a unique Amazon Cognito Identity ID for that user.

### Set Up Your Backend

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

### Connect to Your Backend

Use the following steps to connect add file storage backend services to your app.

1. Add the following to `app/build.gradle` (Module:app):

	```groovy
	dependencies {
	  implementation 'com.amazonaws:aws-android-sdk-s3:2.7.+'
	  implementation ('com.amazonaws:aws-android-sdk-mobile-client:2.7.+@aar') { transitive = true }
	  implementation ('com.amazonaws:aws-android-sdk-auth-userpools:2.7.+@aar') { transitive = true }
	}
	```
	Perform a `Gradle Sync` to download the AWS Mobile SDK components into your app.

2. Add the following to `AndroidManifest.xml`:

	```xml
	<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

	<service android:name="com.amazonaws.mobileconnectors.s3.transferutility.TransferService" android:enabled="true" />
	```

### Upload a File

To upload a file to an Amazon S3 bucket, use `AWSMobileClient` to get the `AWSConfiguration` and `AWSCredentialsProvider`,
and then create the `TransferUtility` object. `AWSMobileClient` expects an activity context for resuming an authenticated session and creating the credentials provider.

The following example shows how to use the `TransferUtility` in the context of an Activity.
If you are creating `TransferUtility` from an application context, you can construct the `AWSCredentialsProvider` and pass it into `TransferUtility` to use in forming the `AWSConfiguration` object. `TransferUtility` checks the size of the file being uploaded and automatically switches over to using multi-part uploads if the file size exceeds 5 MB.
<div id="java" class="tab-content current">
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

    public void uploadWithTransferUtility() {

        TransferUtility transferUtility =
            TransferUtility.builder()
                .context(getApplicationContext())
                .awsConfiguration(AWSMobileClient.getInstance().getConfiguration())
                .s3Client(new AmazonS3Client(AWSMobileClient.getInstance().getCredentialsProvider()))
                .build();

        TransferObserver uploadObserver =
            transferUtility.upload(
                "public/s3Key.txt",
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
</div>

<div id="kotlin" class="tab-content">
```kotlin
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.util.Log
import com.amazonaws.AmazonServiceException
import com.amazonaws.mobile.client.AWSMobileClient
import com.amazonaws.mobileconnectors.s3.transferutility.TransferListener
import com.amazonaws.mobileconnectors.s3.transferutility.TransferState
import com.amazonaws.mobileconnectors.s3.transferutility.TransferUtility
import com.amazonaws.services.s3.AmazonS3Client
import kotlinx.android.synthetic.main.activity_main.*
import java.io.File;

class YourActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        AWSMobileClient.getInstance().initialize(this).execute()
        uploadWithTransferUtility()
    }

    fun uploadWithTransferUtility() {
        val transferUtility = TransferUtility.builder()
            .context(this.applicationContext)
            .awsConfiguration(AWSMobileClient.getInstance().configuration)
            .s3Client(AmazonS3Client(AWSMobileClient.getInstance().credentialsProvider))
            .build()

        val uploadObserver = transferUtility.upload("public/s3key.txt", File("/path/to/localfile.txt"))

        // Attach a listener to the observer
        uploadObserver.setTransferListener(object : TransferListener {
            override fun onStateChanged(id: Int, state: TransferState) {
                if (state == TransferState.COMPLETED) {
                    // Handle a completed upload
                }
            }

            override fun onProgressChanged(id: Int, current: Long, total: Long) {
                val done = (((current.toDouble() / total) * 100.0).toInt())
                Log.d("Your Activity", "UPLOAD - - ID: $id, percent done = $done")
            }

            override fun onError(id: Int, ex: Exception) {
                Log.d("Your Activity", "UPLOAD ERROR - - ID: $id - - EX: ${ex.message.toString()}")
            }
        })

        // If you prefer to long-poll for updates
        if (uploadObserver.state == TransferState.COMPLETED) {
            /* Handle completion */
        }

        val bytesTransferred = uploadObserver.bytesTransferred
    }
}
```
</div>

### Download a File

To download a file from an Amazon S3 bucket, use `AWSMobileClient`
to get the `AWSConfiguration` and `AWSCredentialsProvider` to create the `TransferUtility` object.
`AWSMobileClient` expects an activity context for resuming an authenticated session and creating the :code:`AWSCredentialsProvider`.

The following example shows how to use the `TransferUtility` in the context of an Activity.
If you are creating `TransferUtility` from an application context, you can construct the `AWSCredentialsProvider` and
pass it into `TransferUtility` to use in forming the `AWSConfiguration` object.
<div id="java" class="tab-content current">
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

    private void downloadWithTransferUtility() {

        TransferUtility transferUtility =
            TransferUtility.builder()
                    .context(getApplicationContext())
                    .awsConfiguration(AWSMobileClient.getInstance().getConfiguration())
                    .s3Client(new AmazonS3Client(AWSMobileClient.getInstance().getCredentialsProvider()))
                    .build();

        TransferObserver downloadObserver =
            transferUtility.download(
                    "public/s3Key.txt",
                    new File("/path/to/file/localFile.txt"));

        // Attach a listener to the observer to get state update and progress notifications
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

                    Log.d("Your Activity", "   ID:" + id + "   bytesCurrent: " + bytesCurrent + "   bytesTotal: " + bytesTotal + " " + percentDone + "%");
            }

            @Override
            public void onError(int id, Exception ex) {
                // Handle errors
            }

        });

        // If you prefer to poll for the data, instead of attaching a
        // listener, check for the state and progress in the observer.
        if (TransferState.COMPLETED == downloadObserver.getState()) {
            // Handle a completed upload.
        }

        Log.d("Your Activity", "Bytes Transferred: " + downloadObserver.getBytesTransferred());
        Log.d("Your Activity", "Bytes Total: " + downloadObserver.getBytesTotal());
    }
}
```
</div>
<div id="kotlin" class="tab-content">
```kotlin
import android.app.Activity;
import android.util.Log;

import com.amazonaws.mobile.client.AWSMobileClient;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferUtility;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferState;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferObserver;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferListener;
import com.amazonaws.services.s3.AmazonS3Client;

import java.io.File;

class YourActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        AWSMobileClient.getInstance().initialize(this).execute()
        downloadWithTransferUtility()
    }

    private fun downloadWithTransferUtility() {
        val transferUtility = TransferUtility.builder()
            .context(applicationContext)
            .awsConfiguration(AWSMobileClient.getInstance().configuration)
            .s3Client(AmazonS3Client(AWSMobileClient.getInstance().credentialsProvider))
            .build()

        val downloadObserver = transferUtility.download(
            "public/s3key.txt",
            File("/path/to/file/localfile.txt"))

        // Attach a listener to get state updates
        downloadObserver.setTransferListener(object : TransferListener {
            override fun onStateChanged(id: Int, state: TransferState) {
                if (state == TransferState.COMPLETED) {
                    // Handle a completed upload.
                }
            }

            override fun onProgressChanged(id: Int, current: Long, total: Long) {
                try {
                    val done = (((current.toDouble() / total) * 100.0).toInt()) //as Int
                    Log.d("Your Activity", "DOWNLOAD - - ID: $id, percent done = $done")
                }
                catch (e: Exception) {
                    Log.e("Your Activity", "Trouble calculating progress percent", e)
                }
            }

            override fun onError(id: Int, ex: Exception) {
                Log.d("Your Activity", "DOWNLOAD ERROR - - ID: $id - - EX: ${ex.message.toString()}")
            }
        })

        // If you prefer to poll for the data, instead of attaching a
        // listener, check for the state and progress in the observer.
        if (downloadObserver.state == TransferState.COMPLETED) {
            // Handle a completed upload.
        }

        Log.d("Your Activity", "Bytes Transferred: ${downloadObserver.bytesTransferred}");
    }
}
```
</div>

## Transfer Files and Data Using TransferUtility and Amazon S3

**Just Getting Started?** | [Use streamlined steps](./add-aws-mobile-user-data-storage) to install the SDK and integrate Amazon S3.
------------ | -------------

*Or, use the contents of this page if your app will integrate existing AWS services.*

This page explains how to implement upload and download functionality and a number of additional storage use cases.

The examples on this page assume you have added the AWS Mobile SDK to your mobile app. To create a new cloud storage backend for your app, see [Add User File Storage] (./add-aws-mobile-user-data-storage).

**Best practice** | If you use the transfer utility multipart upload feature, take advantage of automatic cleanup features by setting up the [AbortIncompleteMultipartUpload] (https://docs.aws.amazon.com/AmazonS3/latest/dev/intro-lifecycle-rules.html) action in your Amazon S3 bucket life cycle configuration.
------------ | -------------

### Upload a File

<div id="java" class="tab-content current">

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
</div>

<div id="kotlin" class="tab-content">

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
</div>

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

### Download a File

<div id="java" class="tab-content current">

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
</div>

<div id="kotlin" class="tab-content">

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
</div>

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

### Track Transfer Progress

<div id="java" class="tab-content current">

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
</div>

<div id="kotlin" class="tab-content">

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
</div>

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

### Pause a Transfer

<div id="java" class="tab-content current">

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
</div>

<div id="kotlin" class="tab-content">

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
</div>

iOS - Swift

To pause or suspend a transfer, retain references to `AWSS3TransferUtilityUploadTask`, `AWSS3TransferUtilityMultiPartUploadTask` or `AWSS3TransferUtilityDownloadTask` .

As described in the previous section :ref:`native-track-progress-and-completion-of-a-transfer`, the variable `refUploadTask` is a reference to the `UploadTask` object that is retrieved from the `continueWith` block of an upload operation that is invoked through `transferUtility.uploadData`.

To pause a transfer, use the `suspend` method:

```swift
refUploadTask.suspend()
```

### Resume a Transfer

<div id="java" class="tab-content current">

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
</div>

<div id="kotlin" class="tab-content">

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
</div>

iOS - Swift

To resume an upload or a download operation, retain references to `AWSS3TransferUtilityUploadTask`, `AWSS3TransferUtilityMultiPartUploadTask` or `AWSS3TransferUtilityDownloadTask`.

As described in the previous section :ref:`native-track-progress-and-completion-of-a-transfer`, the variable `refUploadTask` is a reference to the `UploadTask` object that is retrieved from the `continueWith` block of an upload operation that is invoked through `transferUtility.uploadData`.

To resume a transfer, use the `resume` method:

```swift

refUploadTask.resume()
```

### Cancel a Transfer

<div id="java" class="tab-content current">
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

</div>

<div id="kotlin" class="tab-content">

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
</div>

### Background Transfers

The SDK supports uploading to and downloading from Amazon S3 while your app is running in the background.

<div id="java" class="tab-content current">
No additional work is needed to use this feature. As long as your app is present in the background a transfer that is in progress will continue.
</div>

<div id="kotlin" class="tab-content">
No additional work is needed to use this feature. As long as your app is present in the background a transfer that is in progress will continue.
</div>

### Advanced Transfer Methods

#### Transfer with Object Metadata

<div id="java" class="tab-content current">

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
</div>

<div id="kotlin" class="tab-content">

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
</div>

#### Transfer with Access Control List

<div id="java" class="tab-content current">
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
</div>

<div id="kotlin" class="tab-content">

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
</div>

#### Transfer Utility Options

<div id="java" class="tab-content current">
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
</div>

<div id="kotlin" class="tab-content">
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
</div>

### More Transfer Examples

This section provides descriptions and abbreviated examples of the aspects of each type of transfer that are unique. For information about typical code surrounding the following snippets see `native-track-progress-and-completion-of-a-transfer`.

#### Downloading to a File

The following code shows how to download an Amazon S3 Object to a local file.

<div id="java" class="tab-content current">

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
</div>

<div id="kotlin" class="tab-content">

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
</div>

#### Uploading Binary Data to a File

<div id="java" class="tab-content current">
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
</div>

<div id="kotlin" class="tab-content">
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
</div>

#### Downloading Binary Data to a File

The following code shows how to download a binary file.

<div id="java" class="tab-content current">
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
</div>

<div id="kotlin" class="tab-content">

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
</div>

### Limitations

<div id="java" class="tab-content current">

If you expect your app to perform transfers that take longer than 50 minutes, use [AmazonS3Client](http://docs.aws.amazon.com/AWSAndroidSDK/latest/javadoc/com/amazonaws/services/s3/AmazonS3Client.html) instead of [TransferUtility](http://docs.aws.amazon.com/AWSAndroidSDK/latest/javadoc/com/amazonaws/mobileconnectors/s3/transferutility/TransferUtility.html).

`TransferUtility` generates Amazon S3 pre-signed URLs to use for background data transfer. Using Amazon Cognito Identity, you receive AWS temporary credentials. The credentials are valid for up to 60 minutes. Generated Amazon S3 pre-signed URLs cannot last longer than that time. Because of this limitation, the Amazon S3 Transfer Utility enforces 50 minute transfer timeouts, leaving a 10 minute buffer before AWS temporary credentials are regenerated. After **50 minutes**, you receive a transfer failure.

</div>

<div id="kotlin" class="tab-content">

If you expect your app to perform transfers that take longer than 50 minutes, use [AmazonS3Client](http://docs.aws.amazon.com/AWSAndroidSDK/latest/javadoc/com/amazonaws/services/s3/AmazonS3Client.html) instead of [TransferUtility](http://docs.aws.amazon.com/AWSAndroidSDK/latest/javadoc/com/amazonaws/mobileconnectors/s3/transferutility/TransferUtility.html).

`TransferUtility` generates Amazon S3 pre-signed URLs to use for background data transfer. Using Amazon Cognito Identity, you receive AWS temporary credentials. The credentials are valid for up to 60 minutes. Generated Amazon S3 pre-signed URLs cannot last longer than that time. Because of this limitation, the Amazon S3 Transfer Utility enforces 50 minute transfer timeouts, leaving a 10 minute buffer before AWS temporary credentials are regenerated. After **50 minutes**, you receive a transfer failure.
</div>

## Next Steps

* For sample apps that demonstrate TransferUtility capabilities, see [Android S3 TransferUtility Sample](https://github.com/awslabs/aws-sdk-android-samples/tree/master/S3TransferUtilitySample).
* Looking for Amazon Cognito Sync? If you are a new user, use [AWS AppSync](https://aws.amazon.com/appsync/) instead. AppSync is a new service for synchronizing application data across devices. Like Cognito Sync, AppSync enables synchronization of a user's own data, such as game state or app preferences. AppSync extends these capabilities by allowing multiple users to synchronize and collaborate in real time on shared data, such as a virtual meeting space or chat room. [Start building with AWS AppSync now](https://aws.amazon.com/appsync/)
