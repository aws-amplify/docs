# Storage
<div class="nav-tab create" data-group='create'>
<ul class="tabs">
    <li class="tab-link java current" data-tab="java">Java</li>
</ul>

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

See [Authentication](authentication) for more information on how to get the `user_identity_id` for a signed in user.

### Set Up Your Backend

1. Complete the [Get Started](start) steps before you proceed.

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
        uploadWithTransferUtility();
    }

    public void uploadWithTransferUtility() {

        TransferUtility transferUtility =
            TransferUtility.builder()
                .context(getApplicationContext())
                .awsConfiguration(AWSMobileClient.getInstance().getConfiguration())
                .s3Client(new AmazonS3Client(AWSMobileClient.getInstance()))
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
                    .s3Client(new AmazonS3Client(AWSMobileClient.getInstance())
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

## Transfer Files and Data Using TransferUtility and Amazon S3

**Best practice** If you use the transfer utility multipart upload feature, take advantage of automatic cleanup features by setting up the [AbortIncompleteMultipartUpload](https://docs.aws.amazon.com/AmazonS3/latest/dev/intro-lifecycle-rules.html) action in your Amazon S3 bucket life cycle configuration.

**The code sample below manually sets up credentials for the TransferUtility. The best practice is to use the AWSMobileClient. See [Authentication](authentication) for more details**

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

### Pause a Transfer

<div id="java" class="tab-content current">

Transfers can be paused using the `pause(transferId)` method. If your app is terminated, crashes, or loses Internet connectivity, transfers are automatically paused.

The `transferId` can be retrieved from the `TransferObserver` object.

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

### Resume a Transfer

<div id="java" class="tab-content current">

In the case of a loss in network connectivity, transfers will automatically resume when network connectivity is restored. If the app crashed or was terminated by the operating system, transfers can be resumed with the `resume(transferId)` method.

The `transferId` can be retrieved from the `TransferObserver` object.

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

### Cancel a Transfer

<div id="java" class="tab-content current">
To cancel an upload, call cancel() or cancelAllWithType() on the `TransferUtility` object.

The `transferId` can be retrieved from the `TransferObserver` object.

To cancel a single transfer, use:

```java

transferUtility.cancel(idToBeCancelled);
```

To cancel all transfers of a certain type, use:

```java

transferUtility.cancelAllWithType(TransferType.DOWNLOAD);
```

</div>

### Background Transfers

The SDK supports uploading to and downloading from Amazon S3 while your app is running in the background.

<div id="java" class="tab-content current">
No additional work is needed to use this feature. As long as your app is present in the background a transfer that is in progress will continue.
</div>

### Executing Long-running Transfers in the Background

Starting in version `2.7.0` of the SDK, `TransferService` logic has been refactored to be compatible with recent Android changes. In version `2.7.0`, this service will only monitor network connectivity changes. In previous AWS Mobile SDK versions, TransferService was started by TransferUtility. In v. `2.7.0`, TransferService must be started manually from your application. You can use the following code in the onCreate method of your app's Application class to start TransferService.

```java
getApplicationContext().startService(new Intent(getApplicationContext(), TransferService.class));
```

When the network becomes offline, the in-progress transfers that are in scope of the application will be paused. When network comes back online, the transfers that are paused will be resumed.

If you expect your app to perform long-running transfers in the background, initiate the transfers from a background service. For a recommended way to use a service to initiate the transfer, see a [Transfer Utility sample application](https://github.com/awslabs/aws-sdk-android-samples/tree/master/S3TransferUtilitySample).

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

### More Transfer Examples

This section provides descriptions and abbreviated examples of the aspects of each type of transfer that are unique.

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

### Securing your content stored in Amazon S3
To add encryption to an S3 Object, you can follow one of the following recommended approaches:

**Use Client-side Encryption**
For uploads, you can encrypt the file locally using an algorithm of your choice and use the TransferUtility API to upload the encrypted file to S3. For downloads, you can use the TransferUtility API to download the file and then decrypt it using the algorithm that you used to upload the file.

**Use Server-side Encryption on Amazon S3**
There are multiple options available for server-side encryption:

Use the Amazon S3 console to encrypt all objects in the bucket, or to encrypt individual objects after they have been uploaded.

You can also request server-side encryption for the object being uploaded using an AWS SDK. Options include:

To request server-side encryption for objects you transfer using transferUtility, instantiate an `ObjectMetadata` object, set the encryption algorithm and key value in the object's header. The following code passes an `objectMetadata` instance to a transferUtility method, using upload as an the example. The same pattern applies to download and multi-part download.

```java
TransferObserver observer = transferUtility.upload(
  MY_BUCKET,
  OBJECT_KEY,
  MY_FILE,
  myObjectMetadata
);
```

In this example, MY_BUCKET is the bucket that is the destination of the upload; OBJECT_KEY is the key (destination file name) for the uploaded; MY_FILE is the source of the data to be uploaded.

*To use AWS Key Management Service (KMS) to manage your encryption key:*

* Set the algorithm to `KMS_SERVER_SIDE_ENCRYPTION`

* Use a KMS-generated key as the value of `Headers.SERVER_SIDE_ENCRYPTION_KMS_KEY_ID`.

```java
AWSKMS kmsClient = new AWSKMSClient(AWSMobileClient.getInstance());
kmsClient.setRegion(Region.getRegion(Regions.US_EAST_1));
String kmsKey = kmsClient.createKey().getKeyMetadata().getKeyId();

final ObjectMetadata myObjectMetadata = new ObjectMetadata();
objectMetadata.setSSEAlgorithm(ObjectMetadata.KMS_SERVER_SIDE_ENCRYPTION);
objectMetadata.setHeader(Headers.SERVER_SIDE_ENCRYPTION_KMS_KEY_ID, kmsKey);
```

*To use your own encryption key:*

* Set the algorithm to `SERVER_SIDE_ENCRYPTION_CUSTOMER_ALGORITHM`, which causes Amazon S3 to use AES 256 encryption with an MD5 hash key.

* Use your custom key as the value as the value of `SERVER_SIDE_ENCRYPTION_CUSTOMER_KEY`.

* Use your custom MD5 hash as the value as the value of `SERVER_SIDE_ENCRYPTION_CUSTOMER_KEY_MD5`.

```java
final ObjectMetadata objectMetadata = new ObjectMetadata();
objectMetadata.setSSEAlgorithm(ObjectMetadata.SERVER_SIDE_ENCRYPTION_CUSTOMER_ALGORITHM);
objectMetadata.setHeader(Headers.SERVER_SIDE_ENCRYPTION_CUSTOMER_KEY, "your_Key");
objectMetadata.setHeader(Headers.SERVER_SIDE_ENCRYPTION_CUSTOMER_KEY_MD5, "your_md5");
```

### Limitations

<div id="java" class="tab-content current">

If you expect your app to perform transfers that take longer than 50 minutes, use [AmazonS3Client](http://docs.aws.amazon.com/AWSAndroidSDK/latest/javadoc/com/amazonaws/services/s3/AmazonS3Client.html) instead of [TransferUtility](http://docs.aws.amazon.com/AWSAndroidSDK/latest/javadoc/com/amazonaws/mobileconnectors/s3/transferutility/TransferUtility.html).

`TransferUtility` generates Amazon S3 pre-signed URLs to use for background data transfer. Using Amazon Cognito Identity, you receive AWS temporary credentials. The credentials are valid for up to 60 minutes. Generated Amazon S3 pre-signed URLs cannot last longer than that time. Because of this limitation, the Amazon S3 Transfer Utility enforces 50 minute transfer timeouts, leaving a 10 minute buffer before AWS temporary credentials are regenerated. After **50 minutes**, you receive a transfer failure.

</div>

## Additional Resources

* [Amazon Simple Storage Service Getting Started Guide](http://docs.aws.amazon.com/AmazonS3/latest/gsg/GetStartedWithS3.html)
* [Amazon Simple Storage Service API Reference](http://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html)
* [Amazon Simple Storage Service Developer Guide](http://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html)
* [Identity and Access Management Console](https://console.aws.amazon.com/iam/home)
* [Granting Access to an Amazon S3 Bucket](http://blogs.aws.amazon.com/security/post/Tx3VRSWZ6B3SHAV/Writing-IAM-Policies-How-to-grant-access-to-an-Amazon-S3-bucket)
* [Protecting data using customer provided encryption keys](https://docs.aws.amazon.com/AmazonS3/latest/dev/ServerSideEncryptionCustomerKeys.html)

## Next Steps

* For sample apps that demonstrate TransferUtility capabilities, see [Android S3 TransferUtility Sample](https://github.com/awslabs/aws-sdk-android-samples/tree/master/S3TransferUtilitySample).
