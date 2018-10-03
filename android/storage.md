# Add User File Storage to Your Mobile App with Amazon S3

# Note

`TransferService` in version `2.7.0` will only have the responsibility of listening to network connectivity changes. When network goes offline, the transfers that are in progress will be paused. When network comes back online, the transfers that are paused will be resumed. The `TransferService` will not be started or stopped by `TransferUtility` anymore. You have to start `TransferService` manually from your application. A recommended way is to start the service upon Application startup. One way you can do this is to include the following line in the :code:`onCreate` method of your app's Application class.

```java
getApplicationContext().startService(new Intent(getApplicationContext(), TransferService.class));
```

See [Limitations of TransferUtility](./transfer-utility-limitations) for further details.

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

## Connect to Your Backend

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

## Upload a File

To upload a file to an Amazon S3 bucket, use `AWSMobileClient` to get the `AWSConfiguration` and `AWSCredentialsProvider`,
and then create the `TransferUtility` object. `AWSMobileClient` expects an activity context for resuming an authenticated session and creating the credentials provider.

The following example shows how to use the `TransferUtility` in the context of an Activity.
If you are creating `TransferUtility` from an application context, you can construct the `AWSCredentialsProvider` and pass it into `TransferUtility` to use in forming the `AWSConfiguration` object. `TransferUtility` checks the size of the file being uploaded and automatically switches over to using multi-part uploads if the file size exceeds 5 MB.

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

## Download a File

To download a file from an Amazon S3 bucket, use `AWSMobileClient`
to get the `AWSConfiguration` and `AWSCredentialsProvider` to create the `TransferUtility` object.
`AWSMobileClient` expects an activity context for resuming an authenticated session and creating the :code:`AWSCredentialsProvider`.

The following example shows how to use the `TransferUtility` in the context of an Activity.
If you are creating `TransferUtility` from an application context, you can construct the `AWSCredentialsProvider` and
    pass it into `TransferUtility` to use in forming the `AWSConfiguration` object.

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

Next Steps
==========

* For sample apps that demonstrate TransferUtility capabilities, see [Android S3 TransferUtility Sample](https://github.com/awslabs/aws-sdk-android-samples/tree/master/S3TransferUtilitySample).
* Looking for Amazon Cognito Sync? If you are a new user, use [AWS AppSync](https://aws.amazon.com/appsync/) instead. AppSync is a new service for synchronizing application data across devices. Like Cognito Sync, AppSync enables synchronization of a user's own data, such as game state or app preferences. AppSync extends these capabilities by allowing multiple users to synchronize and collaborate in real time on shared data, such as a virtual meeting space or chat room. [Start building with AWS AppSync now](https://aws.amazon.com/appsync/)
