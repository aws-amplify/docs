The two classes `KinesisRecorder` and `KinesisFirehoseRecorder` allow you to interface with Amazon Kinesis Data Streams and Amazon Kinesis Data Firehose to stream analytics data for real-time processing.

## What is Amazon Kinesis Data Streams?

[Amazon Kinesis Data Streams](http://aws.amazon.com/kinesis/) is a fully managed service for real-time processing of streaming data at massive scale. Amazon Kinesis can collect and process hundreds of terabytes of data per hour from hundreds of thousands of sources, so you can write applications that process information in real-time. With Amazon Kinesis applications, you can build real-time dashboards, capture exceptions and generate alerts, drive recommendations, and make other real-time business or operational decisions. You can also easily send data to other services such as Amazon Simple Storage Service, Amazon DynamoDB, and Amazon Redshift.

The Kinesis Data Streams `KinesisRecorder` client lets you store your Kinesis requests on disk and then send them all at once using the [PutRecords](https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecords.html) API call of Kinesis. This is useful because many mobile applications that use Kinesis Data Streams will create multiple requests per second. Sending an individual request under `PutRecord` action could adversely impact battery life. Moreover, the requests could be lost if the device goes offline. Thus, using the high-level Kinesis Data Streams client for batching can preserve both battery life and data.

## What is Amazon Kinesis Data Firehose?

[Amazon Kinesis Data Firehose](http://aws.amazon.com/kinesis/firehose/) is a fully managed service for delivering real-time streaming data to destinations such as Amazon Simple Storage Service (Amazon S3) and Amazon Redshift. With Kinesis Data Firehose, you do not need to write any applications or manage any resources. You configure your data producers to send data to Firehose and it automatically delivers the data to the destination that you specified.

The Amazon Kinesis Data Firehose `KinesisFirehoseRecorder` client lets you store your Kinesis Data Firehose requests on disk and then send them using the [PutRecordBatch](https://docs.aws.amazon.com/firehose/latest/APIReference/API_PutRecordBatch.html) API call of Kinesis Data Firehose.

For more information about Amazon Kinesis Data Firehose, see [Amazon Kinesis Data Firehose](http://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html).

## Integrating Amazon Kinesis

Set up AWS Mobile SDK components by including the following libraries in your `app/build.gradle` dependencies list.

```groovy
dependencies {
  implementation 'com.amazonaws:aws-android-sdk-kinesis:2.15.+'
  implementation ('com.amazonaws:aws-android-sdk-mobile-client:2.15.+@aar') { transitive = true }
}
```

* `aws-android-sdk-kinesis` library enables sending analytics to Amazon Kinesis.
* `aws-android-sdk-mobile-client` library gives access to the AWS credentials provider and configurations.

Add the following imports to the main activity of your app.

```java
import com.amazonaws.mobileconnectors.kinesis.kinesisrecorder.*;
import com.amazonaws.mobile.client.AWSMobileClient;
import com.amazonaws.regions.Regions;
```

To use Kinesis Data Streams in an application, you must set the correct permissions. The following IAM policy allows the user to submit records to a specific data stream, which is identified by [ARN](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).

```json
{
    "Statement": [{
        "Effect": "Allow",
        "Action": "kinesis:PutRecords",
        "Resource": "arn:aws:kinesis:us-west-2:111122223333:stream/mystream"
    }]
}
```

The following IAM policy allows the user to submit records to a specific  Kinesis Data Firehose delivery stream.

```json
{
    "Statement": [{
        "Effect": "Allow",
        "Action": "firehose:PutRecordBatch",
        "Resource": "arn:aws:firehose:us-west-2:111122223333:deliverystream/mystream"
    }]
}
```

This policy should be applied to roles assigned to the Amazon Cognito identity pool, but you need to replace the `Resource` value with the correct ARN for your Amazon Kinesis or Amazon Kinesis Data Firehose stream. You can apply policies at the [IAM console](https://console.aws.amazon.com/iam/). To learn more about IAM policies, see [Using IAM](http://docs.aws.amazon.com/IAM/latest/UserGuide/IAM_Introduction.html).

To learn more about Amazon Kinesis Data Streams policies, see [Controlling Access to Amazon Kinesis Data Streams Resources with IAM](http://docs.aws.amazon.com/kinesis/latest/dev/kinesis-using-iam.html).

To learn more about Amazon Kinesis Data Firehose policies, see [Controlling Access with Amazon Kinesis Data Firehose](http://docs.aws.amazon.com/firehose/latest/dev/controlling-access.html).

## Working with the API

You can use `AWSMobileClient` to setup the Cognito credentials that are required to authenticate your requests with Amazon Kinesis.

```java
AWSMobileClient.getInstance().initialize(getApplicationContext(), new Callback<UserStateDetails>() {
        @Override
        public void onResult(UserStateDetails userStateDetails) {
            Log.i("INIT", userStateDetails.getUserState().toString());
        }

        @Override
        public void onError(Exception e) {
            Log.e("INIT", "Initialization error.", e);
        }
    }
);
```

Once you have credentials, you can use `KinesisRecorder` with Amazon Kinesis. The following snippet creates a directory and instantiates the `KinesisRecorder` client: 

```java
String kinesisDirectory = "YOUR_UNIQUE_DIRECTORY";
KinesisRecorder recorder = new KinesisRecorder(
    myActivity.getDir(kinesisDirectory, 0),
    Regions.<YOUR-AWS-REGION>,
    AWSMobileClient.getInstance()
);

// KinesisRecorder uses synchronous calls, so you shouldn't call KinesisRecorder methods on the main thread.
```

To use `KinesisFirehoseRecorder`, you need to pass the object in a directory where streaming data is saved. We recommend you use an app private directory because the data is not encrypted.

```java
KinesisFirehoseRecorder firehoseRecorder = new KinesisFirehoseRecorder(
    context.getCachedDir(), 
    Regions.<YOUR-AWS-REGION>,
    AWSMobileClient.getInstance());
```

Configure Kinesis:

You can configure `KinesisRecorder` or `KinesisFirehoseRecorder` through their properties:

You can configure the maximum allowed storage via the `withMaxStorageSize()` method of `KinesisRecorderConfig`.

You can retrieve the same information by getting the `KinesisRecorderConfig` object for the recorder and calling `getMaxStorageSize():`

```java
KinesisRecorderConfig kinesisRecorderConfig = recorder.getKinesisRecorderConfig();
Long maxStorageSize = kinesisRecorderConfig.getMaxStorageSize();
// Do something with maxStorageSize
```

To check the number of bytes currently stored in the directory passed in to the `KinesisRecorder` constructor, call `getDiskBytesUsed()`:

```java
Long bytesUsed = recorder.getDiskBytesUsed();
// Do something with bytesUsed
```

To see how much space the `KinesisRecorder` client is allowed to use, you can call `getDiskByteLimit()`.

```java
Long byteLimit = recorder.getDiskByteLimit();
// Do something with byteLimit
```

With `KinesisRecorder` created and configured, you can use `saveRecord()` to save records and then send them in a batch.

```java
recorder.saveRecord(
	"MyData".getBytes(),
	"MyStreamName");
recorder.submitAllRecords();
```

For the `saveRecord()` request above to work, you would have to have created a stream named `MyStreamName`. You can create new streams in the [Amazon Kinesis console](https://console.aws.amazon.com/kinesis).

If `submitAllRecords()` is called while the app is online, requests will be sent and removed from the disk. If `submitAllRecords()` is called while the app is offline, requests will be kept on disk until `submitAllRecords()` is called while online. This applies even if you lose your internet connection midway through a submit. So if you save ten requests, call `submitAllRecords()`, send five, and then lose the Internet connection, you have five requests left on disk. These remaining five will be sent the next time `submitAllRecords()` is invoked online.

Here is a similar snippet for Amazon Kinesis Data Firehose:

```java
// Start to save data, either a String or a byte array
firehoseRecorder.saveRecord("Hello world!\n");
firehoseRecorder.saveRecord("Streaming data to Amazon S3 via Amazon Kinesis Data Firehose is easy.\n");

// Send previously saved data to Amazon Kinesis Data Firehose
// Note: submitAllRecords() makes network calls, so wrap it in an AsyncTask.
new AsyncTask<Void, Void, Void>() {
   @Override
   protected Void doInBackground(Void... v) {
       try {
           firehoseRecorder.submitAllRecords();
       } catch (AmazonClientException ace) {
           // handle error
       }
   }
}.execute();
```

To learn more about working with Kinesis Data Streams, see the [Amazon Kinesis Data Streams resources](http://aws.amazon.com/kinesis/developer-resources/).

To learn more about the Kinesis Data Streams classes, see the [class reference for KinesisRecorder](https://aws-amplify.github.io/aws-sdk-android/docs/reference/com/amazonaws/mobileconnectors/kinesis/kinesisrecorder/KinesisRecorder.html).

To learn more about the Kinesis Data Firehose classes, see the [class reference for KinesisFirehoseRecorder](https://aws-amplify.github.io/aws-sdk-android/docs/reference/com/amazonaws/mobileconnectors/kinesis/kinesisrecorder/KinesisFirehoseRecorder.html).
