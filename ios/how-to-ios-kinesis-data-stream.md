# ios: Process Data Streams with Amazon Kinesis

## Overview

Amazon Kinesis is a fully managed service for real-time processing of streaming data at massive
scale.

The SDK for iOS provides two high-level client classes, `AWSKinesisRecorder` and
`AWSFirehoseRecorder`, designed to help you interface with Amazon Kinesis and Amazon
Kinesis Firehose.

The Amazon Kinesis `AWSKinesisRecorder` client lets you store [PutRecord](http://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecord.html) requests on disk and
then send them all at once. This is useful because many mobile applications that use Amazon Kinesis
will create multiple `PutRecord` requests per second. Sending an individual request for
each `PutRecord` action could adversely impact battery life. Moreover, the requests could
be lost if the device goes offline. Thus, using the high-level Amazon Kinesis client for batching
can preserve both battery life and data.

The Amazon Kinesis Firehose `AWSFirehoseRecorder` client lets you store [PutRecords](http://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecords.html) requests on disk and
then send them using Kinesis Data Firehose`PutRecordBatch`.

For information about Amazon Kinesis Region availability, see  [AWS Service Region Availability](http://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/).

## What is Amazon Kinesis?

[Amazon Kinesis](http://aws.amazon.com/kinesis/) is a fully managed service for real-time
processing of streaming data at massive scale. Amazon Kinesis can collect and process hundreds of
terabytes of data per hour from hundreds of thousands of sources, so you can write applications that
process information in real-time. With Amazon Kinesis applications, you can build real-time
dashboards, capture exceptions and generate alerts, drive recommendations, and make other real-time
business or operational decisions. You can also easily send data to other services such as Amazon
Simple Storage Service, Amazon DynamoDB, and Amazon Redshift.


## What is Amazon Kinesis Firehose?

[Amazon Kinesis Firehose](http://aws.amazon.com/kinesis/firehose/) is a fully managed service for
delivering real-time streaming data to destinations such as Amazon Simple Storage Service (Amazon
S3) and Amazon Redshift. With Firehose, you do not need to write any applications or manage any
resources. You configure your data producers to send data to Firehose and it automatically delivers
the data to the destination that you specified.

For more information about Amazon Kinesis Firehose, see [Amazon Kinesis Firehose](http://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html).

You can also learn more about how the Amazon Kinesis services work together on the following page: [Amazon
Kinesis services](http://aws.amazon.com/kinesis/).


## Integrating Amazon Kinesis and Amazon Kinesis Firehose

To use the Amazon Kinesis mobile client, you'll need to integrate the SDK for iOS into your app
and import the necessary libraries. To do so, follow these steps:

If you haven't already done so, [download the SDK for iOS](http://aws.amazon.com/mobile/sdk/),
unzip it, and include it in your application as described at `setup-aws-sdk-for-ios`. The
instructions direct you to import the headers for the services you'll be
using. For this example, you need the following import.

```swift
import AWSKinesis
```

You can use Amazon Cognito to provide temporary AWS credentials to your application.

These credentials let the app access your AWS resources. To create a credentials provider, follow the instructions at [Cognito Identity Developer Guide](http://docs.aws.amazon.com/cognito/devguide/identity/).

To use Amazon Kinesis in an application, you must set the correct permissions. The
following IAM policy allows the user to submit records to a specific Amazon Kinesis
stream, which is identified by [ARN](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).

```json
{
    "Statement": [{
        "Effect": "Allow",
        "Action": "kinesis:PutRecords",
        "Resource": "arn:aws:kinesis:us-west-2:111122223333:stream/mystream"
    }]
}
```

The following IAM policy allows the user to submit records to a specific Amazon Kinesis Firehose
stream.

```json
{
    "Statement": [{
        "Effect": "Allow",
        "Action": "firehose:PutRecordBatch",
        "Resource": "arn:aws:firehose:us-west-2:111122223333:deliverystream/mystream"
    }]
}
```

This policy should be applied to roles assigned to the Amazon Cognito
identity pool, but you need to replace the `Resource` value
with the correct ARN for your Amazon Kinesis or Amazon Kinesis Firehose stream. You can apply policies at the
[IAM console](https://console.aws.amazon.com/iam/). To
learn more about IAM policies, see [Using IAM](http://docs.aws.amazon.com/IAM/latest/UserGuide/IAM_Introduction.html).

To learn more about Amazon Kinesis-specific policies, see
[Controlling Access to Amazon Kinesis Resources with IAM](http://docs.aws.amazon.com/kinesis/latest/dev/kinesis-using-iam.html).

To learn more about Amazon Kinesis Firehose policies, see [Controlling Access with Amazon Kinesis Firehose](http://docs.aws.amazon.com/firehose/latest/dev/controlling-access.html).

Once you have credentials, you can use `AWSKinesisRecorder` with Amazon Kinesis. The
following snippet returns a shared instance of the Amazon Kinesis service client:

```swift
let kinesisRecorder = AWSKinesisRecorder.default()
```

You can use `AWSFirehoseRecorder` with Amazon Kinesis Firehose. The
following snippet returns a shared instance of the Amazon Kinesis Firehose service client:

```swift
let firehoseRecorder = AWSFirehoseRecorder.default()
```

You can configure `AWSKinesisRecorder` or `AWSFirehoseRecorder` through their properties:

```swift
kinesisRecorder.diskAgeLimit = TimeInterval(30 * 24 * 60 * 60); // 30 days
kinesisRecorder.diskByteLimit = UInt(10 * 1024 * 1024); // 10MB
kinesisRecorder.notificationByteThreshold = UInt(5 * 1024 * 1024); // 5MB
```

The `diskAgeLimit` property sets the expiration for cached requests.
When a request exceeds the limit, it's discarded. The default is no age limit. The
`diskByteLimit` property holds the limit of the disk cache size in
bytes. If the storage limit is exceeded, older requests are discarded. The default
value is 5 MB. Setting the value to 0 means that there's no practical limit. The
`notficationByteThreshold` property sets the point beyond which
Kinesis issues a notification that the byte threshold has been reached. The default
value is 0, meaning that by default Amazon Kinesis doesn't post the notification.

To see how much local storage is being used for Amazon Kinesis `PutRecord`
requests, check the `diskBytesUsed` property.

With `AWSKinesisRecorder` created and configured, you can use
`saveRecord:streamName:` to save records to local storage.

```swift
let yourData = "Test_data".data(using: .utf8)
kinesisRecorder.saveRecord(yourData, streamName: "YourStreamName")
```

In the preceding example, we create an NSData object and save it locally.
`YourStreamName` should be a string corresponding to the name of your
Kinesis stream. You can create new streams in the [Amazon Kinesis
console](https://console.aws.amazon.com/kinesis/).

Here is a similar snippet for Amazon Kinesis Firehose:

```swift
let yourData = "Test_data".data(using: .utf8)
firehoseRecorder.saveRecord(yourData, streamName: "YourStreamName")
```

To submit all the records stored on the device, call
`submitAllRecords`.

```swift
kinesisRecorder.submitAllRecords()
firehoseRecorder.submitAllRecords()
```

`submitAllRecords` sends all locally saved requests to the Amazon Kinesis
service. Requests that are successfully sent will be deleted from the device.
Requests that fail because the device is offline will be kept and submitted later.
Invalid requests are deleted.

Both `saveRecord` and `submitAllRecords` are asynchronous
operations, so you should ensure that `saveRecord` is complete before you
invoke `submitAllRecords`. The following code sample shows the methods
used correctly together.

```swift
// Create an array to store a batch of objects.
var tasks = Array<AWSTask<AnyObject>>()
for i in 0...100 {
    tasks.append(kinesisRecorder!.saveRecord(String(format: "TestString-%02d", i).data(using: .utf8), streamName: "YourStreamName")!)
}

AWSTask(forCompletionOfAllTasks: tasks).continueOnSuccessWith(block: { (task:AWSTask<AnyObject>) -> AWSTask<AnyObject>? in
    return kinesisRecorder?.submitAllRecords()
}).continueWith(block: { (task:AWSTask<AnyObject>) -> Any? in
    if let error = task.error as? NSError {
        print("Error: \(error)")
    }
    return nil
})
```

To learn more about working with Amazon Kinesis, see the [Amazon Kinesis Developer Resources](http://aws.amazon.com/kinesis/developer-resources/).

To learn more about the Amazon Kinesis classes, see the [class reference for AWSKinesisRecorder](http://docs.aws.amazon.com/AWSiOSSDK/latest/Classes/AWSKinesisRecorder.html).

For information about AWS service region availability, see  [AWS Service Region Availability](http://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/).
